// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User"); // Import User model

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-that-should-be-long-and-random";

/**
 * @route   POST /api/auth/register
 * @desc    Mendaftarkan pengguna baru
 * @access  Public
 */
router.post(
  "/register",
  [
    check("email", "Mohon masukkan email yang valid").isEmail(),
    check("password", "Password minimal harus 6 karakter").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Cek apakah user sudah ada
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "Email sudah terdaftar" });
      }

      // Buat user baru
      user = new User({
        username: email.split('@')[0], // Generate username dari email
        email,
        password, // Password akan di-hash otomatis oleh pre-save hook
      });

      await user.save();

      // Buat JWT token
      const payload = { 
        user: { 
          id: user._id,
          email: user.email,
          username: user.username
        } 
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          }
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
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
    check("email", "Mohon masukkan email yang valid").isEmail(),
    check("password", "Password tidak boleh kosong").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Cari user berdasarkan email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Kredensial tidak valid" });
      }

      // Bandingkan password menggunakan method dari model
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Kredensial tidak valid" });
      }

      // Buat dan kembalikan token JWT
      const payload = { 
        user: { 
          id: user._id,
          email: user.email,
          username: user.username
        } 
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user._id,
            email: user.email,
            username: user.username
          }
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;