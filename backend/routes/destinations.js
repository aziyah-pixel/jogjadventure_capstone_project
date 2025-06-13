// routes/destinations.js
const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// GET /api/destinations - Get all destinations with filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      city, 
      category, 
      minPrice, 
      maxPrice, 
      minRating,
      search,
      sort = 'created_at'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (city) filter.city = new RegExp(city, 'i');
    if (category) filter.category = new RegExp(category, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minRating) filter.rating = { $gte: Number(minRating) };
    
    // Text search - improved search logic
    if (search) {
      filter.$or = [
        { place_name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { city: new RegExp(search, 'i') },
        { category: new RegExp(search, 'i') },
        { address: new RegExp(search, 'i') }
      ];
    }

    // Sort options
    const sortOptions = {};
    switch (sort) {
      case 'price_asc':
        sortOptions.price = 1;
        break;
      case 'price_desc':
        sortOptions.price = -1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      case 'name':
        sortOptions.place_name = 1;
        break;
      default:
        sortOptions.created_at = -1;
    }

    const destinations = await Destination.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-reviews'); // Exclude reviews for list view

    const total = await Destination.countDocuments(filter);

    // Transform data to match frontend format
    const transformedDestinations = destinations.map(dest => ({
      id: dest._id,
      name: dest.place_name,
      description: dest.description,
      location: `${dest.city}, ${dest.city_new}`,
      rating: dest.rating || dest.average_rating,
      duration: dest.duration || "2-3 jam", // Default if not available
      image: dest.images && dest.images.length > 0 ? dest.images[0] : `https://picsum.photos/400/300?random=${dest._id}`,
      category: dest.category,
      price: dest.price ? `Rp ${dest.price.toLocaleString('id-ID')}` : 'Gratis',
      gallery: dest.images && dest.images.length > 0 ? dest.images : [
        `https://picsum.photos/600/400?random=${dest._id}1`,
        `https://picsum.photos/600/400?random=${dest._id}2`,
        `https://picsum.photos/600/400?random=${dest._id}3`,
        `https://picsum.photos/600/400?random=${dest._id}4`
      ],
      facilities: dest.facilities || ["Parkir", "Toilet", "Restoran"],
      activities: dest.activities || ["Wisata", "Fotografi"],
      openingHours: dest.operating_hours || "08:00 - 17:00 WIB",
      contact: dest.contact || "+62 274 000000",
      website: dest.website,
      bestTime: dest.best_time || "Pagi dan sore hari",
      capacity: dest.capacity || "Unlimited",
      detailedDescription: dest.description,
      tips: dest.tips || ["Bawa kamera", "Datang pagi hari"],
      coordinates: {
        lat: dest.coordinate?.coordinates ? dest.coordinate.coordinates[1] : dest.latitude,
        lng: dest.coordinate?.coordinates ? dest.coordinate.coordinates[0] : dest.longitude
      }
    }));

    res.json({
      destinations: transformedDestinations,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalDestinations: total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/:id - Get single destination
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate('reviews.user_id', 'username profile.name profile.avatar')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user_id',
          select: 'username profile.name profile.avatar'
        }
      });

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    // Transform single destination data
    const transformedDestination = {
      id: destination._id,
      name: destination.place_name,
      description: destination.description,
      location: `${destination.city}, ${destination.city_new}`,
      rating: destination.rating || destination.average_rating,
      duration: destination.duration || "2-3 jam",
      image: destination.images && destination.images.length > 0 ? destination.images[0] : `https://picsum.photos/400/300?random=${destination._id}`,
      category: destination.category,
      price: destination.price ? `Rp ${destination.price.toLocaleString('id-ID')}` : 'Gratis',
      gallery: destination.images && destination.images.length > 0 ? destination.images : [
        `https://picsum.photos/600/400?random=${destination._id}1`,
        `https://picsum.photos/600/400?random=${destination._id}2`,
        `https://picsum.photos/600/400?random=${destination._id}3`,
        `https://picsum.photos/600/400?random=${destination._id}4`
      ],
      facilities: destination.facilities || ["Parkir", "Toilet", "Restoran"],
      activities: destination.activities || ["Wisata", "Fotografi"],
      openingHours: destination.operating_hours || "08:00 - 17:00 WIB",
      contact: destination.contact || "+62 274 000000",
      website: destination.website,
      bestTime: destination.best_time || "Pagi dan sore hari",
      capacity: destination.capacity || "Unlimited",
      detailedDescription: destination.description,
      tips: destination.tips || ["Bawa kamera", "Datang pagi hari"],
      coordinates: {
        lat: destination.coordinate?.coordinates ? destination.coordinate.coordinates[1] : destination.latitude,
        lng: destination.coordinate?.coordinates ? destination.coordinate.coordinates[0] : destination.longitude
      },
      reviews: destination.reviews
    };

    res.json(transformedDestination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/search-suggestions - Search suggestions (Updated endpoint)
router.get('/search-suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await Destination.find({
      $or: [
        { place_name: new RegExp(q, 'i') },
        { city: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ]
    })
    .select('place_name city category images description')
    .limit(8);

    // Transform suggestions to match frontend format
    const transformedSuggestions = suggestions.map(suggestion => ({
      name: suggestion.place_name,
      location: suggestion.city,
      category: suggestion.category,
      image: suggestion.images && suggestion.images.length > 0 ? suggestion.images[0] : null
    }));

    res.json({ suggestions: transformedSuggestions });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: error.message, suggestions: [] });
  }
});

// GET /api/destinations/search/suggestions - Keep old endpoint for backward compatibility
router.get('/search/suggestions', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const suggestions = await Destination.find({
      $or: [
        { place_name: new RegExp(q, 'i') },
        { city: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') }
      ]
    })
    .select('place_name city category')
    .limit(10);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/nearby/:lat/:lng - Get nearby destinations
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 10000 } = req.query; // 10km default

    const destinations = await Destination.find({
      coordinate: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).limit(20);

    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/categories - Get all categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Destination.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/cities - Get all cities
router.get('/meta/cities', async (req, res) => {
  try {
    const cities = await Destination.distinct('city');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/destinations/popular - Get popular destinations
router.get('/featured/popular', async (req, res) => {
  try {
    const popularDestinations = await Destination.find({
      rating: { $gte: 4.0 }
    })
    .sort({ rating: -1, total_reviews: -1 })
    .limit(8)
    .select('-reviews');

    res.json(popularDestinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/destinations - Create new destination (Admin only)
router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;