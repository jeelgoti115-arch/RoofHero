import mongoose from 'mongoose'

const contractorApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  bio: { type: String, default: '' },
  licenseNumber: { type: String, default: '' },
  experience: { type: String, default: '' },
  services: { type: [String], default: [] },
  regions: { type: [String], default: [] },
  avatarFilename: { type: String, default: null },
  avatarUrl: { type: String, default: null },
  licenseDocName: { type: String, default: null },
  insuranceDocName: { type: String, default: null },
  workPhotos: { type: [String], default: [] },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewerNotes: { type: String, default: '' },
})

export default mongoose.model('ContractorApplication', contractorApplicationSchema)
