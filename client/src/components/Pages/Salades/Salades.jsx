import React from "react";
import "./Salades.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Salades() {
  return (
    <>
      <div className="container_salades1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Salades</h1>
      </div>

      <h2 className="h2_salades1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default Salades;
