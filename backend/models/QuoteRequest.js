import mongoose from 'mongoose'

const quoteRequestSchema = new mongoose.Schema({
  homeowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homeowner',
    required: true,
  },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceDetails: { type: Object, default: {} },
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  requestedAt: { type: Date, default: Date.now },
})

export default mongoose.model('QuoteRequest', quoteRequestSchema)
