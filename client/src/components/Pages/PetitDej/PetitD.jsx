import React from "react";
import "./PetitD.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function PetitDej() {
  return (
    <>
      <div className="container_dej1">
        <img src="/Images/PetitD-banniere.jpg" alt="Petit-déjeuner" />
        <h1>Petit-déjeuner</h1>
      </div>

      <h2 className="h2_dej1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Petit_dejeuner" */}
      <CarteFood categorie="Petit_dejeuner" />
    </>
  );
}

export default PetitDej;
