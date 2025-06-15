// models/Destination.js - UPDATED VERSION

const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  place_id: {
    type: Number,
    required: true,
    unique: true
  },
  place_name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  city_new: {
    type: String,
    index: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  
  // GeoJSON format untuk MongoDB geospatial queries
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      validate: {
        validator: function(coordinates) {
          return coordinates && coordinates.length === 2 && 
                 coordinates[0] >= -180 && coordinates[0] <= 180 && // longitude
                 coordinates[1] >= -90 && coordinates[1] <= 90;    // latitude
        },
        message: 'Coordinates must be [longitude, latitude] with valid ranges'
      }
    }
  },
  
  // Legacy coordinate format untuk backward compatibility
  coordinate: {
    lat: {
      type: Number,
      required: function() {
        return !this.location || !this.location.coordinates;
      }
    },
    lng: {
      type: Number, 
      required: function() {
        return !this.location || !this.location.coordinates;
      }
    }
  },
  
  // String format coordinates (untuk legacy data)
  latitude: String,
  longitude: String,
  
  address: {
    type: String,
    required: true
  },
  content_string: String,
  
  // ======= UPDATED IMAGE MANAGEMENT =======
  // Updated images structure based on your MongoDB data
  images: [{
    url: {
      type: String,
      required: true
    },
    cloudinary_id: {
      type: String,
      required: true
    },
    alt: String,
    is_primary: {
      type: Boolean,
      default: false
    },
    width: Number,
    height: Number,
    format: String,
    _id: mongoose.Schema.Types.ObjectId
  }],
  
  // Legacy Cloudinary fields (kept for backward compatibility)
  main_image: {
    public_id: String,
    url: String,
    alt_text: String
  },
  
  gallery_images: [{
    public_id: String,
    url: String,
    alt_text: String,
    order: {
      type: Number,
      default: 0
    }
  }],
  // ======= END IMAGE MANAGEMENT =======
  
  // Additional destination information
  duration: {
    type: String,
    default: "2-3 jam"
  },
  facilities: [{
    type: String,
    enum: [
      'Parkir', 'Toilet', 'Restoran', 'Mushola', 'WiFi', 'ATM', 
      'Souvenir Shop', 'Locker', 'Wheelchair Access', 'Guide',
      'First Aid', 'Camping Area', 'Swimming Pool', 'Playground'
    ]
  }],
  activities: [{
    type: String,
    enum: [
      'Wisata', 'Fotografi', 'Hiking', 'Swimming', 'Camping', 
      'Bird Watching', 'Cycling', 'Rafting', 'Fishing', 'Shopping',
      'Cultural Tour', 'Adventure', 'Relaxation', 'Education'
    ]
  }],
  operating_hours: {
    type: String,
    default: "08:00 - 17:00 WIB"
  },
  contact: String,
  website: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Website must be a valid URL'
    }
  },
  best_time: {
    type: String,
    default: "Pagi dan sore hari"
  },
  capacity: {
    type: String,
    default: "Unlimited"
  },
  tips: [{
    type: String
  }],
  
  // Review system
  reviews: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      maxlength: 1000
    },
    helpful_count: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Calculated fields
  average_rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  total_reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  view_count: {
    type: Number,
    default: 0
  },
  
  // Status fields
  is_active: {
    type: Boolean,
    default: true
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable automatic versioning
  versionKey: false
});

// ======= INDEXES =======
// Text search index
destinationSchema.index({ 
  place_name: 'text', 
  description: 'text', 
  category: 'text',
  city: 'text',
  address: 'text'
}, {
  weights: {
    place_name: 10,
    category: 5,
    city: 5,
    description: 1,
    address: 1
  }
});

// GeoJSON index untuk geospatial queries
destinationSchema.index({ location: '2dsphere' });

// Compound indexes untuk query optimization
destinationSchema.index({ city: 1, category: 1 });
destinationSchema.index({ rating: -1, total_reviews: -1 });
destinationSchema.index({ price: 1, rating: -1 });
destinationSchema.index({ is_active: 1, is_featured: -1 });

// ======= MIDDLEWARE =======
// Auto-update updated_at sebelum save
destinationSchema.pre('save', function(next) {
  this.updated_at = new Date();
  
  // Auto-generate location dari coordinate jika belum ada
  if (!this.location && this.coordinate && this.coordinate.lat && this.coordinate.lng) {
    this.location = {
      type: 'Point',
      coordinates: [this.coordinate.lng, this.coordinate.lat]
    };
  }
  
  // Auto-generate coordinate dari location jika belum ada
  if (!this.coordinate && this.location && this.location.coordinates) {
    this.coordinate = {
      lng: this.location.coordinates[0],
      lat: this.location.coordinates[1]
    };
  }
  
  // Auto-generate coordinate dari latitude/longitude strings jika belum ada
  if (!this.coordinate && this.latitude && this.longitude) {
    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      this.coordinate = { lat, lng };
      this.location = {
        type: 'Point',
        coordinates: [lng, lat]
      };
    }
  }
  
  next();
});

