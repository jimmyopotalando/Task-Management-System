import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

import { errorHandler } from './middleware/errorMiddleware.js';
import { logger } from './utils/logger.js';

dotenv.config();

// Connect DB
connectDB();

const app = express();

// ========================
// SECURITY + MIDDLEWARE
// ========================
app.use(cors({
  origin: 'http://localhost:5175', // Vite frontend
  credentials: true
}));

app.use(helmet());
app.use(express.json());
app.use(logger);

// ========================
// ROUTES
// ========================
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ========================
// HEALTH CHECK (IMPORTANT)
// ========================
app.get('/', (req, res) => {
  res.json({ message: 'API running successfully 🚀' });
});

// ========================
// ERROR HANDLER (LAST)
// ========================
app.use(errorHandler);

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});