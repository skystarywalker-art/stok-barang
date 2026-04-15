module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { username, password } = req.body;

  if (username === "andraxx" && password === "BR2201") {
    return res.json({ success: true });
  }

  return res.json({ success: false });
};