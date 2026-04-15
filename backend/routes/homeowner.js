import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Homeowner from '../models/Homeowner.js'
import QuoteRequest from '../models/QuoteRequest.js'
import PricingLogic from '../models/PricingLogic.js'
import { authenticate, authorize } from '../middleware/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = express.Router()
const uploadPath = path.join(__dirname, '..', 'uploads', 'homeowner-quotes')
fs.mkdirSync(uploadPath, { recursive: true })

const parseMoneyValue = (value) => {
  if (value === undefined || value === null) return 0
  const normalized = String(value).replace(/[^0-9.-]+/g, '')
  const parsed = parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

const parseMultiplier = (value) => {
  if (!value || typeof value !== 'string') return 1
  const normalized = value.replace(/x/gi, '').trim()
  const parsed = parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 1
}

const normalizeMaterialKey = (material) => {
  if (!material || typeof material !== 'string') return 'asphaltShingle'
  const lower = material.toLowerCase()
  if (lower.includes('slate')) return 'slate'
  if (lower.includes('concrete') || lower.includes('tile')) return 'concreteTile'
  if (lower.includes('premium')) return 'premium'
  if (lower.includes('flat') || lower.includes('membrane')) return 'flatMembrane'
  if (lower.includes('metal') || lower.includes('colorbond')) return 'metal'
  return 'asphaltShingle'
}

const normalizePitchKey = (pitch) => {
  if (!pitch || typeof pitch !== 'string') return 'normal'
  const lower = pitch.toLowerCase()
  if (lower.includes('flat')) return 'flat'
  if (lower.includes('steep')) return 'steep'
  if (lower.includes('low')) return 'lowPitch'
  return 'normal'
}

const normalizeComplexityKey = (value) => {
  if (!value || typeof value !== 'string') return 'medium'
  const lower = value.toLowerCase()
  if (lower.includes('simple')) return 'simple'
  if (lower.includes('complex')) return 'complex'
  return 'medium'
}

const normalizeStoryKey = (story) => {
  if (!story || typeof story !== 'string') return 'oneStory'
  const lower = story.toLowerCase()
  if (lower.includes('single') || lower.includes('one')) return 'oneStory'
  if (lower.includes('double') || lower.includes('two')) return 'twoStory'
  if (lower.includes('three')) return 'threeStory'
  if (lower.includes('four')) return 'fourStory'
  return 'oneStory'
}

const formatCurrency = (value) => {
  const numberValue = Math.round(value)
  return `$${numberValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

const computeQuoteEstimate = (details, pricingLogic) => {
  const area = Number(details.roofArea) || 0
  const materialKey = normalizeMaterialKey(details.materialRequested || details.currentRoofMaterial)
  const pitchKey = normalizePitchKey(details.steep || details.roofSlope || 'normal')
  const complexityKey = normalizeComplexityKey(details.roofFaces || details.complexity || 'medium')
  const storyKey = normalizeStoryKey(details.storey || details.story || 'single storey')

  const materialRate = parseMoneyValue(pricingLogic.materialRates?.[materialKey])
  const pitchMultiplier = parseMultiplier(pricingLogic.pitchMultipliers?.[pitchKey])
  const complexityMultiplier = parseMultiplier(pricingLogic.complexityMultipliers?.[complexityKey])
  const scaffoldingCost = parseMoneyValue(pricingLogic.scaffoldingCosts?.[storyKey])
  const fixedSetupCost = parseMoneyValue(pricingLogic.estimateSettings?.fixedSetupCost)
  const marginPercent = parseMoneyValue(pricingLogic.estimateSettings?.estimateMargin) / 100

  const materialCost = area * materialRate
  const adjustedCost = materialCost * pitchMultiplier * complexityMultiplier
  const rawQuote = adjustedCost + scaffoldingCost + fixedSetupCost
  const lower = rawQuote * Math.max(0, 1 - marginPercent)
  const upper = rawQuote * (1 + marginPercent)

  return {
    quoteRange: `${formatCurrency(lower)} – ${formatCurrency(upper)}`,
    estimatedQuote: formatCurrency(rawQuote),
    estimatedPricePerSquare: area > 0 ? `$${(rawQuote / area).toFixed(2)}` : 'N/A',
    materialRate,
    pitchMultiplier,
    complexityMultiplier,
    scaffoldingCost,
    fixedSetupCost,
    marginPercent,
  }
}

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

    let pricingLogic = await PricingLogic.findOne()
    if (!pricingLogic) {
      pricingLogic = await PricingLogic.create({})
    }

    const estimate = computeQuoteEstimate(parsedDetails, pricingLogic)
    parsedDetails.estimatedQuote = estimate.estimatedQuote
    parsedDetails.quoteRange = estimate.quoteRange
    parsedDetails.estimatedPricePerSquare = estimate.estimatedPricePerSquare
    parsedDetails.pricingDetails = {
      materialRate: `$${estimate.materialRate}`,
      pitchMultiplier: `${estimate.pitchMultiplier}x`,
      complexityMultiplier: `${estimate.complexityMultiplier}x`,
      scaffoldingCost: `$${estimate.scaffoldingCost}`,
      fixedSetupCost: `$${estimate.fixedSetupCost}`,
      estimateMargin: `${estimate.marginPercent * 100}%`,
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

    const quoteRequest = await QuoteRequest.create({
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
      quote: {
        id: quoteRequest._id,
        estimatedQuote: parsedDetails.estimatedQuote,
        quoteRange: parsedDetails.quoteRange,
        estimatedPricePerSquare: parsedDetails.estimatedPricePerSquare,
      },
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

    emitContractorEvent(req, 'contractorDashboardUpdated', {
      event: 'quoteAccepted',
      contractorIds: quote.assignedContractors.map((entry) => entry.id?.toString()).filter(Boolean),
      quote: quote.toObject(),
    })

    return res.json({ quote })
  } catch (error) {
    next(error)
  }
})

export default router
