import React, { useState, useRef } from "react";
import "./FichesR.css";
import {
  FaClock,
  FaUserFriends,
  FaUtensils,
  FaChevronLeft,
  FaStar,
  FaCheckCircle,
  FaDownload,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function FicheRecettes() {
  const recetteRef = useRef();

  const recette = {
    titre: "Lasagnes Maison au Bœuf et à la Ricotta",
    description:
      "Des lasagnes fondantes et généreuses, une sauce tomate mijotée et une touche de ricotta pour encore plus de douceur. Un grand classique revisité avec amour ❤️",
    image: "/Images/Assiette_2.png",
    temps: "1h20",
    difficulte: "Moyenne",
    portions: 4,
    note: 4.5,
    ingredients: [
      {
        nom: "Feuilles de lasagnes",
        quantite: 12,
        unite: "feuilles",
        image: "https://picsum.photos/60?random=1",
      },
      {
        nom: "Bœuf haché",
        quantite: 500,
        unite: "g",
        image: "https://picsum.photos/60?random=2",
      },
      {
        nom: "Ricotta",
        quantite: 250,
        unite: "g",
        image: "https://picsum.photos/60?random=3",
      },
      {
        nom: "Oignon jaune",
        quantite: 1,
        unite: "",
        image: "https://picsum.photos/60?random=4",
      },
      {
        nom: "Gousses d’ail",
        quantite: 2,
        unite: "",
        image: "https://picsum.photos/60?random=5",
      },
      {
        nom: "Tomates concassées",
        quantite: 400,
        unite: "g",
        image: "https://picsum.photos/60?random=6",
      },
      {
        nom: "Concentré de tomates",
        quantite: 2,
        unite: "c. à soupe",
        image: "https://picsum.photos/60?random=7",
      },
      {
        nom: "Parmesan râpé",
        quantite: 30,
        unite: "g",
        image: "https://picsum.photos/60?random=8",
      },
      {
        nom: "Mozzarella",
        quantite: 150,
        unite: "g",
        image: "https://picsum.photos/60?random=9",
      },
      {
        nom: "Huile d’olive, sel, poivre, basilic",
        quantite: "",
        unite: "",
        image: "https://picsum.photos/60?random=10",
      },
    ],
    etapes: [
      "Préchauffez le four à 180°C.",
      "Faites revenir l’oignon et l’ail dans un peu d’huile d’olive.",
      "Ajoutez le bœuf haché et faites-le dorer.",
      "Ajoutez les tomates, le concentré et laissez mijoter 15 minutes.",
      "Dans un plat, alternez couches de sauce, lasagnes, ricotta et mozzarella.",
      "Terminez avec du fromage râpé et enfournez 35 à 40 minutes.",
      "Servez chaud avec une touche de basilic frais 🌿.",
    ],
  };

  const [personnes, setPersonnes] = useState(recette.portions);
  const [checked, setChecked] = useState([]);

  const ajusterQuantite = (quantite) => {
    if (typeof quantite !== "number") return quantite;
    return ((quantite / recette.portions) * personnes).toFixed(0);
  };

  const increment = () => setPersonnes((prev) => prev + 1);
  const decrement = () => setPersonnes((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleIngredient = (nom) => {
    setChecked((prev) =>
      prev.includes(nom) ? prev.filter((i) => i !== nom) : [...prev, nom]
    );
  };

  // --- Téléchargement PDF ---
  const telechargerPDF = async () => {
    const element = recetteRef.current;
    const clone = element.cloneNode(true);
    clone.querySelectorAll("button, .check-icon").forEach((el) => el.remove());
    clone.style.maxWidth = "900px";
    clone.style.margin = "0 auto";
    clone.style.boxShadow = "none";
    clone.style.background = "#fff";

    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.left = "-9999px";
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      if (imgHeight < pageHeight) {
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let y = 0;
        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 10, y - position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position += pageHeight;
          if (heightLeft > 0) pdf.addPage();
        }
      }

      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.text(`Les Délices du Jour • ${recette.titre}`, 105, 290, {
          align: "center",
        });
      }

      pdf.save(`${recette.titre}.pdf`);
    } catch (error) {
      console.error("Erreur lors du PDF :", error);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  return (
    <div className="ficheRecette-container" ref={recetteRef}>
      <button className="ficheRecette-back">
        <FaChevronLeft /> Retour aux recettes
      </button>

      <div className="ficheRecette-header">
        <img src={recette.image} alt={recette.titre} />
        <div className="ficheRecette-info">
          <h1>{recette.titre}</h1>
          <p className="ficheRecette-description">{recette.description}</p>

          <div className="ficheRecette-stats">
            <div>
              <FaClock /> <span>{recette.temps}</span>
            </div>
            <div className="ficheRecette-personnes">
              <FaUserFriends />
              <span>{personnes} pers.</span>
              <div className="ficheRecette-personnes-btns">
                <button onClick={decrement}>–</button>
                <button onClick={increment}>+</button>
              </div>
            </div>
            <div>
              <FaUtensils /> <span>{recette.difficulte}</span>
            </div>
          </div>

          <div className="ficheRecette-note">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                color={i < Math.floor(recette.note) ? "#ffc107" : "#ddd"}
              />
            ))}
            <span>{recette.note}/5</span>
          </div>

          <button className="btn-download" onClick={telechargerPDF}>
            <FaDownload /> Télécharger la fiche PDF
          </button>
        </div>
      </div>

      <div className="ficheRecette-body">
        <div className="ficheRecette-ingredients">
          <h2>🛒 Ingrédients</h2>
          <ul>
            {recette.ingredients.map((item, index) => (
              <li
                key={index}
                onClick={() => toggleIngredient(item.nom)}
                className={checked.includes(item.nom) ? "checked" : ""}
              >
                <img
                  src={item.image}
                  alt={item.nom}
                  className="ingredient-image"
                />
                <FaCheckCircle
                  className={`check-icon ${
                    checked.includes(item.nom) ? "active" : ""
                  }`}
                />
                {item.quantite
                  ? `${ajusterQuantite(item.quantite)} ${item.unite}`
                  : ""}
                <span className="ingredient-nom"> {item.nom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ficheRecette-etapes">
          <h2>👨‍🍳 Préparation</h2>
          <ol>
            {recette.etapes.map((etape, index) => (
              <li key={index}>{etape}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default FicheRecettes;
