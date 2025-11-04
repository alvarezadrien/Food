import React, { useState } from "react";
import "./DataFormPopup.css";

const DataFormPopup = ({ onClose, user, onUpdateSuccess }) => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    id: user.id, // ✅ Envoie l'ID du user connecté
    username: user.username || "",
    email: user.email || "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur de mise à jour.");

      // ✅ Met à jour localStorage + UI
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("✅ Informations mises à jour avec succès !");
      setTimeout(() => {
        onUpdateSuccess(updatedUser);
        onClose();
      }, 1000);
    } catch (err) {
      console.error("❌ Erreur API :", err);
      setError(err.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <div className="popup-header">
          <h3>Modifier mes informations</h3>
          <button className="close-popup-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-group">
            <label htmlFor="username">Pseudo :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="popup-footer">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Mise à jour..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataFormPopup;
