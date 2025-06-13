// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  images: [{
    type: String // URL gambar review
  }],
  helpful_count: {
    type: Number,
    default: 0
  },
  is_approved: {
    type: Boolean,
    default: true // Auto approve, bisa diubah ke false jika perlu moderasi
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

// Prevent duplicate review dari user yang sama untuk destination yang sama
reviewSchema.index({ user_id: 1, destination_id: 1 }, { unique: true });

// Middleware untuk update updated_at
reviewSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Review', reviewSchema);