import express from 'express'
import bcrypt from 'bcrypt'
import Homeowner from '../models/Homeowner.js'
import QuoteRequest from '../models/QuoteRequest.js'

const router = express.Router()

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

router.post('/quote', async (req, res, next) => {
  try {
    const { fullName, email, phone, ...serviceDetails } = req.body

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

    await QuoteRequest.create({
      homeowner: homeowner._id,
      fullName,
      email,
      phone,
      serviceDetails,
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

export default router
