// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const JWT_SECRET = "your-super-secret-key-that-should-be-long-and-random";

let users = [];

/**
 * @route   POST /api/auth/register
 * @desc    Mendaftarkan pengguna baru
 * @access  Public
 */
router.post(
  "/register",
  [
    check("name", "Nama tidak boleh kosong").not().isEmpty(),
    check("email", "Mohon masukkan email yang valid").isEmail(),
    check("password", "Password minimal harus 6 karakter").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = users.find((user) => user.email === email);
      if (user) {
        return res.status(400).json({ msg: "Email sudah terdaftar" });
      }

      user = {
        id: users.length + 1, // simple id
        name,
        email,
        password,
      };

      // Enkripsi password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      users.push(user);
      console.log("Pengguna terdaftar:", users);

      const payload = { user: { id: user.id } };
      jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
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
      // Cek pengguna
      let user = users.find((user) => user.email === email);
      if (!user) {
        return res.status(400).json({ msg: "Kredensial tidak valid" });
      }

      // Bandingkan password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Kredensial tidak valid" });
      }

      // Buat dan kembalikan token JWT
      const payload = { user: { id: user.id } };
      jwt.sign(payload, JWT_SECRET, { expiresIn: "5h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
