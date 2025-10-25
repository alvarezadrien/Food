import React, { useState, useEffect, useRef } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function FicheRecettes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recetteRef = useRef();

  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [personnes, setPersonnes] = useState(1);
  const [checked, setChecked] = useState([]);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const res = await fetch(`${apiBase}/api/recettes/${id}`);
        if (!res.ok) throw new Error("Erreur lors du chargement de la recette");
        const data = await res.json();

        // ✅ Transforme les ingrédients simples en objets si nécessaire
        const ingredientsFormates = data.ingredients.map((ing) => {
          if (typeof ing === "string") {
            // Exemple : "200 g de farine"
            const regex = /^(\d+\.?\d*)?\s*([a-zA-Zéèêàùµ]*)?\s*(.*)$/;
            const match = ing.match(regex);
            return {
              quantite: match && match[1] ? parseFloat(match[1]) : null,
              unite: match && match[2] ? match[2] : "",
              nom: match && match[3] ? match[3] : ing,
            };
          }
          return ing; // si déjà objet
        });

        setRecette({ ...data, ingredients: ingredientsFormates });
        setPersonnes(data.portions || 1);
      } catch (err) {
        console.error("❌ Erreur API :", err);
        setError("Impossible de charger la recette.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecette();
  }, [id, apiBase]);

  const increment = () => setPersonnes((prev) => prev + 1);
  const decrement = () => setPersonnes((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Calcule la quantité ajustée en fonction du nombre de personnes
  const ajusterQuantite = (quantite) => {
    if (!quantite || !recette?.portions) return quantite || "";
    const ratio = personnes / recette.portions;
    const newQuantite = (quantite * ratio).toFixed(1);
    return parseFloat(newQuantite) % 1 === 0
      ? parseInt(newQuantite)
      : parseFloat(newQuantite);
  };

  const toggleIngredient = (nom) => {
    setChecked((prev) =>
      prev.includes(nom) ? prev.filter((i) => i !== nom) : [...prev, nom]
    );
  };

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

      pdf.save(`${recette.nom}.pdf`);
    } catch (error) {
      console.error("Erreur PDF :", error);
    } finally {
      document.body.removeChild(tempContainer);
    }
  };

  if (loading) return <p className="ficheRecette-loading">Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!recette) return null;

  return (
    <div className="ficheRecette-container" ref={recetteRef}>
      <button className="ficheRecette-back" onClick={() => navigate(-1)}>
        <FaChevronLeft /> Retour aux recettes
      </button>

      <div className="ficheRecette-header">
        <img src={recette.image || "/Images/default.png"} alt={recette.nom} />
        <div className="ficheRecette-info">
          <h1>{recette.nom}</h1>
          <p className="ficheRecette-description">{recette.description}</p>

          <div className="ficheRecette-stats">
            <div>
              <FaClock /> <span>{recette.duree}</span>
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
                color={i < Math.floor(recette.noteMoyenne) ? "#ffc107" : "#ddd"}
              />
            ))}
            <span>{recette.noteMoyenne?.toFixed(1) || "0.0"}/5</span>
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
            {recette.ingredients.length > 0 ? (
              recette.ingredients.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleIngredient(item.nom)}
                  className={checked.includes(item.nom) ? "checked" : ""}
                >
                  <FaCheckCircle
                    className={`check-icon ${
                      checked.includes(item.nom) ? "active" : ""
                    }`}
                  />
                  <span className="ingredient-nom">
                    {item.quantite
                      ? `${ajusterQuantite(item.quantite)} ${item.unite} `
                      : ""}
                    {item.nom}
                  </span>
                </li>
              ))
            ) : (
              <p>Aucun ingrédient spécifié.</p>
            )}
          </ul>
        </div>

        <div className="ficheRecette-etapes">
          <h2>👨‍🍳 Préparation</h2>
          <ol>
            {recette.preparation.length > 0 ? (
              recette.preparation.map((etape, index) => (
                <li key={index}>{etape}</li>
              ))
            ) : (
              <p>Les étapes ne sont pas encore renseignées.</p>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default FicheRecettes;
