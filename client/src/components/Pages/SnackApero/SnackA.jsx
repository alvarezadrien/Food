import React from "react";
import "./SnackA.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function SnackA() {
  return (
    <>
      <div className="container_snack1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Snack & Apéro</h1>
      </div>

      <h2 className="h2_snack1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default SnackA;
