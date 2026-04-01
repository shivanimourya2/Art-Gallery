import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artworks/${id}`);
        setArt(response.data);
      } catch (err) {
        console.error("Failed to load artwork", err);
        setError("Artwork not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);

  if (loading) return <h2 style={{ padding: "40px", textAlign: "center" }}>Loading artwork details...</h2>;
  if (error || !art) return <h2 style={{ padding: "40px", textAlign: "center" }}>{error || "Artwork not found"}</h2>;

  return (
    <div className="container" style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      <div style={{
        display: "flex", 
        flexDirection: "row", 
        gap: "40px", 
        alignItems: "flex-start",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        maxWidth: "900px",
        width: "100%",
        flexWrap: "wrap"
      }}>

        <img
          src={`http://localhost:5000${art.imageUrl}`}
          alt={art.title}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            flexShrink: 0
          }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Artwork"; }}
        />

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#333" }}>{art.title}</h1>
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem", fontStyle: "italic", marginBottom: "20px" }}>
            By {art.artist}
          </p>

          {art.price > 0 ? (
            <h2 style={{ color: "#27ae60", fontSize: "1.8rem", marginBottom: "20px" }}>
              ₹{art.price.toLocaleString()}
            </h2>
          ) : (
            <h2 style={{ color: "#27ae60", fontSize: "1.8rem", marginBottom: "20px" }}>
              Price Not Available
            </h2>
          )}

          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
            <h4 style={{ marginBottom: "10px", color: "#2c3e50" }}>Description</h4>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              {art.description || "This artwork represents traditional heritage and storytelling. No additional description was provided by the artist."}
            </p>
          </div>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#2980b9",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "bold",
                flex: 1
              }}
              onClick={() => alert(`Proceeding to purchase '${art.title}' for ₹${art.price}...`)}
            >
              Buy Now
            </button>

            <button
              style={{
                background: "transparent",
                color: "#2980b9",
                border: "2px solid #2980b9",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "bold",
                flex: 1
              }}
              onClick={() => alert(`Contacting artist: ${art.artist}...`)}
            >
              Contact Artist
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Details;