import Analysis from '../models/Analysis.js';
import runChecks from '../utils/checkRunner.js';

export const analyzeToken = async (req, res) => {
  try {
    const tokenData = req.body;
    const result = await runChecks(tokenData.tokenAddress);
    const savedAnalysis = await Analysis.create(result);
    res.status(200).json(savedAnalysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
