import React, { useState } from "react";
import "./BetaWidget.css";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const BetaWidget = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      {/* Bouton flottant minimal */}
      <div className="beta-badge" onClick={() => setShowPopup(true)}>
        <FaInfoCircle className="beta-badge-icon" />
        <span className="beta-badge-text">Bêta</span>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="beta-popup-overlay" onClick={() => setShowPopup(false)}>
          <div
            className="beta-popup"
            onClick={(e) => e.stopPropagation()} // empêche la fermeture en cliquant à l'intérieur
          >
            <h3>Version Bêta 🚀</h3>
            <p>
              Ce site est actuellement en{" "}
              <strong>phase de développement</strong>. Certaines fonctionnalités
              peuvent être incomplètes ou en cours d'amélioration.
            </p>
            <p>
              💡 Nous serions ravis d’avoir votre avis ! Partagez vos{" "}
              <strong>suggestions</strong>, <strong>critiques</strong> ou{" "}
              <strong>idées d’amélioration</strong> via notre formulaire.
            </p>
            <Link to="/contact" className="beta-link">
              Donner mon avis
            </Link>
            <span className="beta-version">v0.9 BÊTA</span>
            <button className="beta-close" onClick={() => setShowPopup(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BetaWidget;
