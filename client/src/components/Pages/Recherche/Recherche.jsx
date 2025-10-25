import React from "react";
import { useSearchParams } from "react-router-dom";
import CarteFood from "../../Cartes/CarteFood/CarteF";
import "./Recherche.css";

function Recherche() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="recherche-container">
      {/* 🏷️ Titre principal */}
      <h1 className="recherche-titre">
        Résultats de recherche pour : <span>"{query}"</span>
      </h1>

      {/* 💡 Message si aucun mot clé */}
      {!query.trim() && (
        <p className="recherche-message">
          Tapez un mot-clé pour commencer la recherche 🍽️
        </p>
      )}

      {/* 🧩 Affichage des cartes via le composant CarteFood */}
      {query.trim() && <CarteFood searchQuery={query} />}
    </div>
  );
}

export default Recherche;
