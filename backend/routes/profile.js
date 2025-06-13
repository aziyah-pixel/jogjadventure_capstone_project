// routes/profile.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User"); // Import User model
const auth = require("../middleware/auth"); // Import auth middleware

/**
 * @route   GET /api/profile
 * @desc    Mendapatkan data profile user
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * @route   POST /api/profile/verify-password
 * @desc    Verifikasi password saat ini
 * @access  Private
 */
router.post("/verify-password", auth, async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Password diperlukan" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Verifikasi password menggunakan method dari model
    const isMatch = await user.comparePassword(password);

    res.json({
      success: true,
      isValid: isMatch
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/**
 * @route   PUT /api/profile/update-password
 * @desc    Update password user
 * @access  Private
 */
router.put(
  "/update-password",
  [
    auth,
    check("newPassword", "Password minimal harus 6 karakter").isLength({ min: 6 }),
    check("newPassword", "Password harus mengandung huruf besar").matches(/[A-Z]/),
    check("newPassword", "Password harus mengandung huruf kecil").matches(/[a-z]/),
    check("newPassword", "Password harus mengandung angka").matches(/[0-9]/),
    check("newPassword", "Password harus mengandung karakter khusus").matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { newPassword } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      // Update password (akan di-hash otomatis oleh pre-save hook)
      user.password = newPassword;
      user.updatedAt = new Date();
      await user.save();

      res.json({
        success: true,
        msg: "Password berhasil diperbarui"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ 
        success: false,
        msg: "Server error" 
      });
    }
  }
);

/**
 * @route   PUT /api/profile/update-profile
 * @desc    Update data profile user (username & email)
 * @access  Private
 */
router.put(
  "/update-profile",
  [
    auth,
    check("email", "Mohon masukkan email yang valid").isEmail(),
    check("username", "Username minimal harus 3 karakter").isLength({ min: 3 }),
    check("username", "Username hanya boleh mengandung huruf, angka, dan underscore").matches(/^[a-zA-Z0-9_]+$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { username, email } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      // Cek apakah email sudah digunakan user lain
      if (email !== user.email) {
        const existingEmailUser = await User.findOne({ 
          email, 
          _id: { $ne: req.user.id } 
        });
        if (existingEmailUser) {
          return res.status(400).json({ 
            success: false,
            msg: "Email sudah digunakan oleh user lain" 
          });
        }
      }

      // Cek apakah username sudah digunakan user lain
      if (username !== user.username) {
        const existingUsernameUser = await User.findOne({ 
          username, 
          _id: { $ne: req.user.id } 
        });
        if (existingUsernameUser) {
          return res.status(400).json({ 
            success: false,
            msg: "Username sudah digunakan oleh user lain" 
          });
        }
      }

      // Update data profile
      user.username = username;
      user.email = email;
      user.updatedAt = new Date();
      await user.save();

      res.json({
        success: true,
        msg: "Profile berhasil diperbarui",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          updatedAt: user.updatedAt
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ 
        success: false,
        msg: "Server error" 
      });
    }
  }
);

/**
 * @route   DELETE /api/profile/delete-account
 * @desc    Hapus akun user
 * @access  Private
 */
router.delete("/delete-account", auth, async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Password diperlukan untuk menghapus akun" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Verifikasi password sebelum menghapus akun
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password tidak valid" });
    }

    // Hapus user dari database
    await User.findByIdAndDelete(req.user.id);

    res.json({
      success: true,
      msg: "Akun berhasil dihapus"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      msg: "Server error" 
    });
  }
});

module.exports = router;