import express from 'express'
import User from '../models/User.js'
import ContractorApplication from '../models/ContractorApplication.js'
import Homeowner from '../models/Homeowner.js'
import QuoteRequest from '../models/QuoteRequest.js'
import PricingLogic from '../models/PricingLogic.js'
import { authenticate, authorize } from '../middleware/auth.js'
import { sendContractorApprovalEmail } from '../utils/email.js'
import { emitContractorEvent } from '../utils/socket.js'

const createDashboardSample = (application) => {
  const region = Array.isArray(application.regions) && application.regions.length ? application.regions[0] : 'Sydney';
  return {
    stats: {
      bidsSubmitted: 0,
      jobsAwarded: 0,
      winRate: 0,
    },
    newLeads: [
      //dynamically data here
    ],
    submittedQuotes: [
      //dynamically data here
    ],
    activeProjects: [
      //dynamically data here
    ],
  }
}
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/users', async (req, res, next) => {
  try {
    const { role, status } = req.query
    const filter = {
      role: role ? role : { $in: ['admin', 'contractor'] },
      status: status || 'approved',
    }
    const users = await User.find(filter).select('-password')
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.patch('/users/:id/reviews', async (req, res, next) => {
  try {
    const { name, text, stars, photo } = req.body
    if (!text) {
      return res.status(400).json({ message: 'Review text is required.' })
    }

    const review = {
      name: name || 'Anonymous User',
      text,
      stars: typeof stars === 'number' ? stars : 5,
      photo: photo || '/dashboard1-profile.png',
      createdAt: new Date(),
    }

    const contractor = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: { $each: [review], $position: 0 } } },
      { new: true, runValidators: true }
    )

    if (!contractor) {
      return res.status(404).json({ message: 'Contractor not found.' })
    }

    res.json({ reviews: contractor.reviews })
  } catch (error) {
    next(error)
  }
})

router.get('/contractor-applications', async (req, res, next) => {
  try {
    const { status } = req.query
    const filter = {}
    if (status) {
      filter.status = status
    } else {
      filter.status = 'pending'
    }
    const applications = await ContractorApplication.find(filter).sort({ submittedAt: -1 })
    res.json(applications)
  } catch (error) {
    next(error)
  }
})

router.patch('/contractor-applications/:id/status', async (req, res, next) => {
  try {
    const { status, reviewerNotes } = req.body
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' })
    }

    const application = await ContractorApplication.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' })
    }

    application.status = status
    application.reviewedAt = new Date()
    if (reviewerNotes) {
      application.reviewerNotes = reviewerNotes
    }
    await application.save()

    let generatedCredentials = null
    if (status === 'approved') {
      const existingUser = await User.findOne({ email: application.email, role: 'contractor' }).select('+password')
      const password = `contractor-${Math.random().toString(36).slice(2, 8)}${Math.floor(100 + Math.random() * 900)}`
      const hashedPassword = await bcrypt.hash(password, 10)
      const username = `${application.email.split('@')[0]}-${Date.now()}`
      const contractorData = {
        email: application.email,
        role: 'contractor',
        name: application.fullName,
        status: 'approved',
        phone: application.phone,
        bio: application.bio,
        licenseNumber: application.licenseNumber,
        experience: application.experience,
        services: application.services,
        regions: application.regions,
        avatarUrl: application.avatarUrl,
        workPhotos: application.workPhotos || [],
        dashboard: createDashboardSample(application),
      }

      if (existingUser) {
        existingUser.set({
          ...contractorData,
          password: hashedPassword,
          generatedPassword: password,
          status: 'approved',
        })
        await existingUser.save()
        generatedCredentials = { username: existingUser.username, password }
      } else {
        await User.create({
          username,
          password: hashedPassword,
          generatedPassword: password,
          ...contractorData,
        })
        generatedCredentials = { username, password }
      }

      try {
        await sendContractorApprovalEmail({
          toEmail: application.email,
          fullName: application.fullName,
          username: generatedCredentials.username,
          password: generatedCredentials.password,
        })
      } catch (emailError) {
        console.error('Failed to send contractor approval email:', emailError)
      }
    }

    const response = { message: 'Application status updated.', application }
    if (generatedCredentials) {
      response.credentials = generatedCredentials
    }
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.get('/dashboard-stats', async (req, res, next) => {
  try {
    const totalContractors = await User.countDocuments({ role: 'contractor', status: 'approved' })
    const totalHomeowners = await Homeowner.countDocuments()
    const completedProjects = await QuoteRequest.countDocuments({ 'assignedContractors.status': 'Completed' })

    res.json({ totalContractors, totalHomeowners, completedProjects })
  } catch (error) {
    next(error)
  }
})

router.get('/quote-requests', async (req, res, next) => {
  try {
    const quotes = await QuoteRequest.find().sort({ requestedAt: -1 }).populate('homeowner', 'fullName email phone username')
    res.json(quotes)
  } catch (error) {
    next(error)
  }
})

router.get('/quote-requests/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findById(req.params.id).populate('homeowner', 'fullName email phone username')
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }
    res.json({ quote })
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/accept', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { contractorId } = req.body
    if (!contractorId) {
      return res.status(400).json({ message: 'Contractor ID is required.' })
    }

    const quote = await QuoteRequest.findById(req.params.id)
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
      quoteId: quote._id,
    })

    res.json({ quote })
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/reject', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { contractorId } = req.body
    if (!contractorId) {
      return res.status(400).json({ message: 'Contractor ID is required.' })
    }

    const quote = await QuoteRequest.findById(req.params.id)
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }

    if (quote.status === 'Bid Accepted') {
      return res.status(400).json({ message: 'Cannot reject bids after a contractor has been accepted.' })
    }

    let rejectedFound = false
    quote.assignedContractors = (quote.assignedContractors || []).map((entry) => {
      if (entry.id?.toString() === contractorId.toString()) {
        rejectedFound = true
        return { ...entry, status: 'Rejected' }
      }
      return entry
    })

    if (!rejectedFound) {
      return res.status(404).json({ message: 'Selected contractor is not assigned to this quote.' })
    }

    await quote.save()

    emitContractorEvent(req, 'contractorDashboardUpdated', {
      event: 'quoteRejected',
      contractorIds: [contractorId.toString()],
      quoteId: quote._id,
    })

    res.json({ quote })
  } catch (error) {
    next(error)
  }
})

