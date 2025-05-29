import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  tokenAddress: String,
  chain: String,
  isHoneypot: Boolean,
  ownerControls: Object,
  liquidityStatus: Object,
  transactionFees: Object,
  contractVerification: Boolean,
  blacklistFunctions: Boolean,
  creatorInfo: Object,
  supplyInfo: Object,
  tokenAge: String,
  holderDistribution: Object,
  antiWhaleMechanisms: Boolean,
  ownershipRenounced: Boolean,
  auditStatus: String,
  overallRiskLevel: String,
}, { timestamps: true });

const Analysis = mongoose.model('Analysis', analysisSchema);
export default Analysis;
