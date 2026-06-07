const express = require('express')
const router = express.Router()
const { updateOnboarding } = require('../controllers/userController')

router.patch('/onboarding', updateOnboarding)

module.exports = router
