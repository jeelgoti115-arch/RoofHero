import express from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ContractorApplication from '../models/ContractorApplication.js'
import QuoteRequest from '../models/QuoteRequest.js'
import { authenticate, authorize } from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = express.Router()
const uploadPath = path.join(__dirname, '..', 'uploads', 'contractor-applications')
fs.mkdirSync(uploadPath, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = `${file.fieldname}-${Date.now()}${ext}`
    cb(null, name)
  },
})

const upload = multer({ storage })

const parseJsonOrArray = (value) => {
  if (!value) return []
  try {
    return JSON.parse(value)
  } catch {
    return typeof value === 'string' ? [value] : []
  }
}

const emitContractorEvent = (req, event, payload) => {
  const io = req.app?.get('io')
  if (io) io.emit(event, payload)
}

router.post('/apply', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'licenseDoc', maxCount: 1 },
  { name: 'insuranceDoc', maxCount: 1 },
  { name: 'workPhotos', maxCount: 10 },
]), async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      bio,
      licenseNumber,
      insurancePolicyNumber,
      experience,
      services,
      regions,
    } = req.body

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: 'Full name, email, and phone are required.' })
    }

    const application = await ContractorApplication.create({
      fullName,
      email,
      phone,
      bio: bio || '',
      licenseNumber: licenseNumber || '',
      insurancePolicyNumber: insurancePolicyNumber || '',
      experience: experience || '',
      services: parseJsonOrArray(services),
      regions: parseJsonOrArray(regions),
      avatarFilename: req.files?.avatar?.[0]?.filename || null,
      avatarUrl: req.files?.avatar?.[0]?.filename ? `/uploads/contractor-applications/${req.files.avatar[0].filename}` : null,
      licenseDocName: req.files?.licenseDoc?.[0]?.originalname || null,
      insuranceDocName: req.files?.insuranceDoc?.[0]?.originalname || null,
      workPhotos: (req.files?.workPhotos || []).map((file) => `/uploads/contractor-applications/${file.filename}`),
      status: 'pending',
    })

    return res.status(201).json({
      message: 'Contractor application submitted successfully.',
      applicationId: application._id,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/me', authenticate, authorize('contractor'), async (req, res, next) => {
  try {
    const contractor = req.user
    const assignedQuotes = await QuoteRequest.find({
      $or: [
        { 'assignedContractors.id': contractor._id },
        { 'assignedContractor.id': contractor._id },
      ],
    }).sort({ requestedAt: -1 }).lean()

    const normalizedQuotes = assignedQuotes.map((quote) => {
      const contractorEntry = (quote.assignedContractors || []).find((entry) => entry.id?.toString() === contractor._id.toString())
      return {
        ...quote,
        contractorStatus: contractorEntry?.status || (quote.assignedContractor?.id?.toString() === contractor._id.toString() ? quote.status : 'New Arrival'),
      }
    })

    const safeContractor = contractor.toObject ? contractor.toObject() : { ...contractor }
    delete safeContractor.password

    return res.json({
      ...safeContractor,
      assignedQuotes: normalizedQuotes,
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/submit-quote', authenticate, authorize('contractor'), async (req, res, next) => {
  try {
    const contractor = req.user
    const { quoteAmount, pricePerSquare, estimatedStartDate, proposalMessage } = req.body

    const quote = await QuoteRequest.findById(req.params.id)
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }

    const contractorEntry = (quote.assignedContractors || []).find((entry) => entry.id?.toString() === contractor._id.toString())
    const fallbackEntry = quote.assignedContractor?.id?.toString() === contractor._id.toString() ? quote.assignedContractor : null

    if (!contractorEntry && !fallbackEntry) {
      return res.status(403).json({ message: 'Contractor not assigned to this quote.' })
    }

    const entryToUpdate = contractorEntry || fallbackEntry

    if (['Pending Review', 'Accepted', 'Rejected'].includes(entryToUpdate.status)) {
      return res.status(400).json({ message: 'Quote has already been submitted or reviewed.' })
    }

    entryToUpdate.status = 'Pending Review'
    entryToUpdate.quoteAmount = quoteAmount ?? entryToUpdate.quoteAmount
    entryToUpdate.pricePerSquare = pricePerSquare ?? entryToUpdate.pricePerSquare
    entryToUpdate.estimatedStartDate = estimatedStartDate ?? entryToUpdate.estimatedStartDate
    entryToUpdate.proposalMessage = proposalMessage ?? entryToUpdate.proposalMessage
    entryToUpdate.bidSubmittedAt = new Date()

    quote.serviceDetails = quote.serviceDetails || {}
    if (quoteAmount !== undefined && quoteAmount !== null) quote.serviceDetails.quote = quoteAmount
    if (pricePerSquare !== undefined && pricePerSquare !== null) quote.serviceDetails.pricePerSquare = pricePerSquare
    if (estimatedStartDate !== undefined && estimatedStartDate !== null) quote.serviceDetails.estimatedStartDate = estimatedStartDate
    if (proposalMessage !== undefined && proposalMessage !== null) quote.serviceDetails.proposalMessage = proposalMessage

    quote.markModified('assignedContractors')
    quote.markModified('serviceDetails')
    await quote.save()

    emitContractorEvent(req, 'contractorDashboardUpdated', {
      event: 'quoteSubmitted',
      contractorIds: [contractor._id.toString()],
      quote: quote.toObject(),
    })

    return res.json({ quote })
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/update-status', authenticate, authorize('contractor'), async (req, res, next) => {
  try {
    const contractor = req.user
    const { status } = req.body
    const allowedStatuses = ['Site Inspection Scheduled', 'Materials Ordered', 'Completed']

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status update.' })
    }

    const quote = await QuoteRequest.findById(req.params.id)
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }

    const contractorEntry = (quote.assignedContractors || []).find((entry) => entry.id?.toString() === contractor._id.toString())
    if (!contractorEntry) {
      return res.status(403).json({ message: 'Contractor not assigned to this quote.' })
    }

    const transitionMap = {
      Accepted: ['Site Inspection Scheduled', 'Materials Ordered', 'Completed'],
      'Site Inspection Scheduled': ['Materials Ordered', 'Completed'],
      'Materials Ordered': ['Completed'],
    }

    if (contractorEntry.status === 'Completed') {
      return res.status(400).json({ message: 'No further updates allowed after completion.' })
    }

    const allowedNext = transitionMap[contractorEntry.status] || []
    if (!allowedNext.includes(status)) {
      return res.status(400).json({ message: 'Invalid status transition.' })
    }

    contractorEntry.status = status
    quote.status = status
    quote.markModified('assignedContractors')
    await quote.save()

    emitContractorEvent(req, 'contractorDashboardUpdated', {
      event: 'quoteStatusUpdated',
      contractorIds: [contractor._id.toString()],
      quote: quote.toObject(),
    })

    return res.json({ quote })
  } catch (error) {
    next(error)
  }
})

export default router
