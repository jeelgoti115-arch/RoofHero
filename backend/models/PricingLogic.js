import mongoose from 'mongoose'

const pricingLogicSchema = new mongoose.Schema({
  materialRates: {
    slate: { type: String, default: '$70' },
    concreteTile: { type: String, default: '$70' },
    premium: { type: String, default: '$70' },
    flatMembrane: { type: String, default: '$70' },
    metal: { type: String, default: '$70' },
    asphaltShingle: { type: String, default: '$70' },
  },
  pitchMultipliers: {
    lowPitch: { type: String, default: '1.0x' },
    normal: { type: String, default: '1.2x' },
    steep: { type: String, default: '1.5x' },
    flat: { type: String, default: '1.5x' },
  },
  complexityMultipliers: {
    simple: { type: String, default: '1.0x' },
    medium: { type: String, default: '1.2x' },
    complex: { type: String, default: '1.4x' },
  },
  scaffoldingCosts: {
    oneStory: { type: String, default: '$1,000' },
    twoStory: { type: String, default: '$2,000' },
    threeStory: { type: String, default: '$3,000' },
    fourStory: { type: String, default: '$4,000' },
  },
  estimateSettings: {
    fixedSetupCost: { type: String, default: '$4,000' },
    estimateMargin: { type: String, default: '10%' },
  },
}, {
  collection: 'pl management',
  timestamps: true,
})

export default mongoose.model('PLManagement', pricingLogicSchema)
