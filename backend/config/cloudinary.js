// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary dengan environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Generate URL gambar dengan transformasi dari Cloudinary
 * @param {string} publicId - Public ID dari gambar di Cloudinary
 * @param {Object} options - Opsi transformasi (width, height, crop, dll)
 * @returns {string} URL gambar yang sudah di-transform
 */
const generateImageUrl = (publicId, options = {}) => {
  if (!publicId) return null;
  
  const defaultOptions = {
    quality: 'auto',
    fetch_format: 'auto'
  };
  
  const transformOptions = { ...defaultOptions, ...options };
  
  return cloudinary.url(publicId, transformOptions);
};

/**
 * Generate thumbnail dengan ukuran standar
 * @param {string} publicId - Public ID dari gambar di Cloudinary
 * @param {number} width - Lebar thumbnail (default: 300)
 * @param {number} height - Tinggi thumbnail (default: 200)
 * @returns {string} URL thumbnail
 */
const generateThumbnail = (publicId, width = 300, height = 200) => {
  if (!publicId) return null;
  
  return generateImageUrl(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'center',
    quality: 'auto',
    fetch_format: 'auto'
  });
};

/**
 * Upload gambar ke Cloudinary
 * @param {string} imagePath - Path atau base64 string gambar
 * @param {Object} options - Opsi upload
 * @returns {Promise} Result dari upload
 */
const uploadImage = async (imagePath, options = {}) => {
  try {
    const defaultOptions = {
      folder: 'tourism-destinations',
      quality: 'auto',
      fetch_format: 'auto',
      unique_filename: true,
      overwrite: false
    };
    
    const uploadOptions = { ...defaultOptions, ...options };
    
    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);
    
    return {
      success: true,
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Hapus gambar dari Cloudinary
 * @param {string} publicId - Public ID gambar yang akan dihapus
 * @returns {Promise} Result dari penghapusan
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result: result.result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Generate multiple thumbnails dengan ukuran berbeda
 * @param {string} publicId - Public ID dari gambar
 * @returns {Object} Object berisi berbagai ukuran thumbnail
 */
const generateMultipleSizes = (publicId) => {
  if (!publicId) return {};
  
  return {
    thumbnail: generateThumbnail(publicId, 150, 150),
    small: generateThumbnail(publicId, 300, 200),
    medium: generateThumbnail(publicId, 600, 400),
    large: generateThumbnail(publicId, 1200, 800),
    original: generateImageUrl(publicId)
  };
};

/**
 * Fallback untuk URL gambar - gunakan placeholder jika tidak ada
 * @param {string} publicId - Public ID gambar
 * @param {number} width - Lebar placeholder
 * @param {number} height - Tinggi placeholder
 * @param {string} seed - Seed untuk placeholder random
 * @returns {string} URL gambar atau placeholder
 */
const getImageWithFallback = (publicId, width = 400, height = 300, seed = 'default') => {
  if (publicId) {
    return generateThumbnail(publicId, width, height);
  }
  // Fallback ke placeholder
  return `https://picsum.photos/${width}/${height}?random=${seed}`;
};

module.exports = {
  cloudinary,
  generateImageUrl,
  generateThumbnail,
  uploadImage,
  deleteImage,
  generateMultipleSizes,
  getImageWithFallback
};