const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');
const pathRoutes = require('./src/routes/pathRoutes');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'HiddenPaths API is running',
		status: 'ok',
	});
});

app.use('/api/paths', pathRoutes);

async function startServer() {
	await connectDB();

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

startServer().catch((error) => {
	console.error('Failed to start backend:', error.message);
	process.exit(1);
});
