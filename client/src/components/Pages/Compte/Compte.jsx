import React, { useState } from "react";
import "./Compte.css";

const Compte = () => {
  const [activeTab, setActiveTab] = useState("infos");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fakeUser = {
    prenom: "Adrien",
    nom: "Alvarez",
    email: "adrien@example.com",
    adresse: {
      rue: "123 Rue des Fleurs",
      ville: "Bruxelles",
      codePostal: "1000",
      pays: "Belgique",
    },
  };

  const handleDeleteAccount = () => {
    alert("Suppression fictive : votre compte serait supprimé.");
    setShowDeleteModal(false);
  };

  return (
    <div className="mon-compte-container">
      <div className="compte-background">
        {/* === Colonne gauche === */}
        <div className="compte-left">
          <div className="user-names">
            <span className="user-fullname">
              {fakeUser.prenom} {fakeUser.nom}
            </span>
          </div>

          <div className="intro-texte">
            Bienvenue sur votre espace personnel. Gérez vos informations et vos
            paramètres ici.
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
                activeTab === "adresse" ? "active" : ""
              }`}
              onClick={() => setActiveTab("adresse")}
            >
              📦 Adresse de livraison
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

          {/* --- Bouton supprimer compte --- */}
          <button
            className="delete-account-btn"
            onClick={() => setShowDeleteModal(true)}
          >
            Supprimer mon compte
          </button>
        </div>

        {/* === Colonne droite (contenu dynamique) === */}
        <div className="compte-right">
          {activeTab === "infos" && (
            <div className="tab-section">
              <h2>Mes informations personnelles</h2>
              <ul>
                <li>Nom : {fakeUser.nom}</li>
                <li>Prénom : {fakeUser.prenom}</li>
                <li>Email : {fakeUser.email}</li>
              </ul>
            </div>
          )}

          {activeTab === "adresse" && (
            <div className="tab-section">
              <h2>Adresse de livraison</h2>
              <ul>
                <li>Rue : {fakeUser.adresse.rue}</li>
                <li>Ville : {fakeUser.adresse.ville}</li>
                <li>Code postal : {fakeUser.adresse.codePostal}</li>
                <li>Pays : {fakeUser.adresse.pays}</li>
              </ul>
            </div>
          )}

          {activeTab === "securite" && (
            <div className="tab-section">
              <h2>Paramètres de sécurité</h2>
              <ul>
                <li>Modifier votre mot de passe</li>
                <li>Activer la double authentification (prochainement)</li>
              </ul>
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
              Êtes-vous sûr de vouloir supprimer votre compte ?
              <strong> Cette action est irréversible.</strong>
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
    </div>
  );
};

export default Compte;
