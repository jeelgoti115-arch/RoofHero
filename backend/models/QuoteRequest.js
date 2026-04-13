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
  assignedContractors: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    username: { type: String, default: '' },
    status: {
      type: String,
      enum: [
        'New Arrival',
        'Pending Review',
        'Accepted',
        'Rejected',
        'Site Inspection Scheduled',
        'Materials Ordered',
        'Completed',
      ],
      default: 'New Arrival',
    },
    quoteAmount: { type: String, default: '' },
    pricePerSquare: { type: String, default: '' },
    estimatedStartDate: { type: String, default: '' },
    proposalMessage: { type: String, default: '' },
    bidSubmittedAt: { type: Date },
  }],
  credentials: {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  assignedAt: { type: Date },
  requestedAt: { type: Date, default: Date.now },
})

export default mongoose.model('QuoteRequest', quoteRequestSchema)
