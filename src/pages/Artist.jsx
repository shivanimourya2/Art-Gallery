import { useState, useEffect } from "react";
import axios from "axios";

function Artist() {
  const [artistName, setArtistName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Stores the specific artworks uploaded by this artist
  const [myArtworks, setMyArtworks] = useState([]);

  // Fetch only this artist's artworks
  const fetchMyArtworks = async () => {
    if (!artistName) return;
    try {
      const response = await axios.get("http://localhost:5000/api/artworks");
      const filtered = response.data.filter(art => art.artist === artistName);
      setMyArtworks(filtered);
    } catch (error) {
      console.error("Failed to fetch artworks", error);
    }
  };

  useEffect(() => {
    fetchMyArtworks();
  }, [artistName]); // Updates list anytime they finish typing their name

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!title || !file || !artistName || !price) {
      alert("Please enter your name, a title, a price, and select an image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);
    formData.append("artist", artistName); // Replaced hardcoded string
    formData.append("price", price);

    try {
      await axios.post("http://localhost:5000/api/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Artwork uploaded successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setFile(null);
      setImagePreview(null);
      document.getElementById('file-input').value = "";

      // Update profile list after successful upload
      fetchMyArtworks();
    } catch (error) {
      alert("Failed to upload artwork. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="artist-page">
      <div className="artist-overlay" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="artist-box">
          <h2>Upload New Artwork</h2>

          <input
            type="text"
            placeholder="Your Artist Name (required)"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Artwork Title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price in ₹ (required)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            placeholder="Artwork Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
          />

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "15px" }}
          />

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload Artwork"}
          </button>

          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }} />
          )}
        </div>

        {/* Basic Artist Profile Area */}
        {myArtworks.length > 0 && (
          <div className="artist-box">
            <h3>Your Uploaded Artworks</h3>
            <ul style={{ textAlign: "left" }}>
              {myArtworks.map(art => (
                <li key={art._id} style={{ marginBottom: "10px" }}>
                  <strong>{art.title}</strong> - Status:
                  <span style={{ color: art.status === "approved" ? "green" : art.status === "rejected" ? "red" : "orange", marginLeft: "5px" }}>
                    {art.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default Artist;
