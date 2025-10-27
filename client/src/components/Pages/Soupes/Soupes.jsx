import React from "react";
import "./Soupes.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Soupes() {
  return (
    <>
      <div className="container_soupes1">
        <img src="/Images/Soupes-banniere.jpg" alt="Soupes & Potages" />
        <h1>Soupes & Potages</h1>
      </div>

      <h2 className="h2_soupes1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Soupes" */}
      <CarteFood categorie="Soupes" />
    </>
  );
}

export default Soupes;
