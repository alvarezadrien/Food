import React, { useState } from "react";
import "./CartesA.css";

function CartesAccueil() {
  const recettes = [
    {
      id: 1,
      titre: "Salade Méditerranéenne",
      description: "Une salade fraîche avec tomates, feta et olives noires.",
      image: "/Images/Assiette_1.png",
    },
    {
      id: 2,
      titre: "Pâtes au Pesto",
      description: "Des pâtes fraîches accompagnées d’un pesto maison.",
      image: "/Images/Assiette_2.png",
    },
    {
      id: 3,
      titre: "Soupe de Potiron",
      description: "Un velouté d’automne réconfortant et doux.",
      image: "/Images/Assiette_3.png",
    },
    {
      id: 4,
      titre: "Tarte aux Pommes",
      description: "Un grand classique aux pommes fondantes et caramélisées.",
      image: "/Images/Assiette_1.png",
    },
  ];

  const [favoris, setFavoris] = useState([]);
  const [message, setMessage] = useState(null);

  // Gestion du clic sur le cœur
  const toggleFavori = (id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Partage de la recette (API Web Share ou fallback)
  const partagerRecette = async (titre, id) => {
    const url = `https://mon-site-recettes.com/${encodeURIComponent(titre)}`;
    const shareData = {
      title: titre,
      text: `Découvrez cette recette délicieuse : ${titre} 🍽️`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setMessage(`Recette partagée avec succès !`);
      } catch (err) {
        setMessage("Partage annulé.");
      }
    } else {
      // Fallback : copie du lien
      navigator.clipboard.writeText(url);
      setMessage("Lien copié dans le presse-papier !");
    }

    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <section className="cartes-accueil">
      {recettes.map((recette) => (
        <div className="carte" key={recette.id}>
          <img src={recette.image} alt={recette.titre} className="carte-img" />

          <div className="carte-titre">
            <h3>{recette.titre}</h3>

            <div className="icons-actions">
              {/* Cœur favoris */}
              <button
                className="icon-btn"
                onClick={() => toggleFavori(recette.id)}
                title="Ajouter aux favoris"
              >
                {favoris.includes(recette.id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#e63946"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                    4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 
                    3.81 14.76 3 16.5 3 19.58 3 22 
                    5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#444"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M12.1 8.64l-.1.1-.11-.1C10.14 6.6 7.1 6.6 
                      5.14 8.64a4.86 4.86 0 000 6.9L12 
                      22l6.86-6.46a4.86 4.86 0 000-6.9c-1.96-2.04-5-2.04-6.76 0z"
                    />
                  </svg>
                )}
              </button>

              {/* Partage */}
              <button
                className="icon-btn"
                onClick={() => partagerRecette(recette.titre, recette.id)}
                title="Partager cette recette"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#444"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12v8a2 2 0 0 0 2 2h12a2 
                    2 0 0 0 2-2v-8M16 6l-4-4m0 0L8 6m4-4v16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p>{recette.description}</p>
          <button className="btn-recette">Voir la recette</button>

          {/* Message temporaire */}
          {message && <span className="copied-msg">{message}</span>}
        </div>
      ))}
    </section>
  );
}

export default CartesAccueil;
