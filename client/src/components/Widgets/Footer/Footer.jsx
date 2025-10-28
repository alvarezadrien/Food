import React from "react";
import "./Footer.css";
import { FaHome, FaUtensils, FaUserAlt, FaEnvelope } from "react-icons/fa";

const categories = [
  { nom: "Petit-déjeuner", image: "/Images/Img_choix/Petit_dejeuner.png" },
  { nom: "Entrées", image: "/Images/Img_choix/Entree.png" },
  { nom: "Plats principaux", image: "/Images/Img_choix/Plat_principaux.png" },
  { nom: "Soupes & Potages", image: "/Images/Img_choix/Soupe_potage.png" },
  { nom: "Salades", image: "/Images/Img_choix/Salades.png" },
  { nom: "Sauces", image: "/Images/Img_choix/Sauces.png" },
  { nom: "Accompagnements", image: "/Images/Img_choix/Accompagnements.png" },
  { nom: "Desserts", image: "/Images/Img_choix/Desserts.png" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Bloc À propos */}
        <div className="footer-about">
          <h3>Les Délices du Jour</h3>
          <p>
            Bienvenue sur <strong>Les Délices du Jour</strong> — un espace dédié
            à la passion de la cuisine. Découvrez nos recettes simples,
            gourmandes et inspirées du quotidien 🍲 Chaque plat raconte une
            histoire, chaque saveur une émotion.
          </p>
        </div>

        {/* Bloc Catégories */}
        <div className="footer-categories">
          <h4>Catégories</h4>
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>
                <img src={cat.image} alt={cat.nom} />
                <span>{cat.nom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bloc Liens */}
        <div className="footer-links">
          <h4>Liens utiles</h4>
          <ul>
            <li>
              <FaHome /> <a href="/">Accueil</a>
            </li>
            <li>
              <FaUtensils /> <a href="/recettes">Recettes</a>
            </li>
            <li>
              <FaUserAlt /> <a href="/profil">Profil</a>
            </li>
            <li>
              <FaEnvelope /> <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/Mentions_légales">Mentions légales</a>
            </li>
            <li>
              <a href="/Politique_confidentialité">
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>

        {/* Bloc Newsletter */}
        <div className="footer-newsletter">
          <h4>Recevez nos recettes</h4>
          <p>
            Abonnez-vous pour recevoir chaque semaine nos nouvelles idées de
            plats !
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              aria-label="Email"
            />
            <button type="submit">S’abonner</button>
          </form>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Les Délices du Jour — Tous droits
          réservés.
        </p>
        <p>
          Réalisé avec passion par{" "}
          <span className="footer-author">Adrien Alvarez</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
