const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// schema
const BarangSchema = new mongoose.Schema({
  nama: String,
  jumlah: Number,
  harga: Number,
  divisi: {
    type: String,
    default: "-"
  }
});

const Barang = mongoose.models.Barang || mongoose.model("Barang", BarangSchema);

module.exports = async (req, res) => {
  await connectDB();

  try {
    // GET
    if (req.method === "GET") {
      const data = await Barang.find();
      return res.json(data);
    }

    // POST
    if (req.method === "POST") {
      const barang = new Barang(req.body);
      await barang.save();
      return res.json({ message: "Barang ditambahkan" });
    }

    // DELETE
    if (req.method === "DELETE") {
      const id = req.query.id;
      await Barang.findByIdAndDelete(id);
      return res.json({ message: "Barang dihapus" });
    }

    // PUT
    if (req.method === "PUT") {
      const id = req.query.id;
      await Barang.findByIdAndUpdate(id, req.body);
      return res.json({ message: "Barang diupdate" });
    }

    res.status(405).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};