import React, { useState, useEffect } from "react";
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
  const [userConnected, setUserConnected] = useState(false);
  const [username, setUsername] = useState("");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setRecetteOpen(false);
    setSaisonOpen(false);
  };

  // ✅ Vérifie si un utilisateur est connecté
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserConnected(true);
      setUsername(userData.username || "Utilisateur");
    } else {
      setUserConnected(false);
      setUsername("");
    }
  }, []);

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
                  <a href="/petit-déjeuner" onClick={closeMenu}>
                    🥐 Petit-déjeuner
                  </a>
                </li>
                <li>
                  <a href="/Entrées" onClick={closeMenu}>
                    🥗 Entrées
                  </a>
                </li>
                <li>
                  <a href="/Plats_Principaux" onClick={closeMenu}>
                    🍝 Plats principaux
                  </a>
                </li>
                <li>
                  <a href="/Soupes_Potages" onClick={closeMenu}>
                    🍲 Soupes & Potages
                  </a>
                </li>
                <li>
                  <a href="/Salades" onClick={closeMenu}>
                    🥬 Salades
                  </a>
                </li>
                <li>
                  <a href="/Sauces" onClick={closeMenu}>
                    🍯 Sauces
                  </a>
                </li>
                <li>
                  <a href="/Accompagnements" onClick={closeMenu}>
                    🍤 Accompagnements
                  </a>
                </li>
                <li>
                  <a href="/Desserts" onClick={closeMenu}>
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
            <a
              href={userConnected ? "/Compte" : "/Connection"}
              onClick={closeMenu}
              className="profile-container"
            >
              <FaUserCircle className="profile-icon" />
              {userConnected ? `Mon compte (${username})` : "Connexion"}
              <span
                className={`status-dot ${
                  userConnected ? "connected" : "disconnected"
                }`}
              ></span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
