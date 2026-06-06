const asyncHandler = require('express-async-handler');
const Path = require('../models/Path');

const getPaths = asyncHandler(async (req, res) => {
	const paths = await Path.find({}).sort({ createdAt: -1 });
	res.json(paths);
});

const getPathById = asyncHandler(async (req, res) => {
	const pathItem = await Path.findById(req.params.id);

	if (!pathItem) {
		res.status(404);
		throw new Error('Path not found');
	}

	res.json(pathItem);
});

const createPath = asyncHandler(async (req, res) => {
	const { title, description, category, status, difficulty, accent } = req.body;

	if (!title || !description) {
		res.status(400);
		throw new Error('Title and description are required');
	}

	const pathItem = await Path.create({
		title,
		description,
		category,
		status,
		difficulty,
		accent,
	});

	res.status(201).json(pathItem);
});

const updatePath = asyncHandler(async (req, res) => {
	const pathItem = await Path.findById(req.params.id);

	if (!pathItem) {
		res.status(404);
		throw new Error('Path not found');
	}

	const updatedPath = await Path.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.json(updatedPath);
});

const deletePath = asyncHandler(async (req, res) => {
	const pathItem = await Path.findById(req.params.id);

	if (!pathItem) {
		res.status(404);
		throw new Error('Path not found');
	}

	await pathItem.deleteOne();
	res.json({ message: 'Path removed' });
});

module.exports = {
	getPaths,
	getPathById,
	createPath,
	updatePath,
	deletePath,
};