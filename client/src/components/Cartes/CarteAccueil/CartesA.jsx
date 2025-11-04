import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartesA.css";

function CartesAccueil() {
  const [recettes, setRecettes] = useState([]);
  const [favoris, setFavoris] = useState([]); // IDs des recettes aimées
  const [messages, setMessages] = useState({}); // Messages individuels par carte
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_URL;
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const res = await fetch(`${apiBase}/api/recettes`);
        if (!res.ok) throw new Error("Erreur lors du chargement des recettes");

        const data = await res.json();
        const recettesMelangees = data.recettes.sort(() => 0.5 - Math.random());
        const quatreRecettes = recettesMelangees.slice(0, 4);
        setRecettes(quatreRecettes);
      } catch (err) {
        console.error("❌ Erreur API :", err);
        afficherMessage("global", "Impossible de charger les recettes ❌");
      }
    };

    fetchRecettes();

    const interval = setInterval(fetchRecettes, 21600000); // 6h
    return () => clearInterval(interval);
  }, [apiBase]);

  // ❤️ Gestion des favoris avec message individuel
  const toggleFavori = (id) => {
    if (!isAuthenticated) {
      afficherMessage(id, "🔒 Connectez-vous pour aimer !");
      return;
    }

    setFavoris((prev) => {
      if (prev.includes(id)) {
        afficherMessage(id, "💔 Retiré des favoris");
        return prev.filter((f) => f !== id);
      } else {
        afficherMessage(id, "❤️ Ajouté aux favoris");
        return [...prev, id];
      }
    });
  };

  // 📤 Partage de recette
  const partagerRecette = async (recette) => {
    const id = recette._id || recette.id;
    const url = `${window.location.origin}/Fiches_Recettes/${encodeURIComponent(
      id
    )}`;
    const shareData = {
      title: recette.nom,
      text: `Découvrez cette recette délicieuse : ${recette.nom} 🍽️`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        afficherMessage(id, "📤 Recette partagée !");
      } else {
        await navigator.clipboard.writeText(url);
        afficherMessage(id, "📋 Lien copié !");
      }
    } catch {
      afficherMessage(id, "❌ Partage annulé");
    }
  };

  // 🧠 Fonction utilitaire pour gérer les messages temporaires par carte
  const afficherMessage = (id, texte) => {
    setMessages((prev) => ({ ...prev, [id]: texte }));
    setTimeout(() => {
      setMessages((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }, 1500);
  };

  // 🔗 Redirection vers la fiche recette
  const voirRecette = (id) => {
    navigate(`/Fiches_Recettes/${id}`);
  };

  return (
    <section className="cartes-accueil">
      {recettes.length > 0 ? (
        recettes.map((recette) => {
          const recetteId = recette._id || recette.id;
          const isLiked = favoris.includes(recetteId);

          const imageSrc = recette.image?.startsWith("http")
            ? recette.image
            : `${apiBase}/assets/ImagesDb/${recette.image || "default.png"}`;

          return (
            <div
              className="carte"
              key={recetteId}
              onClick={() => voirRecette(recetteId)}
            >
              <img
                src={imageSrc}
                alt={recette.nom}
                className="carte-img"
                onError={(e) =>
                  (e.target.src = `${apiBase}/assets/ImagesDb/default.png`)
                }
              />

              <div className="carte-titre">
                <h3>{recette.nom}</h3>

                <div className="icons-actions">
                  {/* ❤️ Bouton favoris */}
                  <button
                    className="icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavori(recetteId);
                    }}
                    title="Ajouter aux favoris"
                  >
                    {isLiked ? (
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

                  {/* 📤 Bouton partage */}
                  <button
                    className="icon-btn"
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

              <p>{recette.description}</p>
              <button
                className="btn-recette"
                onClick={(e) => {
                  e.stopPropagation();
                  voirRecette(recetteId);
                }}
              >
                Voir la recette
              </button>

              {/* ✅ Message individuel sur chaque carte */}
              {messages[recetteId] && (
                <span className="copied-msg">{messages[recetteId]}</span>
              )}
            </div>
          );
        })
      ) : (
        <p className="loading-text">Chargement des recettes...</p>
      )}
    </section>
  );
}

export default CartesAccueil;
