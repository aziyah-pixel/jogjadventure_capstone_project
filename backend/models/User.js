// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    name: {
      type: String,
      trim: true
    },
    avatar: String,
    bio: {
      type: String,
      maxlength: 500
    },
    phone: String,
    location: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }],
  visited_places: [{
    destination_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination'
    },
    visited_at: {
      type: Date,
      default: Date.now
    }
  }],
  is_active: {
    type: Boolean,
    default: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Hash password sebelum save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updated_at
userSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Method untuk compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method untuk get user profile tanpa password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);