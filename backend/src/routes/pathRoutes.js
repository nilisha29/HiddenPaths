const express = require('express');
const {
	getPaths,
	getPathById,
	createPath,
	updatePath,
	deletePath,
} = require('../controllers/pathController');

const router = express.Router();

router.route('/').get(getPaths).post(createPath);
router.route('/:id').get(getPathById).put(updatePath).delete(deletePath);

module.exports = router;