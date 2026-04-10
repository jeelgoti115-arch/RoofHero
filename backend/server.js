import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectDB } from './db.js'
import authRoutes from './routes/auth.js'
import contractorRoutes from './routes/contractors.js'
import homeownerRoutes from './routes/homeowner.js'
import adminRoutes from './routes/admin.js'
import User from './models/User.js'

dotenv.config()

await connectDB()

const ensureAdmin = async () => {
  const existingAdmin = await User.findOne({ role: 'admin' })
  if (!existingAdmin) {
    const randomPassword = `admin-${Math.random().toString(36).slice(2, 10)}`
    const password = process.env.ADMIN_PASSWORD || randomPassword
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      username: 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@roofhero.com',
      password: hashedPassword,
      role: 'admin',
      name: 'RoofHero Admin',
      status: 'approved',
    })
    console.log('Default admin user created: admin /', password)
  }
}

await ensureAdmin()

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/contractors', contractorRoutes)
app.use('/api/homeowner', homeownerRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.use((error, req, res, next) => {
  console.error(error)
  res.status(error.status || 500).json({ message: error.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`RoofHero backend listening on http://localhost:${PORT}`)
})
