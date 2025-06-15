// utils/migrateFromCloudinary.js
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Model Destination
const destinationSchema = new mongoose.Schema({
  place_id: { type: Number, required: true, unique: true },
  place_name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  city: { type: String },
  city_new: { type: String },
  price: { type: Number },
  rating: { type: Number },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  coordinate: {
    lat: { type: Number },
    lng: { type: Number }
  },
  latitude: { type: String },
  longitude: { type: String },
  address: { type: String },
  content_string: { type: String },
  
  images: [{
    url: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    alt: { type: String, default: '' },
    is_primary: { type: Boolean, default: false },
    width: { type: Number },
    height: { type: Number },
    format: { type: String }
  }],
  
  reviews: [{ type: mongoose.Schema.Types.Mixed }],
  average_rating: { type: Number },
  total_reviews: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, {
  timestamps: false
});

const Destination = mongoose.model('Destination', destinationSchema);

// Test koneksi Cloudinary terlebih dahulu
async function testCloudinaryConnection() {
  try {
    console.log('🔍 Testing Cloudinary connection...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set');
    console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set');
    
    // Test dengan ping
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', result);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error);
    return false;
  }
}

// Generate search terms yang lebih efisien
function generateSearchTerms(placeName, placeId) {
  if (!placeName || typeof placeName !== 'string' || placeName.trim() === '') {
    console.warn(`⚠️  Invalid place name:`, placeName);
    return [];
  }
  
  const cleanName = placeName.toLowerCase().trim();
  const terms = new Set();
  
  // Variasi dasar
  terms.add(cleanName.replace(/[^\w\s]/g, '').replace(/\s+/g, '_'));
  terms.add(cleanName.replace(/[^\w\s]/g, '').replace(/\s+/g, '-'));
  terms.add(cleanName.replace(/[^\w]/g, ''));
  
  // Kombinasi kata kunci utama
  const words = cleanName.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
  if (words.length >= 2) {
    terms.add(words.slice(0, 2).join('_'));
    terms.add(words.slice(0, 2).join('-'));
  }
  
  // Kata kunci individual yang penting
  words.forEach(word => {
    if (word.length > 3) {
      terms.add(word);
    }
  });
  
  // Place ID
  if (placeId) {
    terms.add(placeId.toString());
  }
  
  // Keywords khusus untuk tempat wisata
  const specialKeywords = {
    'taman': ['taman', 'park'],
    'pantai': ['pantai', 'beach'],
    'gunung': ['gunung', 'mount'],
    'candi': ['candi', 'temple'],
    'museum': ['museum'],
    'malioboro': ['malioboro'],
    'borobudur': ['borobudur'],
    'prambanan': ['prambanan']
  };
  
  Object.keys(specialKeywords).forEach(key => {
    if (cleanName.includes(key)) {
      specialKeywords[key].forEach(variant => terms.add(variant));
    }
  });
  
  return Array.from(terms).filter(term => term && term.length > 0);
}

// FUNGSI PENCARIAN YANG DIPERBAIKI - Metode Sederhana
async function searchCloudinaryImagesSimple(placeName, placeId) {
  if (!placeName || typeof placeName !== 'string' || placeName.trim() === '') {
    return [];
  }
  
  try {
    console.log(`🔍 Mencari gambar untuk: ${placeName}`);
    
    const searchTerms = generateSearchTerms(placeName, placeId);
    let allImages = [];
    
    // Hanya gunakan API resources dengan prefix - metode yang paling stabil
    for (const term of searchTerms.slice(0, 3)) { // Batasi hanya 3 term pertama
      try {
        console.log(`  - Mencoba term: "${term}"`);
        
        const result = await cloudinary.api.resources({
          type: 'upload',
          prefix: term,
          max_results: 8
        });
        
        if (result.resources && result.resources.length > 0) {
          console.log(`  ✅ Ditemukan ${result.resources.length} gambar dengan prefix: ${term}`);
          allImages = allImages.concat(result.resources);
        } else {
          console.log(`  - Tidak ada gambar dengan prefix: ${term}`);
        }
        
        // Delay untuk menghindari rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (prefixError) {
        console.warn(`  ⚠️ Pencarian gagal untuk "${term}":`, prefixError.message);
        continue;
      }
    }
    
    // Jika tidak ada hasil, coba dengan kata pertama saja
    if (allImages.length === 0) {
      try {
        const firstWord = placeName.toLowerCase().split(' ')[0];
        if (firstWord && firstWord.length > 2) {
          console.log(`  - Mencoba kata pertama: "${firstWord}"`);
          
          const generalResult = await cloudinary.api.resources({
            type: 'upload',
            prefix: firstWord,
            max_results: 5
          });
          
          if (generalResult.resources && generalResult.resources.length > 0) {
            console.log(`  ✅ Pencarian umum ditemukan ${generalResult.resources.length} gambar`);
            allImages = allImages.concat(generalResult.resources);
          }
        }
      } catch (generalError) {
        console.warn('  ⚠️ Pencarian umum gagal:', generalError.message);
      }
    }
    
    // Hapus duplikat
    const uniqueImages = allImages.filter((image, index, self) => 
      index === self.findIndex(img => img.public_id === image.public_id)
    );
    
    // Urutkan berdasarkan relevansi
    const sortedImages = uniqueImages.sort((a, b) => {
      const aScore = calculateRelevanceScore(a.public_id, searchTerms);
      const bScore = calculateRelevanceScore(b.public_id, searchTerms);
      return bScore - aScore;
    });
    
    console.log(`  📊 Total gambar unik ditemukan: ${sortedImages.length}`);
    return sortedImages.slice(0, 8); // Batasi maksimal 8 gambar
    
  } catch (error) {
    console.error(`❌ Error mencari gambar untuk ${placeName}:`, error.message);
    return [];
  }
}

// FUNGSI PENCARIAN YANG DIPERBAIKI - Metode Advanced (Fallback)
async function searchCloudinaryImages(placeName, placeId) {
  if (!placeName || typeof placeName !== 'string' || placeName.trim() === '') {
    return [];
  }
  
  try {
    console.log(`🔍 Mencari gambar untuk: ${placeName}`);
    
    const searchTerms = generateSearchTerms(placeName, placeId);
    let allImages = [];
    
    // Strategi 1: Cari dengan search API
    for (const term of searchTerms.slice(0, 3)) {
      try {
        console.log(`  - Mencoba search API untuk: "${term}"`);
        
        // Bersihkan term dari karakter khusus
        const cleanTerm = term.replace(/[^a-zA-Z0-9_-]/g, '');
        
        if (cleanTerm.length < 2) continue;
        
        const result = await cloudinary.search
          .expression(`public_id:*${cleanTerm}*`)
          .sort_by([['created_at', 'desc']])
          .max_results(8)
          .execute();
        
        if (result.resources && result.resources.length > 0) {
          console.log(`  ✅ Search API ditemukan ${result.resources.length} gambar untuk: ${cleanTerm}`);
          allImages = allImages.concat(result.resources);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (searchError) {
        console.warn(`  ⚠️ Search API gagal untuk "${term}":`, searchError.message);
        
        // Fallback ke prefix search
        try {
          console.log(`  - Fallback ke prefix search untuk: "${term}"`);
          const altResult = await cloudinary.api.resources({
            type: 'upload',
            prefix: term,
            max_results: 8
          });
          
          if (altResult.resources && altResult.resources.length > 0) {
            console.log(`  ✅ Prefix search ditemukan ${altResult.resources.length} gambar`);
            allImages = allImages.concat(altResult.resources);
          }
          
        } catch (altError) {
          console.warn(`  ⚠️ Prefix search juga gagal:`, altError.message);
        }
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    // Hapus duplikat
    const uniqueImages = allImages.filter((image, index, self) => 
      index === self.findIndex(img => img.public_id === image.public_id)
    );
    
    // Urutkan berdasarkan relevansi
    const sortedImages = uniqueImages.sort((a, b) => {
      const aScore = calculateRelevanceScore(a.public_id, searchTerms);
      const bScore = calculateRelevanceScore(b.public_id, searchTerms);
      return bScore - aScore;
    });
    
    console.log(`  📊 Total gambar unik ditemukan: ${sortedImages.length}`);
    return sortedImages;
    
  } catch (error) {
    console.error(`❌ Error mencari gambar untuk ${placeName}:`, error.message);
    return [];
  }
}

// Hitung skor relevansi
function calculateRelevanceScore(publicId, searchTerms) {
  let score = 0;
  const cleanPublicId = publicId.toLowerCase();
  
  searchTerms.forEach(term => {
    const cleanTerm = term.toLowerCase();
    
    if (cleanPublicId === cleanTerm) score += 100;
    if (cleanPublicId.startsWith(cleanTerm)) score += 50;
    if (cleanPublicId.includes(cleanTerm)) score += 25;
    
    const noSeperatorsId = cleanPublicId.replace(/[_-]/g, '');
    const noSeperatorsTerm = cleanTerm.replace(/[_-]/g, '');
    if (noSeperatorsId.includes(noSeperatorsTerm)) score += 10;
  });
  
  return score;
}

// Format gambar untuk database
function formatImageForDB(cloudinaryImage, index, placeName) {
  return {
    url: cloudinaryImage.secure_url,
    cloudinary_id: cloudinaryImage.public_id,
    alt: `${placeName} - Gambar ${index + 1}`,
    is_primary: index === 0,
    width: cloudinaryImage.width,
    height: cloudinaryImage.height,
    format: cloudinaryImage.format
  };
}

// FUNGSI MIGRATION YANG DIPERBAIKI
async function migrateFromCloudinaryFixed() {
  try {
    console.log('🚀 Memulai migrasi dari Cloudinary...');
    
    // Test koneksi Cloudinary terlebih dahulu
    const isCloudinaryConnected = await testCloudinaryConnection();
    if (!isCloudinaryConnected) {
      console.error('❌ Tidak dapat melanjutkan tanpa koneksi Cloudinary');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Terhubung ke MongoDB');
    
    // Ambil destinations tanpa images
    const destinations = await Destination.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } }
      ]
    });
    
    console.log(`📊 Memproses ${destinations.length} destinasi...`);
    
    let processedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    let notFoundCount = 0;
    
    for (const destination of destinations) {
      try {
        processedCount++;
        
        if (!destination.place_name || !destination.place_id) {
          console.warn(`⚠️  Dilewati: Data tidak valid untuk destinasi ${processedCount}`);
          continue;
        }
        
        console.log(`\n--- ${processedCount}/${destinations.length}: ${destination.place_name} ---`);
        
        // Gunakan metode sederhana terlebih dahulu
        let cloudinaryImages = [];
        
        try {
          cloudinaryImages = await searchCloudinaryImagesSimple(
            destination.place_name, 
            destination.place_id.toString()
          );
          
          // Jika tidak ada hasil, coba metode advanced
          if (cloudinaryImages.length === 0) {
            console.log('  🔄 Mencoba metode pencarian advanced...');
            cloudinaryImages = await searchCloudinaryImages(
              destination.place_name, 
              destination.place_id.toString()
            );
          }
        } catch (searchError) {
          console.warn(`  ⚠️ Pencarian gagal:`, searchError.message);
          errorCount++;
          continue;
        }
        
        if (cloudinaryImages.length > 0) {
          // Batasi maksimal 8 gambar per destinasi
          const limitedImages = cloudinaryImages.slice(0, 8);
          
          const formattedImages = limitedImages.map((img, index) => 
            formatImageForDB(img, index, destination.place_name)
          );
          
          await Destination.findByIdAndUpdate(
            destination._id, 
            { 
              images: formattedImages,
              updated_at: new Date()
            },
            { new: true }
          );
          
          console.log(`  ✅ Berhasil update dengan ${formattedImages.length} gambar`);
          updatedCount++;
          
        } else {
          console.log(`  ⚠️  Tidak ada gambar ditemukan`);
          notFoundCount++;
        }
        
        // Delay untuk rate limiting - penting!
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error memproses destinasi ${processedCount}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n=== 📊 RINGKASAN MIGRASI ===');
    console.log(`Total diproses: ${processedCount}`);
    console.log(`Berhasil diperbarui: ${updatedCount}`);
    console.log(`Error: ${errorCount}`);
    console.log(`Tidak ditemukan gambar: ${notFoundCount}`);
    console.log(`Success rate: ${((updatedCount / processedCount) * 100).toFixed(1)}%`);
    console.log('✅ Migrasi selesai!');
    
  } catch (error) {
    console.error('❌ Error migrasi:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Koneksi MongoDB ditutup');
  }
}

// Fungsi migration asli (untuk backup)
async function migrateFromCloudinary() {
  try {
    console.log('Starting migration from Cloudinary...');
    
    // Test koneksi Cloudinary terlebih dahulu
    const isCloudinaryConnected = await testCloudinaryConnection();
    if (!isCloudinaryConnected) {
      console.error('❌ Cannot proceed without Cloudinary connection');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Ambil destinations tanpa images
    const destinations = await Destination.find({
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } }
      ]
    });
    
    console.log(`Processing ${destinations.length} destinations...`);
    
    let processedCount = 0;
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const destination of destinations) {
      try {
        processedCount++;
        
        if (!destination.place_name || !destination.place_id) {
          console.warn(`⚠️  Skipped: Invalid data for destination ${processedCount}`);
          continue;
        }
        
        console.log(`\n--- ${processedCount}/${destinations.length}: ${destination.place_name} ---`);
        
        const cloudinaryImages = await searchCloudinaryImagesSimple(
          destination.place_name, 
          destination.place_id.toString()
        );
        
        if (cloudinaryImages.length > 0) {
          // Batasi maksimal 8 gambar per destinasi
          const limitedImages = cloudinaryImages.slice(0, 8);
          
          const formattedImages = limitedImages.map((img, index) => 
            formatImageForDB(img, index, destination.place_name)
          );
          
          await Destination.findByIdAndUpdate(
            destination._id, 
            { 
              images: formattedImages,
              updated_at: new Date()
            },
            { new: true }
          );
          
          console.log(`✅ Updated with ${formattedImages.length} images`);
          updatedCount++;
          
        } else {
          console.log(`⚠️  No images found`);
        }
        
        // Delay untuk rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error processing destination ${processedCount}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n=== MIGRATION SUMMARY ===');
    console.log(`Total processed: ${processedCount}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`No images found: ${processedCount - updatedCount - errorCount}`);
    console.log('Migration completed!');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Test pencarian untuk tempat spesifik
async function testSearchSpecificPlace(placeName, placeId) {
  try {
    console.log(`\n=== 🧪 TESTING: ${placeName} (${placeId}) ===`);
    
    // Test koneksi dulu
    const isConnected = await testCloudinaryConnection();
    if (!isConnected) return;
    
    const searchTerms = generateSearchTerms(placeName, placeId);
    console.log(`🔍 Search terms (${searchTerms.length}):`, searchTerms.slice(0, 10));
    
    console.log('\n--- Mencoba metode sederhana ---');
    const simpleImages = await searchCloudinaryImagesSimple(placeName, placeId);
    console.log(`Metode sederhana: ${simpleImages.length} gambar`);
    
    console.log('\n--- Mencoba metode advanced ---');
    const advancedImages = await searchCloudinaryImages(placeName, placeId);
    console.log(`Metode advanced: ${advancedImages.length} gambar`);
    
    const allImages = simpleImages.length > 0 ? simpleImages : advancedImages;
    
    console.log(`\n📊 Total gambar ditemukan: ${allImages.length}`);
    
    allImages.slice(0, 5).forEach((img, index) => {
      console.log(`${index + 1}. ${img.public_id}`);
      console.log(`   ${img.width}x${img.height} - ${img.secure_url}`);
    });
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Lihat gambar di Cloudinary dengan method yang benar
async function listAllCloudinaryImages(limit = 30) {
  try {
    console.log('🔍 Testing Cloudinary connection...');
    
    // Test koneksi dulu
    const isConnected = await testCloudinaryConnection();
    if (!isConnected) return;
    
    // Gunakan admin API untuk list resources
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      max_results: limit,
      type: 'upload'
    });
    
    console.log(`📊 Ditemukan ${result.resources?.length || 0} gambar:`);
    
    if (result.resources && result.resources.length > 0) {
      result.resources.forEach((img, index) => {
        console.log(`${index + 1}. ${img.public_id}`);
        console.log(`   ${img.width}x${img.height} - ${img.format}`);
        console.log(`   Created: ${img.created_at}`);
        console.log(`   URL: ${img.secure_url}`);
        console.log('   ---');
      });
    }
    
  } catch (error) {
    console.error('❌ Error listing images:', error);
    
    // Jika masih error, coba dengan search API
    try {
      console.log('\n🔄 Mencoba metode alternatif...');
      const searchResult = await cloudinary.search
        .expression('resource_type:image')
        .max_results(limit)
        .execute();
        
      console.log(`✅ Metode alternatif menemukan ${searchResult.resources?.length || 0} gambar`);
      
    } catch (searchError) {
      console.error('❌ Metode alternatif juga gagal:', searchError);
    }
  }
}

// Test basic Cloudinary operations
async function testBasicOperations() {
  try {
    console.log('=== 🧪 Testing Basic Cloudinary Operations ===');
    
    // 1. Test ping
    console.log('\n1. Testing ping...');
    const pingResult = await cloudinary.api.ping();
    console.log('✅ Ping successful:', pingResult);
    
    // 2. Test usage
    console.log('\n2. Testing usage...');
    const usageResult = await cloudinary.api.usage();
    console.log('✅ Usage info:', {
      credits: usageResult.credits,
      used_percent: usageResult.used_percent,
      limit: usageResult.limit
    });
    
    // 3. Test simple resource listing
    console.log('\n3. Testing resource listing...');
    const resourceResult = await cloudinary.api.resources({
      max_results: 5
    });
    console.log(`✅ Found ${resourceResult.resources.length} resources`);
    
  } catch (error) {
    console.error('❌ Basic operations test failed:', error);
  }
}

module.exports = {
  migrateFromCloudinary,
  migrateFromCloudinaryFixed,
  testSearchSpecificPlace,
  listAllCloudinaryImages,
  searchCloudinaryImages,
  searchCloudinaryImagesSimple,
  testCloudinaryConnection,
  testBasicOperations
};

// Jalankan sesuai kebutuhan
if (require.main === module) {
  // Pilih salah satu untuk dijalankan:
  
  // 1. Test dasar (jalankan ini dulu untuk memastikan koneksi OK)
  // testBasicOperations();
  
  // 2. Test koneksi saja
  // testCloudinaryConnection();
  
  // 3. Lihat daftar gambar
  // listAllCloudinaryImages(10);
  
  // 4. Test pencarian untuk satu tempat
  // testSearchSpecificPlace('Taman Pintar Yogyakarta', '85');
  
  // 5. Jalankan migrasi yang diperbaiki
  migrateFromCloudinaryFixed();
}