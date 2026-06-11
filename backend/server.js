const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Essential body parser

// Connect to Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 MongoDB Context Secured and Connected Successfully.'))
  .catch((err) => console.error('❌ Database connection failure:', err));

// Route Mountings
app.use('/api/auth', authRoutes);

// Global Error Handler Fallback
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Authentication services live on port ${PORT}`));