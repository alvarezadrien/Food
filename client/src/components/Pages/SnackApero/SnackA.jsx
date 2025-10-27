import React from "react";
import "./SnackA.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function SnackA() {
  return (
    <>
      <div className="container_snack1">
        <img src="/Images/snackA-banniere.jpg" alt="Snack & Apéro" />
        <h1>Snack & Apéro</h1>
      </div>

      <h2 className="h2_snack1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Snacks_Apero" */}
      <CarteFood categorie="Snacks_apero" />
    </>
  );
}

export default SnackA;
