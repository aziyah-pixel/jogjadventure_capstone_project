// middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-that-should-be-long-and-random";

module.exports = function (req, res, next) {
  // Ambil token dari header
  const token = req.header("Authorization");

  // Cek apakah token ada
  if (!token) {
    return res.status(401).json({ msg: "Tidak ada token, akses ditolak" });
  }

  try {
    // Ekstrak token dari format "Bearer <token>"
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    
    // Verifikasi token
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    
    // Set user info ke request object
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token tidak valid" });
  }
};