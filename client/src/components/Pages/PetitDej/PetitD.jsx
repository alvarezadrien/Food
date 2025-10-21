import React from "react";
import "./PetitD.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function PetitDej() {
  return (
    <>
      <div className="container_dej1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Petit-déjeuner</h1>
      </div>

      <h2 className="h2_dej1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default PetitDej;
