const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Artwork = require('../models/Artwork');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir); // Save files in the generic 'uploads/' directory
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // unique name
  }
});

const upload = multer({ storage: storage });

// POST endpoint: Upload a new artwork
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const newArtwork = new Artwork({
      title: req.body.title,
      description: req.body.description || '',
      imageUrl: '/uploads/' + req.file.filename,
      artist: req.body.artist || "Uploaded Artist",
      price: Number(req.body.price) || 0,
    });

    const savedArtwork = await newArtwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload artwork" });
  }
});

// GET endpoint: Fetch all artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ createdAt: -1 }); // newest first
    res.json(artworks);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// GET endpoint: Fetch single artwork by ID
router.get('/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });
    res.json(artwork);
  } catch (error) {
    console.error("Fetch single error:", error);
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
});

// PUT endpoint: Update artwork status (Approve/Reject)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      req.params.id, 
      { status: status }, 
      { new: true }
    );
    if (!updatedArtwork) return res.status(404).json({ error: "Artwork not found" });
    res.json(updatedArtwork);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update artwork status" });
  }
});

// DELETE endpoint: Admin can remove artworks
router.delete('/:id', async (req, res) => {
  try {
    const deletedArtwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!deletedArtwork) return res.status(404).json({ error: "Artwork not found" });
    res.json({ message: "Artwork deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete artwork" });
  }
});

module.exports = router;
