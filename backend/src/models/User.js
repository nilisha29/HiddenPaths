// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

// const VALID_INTENTS = ['adventure', 'artisan', 'food', 'culture', 'wellness', 'music']

// const userSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true },
//     onboardingIntent: {
//       type: [String],
//       enum: VALID_INTENTS,
//       default: [],
//     },
//   },
//   { timestamps: true }
// )

// // basic email validation
// function isValidEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// }

// userSchema.pre('save', async function () {
//   const user = this
//   if (!isValidEmail(user.email)) {
//     throw new Error('Invalid email format')
//   }

//   if (user.isModified('password')) {
//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(user.password, salt)
//   }
// })

// userSchema.methods.comparePassword = async function (candidate) {
//   return bcrypt.compare(candidate, this.password)
// }

// module.exports = mongoose.model('User', userSchema)


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // Prevents the password from leaking in standard queries
  }
}, { timestamps: true });

// // Pre-save hook: Hashes password securely before committing to MongoDB
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// Pre-save hook: Hashes password securely before committing to MongoDB
UserSchema.pre('save', async function() {
  // If the password isn't modified, skip hashing completely
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // No next() call is needed here for async functions in modern Mongoose!
});

// Instance method: Compares entered plain-text password with stored hash
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
