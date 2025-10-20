import React, { useState } from "react";
import "./CartesF.css";
import Pagination from "../../Widgets/Pagination/Pagination";

function CarteFood() {
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

  // 👉 On duplique pour simuler beaucoup de données
  const fullRecettes = Array.from({ length: 100 }, (_, i) => ({
    ...recettes[i % recettes.length],
    id: i + 1,
    titre: `${recettes[i % recettes.length].titre} ${i + 1}`,
  }));

  const [favoris, setFavoris] = useState([]);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const cartesParPage = 20;
  const totalPages = Math.ceil(fullRecettes.length / cartesParPage);

  // Pagination logique
  const indexOfLast = currentPage * cartesParPage;
  const indexOfFirst = indexOfLast - cartesParPage;
  const currentRecettes = fullRecettes.slice(indexOfFirst, indexOfLast);

  // Gestion des favoris
  const toggleFavori = (id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Partage de recette
  const partagerRecette = async (titre) => {
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
      navigator.clipboard.writeText(url);
      setMessage("Lien copié dans le presse-papier !");
    }

    setTimeout(() => setMessage(null), 2000);
  };

  // Changement de page
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="cartesAccueil-container">
        {currentRecettes.map((recette) => (
          <div className="carteAccueil" key={recette.id}>
            <img
              src={recette.image}
              alt={recette.titre}
              className="carteAccueil-img"
            />

            <div className="carteAccueil-header">
              <h3>{recette.titre}</h3>

              <div className="carteAccueil-actions">
                {/* Icône cœur */}
                <button
                  className="carteAccueil-iconBtn"
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
                        d="M12 21.35l-1.45-1.32C5.4 15.36 
                        2 12.28 2 8.5 2 5.42 4.42 3 
                        7.5 3c1.74 0 3.41.81 4.5 
                        2.09C13.09 3.81 14.76 3 
                        16.5 3 19.58 3 22 5.42 
                        22 8.5c0 3.78-3.4 6.86-8.55 
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
                        d="M12.1 8.64l-.1.1-.11-.1C10.14 
                        6.6 7.1 6.6 5.14 8.64a4.86 
                        4.86 0 000 6.9L12 22l6.86-6.46a4.86 
                        4.86 0 000-6.9c-1.96-2.04-5-2.04-6.76 0z"
                      />
                    </svg>
                  )}
                </button>

                {/* Icône partage */}
                <button
                  className="carteAccueil-iconBtn"
                  onClick={() => partagerRecette(recette.titre)}
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
                      2 0 0 0 2-2v-8M16 6l-4-4m0 
                      0L8 6m4-4v16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="carteAccueil-description">{recette.description}</p>

            <button className="carteAccueil-btn">Voir la recette</button>

            {message && <span className="carteAccueil-message">{message}</span>}
          </div>
        ))}
      </section>

      {/* Pagination séparée */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default CarteFood;
