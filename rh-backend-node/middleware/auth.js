import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Homeowner from '../models/Homeowner.js'

const JWT_SECRET = process.env.JWT_SECRET || 'roofhero-secret'

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing.' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)

    let user = await User.findById(payload.id).select('-password')
    if (!user && payload.role === 'homeowner') {
      user = await Homeowner.findById(payload.id).select('-password')
      if (user) {
        user = user.toObject()
        user.role = 'homeowner'
        user.name = user.fullName
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found.' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' })
  }
}

export const authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden.' })
  }
  next()
}
