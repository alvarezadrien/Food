import React, { useState } from "react";
import "./Accueil.css";
// Ajout de useNavigate pour la redirection conditionnelle
import { Link, useNavigate } from "react-router-dom";

// Import widgets
import CartesAccueil from "../../Cartes/CarteAccueil/CartesA";
import AvisPages from "../../Widgets/Avis/Avis";

const HeroBanner = () => {
  const [query, setQuery] = useState("");
  // États restaurés pour la logique de recherche API
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const apiBase = import.meta.env.VITE_API_URL;

  // Utilisation de useNavigate pour la redirection
  const navigate = useNavigate();

  // 🔍 Fonction de recherche modifiée pour API + Redirection
  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Tapez un ingrédient ou un nom de plat pour commencer !");
      setRecettes([]); // Nettoie les résultats précédents
      return;
    }

    setLoading(true);
    setMessage("");
    setRecettes([]);

    try {
      const res = await fetch(
        `${apiBase}/api/recettes/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Erreur de recherche");
      const data = await res.json();

      if (data.results.length === 0) {
        // Cas 1 : Aucune recette trouvée -> Affiche un message local
        setMessage("Aucune recette trouvée 🍽️");
      } else {
        // Cas 2 : Recettes trouvées -> Redirige vers la page de recherche complète
        navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
        // Note : setRecettes n'est plus strictement nécessaire car on quitte la page.
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

        {/* Résultats de la recherche - Sert principalement à afficher le message d'erreur/absence de résultat */}
        <div className="search-results">
          {message && <p className="search-message">{message}</p>}
          {/* Note : L'affichage des recettes (recettes.length > 0) est supprimé car on redirige dans ce cas. */}
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

function Accueil() {
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

      {/* SECTION POPULAIRES */}
      <div className="Container_populaires" id="recettes-populaires">
        <h2 className="h2_populaires1">Les recettes populaires</h2>

        <div className="div_populaires1">
          <p className="para_populaires1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
            necessitatibus corrupti fuga accusantium explicabo iste ex mollitia
            facilis hic commodi, placeat rem autem ut esse saepe dignissimos.
            Cupiditate, maiores, tempore ut repellendus nostrum cumque
            voluptatum sequi eius facere porro praesentium repellat illo
            quisquam voluptates voluptatibus. Quibusdam ad, corrupti recusandae
            magni laborum velit tempora magnam, voluptatem officiis minus omnis
            in iste voluptates? Ab dolorum recusandae fugit aliquid? Aperiam
            eveniet tempore quibusdam voluptas ex mollitia. Placeat ipsam
            nostrum dolorum quia quibusdam.
          </p>

          <img
            src="/Images/Assiette_1.png"
            alt="Recette populaire"
            className="img_populaires1"
          />
        </div>

        <div className="Btn_populaires1">
          <button>
            <a href="#">Voir la recette</a>
          </button>
          <button>
            <a href="#">Voir plus de recettes</a>
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
              <a href="#legumes">Découvrez les stars du mois</a>
            </button>
          </div>
        </div>

        <div className="saison-produits">
          <div className="product-card" id="legumes">
            <h2>🥦 Légumes d’Automne</h2>
            <ul className="product-list">
              <li>Potimarron 🎃</li>
              <li>Potiron</li>
              <li>Butternut</li>
              <li>Betterave</li>
              <li>Céleri-rave</li>
              <li>Brocoli</li>
              <li>Chou-fleur</li>
              <li>Chou de Bruxelles</li>
              <li>Panais</li>
              <li>Mâche</li>
              <li>Épinard</li>
              <li>Poireau</li>
              <li>Carotte</li>
              <li>Navet</li>
              <li>Radis Noir</li>
            </ul>
          </div>

          <div className="product-card" id="fruits">
            <h2>🍎 Fruits d’Automne</h2>
            <ul className="product-list">
              <li>Pomme 🍏</li>
              <li>Poire</li>
              <li>Raisin 🍇</li>
              <li>Coing</li>
              <li>Kaki</li>
              <li>Châtaigne</li>
              <li>Noix</li>
              <li>Figue (dernières)</li>
              <li>Grenade</li>
              <li>Noisette</li>
              <li>Amande</li>
              <li>Canneberge</li>
            </ul>
          </div>
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
