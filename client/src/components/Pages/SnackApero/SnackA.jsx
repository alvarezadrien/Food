import React from "react";
import "./SnackA.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function SnackA() {
  return (
    <>
      <div className="container_snack1">
        <img src="/Images/Image_soupe1.jpg" alt="Snack & Apéro" />
        <h1>Snack & Apéro</h1>
      </div>

      <h2 className="h2_snack1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Snacks_Apero" */}
      <CarteFood categorie="Snacks_Apero" />
    </>
  );
}

export default SnackA;
