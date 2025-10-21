import React from "react";
import "./Printemps.css";

function Printemps() {
  const recettes = [
    {
      titre: "Salade Croquante de Printemps",
      image: "https://picsum.photos/600/400?random=10",
      description:
        "Une salade légère aux radis, asperges et petits pois, parfaite pour célébrer le retour du soleil ☀️.",
      lien: "#",
    },
    {
      titre: "Risotto Vert aux Petits Pois et Menthe",
      image: "https://picsum.photos/600/400?random=11",
      description:
        "Un risotto onctueux et parfumé, aux saveurs fraîches du printemps 🌿.",
      lien: "#",
    },
    {
      titre: "Tarte Fine à la Ricotta et Légumes Nouveaux",
      image: "https://picsum.photos/600/400?random=12",
      description:
        "Une pâte croustillante garnie de ricotta et de légumes du marché.",
      lien: "#",
    },
    {
      titre: "Velouté de Carottes et Orange",
      image: "https://picsum.photos/600/400?random=13",
      description:
        "Une soupe pleine de douceur, relevée par une note d’orange et de gingembre 🍊.",
      lien: "#",
    },
  ];

  return (
    <div className="printemps-container">
      {/* --- BANNIÈRE --- */}
      <section className="printemps-banner">
        <div className="banner-left">
          <h1 className="titre-printemps">
            🌸 Le Printemps dans votre assiette 🌸
          </h1>
          <p className="texte-banner">
            Les premiers rayons du soleil, les marchés colorés et les saveurs
            fraîches s’invitent à table. Découvrez nos recettes printanières
            simples, saines et gourmandes.
          </p>
          <a href="#recettes" className="btn-printemps">
            Explorer les recettes
          </a>
        </div>
        <div className="banner-right">
          <img
            src="https://picsum.photos/700/450?random=14"
            alt="Printemps cuisine"
            className="img-banner"
          />
        </div>
      </section>

      {/* --- PRODUITS DU PRINTEMPS --- */}
      <section className="produits-printemps">
        <h2>🌿 Produits de Saison</h2>
        <div className="grille-produits">
          <div className="carte-produit">
            <img
              src="https://picsum.photos/400/300?random=15"
              alt="Légumes de printemps"
            />
            <h3>🥕 Légumes du moment</h3>
            <ul>
              <li>Asperges vertes</li>
              <li>Radis roses</li>
              <li>Petits pois</li>
              <li>Fèves</li>
              <li>Épinards frais</li>
              <li>Carottes nouvelles</li>
            </ul>
          </div>

          <div className="carte-produit">
            <img
              src="https://picsum.photos/400/300?random=16"
              alt="Fruits du printemps"
            />
            <h3>🍓 Fruits de saison</h3>
            <ul>
              <li>Fraises</li>
              <li>Rhubarbe</li>
              <li>Cerises</li>
              <li>Abricots</li>
              <li>Pomme</li>
              <li>Citron</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- RECETTES PRINTEMPS --- */}
      <section className="recettes-printemps" id="recettes">
        <h2>🍽️ Nos Recettes de Printemps</h2>
        <p className="intro-recettes">
          Découvrez nos plats colorés et équilibrés, pour cuisiner au rythme du
          renouveau 🌼
        </p>
        <div className="grille-recettes">
          {recettes.map((recette, index) => (
            <div className="carte-recette" key={index}>
              <img src={recette.image} alt={recette.titre} />
              <div className="info-recette">
                <h3>{recette.titre}</h3>
                <p>{recette.description}</p>
                <a href={recette.lien} className="btn-voir">
                  Voir la recette
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ASTUCE DU CHEF --- */}
      <section className="astuce-printemps">
        <h2>💡 Astuce du Chef</h2>
        <p>
          Pour sublimer vos plats, ajoutez une touche de zeste de citron ou
          d’herbes fraîches juste avant de servir. Cela apporte légèreté,
          couleur et parfum à vos recettes 🌿
        </p>
      </section>
    </div>
  );
}

export default Printemps;
