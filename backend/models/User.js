import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'contractor', 'homeowner'], required: true },
  name: { type: String, default: '' },
  status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'approved' },
  generatedPassword: { type: String, default: null },
  phone: { type: String, default: '' },
  bio: { type: String, default: '' },
  licenseNumber: { type: String, default: '' },
  experience: { type: String, default: '' },
  services: { type: [String], default: [] },
  regions: { type: [String], default: [] },
  avatarUrl: { type: String, default: null },
  workPhotos: { type: [String], default: [] },
  reviews: {
    type: [
      {
        name: { type: String, default: 'Anonymous User' },
        text: { type: String, required: true },
        stars: { type: Number, default: 5 },
        photo: { type: String, default: '/dashboard1-profile.png' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  generatedPassword: { type: String, default: null },
  dashboard: {
    stats: {
      bidsSubmitted: { type: Number, default: 0 },
      jobsAwarded: { type: Number, default: 0 },
      winRate: { type: Number, default: 0 },
    },
    newLeads: { type: [Object], default: [] },
    submittedQuotes: { type: [Object], default: [] },
    activeProjects: { type: [Object], default: [] },
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
