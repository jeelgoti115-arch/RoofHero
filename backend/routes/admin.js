import express from 'express'
import User from '../models/User.js'
import ContractorApplication from '../models/ContractorApplication.js'
import Homeowner from '../models/Homeowner.js'
import QuoteRequest from '../models/QuoteRequest.js'
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
      }

      if (existingUser) {
        existingUser.set({
          ...contractorData,
          status: 'approved',
        })
        await existingUser.save()
        generatedCredentials = { username: existingUser.username, password: 'unchanged' }
      } else {
        await User.create({
          username,
          password: hashedPassword,
          ...contractorData,
        })
        generatedCredentials = { username, password }
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

router.get('/quote-requests', async (req, res, next) => {
  try {
    const quotes = await QuoteRequest.find().sort({ requestedAt: -1 }).populate('homeowner', 'fullName email phone username')
    res.json(quotes)
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
