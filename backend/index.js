// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const connectDB = require('./src/config/db');
// const pathRoutes = require('./src/routes/pathRoutes');
// const authRoutes = require('./src/routes/authRoutes');
// const userRoutes = require('./src/routes/userRoutes');

// const app = express();
// const port = process.env.PORT || 5050;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
// 	res.json({
// 		message: 'HiddenPaths API is running',
// 		status: 'ok',
// 	});
// });

// app.use('/api/paths', pathRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);

// async function startServer() {
// 	await connectDB();

// 	app.listen(port, () => {
// 		console.log(`Server running on port ${port}`);
// 	});
// }

// startServer().catch((error) => {
// 	console.error('Failed to start backend:', error.message);
// 	process.exit(1);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Inside backend/index.js


const bookingRoutes = require('./src/routes/bookingRoutes'); // Import it here



// Middleware
app.use(cors());
app.use(express.json()); // Essential body parser

// ... your middleware setup ...

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes); // Mount it here!

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