const defaultPricingLogic = {
  materialRates: {
    slate: '$70',
    concreteTile: '$70',
    premium: '$70',
    flatMembrane: '$70',
    metal: '$70',
    asphaltShingle: '$70',
  },
  pitchMultipliers: {
    lowPitch: '1.0x',
    normal: '1.2x',
    steep: '1.5x',
    flat: '1.5x',
  },
  complexityMultipliers: {
    simple: '1.0x',
    medium: '1.2x',
    complex: '1.4x',
  },
  scaffoldingCosts: {
    oneStory: '$1,000',
    twoStory: '$2,000',
    threeStory: '$3,000',
    fourStory: '$4,000',
  },
  estimateSettings: {
    fixedSetupCost: '$4,000',
    estimateMargin: '10%',
  },
}

router.get('/pricing-logic', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    let pricingLogic = await PricingLogic.findOne()
    if (!pricingLogic) {
      pricingLogic = await PricingLogic.create(defaultPricingLogic)
    }
    res.json(pricingLogic)
  } catch (error) {
    next(error)
  }
})

router.patch('/pricing-logic', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const updatePayload = {
      materialRates: req.body.materialRates || defaultPricingLogic.materialRates,
      pitchMultipliers: req.body.pitchMultipliers || defaultPricingLogic.pitchMultipliers,
      complexityMultipliers: req.body.complexityMultipliers || defaultPricingLogic.complexityMultipliers,
      scaffoldingCosts: req.body.scaffoldingCosts || defaultPricingLogic.scaffoldingCosts,
      estimateSettings: req.body.estimateSettings || defaultPricingLogic.estimateSettings,
    }

    const pricingLogic = await PricingLogic.findOneAndUpdate(
      {},
      updatePayload,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )

    res.json(pricingLogic)
  } catch (error) {
    next(error)
  }
})

router.patch('/quote-requests/:id/assign', async (req, res, next) => {
  try {
    const { contractorIds, contractorId } = req.body
    const parsedIds = Array.isArray(contractorIds)
      ? contractorIds
      : typeof contractorIds === 'string'
      ? contractorIds.split(',')
      : null

    const ids = (parsedIds || (contractorId ? [contractorId] : [])).map((id) => id?.toString()).filter(Boolean)

    if (ids.length === 0) {
      return res.status(400).json({ message: 'At least one contractor must be selected.' })
    }

    const quote = await QuoteRequest.findById(req.params.id)
    if (!quote) {
      return res.status(404).json({ message: 'Quote request not found.' })
    }

    if (quote.status !== 'Awaiting Assignment') {
      return res.status(400).json({ message: 'Quote request is not awaiting assignment.' })
    }

    const contractors = await User.find({ _id: { $in: ids }, role: 'contractor', status: 'approved' }).select('-password')
    if (!contractors.length) {
      return res.status(404).json({ message: 'Approved contractors not found.' })
    }

    quote.assignedContractors = contractors.map((contractor) => ({
      id: contractor._id,
      name: contractor.name || contractor.username,
      email: contractor.email,
      phone: contractor.phone,
      username: contractor.username,
      avatarUrl: contractor.avatarUrl || contractor.avatar || null,
      status: 'New Arrival',
    }))
    quote.assignedContractor = quote.assignedContractors[0] || null
    quote.status = 'Bidding In Progress'
    quote.assignedAt = new Date()
    await quote.save()

    emitContractorEvent(req, 'contractorDashboardUpdated', {
      event: 'quoteAssigned',
      contractorIds: ids,
      quoteId: quote._id,
    })

    res.json(quote)
  } catch (error) {
    next(error)
  }
})

router.get('/homeowners', async (req, res, next) => {
  try {
    const homeowners = await Homeowner.find().sort({ createdAt: -1 })
    res.json(homeowners)
  } catch (error) {
    next(error)
  }
})

export default router
