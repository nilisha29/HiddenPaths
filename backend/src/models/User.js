const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const VALID_INTENTS = ['adventure', 'artisan', 'food', 'culture', 'wellness', 'music']

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    onboardingIntent: {
      type: [String],
      enum: VALID_INTENTS,
      default: [],
    },
  },
  { timestamps: true }
)

// basic email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

userSchema.pre('save', async function (next) {
  const user = this
  if (!isValidEmail(user.email)) {
    const err = new Error('Invalid email format')
    return next(err)
  }

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
  next()
})

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('User', userSchema)
