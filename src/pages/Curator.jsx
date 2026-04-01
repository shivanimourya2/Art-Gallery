import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GalleryContext } from "../Context/Gallerycontext";

function Curator() {
  const [artworks, setArtworks] = useState([]);
  const { curatorApprove } = useContext(GalleryContext);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/artworks");
      setArtworks(response.data);
    } catch (error) {
      console.error("Failed to fetch artworks:", error);
    }
  };

  const handleReview = async (id, decision) => {
    try {
      // 1. Send update to Backend MongoDB
      await axios.put(`http://localhost:5000/api/artworks/${id}`, { status: decision });

      // 2. Quickly update matching table row in UI instantly
      setArtworks((prev) =>
        prev.map((art) => art._id === id ? { ...art, status: decision } : art)
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error saving review");
    }
  };

  return (
    <div className="curator-page">
      <div className="curator-overlay">
        <div className="dashboard">
          <h1>Curator Panel</h1>
          <p>Review and approve artworks for exhibition.</p>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((art) => (
                <tr key={art._id}>
                  <td>{art.title}</td>
                  <td>{art.artist}</td>
                  <td style={{ fontWeight: 'bold' }}>{art.status}</td>
                  <td>
                    <button onClick={() => {
                      handleReview(art._id, "approved");
                      curatorApprove(art); // Keeping existing context pattern
                    }}>
                      Approve
                    </button>
                    <button
                      className="danger"
                      onClick={() => handleReview(art._id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Curator;
