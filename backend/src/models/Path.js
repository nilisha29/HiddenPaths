const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			default: 'route',
			trim: true,
		},
		status: {
			type: String,
			default: 'draft',
			enum: ['draft', 'active', 'archived'],
		},
		difficulty: {
			type: String,
			default: 'medium',
			enum: ['easy', 'medium', 'hard'],
		},
		accent: {
			type: String,
			default: '#8b5cf6',
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Path', pathSchema);