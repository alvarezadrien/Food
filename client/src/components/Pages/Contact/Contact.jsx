import React, { useState } from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaUser,
  FaRegCommentDots,
  FaCheckCircle,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Faux envoi (pas de backend)
    setTimeout(() => {
      setEnvoye(true);
      setFormData({ nom: "", email: "", sujet: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>📬 Contactez-nous</h1>
        <p>
          Une question, une idée, un problème technique ? N’hésitez pas à nous
          écrire, votre avis compte énormément !
        </p>
      </div>

      <div className="contact-content">
        {/* --- Formulaire --- */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="nom"
              placeholder="Votre nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Votre adresse e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaRegCommentDots className="input-icon" />
            <input
              type="text"
              name="sujet"
              placeholder="Sujet de votre message"
              value={formData.sujet}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Votre message..."
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn-envoyer">
            Envoyer le message
          </button>

          {envoye && (
            <div className="message-success">
              <FaCheckCircle /> Merci ! Votre message a bien été simulé 😊
            </div>
          )}
        </form>

        {/* --- Bloc info droite --- */}
        <div className="contact-info">
          <h2>Informations</h2>
          <p>
            Nous sommes toujours ravis d’échanger avec notre communauté de
            passionnés de cuisine 🍳 Partagez vos idées, vos retours ou vos
            suggestions pour améliorer
            <strong> Les Délices du Jour</strong> !
          </p>
          <ul>
            <li>📧 contact@lesdelicesdujour.com</li>
            <li>📍 Bruxelles, Belgique</li>
            <li>🕒 Réponse sous 24 à 48h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
