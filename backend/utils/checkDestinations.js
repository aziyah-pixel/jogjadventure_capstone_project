// utils/checkDestinations.js
const mongoose = require('mongoose');
require('dotenv').config();

// Gunakan model yang sudah ada atau buat baru jika belum ada
let Destination;
try {
  // Coba gunakan model yang sudah ada
  Destination = mongoose.model('Destination');
} catch (error) {
  // Jika model belum ada, buat baru
  const destinationSchema = new mongoose.Schema({
    Place_Id: String,
    Place_Name: String,
    Description: String,
    Category: String,
    Price: Number,
    Rating: Number,
    Coordinate: String,
    Latitude: Number,
    Longitude: Number,
    Address: String,
    City: String,
    Price_Grouped: String,
    Content_Text: String,
    Google_Maps_Link: String,
    images: [{
      url: String,
      cloudinary_id: String,
      alt: String,
      is_primary: Boolean,
      width: Number,
      height: Number,
      format: String
    }]
  });
  
  Destination = mongoose.model('Destination', destinationSchema);
}

async function checkDestinations() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const total = await Destination.countDocuments();
    console.log(`Total destinations: ${total}`);
    
    const withImages = await Destination.countDocuments({ 
      images: { $exists: true, $not: { $size: 0 } } 
    });
    console.log(`Destinations with images: ${withImages}`);
    console.log(`Destinations without images: ${total - withImages}`);
    
    // Sample destinations
    console.log('\n=== SAMPLE DESTINATIONS ===');
    const samples = await Destination.find({}).limit(5);
    samples.forEach(dest => {
      console.log(`${dest.Place_Id}: ${dest.Place_Name}`);
      console.log(`  Images: ${dest.images ? dest.images.length : 0}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDestinations();

// ===========================================

// utils/testImageSearch.js
const { testSearchSpecificPlace } = require('./migrateFromCloudinary');

// Ganti dengan nama destinasi yang ingin Anda test
const testPlaceName = 'Borobudur Temple'; // Sesuaikan dengan data Anda
const testPlaceId = 'D001'; // Sesuaikan dengan data Anda

console.log('Testing image search...');
testSearchSpecificPlace(testPlaceName, testPlaceId);

// ===========================================

// utils/listCloudinaryImages.js
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function listAllImages() {
  try {
    console.log('Fetching all images from Cloudinary...');
    
    let allImages = [];
    let nextCursor = null;
    
    do {
      const result = await cloudinary.search
        .sort_by([['created_at', 'desc']])
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
      
      allImages = allImages.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`Fetched ${result.resources.length} images...`);
      
    } while (nextCursor);
    
    console.log(`\nTotal images in Cloudinary: ${allImages.length}`);
    console.log('\n=== SAMPLE IMAGES ===');
    
    allImages.slice(0, 10).forEach((img, index) => {
      console.log(`${index + 1}. ${img.public_id}`);
      console.log(`   URL: ${img.secure_url}`);
      console.log(`   Size: ${img.width}x${img.height}`);
      console.log('---');
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Uncomment untuk menjalankan
// listAllImages();