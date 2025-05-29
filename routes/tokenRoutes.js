const express = require('express');
const router = express.Router();
const { analyzeToken } = require('../services/tokenAnalysisService');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, async (req, res) => {
  const { tokenAddress } = req.body;
  try {
    const analysis = await analyzeToken(tokenAddress);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'Token analysis failed' });
  }
});

module.exports = router;
