import React from "react";
import "./Desserts.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Desserts() {
  return (
    <>
      <div className="container_desserts1">
        <img src="/Images/Image_soupe1.jpg" alt="Desserts" />
        <h1>Desserts</h1>
      </div>

      <h2 className="h2_desserts1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Desserts" */}
      <CarteFood categorie="Desserts" />
    </>
  );
}

export default Desserts;
