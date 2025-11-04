import React, { useState, useContext } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../../../../../context/AuthContext";
import "./PasswordFormPopup.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://food-jllh.onrender.com";

const PasswordFormPopup = ({ onClose }) => {
  const { token, logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // 🔹 Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Toggle visibilité
  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 🔹 Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Les deux nouveaux mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      if (!token) {
        setError("Vous devez être connecté pour changer votre mot de passe.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_URL}/api/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        logout();
        throw new Error("Session expirée. Veuillez vous reconnecter.");
      }

      if (!res.ok) throw new Error(data.msg || "Erreur serveur.");

      setMessage("✅ Mot de passe mis à jour avec succès !");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error("❌ Erreur changement mot de passe :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <div className="popup-header">
          <h3>Modifier mon mot de passe</h3>
          <button className="close-popup-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="popup-form">
          {/* Mot de passe actuel */}
          <div className="form-group">
            <label htmlFor="currentPassword">Mot de passe actuel :</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.current ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword("current")}
                  edge="end"
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe :</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.new ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword("new")}
                  edge="end"
                >
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

          {/* Confirmation */}
          <div className="form-group">
            <label htmlFor="confirmNewPassword">
              Confirmer le mot de passe :
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword.confirm ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                required
              />
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleShowPassword("confirm")}
                  edge="end"
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

          {/* Messages */}
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          {/* Bouton */}
          <div className="popup-footer">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Mise à jour..." : "Changer le mot de passe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordFormPopup;
