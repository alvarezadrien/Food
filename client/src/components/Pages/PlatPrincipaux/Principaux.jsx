import React from "react";
import "./Principaux.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function PlatPrincipaux() {
  return (
    <>
      <div className="container_principaux1">
        <img src="/Images/Plat-banniere.jpg" alt="Plats principaux" />
        <h1>Plats principaux</h1>
      </div>

      <h2 className="h2_principaux1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Plats_principaux" */}
      <CarteFood categorie="Plats_principaux" />
    </>
  );
}

export default PlatPrincipaux;
