import React from "react";
import "./Soupes.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function soupes() {
  return (
    <>
      <div className="container_soupes1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Soupes & Potages</h1>
      </div>

      <h2 className="h2_soupes1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default soupes;
