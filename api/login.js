const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Data kosong" });
  }

  if (username === "andraxx" && password === "BR2201") {

    const token = jwt.sign(
      { username },
      SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token
    });
  }

  return res.json({ success: false });
};