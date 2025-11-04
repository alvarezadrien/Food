import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Connection.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const Connection = () => {
  const { login, signup } = useContext(AuthContext);
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

  // 🔹 Validation helpers
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

  // 🔹 Gestion des champs
  const handleRegisterChange = (e) =>
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  // 🔹 Soumission inscription
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
        await signup(
          registerData.username,
          registerData.email,
          registerData.password
        );
        setMessage("✅ Inscription réussie ! Vous pouvez vous connecter.");
        setRightPanelActive(false);
        setRegisterData({ username: "", email: "", password: "" });
      } catch (err) {
        console.error("❌ Erreur inscription :", err);
        setMessage(err.message || "Erreur lors de l'inscription ❌");
      }
    }
  };

  // 🔹 Soumission connexion
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmittedLogin(true);
    const validationErrors = validateLogin();
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        await login(loginData.email, loginData.password);
        setMessage("✅ Connexion réussie !");
        setTimeout(() => navigate("/Compte"), 1000);
      } catch (err) {
        console.error("❌ Erreur connexion :", err);
        setMessage(err.message || "Email ou mot de passe incorrect ❌");
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
        {/* --- INSCRIPTION --- */}
        <div className="auth-form-container auth-register-container">
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <h1>Créer un compte</h1>

            <input
              type="text"
              name="username"
              id="registerUsername"
              className="auth-input"
              placeholder="Nom d'utilisateur"
              value={registerData.username}
              onChange={handleRegisterChange}
              onBlur={handleBlur}
              autoComplete="username"
            />
            <small className="auth-error">{showError("username")}</small>

            <input
              type="email"
              name="email"
              id="registerEmail"
              className="auth-input"
              placeholder="Adresse e-mail"
              value={registerData.email}
              onChange={handleRegisterChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            <small className="auth-error">{showError("email")}</small>

            <div className="password-container">
              <input
                type={showRegisterPassword ? "text" : "password"}
                name="password"
                id="registerPassword"
                className="auth-input"
                placeholder="Mot de passe"
                value={registerData.password}
                onChange={handleRegisterChange}
                onBlur={handleBlur}
                autoComplete="new-password"
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

        {/* --- CONNEXION --- */}
        <div className="auth-form-container auth-login-container">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h1>Se connecter</h1>

            <input
              type="email"
              name="email"
              id="loginEmail"
              className="auth-input"
              placeholder="Adresse e-mail"
              value={loginData.email}
              onChange={handleLoginChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
            <small className="auth-error">{showError("email")}</small>

            <div className="password-container">
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                id="loginPassword"
                className="auth-input"
                placeholder="Mot de passe"
                value={loginData.password}
                onChange={handleLoginChange}
                onBlur={handleBlur}
                autoComplete="current-password"
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

        {/* --- OVERLAY --- */}
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
