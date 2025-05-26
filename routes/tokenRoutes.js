const express = require('express');
const router = express.Router();
const { analyzeToken } = require('../services/tokenAnalysisService');

router.post('/analyze', async (req, res) => {
  const { tokenAddress } = req.body;
  try {
    const analysis = await analyzeToken(tokenAddress);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
