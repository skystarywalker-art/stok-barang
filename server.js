const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/stokbarang")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// SCHEMA
const BarangSchema = new mongoose.Schema({
  nama: String,
  jumlah: Number,
  harga: Number
});

const Barang = mongoose.model("Barang", BarangSchema);

// ROUTES

// GET semua barang
app.get("/barang", async (req, res) => {
  const data = await Barang.find();
  res.json(data);
});

// POST tambah barang
app.post("/barang", async (req, res) => {
  const { nama, jumlah, harga } = req.body;
  const barang = new Barang({ nama, jumlah, harga });
  await barang.save();
  res.json({ message: "Barang ditambahkan" });
});

// DELETE barang
app.delete("/barang/:id", async (req, res) => {
  await Barang.findByIdAndDelete(req.params.id);
  res.json({ message: "Barang dihapus" });
});

//UPDATE BARANG
app.put("/barang/:id", async (req,res) => {
    const { nama, jumlah, harga} = req.body;

    await Barang.findByIdAndUpdate(req.params.id, {
        nama,
        jumlah,
        harga
    });

    res.json({message:"Barang Diupdate"});
});

// SERVER
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});

// TES LOGIN ADMIN (FIX)
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "andraxx" && password === "BR2201") {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Login gagal" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});