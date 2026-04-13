const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// ================== CONNECT MONGODB ATLAS ==================
mongoose.connect("mongodb://andraxx:BR2201@ac-muhen9m-shard-00-00.24ebqdt.mongodb.net:27017,ac-muhen9m-shard-00-01.24ebqdt.mongodb.net:27017,ac-muhen9m-shard-00-02.24ebqdt.mongodb.net:27017/?ssl=true&replicaSet=atlas-ghnhtj-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("ERROR MONGO:", err));


// ================== SCHEMA ==================
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


// ================== ROUTES ==================

// ✅ GET semua barang
app.get("/barang", async (req, res) => {
  const data = await Barang.find();
  res.json(data);
});


// ✅ POST tambah barang
app.post("/barang", async (req, res) => {
  const { nama, jumlah, harga, divisi } = req.body;

  const barang = new Barang({
    nama,
    jumlah,
    harga,
    divisi
  });

  await barang.save();
  res.json({ message: "Barang ditambahkan" });
});


// ✅ DELETE barang
app.delete("/barang/:id", async (req, res) => {
  await Barang.findByIdAndDelete(req.params.id);
  res.json({ message: "Barang dihapus" });
});


// ✅ UPDATE barang
app.put("/barang/:id", async (req, res) => {
  const { nama, jumlah, harga, divisi } = req.body;

  await Barang.findByIdAndUpdate(req.params.id, {
    nama,
    jumlah,
    harga,
    divisi
  });

  res.json({ message: "Barang diupdate" });
});


// ================== LOGIN ADMIN ==================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "andraxx" && password === "BR2201") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});


// ================== SERVER ==================
app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});