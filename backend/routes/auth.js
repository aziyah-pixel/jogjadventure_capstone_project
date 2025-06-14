// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// JWT Configuration dengan fallback yang lebih aman
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

// Debug untuk memastikan environment variables terbaca
console.log('🔐 JWT Configuration:');
console.log('- JWT_SECRET loaded:', !!JWT_SECRET);
console.log('- JWT_REFRESH_SECRET loaded:', !!JWT_REFRESH_SECRET);
console.log('- JWT_EXPIRES_IN:', JWT_EXPIRES_IN);
console.log('- JWT_REFRESH_EXPIRES_IN:', JWT_REFRESH_EXPIRES_IN);

// Validasi environment variables dengan pesan yang lebih jelas
if (!JWT_SECRET) {
  console.error("❌ FATAL: JWT_SECRET not found in environment variables");
  console.error("Please check your .env file contains JWT_SECRET=your_secret_here");
  process.exit(1);
}

if (!JWT_REFRESH_SECRET) {
  console.error("❌ FATAL: JWT_REFRESH_SECRET not found in environment variables");
  console.error("Please check your .env file contains JWT_REFRESH_SECRET=your_secret_here");
  process.exit(1);
}

/**
 * Utility function untuk generate tokens
 */
const generateTokens = (user) => {
  const payload = {
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      // Tambah timestamp untuk invalidasi manual jika diperlukan
      iat: Math.floor(Date.now() / 1000)
    }
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'jogja-adventure',
    audience: 'jogja-adventure-users'
  });

  const refreshToken = jwt.sign(
    { user: { id: user._id } }, 
    JWT_REFRESH_SECRET, 
    { 
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'jogja-adventure',
      audience: 'jogja-adventure-users'
    }
  );

  return { accessToken, refreshToken };
};

/**
 * @route   POST /api/auth/register
 * @desc    Mendaftarkan pengguna baru
 * @access  Public
 */
router.post(
  "/register",
  [
    check("email", "Mohon masukkan email yang valid").isEmail().normalizeEmail(),
    check("password", "Password minimal harus 8 karakter dan mengandung huruf besar, kecil, dan angka")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    check("username", "Username minimal 3 karakter").optional().isLength({ min: 3 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { email, password, username } = req.body;

      // Cek apakah user sudah ada
      const existingUser = await User.findOne({ 
        $or: [
          { email: email.toLowerCase() },
          { username: username || email.split('@')[0] }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          msg: "Email atau username sudah terdaftar" 
        });
      }

      // Buat user baru
      const user = new User({
        username: username || email.split('@')[0],
        email: email.toLowerCase(),
        password, // Password akan di-hash otomatis oleh pre-save hook
      });

      await user.save();

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user);

      // Set refresh token sebagai httpOnly cookie (lebih aman)
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
      });

      res.status(201).json({ 
        success: true,
        message: "Registrasi berhasil",
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt
        }
      });

    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ 
        success: false,
        msg: "Terjadi kesalahan server" 
      });
    }
  }
);

/**
 * @route   POST /api/auth/login
 * @desc    Login pengguna & mendapatkan token
 * @access  Public
 */
router.post(
  "/login",
  [
    check("email", "Mohon masukkan email yang valid").isEmail().normalizeEmail(),
    check("password", "Password tidak boleh kosong").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const { email, password } = req.body;

      // Cari user berdasarkan email
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({ 
          success: false,
          msg: "Kredensial tidak valid" 
        });
      }

      // Bandingkan password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          success: false,
          msg: "Kredensial tidak valid" 
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user);

      // Set refresh token sebagai httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
      });

      res.json({ 
        success: true,
        message: "Login berhasil",
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          lastLogin: user.lastLogin
        }
      });

    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ 
        success: false,
        msg: "Terjadi kesalahan server" 
      });
    }
  }
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token menggunakan refresh token
 * @access  Private (dengan refresh token)
 */
router.post("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        success: false,
        msg: "Refresh token tidak ditemukan" 
      });
    }

    // Verifikasi refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    // Cari user
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        msg: "User tidak ditemukan" 
      });
    }

    // Generate access token baru
    const { accessToken } = generateTokens(user);

    res.json({ 
      success: true,
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(401).json({ 
      success: false,
      msg: "Refresh token tidak valid" 
    });
  }
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user dan hapus refresh token
 * @access  Private
 */
router.post("/logout", (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ 
    success: true,
    message: "Logout berhasil" 
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Mendapatkan data user yang sedang login
 * @access  Private
 */
router.get("/me", require("../middleware/auth"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ 
      success: false,
      msg: "Terjadi kesalahan server" 
    });
  }
});

module.exports = router;