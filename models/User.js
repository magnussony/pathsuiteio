const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const camelCase = require('../utils/camelCase')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Enter valid email')
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error('Password must be atleast 7 characters')
        }
      },
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    jobTitle: {
      type: String,
      required: true,
      default: 'job title',
    },
    image: {
      type: Buffer,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

UserSchema.virtual('paths', {
  ref: 'Path',
  localField: '_id',
  foreignField: 'user',
})

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 8)
  this.firstName = camelCase(this.firstName)
  this.lastName = camelCase(this.lastName)
  this.jobTitle = camelCase(this.jobTitle)

  next()
})

UserSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next({ errors: { email: { message: 'The email already exists' } } })
  }
  next(error)
})

const User = mongoose.model('User', UserSchema, 'users')
module.exports = User
