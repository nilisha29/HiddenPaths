const mongoose = require('mongoose');

async function connectDB() {
	const mongoUri = process.env.MONGODB_URI;

	if (!mongoUri) {
		throw new Error('MONGODB_URI is missing from the environment');
	}

	console.log('Connecting to MongoDB...');
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 5000,
	});
	console.log('Connected to MongoDB');
}

module.exports = connectDB;