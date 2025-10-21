import React from "react";
import "./Desserts.css";

// Import Widgets
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Desserts() {
  return (
    <>
      <div className="container_desserts1">
        <img src="/Images/Image_soupe1.jpg" alt="" />
        <h1>Desserts</h1>
      </div>

      <h2 className="h2_desserts1">Nos différentes recettes</h2>

      <CarteFood />
    </>
  );
}

export default Desserts;
