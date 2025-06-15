// utils/importCSV.js
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

// Schema untuk destination
const destinationSchema = new mongoose.Schema({
  Place_Id: { type: String, required: true, unique: true },
  Place_Name: { type: String, required: true },
  Description: { type: String },
  Category: { type: String },
  Price: { type: Number },
  Rating: { type: Number },
  Coordinate: { type: String },
  Latitude: { type: Number },
  Longitude: { type: Number },
  Address: { type: String },
  City: { type: String },
  Price_Grouped: { type: String },
  Content_Text: { type: String },
  Google_Maps_Link: { type: String },
  images: [{
    url: { type: String },
    cloudinary_id: { type: String },
    alt: { type: String },
    is_primary: { type: Boolean, default: false },
    width: { type: Number },
    height: { type: Number },
    format: { type: String }
  }]
}, {
  timestamps: true
});

async function importCSV(csvFilePath) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Hapus model jika sudah ada untuk menghindari conflict
    if (mongoose.models.Destination) {
      delete mongoose.models.Destination;
    }
    
    const Destination = mongoose.model('Destination', destinationSchema);
    
    // Hapus data lama (optional)
    const existingCount = await Destination.countDocuments();
    if (existingCount > 0) {
      console.log(`Found ${existingCount} existing destinations`);
      const answer = await askQuestion('Do you want to delete existing data? (y/n): ');
      if (answer.toLowerCase() === 'y') {
        await Destination.deleteMany({});
        console.log('🗑️ Deleted existing data');
      }
    }
    
    // Baca dan import CSV
    const destinations = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
          // Bersihkan dan konversi data
          const destination = {
            Place_Id: data.Place_Id?.trim(),
            Place_Name: data.Place_Name?.trim(),
            Description: data.Description?.trim(),
            Category: data.Category?.trim(),
            Price: data.Price ? parseFloat(data.Price) : 0,
            Rating: data.Rating ? parseFloat(data.Rating) : 0,
            Coordinate: data.Coordinate?.trim(),
            Latitude: data.Latitude ? parseFloat(data.Latitude) : 0,
            Longitude: data.Longitude ? parseFloat(data.Longitude) : 0,
            Address: data.Address?.trim(),
            City: data.City?.trim(),
            Price_Grouped: data.Price_Grouped?.trim(),
            Content_Text: data.Content_Text?.trim(),
            Google_Maps_Link: data.Google_Maps_Link?.trim(),
            images: [] // Akan diisi nanti oleh migration script
          };
          
          destinations.push(destination);
        })
        .on('end', async () => {
          try {
            console.log(`📝 Parsed ${destinations.length} destinations from CSV`);
            
            // Insert ke database
            if (destinations.length > 0) {
              await Destination.insertMany(destinations);
              console.log(`✅ Successfully imported ${destinations.length} destinations`);
              
              // Tampilkan sample
              console.log('\n📋 Sample imported data:');
              destinations.slice(0, 3).forEach((dest, index) => {
                console.log(`${index + 1}. ${dest.Place_Id}: ${dest.Place_Name}`);
                console.log(`   Category: ${dest.Category}`);
                console.log(`   City: ${dest.City}`);
                console.log(`   Price: ${dest.Price}`);
                console.log('---');
              });
            }
            
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
    
  } catch (error) {
    console.error('❌ Import error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  }
}

function askQuestion(query) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => readline.question(query, ans => {
    readline.close();
    resolve(ans);
  }));
}

// Penggunaan
if (require.main === module) {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.log('Usage: node utils/importCSV.js <path-to-csv-file>');
    console.log('Example: node utils/importCSV.js data/destinations.csv');
    process.exit(1);
  }
  
  if (!fs.existsSync(csvPath)) {
    console.log(`❌ File not found: ${csvPath}`);
    process.exit(1);
  }
  
  importCSV(csvPath);
}

module.exports = importCSV;