// ======= VIRTUALS =======
// Virtual untuk main image URL (prioritas: is_primary -> first image)
destinationSchema.virtual('main_image_url').get(function() {
  if (this.images && this.images.length > 0) {
    // Cari image dengan is_primary = true
    const primaryImage = this.images.find(img => img.is_primary);
    if (primaryImage) {
      return primaryImage.url;
    }
    // Fallback ke image pertama
    return this.images[0].url;
  }
  
  // Fallback ke main_image Cloudinary (legacy)
  if (this.main_image && this.main_image.url) {
    return this.main_image.url;
  }
  
  // Fallback ke placeholder
  return `https://picsum.photos/400/300?random=${this._id}`;
});

// Virtual untuk gallery URLs
destinationSchema.virtual('gallery_urls').get(function() {
  const urls = [];
  
  // Prioritas: images array (exclude primary image)
  if (this.images && this.images.length > 0) {
    const galleryImages = this.images.filter(img => !img.is_primary);
    urls.push(...galleryImages.map(img => img.url));
  }
  
  // Fallback ke gallery_images Cloudinary (legacy)
  if (urls.length === 0 && this.gallery_images && this.gallery_images.length > 0) {
    const cloudinaryUrls = this.gallery_images
      .sort((a, b) => a.order - b.order)
      .map(img => img.url)
      .filter(Boolean);
    urls.push(...cloudinaryUrls);
  }
  
  // Jika masih kosong, generate placeholder
  if (urls.length === 0) {
    for (let i = 1; i <= 4; i++) {
      urls.push(`https://picsum.photos/600/400?random=${this._id}${i}`);
    }
  }
  
  return urls;
});

// Virtual untuk full location string
destinationSchema.virtual('full_location').get(function() {
  const city = this.city_new || this.city;
  return `${city}, Yogyakarta`;
});

// Virtual untuk koordinat yang konsisten
destinationSchema.virtual('coordinates').get(function() {
  // Prioritas: location.coordinates -> coordinate -> latitude/longitude strings
  if (this.location && this.location.coordinates) {
    return {
      lat: this.location.coordinates[1],
      lng: this.location.coordinates[0]
    };
  }
  
  if (this.coordinate && this.coordinate.lat && this.coordinate.lng) {
    return {
      lat: this.coordinate.lat,
      lng: this.coordinate.lng
    };
  }
  
  if (this.latitude && this.longitude) {
    return {
      lat: parseFloat(this.latitude),
      lng: parseFloat(this.longitude)
    };
  }
  
  return null;
});

// ======= METHODS =======
// Method untuk menghitung jarak dari titik tertentu
destinationSchema.methods.getDistanceFrom = function(lat, lng) {
  const earthRadius = 6371; // km
  const coords = this.coordinates;
  
  if (!coords || !coords.lat || !coords.lng) return null;
  
  const dLat = (lat - coords.lat) * Math.PI / 180;
  const dLng = (lng - coords.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coords.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadius * c;
};

// Method untuk menambah view count
destinationSchema.methods.incrementViewCount = async function() {
  this.view_count = (this.view_count || 0) + 1;
  return this.save();
};

// Method untuk recalculate rating
destinationSchema.methods.recalculateRating = function() {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.average_rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.total_reviews = this.reviews.length;
  } else {
    this.average_rating = this.rating || 0; // Fallback ke rating field
    this.total_reviews = 0;
  }
};

// Method untuk mendapatkan primary image
destinationSchema.methods.getPrimaryImage = function() {
  if (this.images && this.images.length > 0) {
    const primaryImage = this.images.find(img => img.is_primary);
    return primaryImage || this.images[0];
  }
  return null;
};

// ======= STATIC METHODS =======
// Static method untuk mencari berdasarkan lokasi
destinationSchema.statics.findNearby = function(lat, lng, maxDistance = 10000) {
  return this.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat] // [longitude, latitude]
        },
        $maxDistance: maxDistance // dalam meter
      }
    },
    is_active: { $ne: false }
  });
};

// Static method untuk mencari destinations populer
destinationSchema.statics.findPopular = function(limit = 10) {
  return this.find({ is_active: { $ne: false } })
    .sort({ 
      average_rating: -1, 
      total_reviews: -1, 
      view_count: -1 
    })
    .limit(limit);
};

// Static method untuk mencari destinations featured
destinationSchema.statics.findFeatured = function(limit = 6) {
  return this.find({ 
    is_active: { $ne: false }, 
    is_featured: true 
  })
  .sort({ created_at: -1 })
  .limit(limit);
};

// Ensure virtual fields are serialized
destinationSchema.set('toJSON', { virtuals: true });
destinationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Destination', destinationSchema);