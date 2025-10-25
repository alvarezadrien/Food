import React, { useState, useEffect } from "react";
import "./CartesF.css";
import Pagination from "../../Widgets/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

function CarteFood({ categorie, searchQuery }) {
  const [recettes, setRecettes] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cartesParPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecettes = async () => {
      const apiBase = import.meta.env.VITE_API_URL;

      if (!apiBase) {
        console.error("❌ Variable VITE_API_URL non définie dans .env");
        setMessage("Erreur de configuration API ❌");
        return;
      }

      try {
        let url = "";

        if (searchQuery) {
          // 🔍 Recherche
          url = `${apiBase}/api/recettes/search?q=${encodeURIComponent(
            searchQuery
          )}`;
        } else if (categorie) {
          // 📂 Filtre par catégorie
          url = `${apiBase}/api/recettes?categorie=${encodeURIComponent(
            categorie
          )}&page=${currentPage}&limit=${cartesParPage}`;
        } else {
          // 📜 Toutes les recettes
          url = `${apiBase}/api/recettes?page=${currentPage}&limit=${cartesParPage}`;
        }

        const res = await fetch(url);
        if (!res.ok)
          throw new Error(`Erreur API (${res.status}) lors du chargement.`);

        const data = await res.json();
        const recettesData = data.recettes || data.results || [];
        setRecettes(recettesData);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("❌ Erreur API :", err);
        setMessage("Impossible de charger les recettes ❌");
        setTimeout(() => setMessage(null), 3000);
      }
    };

    fetchRecettes();
  }, [currentPage, categorie, searchQuery]);

  // ❤️ Ajout / retrait favoris
  const toggleFavori = (id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // 🔗 Partage de la recette
  const partagerRecette = async (recette) => {
    const siteFront = window.location.origin;
    const url = `${siteFront}/Fiches_Recettes/${recette._id || recette.id}`;

    const shareData = {
      title: recette.nom || "Recette",
      text: `Découvrez cette recette délicieuse : ${recette.nom} 🍽️`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessage("Recette partagée avec succès !");
      } else {
        await navigator.clipboard.writeText(url);
        setMessage("Lien copié dans le presse-papier !");
      }
    } catch {
      setMessage("Partage annulé.");
    }

    setTimeout(() => setMessage(null), 2000);
  };

  // 📖 Pagination
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="cartesAccueil-container">
        {recettes.length > 0 ? (
          recettes.map((recette) => (
            <div
              className="carteAccueil"
              key={recette._id || recette.id}
              onClick={() =>
                navigate(`/Fiches_Recettes/${recette._id || recette.id}`)
              }
            >
              <img
                src={recette.image || "/Images/default.png"}
                alt={recette.nom || "Recette"}
                className="carteAccueil-img"
                onError={(e) => (e.target.src = "/Images/default.png")}
              />

              <div className="carteAccueil-header">
                <h3>{recette.nom}</h3>

                <div className="carteAccueil-actions">
                  {/* ❤️ Bouton favoris */}
                  <button
                    className="carteAccueil-iconBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavori(recette._id || recette.id);
                    }}
                    title="Ajouter aux favoris"
                  >
                    {favoris.includes(recette._id || recette.id) ? (
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

                  {/* 🔗 Bouton partage */}
                  <button
                    className="carteAccueil-iconBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      partagerRecette(recette);
                    }}
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

              <p className="carteAccueil-description">
                {recette.description?.slice(0, 120)}...
              </p>

              <button
                className="carteAccueil-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/Fiches_Recettes/${recette._id || recette.id}`);
                }}
              >
                Voir la recette
              </button>

              {message && (
                <span className="carteAccueil-message">{message}</span>
              )}
            </div>
          ))
        ) : (
          <p className="loading-text">Chargement des recettes...</p>
        )}
      </section>

      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default CarteFood;
