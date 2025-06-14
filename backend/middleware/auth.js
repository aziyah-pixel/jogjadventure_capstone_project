// middleware/auth.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Validasi JWT_SECRET
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET not configured");
  process.exit(1);
}

/**
 * Middleware untuk verifikasi JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authMiddleware = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.header("Authorization");
    
    // Cek apakah token ada
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        msg: "Token akses tidak ditemukan, akses ditolak" 
      });
    }

    // Ekstrak token dari format "Bearer <token>"
    let token;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }

    // Cek apakah token kosong setelah ekstraksi
    if (!token || token.trim() === '') {
      return res.status(401).json({ 
        success: false,
        msg: "Token tidak valid, akses ditolak" 
      });
    }

    // Verifikasi token dengan options tambahan untuk keamanan
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'jogja-adventure',
      audience: 'jogja-adventure-users'
    });
    
    // Set user info ke request object
    req.user = decoded.user;
    
    // Lanjutkan ke middleware berikutnya
    next();

  } catch (err) {
    console.error("Token verification error:", {
      message: err.message,
      name: err.name,
      timestamp: new Date().toISOString()
    });

    // Handle berbagai jenis error JWT
    let errorMessage = "Token tidak valid";
    
    switch (err.name) {
      case 'TokenExpiredError':
        errorMessage = "Token telah kadaluarsa";
        break;
      case 'JsonWebTokenError':
        errorMessage = "Token tidak valid";
        break;
      case 'NotBeforeError':
        errorMessage = "Token belum aktif";
        break;
      default:
        errorMessage = "Token tidak valid";
    }

    return res.status(401).json({ 
      success: false,
      msg: errorMessage 
    });
  }
};

/**
 * Middleware opsional untuk verifikasi token (tidak wajib)
 * Berguna untuk endpoint yang bisa diakses dengan atau tanpa login
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader) {
    // Tidak ada token, lanjutkan tanpa user info
    req.user = null;
    return next();
  }

  try {
    let token;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }

    if (token && token.trim() !== '') {
      const decoded = jwt.verify(token, JWT_SECRET, {
        issuer: 'jogja-adventure',
        audience: 'jogja-adventure-users'
      });
      req.user = decoded.user;
    } else {
      req.user = null;
    }
  } catch (err) {
    // Jika token tidak valid, set user ke null tapi tetap lanjutkan
    req.user = null;
  }
  
  next();
};

/**
 * Middleware untuk admin only
 */
const adminAuth = (req, res, next) => {
  // Jalankan auth middleware dulu
  authMiddleware(req, res, () => {
    // Cek apakah user adalah admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ 
        success: false,
        msg: "Akses ditolak: Memerlukan hak admin" 
      });
    }
    next();
  });
};

module.exports = authMiddleware;
module.exports.optionalAuth = optionalAuth;
module.exports.adminAuth = adminAuth;