import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Connection.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Connection = () => {
  // 🔹 Remplace ici par ton backend Render exact si le nom diffère
  const API_URL = "https://bubufood-backend.onrender.com/api/auth";
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [submittedRegister, setSubmittedRegister] = useState(false);
  const [submittedLogin, setSubmittedLogin] = useState(false);
  const [message, setMessage] = useState("");

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.id]: true });
  };

  const checkEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const checkLength = (value, min, max) =>
    value.length >= min && value.length <= max;

  const validateRegister = () => ({
    username: !checkLength(registerData.username, 3, 20)
      ? "Le nom d'utilisateur doit contenir entre 3 et 20 caractères."
      : "",
    email: !checkEmail(registerData.email)
      ? "Veuillez saisir un email valide."
      : "",
    password: !checkLength(registerData.password, 8, 20)
      ? "Le mot de passe doit contenir entre 8 et 20 caractères."
      : "",
  });

  const validateLogin = () => ({
    email: !checkEmail(loginData.email)
      ? "Veuillez saisir un email valide."
      : "",
    password: !checkLength(loginData.password, 8, 20)
      ? "Le mot de passe doit contenir entre 8 et 20 caractères."
      : "",
  });

  // --- Soumission inscription ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmittedRegister(true);
    const validationErrors = validateRegister();
    setErrors(validationErrors);

    if (
      !validationErrors.username &&
      !validationErrors.email &&
      !validationErrors.password
    ) {
      try {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage("✅ Inscription réussie, vous pouvez vous connecter !");
          setRightPanelActive(false);
          setRegisterData({ username: "", email: "", password: "" });
        } else {
          setMessage(`❌ ${data.message || "Erreur lors de l'inscription."}`);
        }
      } catch (err) {
        setMessage("❌ Erreur serveur : " + err.message);
      }
    }
  };

  // --- Soumission connexion ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmittedLogin(true);
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });
        const data = await res.json();
        if (res.ok) {
          setMessage("✅ Connexion réussie, bienvenue " + data.username + " !");
          localStorage.setItem("user", JSON.stringify(data));
          setTimeout(() => navigate("/Compte"), 1200);
        } else {
          setMessage(`❌ ${data.message || "Email ou mot de passe invalide."}`);
        }
      } catch (err) {
        setMessage("❌ Erreur serveur : " + err.message);
      }
    }
  };

  const showError = (field) =>
    (touched[field] || submittedRegister || submittedLogin) && errors[field];

  const overlayImage = rightPanelActive
    ? "url('/Images/Img_connection1.jpg')"
    : "url('/Images/Img_connection2.jpg')";

  return (
    <div className="auth-wrapper">
      <div
        className={`auth-container ${
          rightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* --- Inscription --- */}
        <div className="auth-form-container auth-register-container">
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <h1>Créer un compte</h1>
            <input
              type="text"
              id="username"
              className="auth-input"
              placeholder="Nom d'utilisateur"
              value={registerData.username}
              onChange={handleRegisterChange}
              onBlur={handleBlur}
            />
            <small className="auth-error">{showError("username")}</small>

            <input
              type="email"
              id="email"
              className="auth-input"
              placeholder="Adresse e-mail"
              value={registerData.email}
              onChange={handleRegisterChange}
              onBlur={handleBlur}
            />
            <small className="auth-error">{showError("email")}</small>

            <div className="password-container">
              <input
                type={showRegisterPassword ? "text" : "password"}
                id="password"
                className="auth-input"
                placeholder="Mot de passe"
                value={registerData.password}
                onChange={handleRegisterChange}
                onBlur={handleBlur}
              />
              <span
                className="password-toggle"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="auth-error">{showError("password")}</small>

            <button type="submit" className="auth-btn">
              S'inscrire
            </button>
          </form>
        </div>

        {/* --- Connexion --- */}
        <div className="auth-form-container auth-login-container">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h1>Se connecter</h1>
            <input
              type="email"
              id="email"
              className="auth-input"
              placeholder="Adresse e-mail"
              value={loginData.email}
              onChange={handleLoginChange}
              onBlur={handleBlur}
            />
            <small className="auth-error">{showError("email")}</small>

            <div className="password-container">
              <input
                type={showLoginPassword ? "text" : "password"}
                id="password"
                className="auth-input"
                placeholder="Mot de passe"
                value={loginData.password}
                onChange={handleLoginChange}
                onBlur={handleBlur}
              />
              <span
                className="password-toggle"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <small className="auth-error">{showError("password")}</small>

            <button type="submit" className="auth-btn">
              Se connecter
            </button>
          </form>
        </div>

        {/* --- Overlay --- */}
        <div className="auth-overlay-container">
          <div
            className="auth-overlay"
            style={{ backgroundImage: overlayImage }}
          >
            <div className="auth-overlay-panel auth-overlay-left">
              <h2>Bienvenue !</h2>
              <p>Déjà membre ? Connectez-vous pour continuer votre aventure.</p>
              <button
                className="auth-btn ghost"
                onClick={() => setRightPanelActive(false)}
              >
                Se connecter
              </button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h2>Nouveau ici ?</h2>
              <p>Inscrivez-vous pour rejoindre la communauté BubuFood.</p>
              <button
                className="auth-btn ghost"
                onClick={() => setRightPanelActive(true)}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default Connection;
