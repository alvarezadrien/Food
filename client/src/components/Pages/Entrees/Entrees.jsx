import React from "react";
import "./Entrees.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Entrees() {
  return (
    <>
      <div className="container_entrees1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Entrées</h1>
      </div>

      <h2 className="h2_entrees1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default Entrees;
