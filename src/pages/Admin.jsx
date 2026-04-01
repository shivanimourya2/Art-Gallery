import { useState, useEffect } from "react";
import axios from "axios";
import AdminNotifications from "../components/AdminNotifications";

function Admin() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/artworks");
      setArtworks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to completely remove this artwork?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/artworks/${id}`);
      setArtworks(artworks.filter((art) => art._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-overlay">
        <div className="admin-topbar">
          <h2>Admin Panel</h2>
          <div className="admin-actions">
            <button className="tab-btn active">Dashboard</button>
            <button className="tab-btn">Curator Decisions</button>
            <button className="tab-btn">Buy Requests</button>
            <div className="notification-wrapper">
              <AdminNotifications />
            </div>
          </div>
        </div>

        <div className="dashboard">
          <h1>Admin Dashboard</h1>
          <p>Manage gallery content and remove inappropriate artworks.</p>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map((art) => (
                <tr key={art._id}>
                  <td>{art.title}</td>
                  <td>{art.artist}</td>
                  <td>{art.status}</td>
                  <td>
                    <button className="danger" onClick={() => handleDelete(art._id)}>
                      Remove
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

export default Admin;
