// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // Mengizinkan cross-origin requests
app.use(express.json({ extended: false })); // Mem-parsing body request sebagai JSON

app.use("/api/auth", require("./routes/auth"));

app.use("/api/destinations", require("./routes/destinations"));

// Welcome route
app.get("/", (req, res) => {
  res.send("Selamat datang di Jogjadventure API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`)
);