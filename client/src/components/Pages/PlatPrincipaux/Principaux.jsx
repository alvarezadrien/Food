import React from "react";
import "./Principaux.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function PlatPrincipaux() {
  return (
    <>
      <div className="container_principaux1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Plats principaux</h1>
      </div>

      <h2 className="h2_principaux1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default PlatPrincipaux;
