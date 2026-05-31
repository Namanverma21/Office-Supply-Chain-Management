const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get } = require("../database");
const { JWT_SECRET } = require("../middleware");

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = get("SELECT * FROM users WHERE username = ?", [username.trim()]);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});

module.exports = router;
