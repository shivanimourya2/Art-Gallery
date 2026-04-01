const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  artist: { type: String, required: true, default: "Unknown Artist" },
  status: { type: String, default: "pending" },
  price: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Artwork', artworkSchema);
