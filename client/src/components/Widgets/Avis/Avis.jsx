import React, { useState } from "react";
import "./Avis.css";

function AvisPages() {
  const [avis, setAvis] = useState([
    {
      id: 1,
      user: "Camille L.",
      plat: "Tarte aux Pommes",
      note: 5,
      commentaire:
        "Un délice ! La pâte était croustillante et la garniture fondante. J’ai adoré ! 🍎",
      image: "/Images/Assiette_1.png",
    },
    {
      id: 2,
      user: "Alexandre R.",
      plat: "Soupe de Potiron",
      note: 4,
      commentaire:
        "Très douce et savoureuse. Parfaite pour les soirées d’automne. 🌙",
      image: "/Images/Assiette_3.png",
    },
    {
      id: 3,
      user: "Sophie D.",
      plat: "Pâtes au Pesto",
      note: 5,
      commentaire:
        "Simple, rapide et tellement bon ! Le goût du basilic ressort super bien. 🌿",
      image: "/Images/Assiette_2.png",
    },
  ]);

  const [menuActif, setMenuActif] = useState(null);

  const copierLien = (plat) => {
    const url = `https://mon-site-recettes.com/${plat.replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(url);
    alert("Lien copié dans le presse-papier !");
  };

  const partager = (plat) => {
    const url = `https://mon-site-recettes.com/${plat.replace(/\s+/g, "-")}`;
    if (navigator.share) {
      navigator.share({
        title: plat,
        text: `Découvrez cette recette : ${plat}`,
        url,
      });
    } else {
      copierLien(plat);
    }
  };

  return (
    <section className="avis-section">
      <h2 className="avis-titre">💬 Avis des Gourmets</h2>
      <p className="avis-intro">
        Découvrez ce que nos utilisateurs pensent de leurs plats préférés.
      </p>

      <div className="avis-container">
        {avis.map((item) => (
          <div className="avis-carte" key={item.id}>
            <div className="avis-image">
              <img src={item.image} alt={item.plat} />
            </div>

            <div className="avis-contenu">
              <div className="avis-header">
                <h3>{item.plat}</h3>
                <div className="avis-icons">
                  {/* Icône Partage */}
                  <svg
                    onClick={() =>
                      setMenuActif(menuActif === item.id ? null : item.id)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5c3b1e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon-share"
                  >
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>

                  {/* Icône Signaler */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#b04a4a"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="icon-flag"
                  >
                    <path d="M4 4h16l-3 8 3 8H4V4z" />
                    <line x1="4" y1="22" x2="4" y2="2" />
                  </svg>
                </div>
              </div>

              <div className="avis-stars">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < item.note ? "star active" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="avis-commentaire">{item.commentaire}</p>
              <p className="avis-user">— {item.user}</p>

              {menuActif === item.id && (
                <div className="menu-partage">
                  <button onClick={() => partager(item.plat)}>Partager</button>
                  <button onClick={() => copierLien(item.plat)}>
                    Copier le lien
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="ajout-avis">
        <button className="btn-ajouter">➕ Laisser un avis</button>
      </div>
    </section>
  );
}

export default AvisPages;
