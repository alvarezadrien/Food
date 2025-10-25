import React from "react";
import "./Sauces.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Sauces() {
  return (
    <>
      <div className="container_sauces1">
        <img src="/Images/Image_soupe1.jpg" alt="Sauces" />
        <h1>Sauces</h1>
      </div>

      <h2 className="h2_sauces1">Nos différentes recettes</h2>

      <CarteFood categorie="Sauces" />
    </>
  );
}

export default Sauces;
