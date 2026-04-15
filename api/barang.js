const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// ROOT TEST
app.get("/", (req, res) => {
  res.send("API StokApp jalan bang!");
});

// CONNECT MONGO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("ERROR MONGO:", err));

// SCHEMA
const BarangSchema = new mongoose.Schema({
  nama: String,
  jumlah: Number,
  harga: Number,
  divisi: {
    type: String,
    default: "-"
  }
});

const Barang = mongoose.model("Barang", BarangSchema);

// ================= ROUTES =================

// ⚠️ PENTING: TANPA /api

app.get("/barang", async (req, res) => {
  const data = await Barang.find();
  res.json(data);
});

app.post("/barang", async (req, res) => {
  const { nama, jumlah, harga, divisi } = req.body;

  const barang = new Barang({ nama, jumlah, harga, divisi });
  await barang.save();

  res.json({ message: "Barang ditambahkan" });
});

app.delete("/barang/:id", async (req, res) => {
  await Barang.findByIdAndDelete(req.params.id);
  res.json({ message: "Barang dihapus" });
});

app.put("/barang/:id", async (req, res) => {
  const { nama, jumlah, harga, divisi } = req.body;

  await Barang.findByIdAndUpdate(req.params.id, {
    nama, jumlah, harga, divisi
  });

  res.json({ message: "Barang diupdate" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "andraxx" && password === "BR2201") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = (req, res) => {
    return app(req, res);
};