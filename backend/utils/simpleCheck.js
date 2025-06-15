// utils/simpleCheck.js
const mongoose = require('mongoose');
require('dotenv').config();

async function checkDestinations() {
  try {
    // Koneksi ke MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Dapatkan database
    const db = mongoose.connection.db;
    
    // List semua collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Available collections:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Cek collection destinations (atau variations)
    const possibleCollectionNames = ['destinations', 'destination', 'places', 'Destinations'];
    
    for (const collectionName of possibleCollectionNames) {
      try {
        const collection = db.collection(collectionName);
        const count = await collection.countDocuments();
        
        if (count > 0) {
          console.log(`\n🎯 Found data in collection: ${collectionName}`);
          console.log(`   Total documents: ${count}`);
          
          // Ambil sample data
          const samples = await collection.find({}).limit(3).toArray();
          console.log('\n📋 Sample documents:');
          
          samples.forEach((doc, index) => {
            console.log(`\n   ${index + 1}. Document structure:`);
            console.log(`      _id: ${doc._id}`);
            
            // Tampilkan semua field yang ada
            Object.keys(doc).forEach(key => {
              if (key !== '_id') {
                const value = doc[key];
                const type = Array.isArray(value) ? 'Array' : typeof value;
                const displayValue = type === 'string' && value.length > 50 
                  ? value.substring(0, 50) + '...' 
                  : value;
                console.log(`      ${key}: ${displayValue} (${type})`);
              }
            });
          });
          
          // Cek yang punya field images
          const withImages = await collection.countDocuments({ 
            images: { $exists: true, $ne: null, $not: { $size: 0 } } 
          });
          console.log(`\n📸 Documents with images: ${withImages}`);
          console.log(`📸 Documents without images: ${count - withImages}`);
          
          break; // Keluar dari loop jika sudah menemukan collection yang ada datanya
        }
      } catch (err) {
        // Collection tidak ada, lanjut ke yang berikutnya
        continue;
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Jalankan function
if (require.main === module) {
  checkDestinations();
}

module.exports = checkDestinations;