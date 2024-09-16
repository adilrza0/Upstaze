const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
 
  founder:{type: mongoose.Schema.Types.ObjectId,ref:"Profile"},
  userId:{type:String},
  basicInfo: {
    name: { type: String, required: true },
    logo: { type: String, default: null },
    tagline: { type: String, default: '' },
    website: { type: String, default: '' },
    foundingDate: { type: Date, default: null },
  },
  industryAndMarket: {
    industry: { type: Array, default: '' },
    marketSegment: { type: String, default: '' },
    targetAudience: { type: String, default: '' },
  },
  productService: {
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    stage: { type: String, default: '' },
    usp: { type: String, default: '' },  // Unique Selling Proposition
  },
  businessModel: {
    model: { type: String, default: '' },
    revenueStreams: { type: String, default: '' },
  },
  financialInfo: {
    fundingStatus: { type: String, default: '' },
    totalRaised: { type: Number, default: 0 },
    keyInvestors: { type: String, default: '' },
    revenueMetrics: { type: String, default: '' },
  },
  team: {
    founders: { type: String, default: '' },
    keyMembers: { type: String, default: '' },
    advisoryBoard: { type: String, default: '' },
  },
  milestones: {
    keyMilestones: { type: String, default: '' },
    awards: { type: String, default: '' },
  },
  legal: {
    registrationNumber: { type: String, default: '' },
    legalStructure: { type: String, default: '' },
    ip: { type: String, default: '' },  // Intellectual Property
  },
  needsAndGoals: {
    challenges: { type: String, default: '' },
    upstageGoals: { type: String, default: '' },
  },
  media: {
    pitchDeck: { type: String, default: '' },
    productDemo: { type: String, default: '' },
    additionalDocuments: { type: String, default: '' },
  },
  contact: {
    primaryContact: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location:{type: String, defual:''}
  },
});

const Startup = mongoose.model('Startup', StartupSchema);

module.exports = Startup;
