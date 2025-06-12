const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // Impor middleware kita
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Path ke file CSV
const csvFilePath = path.join(
  __dirname,
  "..",
  "data",
  "tourism_data_final_for_inference.csv"
);
let destinations = [];

// Memuat data (sama seperti sebelumnya)
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    destinations.push({
      ...data,
      Place_Id: Number(data.Place_Id),
      Price: Number(data.Price),
      Rating: Number(data.Rating),
    });
  })
  .on("end", () => {
    console.log("✅ Data destinasi berhasil dimuat untuk rute.");
  });

/**
 * @route   GET /api/destinations
 * @desc    Mendapatkan semua destinasi
 * @access  Private (butuh autentikasi)
 */

router.get("/", authMiddleware, (req, res) => {
  console.log(`Pengguna dengan ID: ${req.user.id} mengakses data destinasi.`);
  res.json(destinations);
});

/**
 * @route   GET /api/destinations/:id
 * @desc    Mendapatkan destinasi berdasarkan ID
 * @access  Private (butuh autentikasi)
 */
// Lindungi juga rute ini
router.get("/:id", authMiddleware, (req, res) => {
  const destination = destinations.find((d) => d.Place_Id == req.params.id);
  if (destination) {
    res.json(destination);
  } else {
    res.status(404).json({ msg: "Destinasi tidak ditemukan" });
  }
});

module.exports = router;
