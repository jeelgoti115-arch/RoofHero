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
  serviceDetails: { type: Object, required: true, default: {} },
  status: { type: String, enum: ['Awaiting Assignment', 'Bidding In Progress', 'Bid Accepted'], default: 'Awaiting Assignment' },
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  requestedAt: { type: Date, default: Date.now },
})

export default mongoose.model('QuoteRequest', quoteRequestSchema)
