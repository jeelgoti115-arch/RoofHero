import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'contractor', 'homeowner'], required: true },
  name: { type: String, default: '' },
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  licenseNumber: { type: String, default: '' },
  experience: { type: String, default: '' },
  services: { type: [String], default: [] },
  regions: { type: [String], default: [] },
  avatarUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
