import React, { useState } from "react";
import "./Navbar.css";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaUtensils,
  FaLeaf,
} from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [recetteOpen, setRecetteOpen] = useState(false);
  const [saisonOpen, setSaisonOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setRecetteOpen(false);
    setSaisonOpen(false);
  };

  return (
    <header className="navbar-minimal">
      {/* --- Menu burger à gauche --- */}
      <div className="navbar-burger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* --- Overlay semi-transparent --- */}
      {menuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

      {/* --- Menu latéral gauche --- */}
      <nav className={`navbar-slide-left ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/" onClick={closeMenu}>
              Accueil
            </a>
          </li>

          {/* --- Sous-menu Recettes --- */}
          <li className="submenu-container">
            <button
              className="submenu-btn"
              onClick={() => setRecetteOpen(!recetteOpen)}
            >
              <FaUtensils className="submenu-icon" />
              Recettes
              <FaChevronDown className={`arrow ${recetteOpen ? "open" : ""}`} />
            </button>

            {recetteOpen && (
              <ul className="submenu-list">
                <li>
                  <a href="/petit-dejeuner" onClick={closeMenu}>
                    🥐 Petit-déjeuner
                  </a>
                </li>
                <li>
                  <a href="/entrees" onClick={closeMenu}>
                    🥗 Entrées
                  </a>
                </li>
                <li>
                  <a href="/Plats_Principaux" onClick={closeMenu}>
                    🍝 Plats principaux
                  </a>
                </li>
                <li>
                  <a href="/soupes-potages" onClick={closeMenu}>
                    🍲 Soupes & Potages
                  </a>
                </li>
                <li>
                  <a href="/salades" onClick={closeMenu}>
                    🥬 Salades
                  </a>
                </li>
                <li>
                  <a href="/sauces" onClick={closeMenu}>
                    🍯 Sauces
                  </a>
                </li>
                <li>
                  <a href="/Accompagnements" onClick={closeMenu}>
                    🍤 Accompagnements
                  </a>
                </li>
                <li>
                  <a href="/desserts" onClick={closeMenu}>
                    🍰 Desserts
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* --- Sous-menu Saisons --- */}
          <li className="submenu-container">
            <button
              className="submenu-btn"
              onClick={() => setSaisonOpen(!saisonOpen)}
            >
              <FaLeaf className="submenu-icon" />
              Saisons
              <FaChevronDown className={`arrow ${saisonOpen ? "open" : ""}`} />
            </button>

            {saisonOpen && (
              <ul className="submenu-list">
                <li>
                  <a href="/printemps" onClick={closeMenu}>
                    🌸 Printemps
                  </a>
                </li>
                <li>
                  <a href="/ete" onClick={closeMenu}>
                    ☀️ Été
                  </a>
                </li>
                <li>
                  <a href="/automne" onClick={closeMenu}>
                    🍂 Automne
                  </a>
                </li>
                <li>
                  <a href="/hiver" onClick={closeMenu}>
                    ❄️ Hiver
                  </a>
                </li>
                <li>
                  <a href="/fruits-legumes-saison" onClick={closeMenu}>
                    🍎 Fruits & Légumes de saison
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* --- Contact --- */}
          <li>
            <a href="/contact" onClick={closeMenu}>
              Contact
            </a>
          </li>

          {/* --- Profil --- */}
          <li className="profile-link">
            <a href="/profil" onClick={closeMenu}>
              <FaUserCircle className="profile-icon" /> Mon profil
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
