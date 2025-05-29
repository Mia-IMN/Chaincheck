import express from 'express';
import { analyzeToken } from '../controllers/analysisController.js';

const router = express.Router();
router.post('/analyze', analyzeToken);

export default router;
