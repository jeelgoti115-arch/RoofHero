import express from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ContractorApplication from '../models/ContractorApplication.js'

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

export default router
