import React from "react";
import "./Salades.css";
import CarteFood from "../../Cartes/CarteFood/CarteF";

function Salades() {
  return (
    <>
      <div className="container_salades1">
        <img src="/Images/Salades-banniere.jpg" alt="Salades" />
        <h1>Salades</h1>
      </div>

      <h2 className="h2_salades1">Nos différentes recettes</h2>

      {/* 🔹 Affiche uniquement la catégorie "Salades" */}
      <CarteFood categorie="Salades" />
    </>
  );
}

export default Salades;
