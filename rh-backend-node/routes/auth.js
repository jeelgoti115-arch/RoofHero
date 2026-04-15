import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import Homeowner from '../models/Homeowner.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'roofhero-secret'

router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Username/email and password are required.' })
  }

  const normalizedInput = usernameOrEmail.toLowerCase()

  const user = await User.findOne({
    $or: [
      { username: normalizedInput },
      { email: normalizedInput },
    ],
  }).select('+password')

  if (user) {
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credential.' })
    }

    if (user.role === 'contractor' && user.status !== 'approved') {
      return res.status(403).json({ message: 'Contractor account not approved yet.' })
    }

    const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, JWT_SECRET, {
      expiresIn: '8h',
    })

    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
      status: user.status,
    }

    return res.json({ token, user: safeUser })
  }

  const homeowner = await Homeowner.findOne({
    $or: [
      { username: normalizedInput },
      { email: normalizedInput },
    ],
  }).select('+password')

  if (!homeowner || !(await bcrypt.compare(password, homeowner.password))) {
    return res.status(401).json({ message: 'Invalid credential.' })
  }

  const token = jwt.sign({ id: homeowner._id, role: 'homeowner', username: homeowner.username }, JWT_SECRET, {
    expiresIn: '8h',
  })

  const safeUser = {
    id: homeowner._id,
    username: homeowner.username,
    email: homeowner.email,
    role: 'homeowner',
    name: homeowner.fullName,
  }

  res.json({ token, user: safeUser })
})

export default router
