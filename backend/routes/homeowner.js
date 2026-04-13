import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Homeowner from '../models/Homeowner.js'
import QuoteRequest from '../models/QuoteRequest.js'
import { authenticate, authorize } from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = express.Router()
const uploadPath = path.join(__dirname, '..', 'uploads', 'homeowner-quotes')
fs.mkdirSync(uploadPath, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = `${file.fieldname}-${Date.now()}${ext}`
    cb(null, name)
  },
})

const upload = multer({ storage })

const generateUsername = (fullName) => {
  const base = fullName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 20)

  const suffix = Math.floor(100 + Math.random() * 900)
  return `${base || 'homeowner'}-${suffix}`
}

const generatePassword = () => {
  return Math.random().toString(36).slice(-8) + Math.floor(100 + Math.random() * 900)
}

router.post('/quote', upload.array('roofImages', 4), async (req, res, next) => {
  try {
    const { fullName, email, phone, serviceDetails = '{}' } = req.body
    let parsedDetails = {}

    if (typeof serviceDetails === 'string') {
      try {
        parsedDetails = JSON.parse(serviceDetails)
      } catch {
        parsedDetails = {}
      }
    } else if (typeof serviceDetails === 'object' && serviceDetails !== null) {
      parsedDetails = serviceDetails
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Full name, email, and phone are required.' })
    }

    const username = generateUsername(fullName)
    const password = generatePassword()
    const hashedPassword = await bcrypt.hash(password, 10)

    const homeowner = await Homeowner.create({
      fullName,
      email,
      phone,
      username,
      password: hashedPassword,
    })

    const roofImages = (req.files || []).map((file) => `/uploads/homeowner-quotes/${file.filename}`)
    parsedDetails.roofImages = roofImages

    await QuoteRequest.create({
      homeowner: homeowner._id,
      fullName,
      email,
      phone,
      serviceDetails: parsedDetails,
      status: 'Awaiting Assignment',
      credentials: { username, password },
    })

    return res.status(201).json({
      message: 'Quote request received successfully.',
      credentials: { username, password },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/me', authenticate, authorize('homeowner'), async (req, res, next) => {
  try {
    const homeowner = await Homeowner.findById(req.user._id).select('-password')
    if (!homeowner) {
      return res.status(404).json({ message: 'Homeowner not found.' })
    }

    const latestQuote = await QuoteRequest.findOne({ homeowner: homeowner._id }).sort({ requestedAt: -1 })

    return res.json({
      homeowner: {
        id: homeowner._id,
        fullName: homeowner.fullName,
        email: homeowner.email,
        phone: homeowner.phone,
        username: homeowner.username,
      },
      quote: latestQuote ? {
        id: latestQuote._id,
        requestedAt: latestQuote.requestedAt,
        serviceDetails: latestQuote.serviceDetails || {},
        assignedContractors: (latestQuote.assignedContractors || []).map((contractor) => ({
          id: contractor.id,
          name: contractor.name,
          email: contractor.email,
          phone: contractor.phone,
          username: contractor.username,
          status: contractor.status,
          quoteAmount: contractor.quoteAmount || '',
          pricePerSquare: contractor.pricePerSquare || '',
          estimatedStartDate: contractor.estimatedStartDate || '',
          proposalMessage: contractor.proposalMessage || '',
          bidSubmittedAt: contractor.bidSubmittedAt,
        })),
      } : null,
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/accept', authenticate, authorize('homeowner'), async (req, res, next) => {
  try {
    const { contractorId } = req.body
    if (!contractorId) {
      return res.status(400).json({ message: 'Contractor ID is required.' })
    }

    const quote = await QuoteRequest.findOne({ _id: req.params.id, homeowner: req.user._id })
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }

    if (quote.status === 'Bid Accepted') {
      return res.status(400).json({ message: 'A bid has already been accepted for this quote.' })
    }

    let acceptedFound = false

    quote.assignedContractors = (quote.assignedContractors || []).map((entry) => {
      const isAccepted = entry.id?.toString() === contractorId.toString()
      if (isAccepted) {
        acceptedFound = true
        return { ...entry, status: 'Accepted' }
      }
      return { ...entry, status: 'Rejected' }
    })

    if (!acceptedFound) {
      return res.status(404).json({ message: 'Selected contractor is not assigned to this quote.' })
    }

    quote.assignedContractor = quote.assignedContractors.find((entry) => entry.status === 'Accepted') || null
    quote.status = 'Bid Accepted'
    await quote.save()

    return res.json({ quote })
  } catch (error) {
    next(error)
  }
})

export default router
