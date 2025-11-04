import React, { useState, useEffect } from "react";
import "./Compte.css";
import DataFormPopup from "./Popup/DataFormPopup";
import PasswordFormPopup from "./Popup/PasswordFormPopup";

const Compte = () => {
  const [activeTab, setActiveTab] = useState("infos");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL;

  // 🔹 Charger l'utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🔹 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMessage("👋 Déconnexion réussie !");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  // 🔹 Suppression du compte
  const handleDeleteAccount = async () => {
    if (!user || !user.id) {
      setMessage("Utilisateur introuvable.");
      return;
    }

    if (!window.confirm("Confirmer la suppression de votre compte ?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/auth/${user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression du compte.");

      localStorage.removeItem("user");
      setMessage("✅ Compte supprimé avec succès !");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error("❌ Erreur suppression :", err);
      setMessage(err.message || "Erreur serveur ❌");
    }

    setShowDeleteModal(false);
  };

  // 🔹 Callback quand les infos sont mises à jour
  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    setMessage("✅ Profil mis à jour !");
  };

  if (!user) {
    return (
      <div className="mon-compte-container">
        <p className="loading-text">
          Chargement de votre profil... (connectez-vous si ce n’est pas fait)
        </p>
      </div>
    );
  }

  return (
    <div className="mon-compte-container">
      <div className="compte-background">
        {/* === Colonne gauche === */}
        <div className="compte-left">
          <div className="user-names">
            <span className="user-fullname">{user.username}</span>
          </div>

          <div className="intro-texte">
            Bienvenue sur votre espace personnel, {user.username}. Gérez vos
            informations et vos paramètres ici.
          </div>

          {/* --- Onglets verticaux --- */}
          <div className="compte-tabs-vertical">
            <button
              className={`tab-left-btn ${
                activeTab === "infos" ? "active" : ""
              }`}
              onClick={() => setActiveTab("infos")}
            >
              🧾 Mes informations
            </button>
            <button
              className={`tab-left-btn ${
                activeTab === "securite" ? "active" : ""
              }`}
              onClick={() => setActiveTab("securite")}
            >
              🔐 Sécurité
            </button>
            <button
              className={`tab-left-btn ${activeTab === "avis" ? "active" : ""}`}
              onClick={() => setActiveTab("avis")}
            >
              💬 Avis laissés
            </button>
          </div>

          {/* --- Boutons bas --- */}
          <div className="account-actions">
            <button className="logout-account-btn" onClick={handleLogout}>
              🚪 Se déconnecter
            </button>
            <button
              className="delete-account-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              🗑️ Supprimer mon compte
            </button>
          </div>
        </div>

        {/* === Colonne droite === */}
        <div className="compte-right">
          {activeTab === "infos" && (
            <div className="tab-section">
              <h2>Mes informations personnelles</h2>
              <ul>
                <li>Pseudo : {user.username}</li>
                <li>Email : {user.email}</li>
              </ul>
              <button
                className="edit-info-btn"
                onClick={() => setShowEditPopup(true)}
              >
                ✏️ Modifier mes informations
              </button>
            </div>
          )}

          {activeTab === "securite" && (
            <div className="tab-section">
              <h2>Paramètres de sécurité</h2>
              <p>Modifiez votre mot de passe ici :</p>
              <button
                className="comment-button"
                onClick={() => setShowPasswordPopup(true)}
              >
                🔑 Changer mon mot de passe
              </button>
            </div>
          )}

          {activeTab === "avis" && (
            <div className="tab-section">
              <h2>Vos avis laissés</h2>
              <p>
                Vous avez laissé 2 avis sur nos produits. Merci pour votre
                retour 💚
              </p>
              <button className="comment-button">Voir les avis laissés</button>
            </div>
          )}
        </div>
      </div>

      {/* === Modal suppression compte === */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>🗑️ Supprimer mon compte</h3>
            <p>
              Êtes-vous sûr de vouloir supprimer votre compte ?{" "}
              <strong>Cette action est irréversible.</strong>
            </p>
            <div className="delete-modal-buttons">
              <button
                className="cancel-delete-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                className="confirm-delete-btn"
                onClick={handleDeleteAccount}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Popup modification infos === */}
      {showEditPopup && (
        <DataFormPopup
          user={user}
          onClose={() => setShowEditPopup(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}

      {/* === Popup changement de mot de passe === */}
      {showPasswordPopup && (
        <PasswordFormPopup onClose={() => setShowPasswordPopup(false)} />
      )}

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default Compte;
