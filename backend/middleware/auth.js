const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-super-secret-key-that-should-be-long-and-random";

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Akses ditolak. Tidak ada token otorisasi." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token tidak valid." });
  }
};
