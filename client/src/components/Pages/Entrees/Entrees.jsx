import React from "react";
import "./Entrees.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Entrees() {
  return (
    <>
      <div className="container_entrees1">
        <img src="/Images/entrees-banniere.jpg" alt="Entrées" />
        <h1>Entrées</h1>
      </div>

      <h2 className="h2_entrees1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Entrées" */}
      <CarteFood categorie="Entrees" />
    </>
  );
}

export default Entrees;
