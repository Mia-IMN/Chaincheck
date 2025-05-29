import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import analysisRoutes from './routes/analysisRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', analysisRoutes);
app.use(errorHandler);

// Connect to Mongo and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
