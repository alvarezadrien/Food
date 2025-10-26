import React, { useState, useEffect } from "react";
import "./Accueil.css";
import { Link, useNavigate } from "react-router-dom";

// Import widgets
import CartesAccueil from "../../Cartes/CarteAccueil/CartesA";
import AvisPages from "../../Widgets/Avis/Avis";

// 🔹 Nouveau composant pour afficher les cartes de produits de saison
const ProductCardDisplay = ({ title, products, type }) => {
  const iconMap = {
    // Légumes
    Potimarron: "🎃",
    Potiron: "🟠",
    Butternut: "🥣",
    Betterave: "🍠",
    "Céleri-rave": "🥔",
    Brocoli: "🥦",
    "Chou-fleur": " florets",
    "Chou de Bruxelles": "🥬",
    Panais: "🥕",
    Mâche: "🌿",
    Épinard: "🍃",
    Poireau: "🧅",
    Carotte: "🥕",
    Navet: "🤍",
    "Radis Noir": "⚫",
    // Fruits
    Pomme: "🍏",
    Poire: "🍐",
    Raisin: "🍇",
    Coing: "🟡",
    Kaki: "🟠",
    Châtaigne: "🌰",
    Noix: "🥜",
    Figue: "🟣",
    Grenade: "🔴",
    Noisette: "🤎",
    Amande: "⚪",
    Canneberge: "🍒",
  };

  return (
    <div className={`product-card-new ${type}`}>
      <h2 className="product-card-title">
        {type === "legumes" ? "🥦" : "🍎"} {title}
      </h2>
      <ul className="product-list-new">
        {products.map((product, index) => (
          <li key={index}>
            <span className="product-icon">{iconMap[product] || "✨"}</span>
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 🔹 Bannière principale
const HeroBanner = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Tapez un ingrédient ou un nom de plat pour commencer !");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${apiBase}/api/recettes/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Erreur de recherche");
      const data = await res.json();

      if (data.results.length === 0) {
        setMessage("Aucune recette trouvée 🍽️");
      } else {
        navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
      }
    } catch (error) {
      console.error("❌ Erreur API :", error);
      setMessage("Erreur lors de la recherche ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-banner">
      <div className="gauche-hero">
        <h1 className="hero-title">
          Trouvez la recette parfaite en un clic 🍽️
        </h1>
        <p className="hero-subtitle">
          Tapez un ingrédient, un plat ou une envie du moment. Laissez-vous
          inspirer par nos idées savoureuses et faciles à cuisiner.
        </p>

        <div className="hero-search-group">
          <input
            type="text"
            placeholder="Ex : pâtes, chocolat, soupe..."
            className="hero-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="hero-search-primary-btn" onClick={handleSearch}>
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </div>

        <div className="search-results">
          {message && <p className="search-message">{message}</p>}
        </div>

        <div className="hero-cta-alt-group">
          <button className="cta-alt-button">
            <a href="#recettes-populaires">Recettes Populaires ⭐</a>
          </button>
          <button className="cta-alt-button">
            <a href="#saison">Inspiration de Saison 🍂</a>
          </button>
        </div>
      </div>

      <div className="droite-hero">
        <img src="/Images/Img_banniere1.jpg" alt="Bannière aliments" />
      </div>
    </div>
  );
};

// 🔹 Page principale
function Accueil() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [recetteDuJour, setRecetteDuJour] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const res = await fetch(`${apiBase}/api/recettes`);
        if (!res.ok) throw new Error("Erreur lors du chargement des recettes");
        const data = await res.json();
        const recettes = data.recettes || data.results || [];

        if (recettes.length > 0) {
          // Sélectionne une recette différente chaque jour
          const dayIndex = new Date().getDate() % recettes.length;
          setRecetteDuJour(recettes[dayIndex]);
        }
      } catch (error) {
        console.error("❌ Erreur API :", error);
      }
    };

    fetchRecettes();
  }, [apiBase]);

  const categories = [
    {
      nom: "Petit-déjeuner",
      lien: "/Petit_déjeuner",
      image: "/Images/Img_choix/Petit_dejeuner.png",
    },
    { nom: "Entrées", lien: "/Entrées", image: "/Images/Img_choix/Entree.png" },
    {
      nom: "Plats principaux",
      lien: "/Plats_Principaux",
      image: "/Images/Img_choix/Plat_principaux.png",
    },
    {
      nom: "Soupes & Potages",
      lien: "/Soupes_Potages",
      image: "/Images/Img_choix/Soupe_potage.png",
    },
    {
      nom: "Salades",
      lien: "/Salades",
      image: "/Images/Img_choix/Salades.png",
    },
    { nom: "Sauces", lien: "/Sauces", image: "/Images/Img_choix/Sauces.png" },
    {
      nom: "Snacks & Apéros",
      lien: "/Snack_Apéro",
      image: "/Images/Img_choix/Snack_apero.png",
    },
    {
      nom: "Desserts",
      lien: "/Desserts",
      image: "/Images/Img_choix/Desserts.png",
    },
  ];

  const autumnVegetables = [
    "Potimarron",
    "Potiron",
    "Butternut",
    "Betterave",
    "Céleri-rave",
    "Brocoli",
    "Chou-fleur",
    "Chou de Bruxelles",
    "Panais",
    "Mâche",
    "Épinard",
    "Poireau",
    "Carotte",
    "Navet",
    "Radis Noir",
  ];

  const autumnFruits = [
    "Pomme",
    "Poire",
    "Raisin",
    "Coing",
    "Kaki",
    "Châtaigne",
    "Noix",
    "Figue",
    "Grenade",
    "Noisette",
    "Amande",
    "Canneberge",
  ];

  return (
    <>
      <HeroBanner />

      {/* BANNIÈRE DE CHOIX */}
      <div className="banniere_choix">
        <ul className="liste_choix1">
          {categories.map((cat, index) => (
            <li key={index} className="categorie-item">
              <Link to={cat.lien}>
                <div className="icone-container">
                  <img src={cat.image} alt={cat.nom} />
                </div>
                <span className="nom-categorie">{cat.nom}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* SECTION POPULAIRES — Recette du jour */}
      <div className="Container_populaires" id="recettes-populaires">
        <h2 className="h2_populaires1">
          {recetteDuJour
            ? `La recette du jour : ${recetteDuJour.nom}`
            : "Les recettes populaires"}
        </h2>

        <div className="div_populaires1">
          <p className="para_populaires1">
            {recetteDuJour
              ? recetteDuJour.description
              : "Découvrez chaque jour une nouvelle idée gourmande !"}
          </p>

          <img
            src={
              recetteDuJour?.image
                ? recetteDuJour.image
                : "/Images/Assiette_1.png"
            }
            alt={recetteDuJour?.nom || "Recette populaire"}
            className="img_populaires1"
          />
        </div>

        <div className="Btn_populaires1">
          <button
            onClick={() =>
              recetteDuJour &&
              navigate(
                `/Fiches_Recettes/${recetteDuJour._id || recetteDuJour.id}`
              )
            }
          >
            <a href="#">Voir la recette</a>
          </button>
          <button>
            <a href="/Plats_Principaux">Voir plus de recettes</a>
          </button>
        </div>
      </div>

      {/* SECTION SAISON */}
      <section className="container_saison1" id="saison">
        <h2 className="h2_saison1">
          🍂 La Fête des Saveurs d'Automne : Cuisinez selon la Saison
        </h2>

        <img src="/Images/Image_saison1.jpg" alt="Image automne" />

        <div className="div_saison1">
          <div className="div_saison2">
            <h3>
              Cuisinez au rythme des saisons pour une saveur incomparable !
            </h3>
            <p>
              À chaque saison sa magie, et l'automne ne fait pas exception !
              Plongez dans un univers de saveurs riches et de couleurs chaudes
              avec nos sélections de fruits et légumes frais. Cuisiner avec des
              produits de saison, c'est l'assurance de repas savoureux,
              nutritifs et respectueux de l'environnement.
            </p>
          </div>

          <div className="saison-divider"></div>

          <div className="div_saison3">
            <h3>Ce Mois-ci : Octobre 🍁</h3>
            <span>L'abondance de l'automne à son apogée !</span>
            <button>
              <a href="#produits-saisonniers">Découvrez les stars du mois</a>
            </button>
          </div>
        </div>

        {/* SECTION PRODUITS DE SAISON */}
        <div className="saison-produits-new" id="produits-saisonniers">
          <ProductCardDisplay
            title="Légumes d’Automne"
            products={autumnVegetables}
            type="legumes"
          />
          <ProductCardDisplay
            title="Fruits d’Automne"
            products={autumnFruits}
            type="fruits"
          />
        </div>
      </section>

      <div className="container_cartes1">
        <h2 className="div_cartes_h2">Pour tous les goûts</h2>
        <br />
        <CartesAccueil />
      </div>

      <AvisPages />
    </>
  );
}

export default Accueil;
