const mongoose = require('mongoose');
const Destination = require('../models/Destination');
const { cloudinary } = require('../config/cloudinary');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function untuk upload image ke Cloudinary dari URL
const uploadImageToCloudinary = async (imageUrl, folder = 'destinations') => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    return {
      public_id: result.public_id,
      url: result.secure_url
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

// Migration script
const migrateDestinationsToCloudinary = async () => {
  try {
    console.log('Starting migration to Cloudinary...');
    
    const destinations = await Destination.find({
      $and: [
        { images: { $exists: true, $ne: [] } },
        { main_image: { $exists: false } }
      ]
    });

    console.log(`Found ${destinations.length} destinations to migrate`);

    for (let i = 0; i < destinations.length; i++) {
      const dest = destinations[i];
      console.log(`Migrating ${i + 1}/${destinations.length}: ${dest.place_name}`);
      
      try {
        // Upload main image
        if (dest.images && dest.images.length > 0) {
          const mainImageResult = await uploadImageToCloudinary(
            dest.images[0], 
            `destinations/${dest.city.toLowerCase()}`
          );
          
          if (mainImageResult) {
            dest.main_image = {
              public_id: mainImageResult.public_id,
              url: mainImageResult.url,
              alt_text: dest.place_name
            };
          }
        }
        
        // Upload gallery images
        if (dest.images && dest.images.length > 1) {
          const galleryResults = [];
          
          for (let j = 1; j < Math.min(dest.images.length, 6); j++) { // Max 5 additional images
            const galleryResult = await uploadImageToCloudinary(
              dest.images[j], 
              `destinations/${dest.city.toLowerCase()}/gallery`
            );
            
            if (galleryResult) {
              galleryResults.push({
                public_id: galleryResult.public_id,
                url: galleryResult.url,
                alt_text: `${dest.place_name} - Gallery ${j}`,
                order: j - 1
              });
            }
            
            // Add delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          dest.gallery_images = galleryResults;
        }
        
        await dest.save();
        console.log(`✅ Migrated: ${dest.place_name}`);
        
      } catch (error) {
        console.error(`❌ Error migrating ${dest.place_name}:`, error);
      }
    }
    
    console.log('Migration completed!');
    process.exit(0);
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
if (require.main === module) {
  migrateDestinationsToCloudinary();
}

module.exports = { migrateDestinationsToCloudinary, uploadImageToCloudinary };