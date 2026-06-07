const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// POST /api/auth/register
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body
  if (!fullName || !email || !password) {
    res.status(400)
    throw new Error('Please provide fullName, email and password')
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    res.status(409)
    throw new Error('User already exists')
  }

  const user = new User({ fullName, email, password })
  await user.save()

  res.status(201).json({ userId: user._id, fullName: user.fullName })
})

module.exports = { registerUser }
