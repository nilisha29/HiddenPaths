const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// PATCH /api/user/onboarding
const updateOnboarding = asyncHandler(async (req, res) => {
  const { userId, intent } = req.body
  if (!userId) {
    res.status(400)
    throw new Error('Missing userId')
  }

  const user = await User.findById(userId)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  // accept null/empty to skip
  if (!intent) {
    user.onboardingIntent = []
  } else if (Array.isArray(intent)) {
    user.onboardingIntent = intent
  } else {
    // single string
    user.onboardingIntent = [intent]
  }

  await user.save()
  res.json({ message: 'Onboarding saved' })
})

module.exports = { updateOnboarding }
