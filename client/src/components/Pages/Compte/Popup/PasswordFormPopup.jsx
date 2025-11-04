import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./PasswordFormPopup.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PasswordFormPopup = ({ onClose }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (formData.newPassword !== formData.confirmNewPassword) {
      setError(
        "Le nouveau mot de passe et sa confirmation ne correspondent pas."
      );
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/auth/password`, {
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

      const data = await response.json();

      if (!response.ok) throw new Error(data.msg || "Erreur serveur");

      setMessage(data.msg || "Mot de passe mis à jour avec succès !");
      setError("");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe :", err);
      setError(err.message || "Erreur lors du changement de mot de passe.");
      setMessage("");
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
                  aria-label="toggle password visibility"
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

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
                  aria-label="toggle password visibility"
                >
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPassword">
              Confirmer le nouveau mot de passe :
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
                  aria-label="toggle password visibility"
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            </div>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

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
