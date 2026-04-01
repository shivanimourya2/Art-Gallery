import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace your existing fetchArtworks in Home.jsx with this:
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/artworks");

        // Filter out only approved artworks
        const approvedOnly = response.data.filter(art => art.status === "approved");
        setArtworks(approvedOnly);

      } catch (err) {
        console.error("Error fetching artworks:", err);
        setError("Failed to load artworks. Please check if the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="gallery">
      <div className="container">
        <h2>Featured Artworks</h2>

        {loading && <p>Loading artworks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && artworks.length === 0 && (
          <p>No artworks found. Be the first to upload one!</p>
        )}

        <div className="card-container">
          {artworks.map((art) => (
            <div className="card" key={art._id}>
              <img
                src={`http://localhost:5000${art.imageUrl}`}
                alt={art.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Artwork";
                }}
              />

              <div className="card-content">
                <h3>{art.title}</h3>
                <p>By {art.artist}</p>
                <p style={{ fontWeight: "bold", color: "#2c3e50" }}>₹{art.price}</p>
                
                <p style={{ fontSize: "14px", color: "#777", marginBottom: "10px", marginTop: "10px" }}>
                  {art.description?.substring(0, 80) || "No description provided."}...
                </p>

                <Link to={`/details/${art._id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;