import React, { useState } from "react";
import "./BackOffice.css";
import {
  FaUtensils,
  FaUsers,
  FaComments,
  FaEnvelopeOpenText,
  FaPlusCircle,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

function BackOffice() {
  const [activeTab, setActiveTab] = useState("recettes");

  // === Données FAKE ===
  const fakeRecettes = [
    {
      id: 1,
      nom: "Lasagnes Maison",
      categorie: "Plats principaux",
      auteur: "Adrien",
    },
    { id: 2, nom: "Crêpes Sucrées", categorie: "Desserts", auteur: "Marie" },
    { id: 3, nom: "Salade César", categorie: "Salades", auteur: "Paul" },
  ];

  const fakeUtilisateurs = [
    { id: 1, nom: "Adrien", email: "adrien@mail.com", role: "Admin" },
    { id: 2, nom: "Marie", email: "marie@mail.com", role: "Utilisateur" },
  ];

  const fakeCommentaires = [
    {
      id: 1,
      auteur: "Sophie",
      texte: "Super recette 😍",
      recette: "Lasagnes Maison",
    },
    {
      id: 2,
      auteur: "Léo",
      texte: "Facile et délicieux !",
      recette: "Crêpes Sucrées",
    },
  ];

  const fakeMessages = [
    {
      id: 1,
      nom: "Lucie",
      sujet: "Problème d’affichage",
      message: "La page bug sur mobile...",
    },
    {
      id: 2,
      nom: "Jean",
      sujet: "Suggestion",
      message: "Vous pourriez ajouter une section apéro 🍹",
    },
  ];

  const renderTable = () => {
    switch (activeTab) {
      case "recettes":
        return (
          <div className="bo-table">
            <h2>📖 Gestion des Recettes</h2>
            <button className="btn-ajout">
              <FaPlusCircle /> Ajouter une recette
            </button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Auteur</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fakeRecettes.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.nom}</td>
                    <td>{r.categorie}</td>
                    <td>{r.auteur}</td>
                    <td>
                      <button className="btn-edit">
                        <FaEdit />
                      </button>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "utilisateurs":
        return (
          <div className="bo-table">
            <h2>👥 Gestion des Utilisateurs</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fakeUtilisateurs.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nom}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <button className="btn-edit">
                        <FaEdit />
                      </button>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "commentaires":
        return (
          <div className="bo-table">
            <h2>💬 Gestion des Commentaires</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Auteur</th>
                  <th>Texte</th>
                  <th>Recette</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fakeCommentaires.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.auteur}</td>
                    <td>{c.texte}</td>
                    <td>{c.recette}</td>
                    <td>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "messages":
        return (
          <div className="bo-table">
            <h2>📩 Messages des Utilisateurs</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Sujet</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fakeMessages.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.nom}</td>
                    <td>{m.sujet}</td>
                    <td>{m.message}</td>
                    <td>
                      <button className="btn-delete">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="backoffice-container">
      {/* SIDEBAR */}
      <aside className="bo-sidebar">
        <h2>Back Office</h2>
        <ul>
          <li
            className={activeTab === "recettes" ? "active" : ""}
            onClick={() => setActiveTab("recettes")}
          >
            <FaUtensils /> Recettes
          </li>
          <li
            className={activeTab === "utilisateurs" ? "active" : ""}
            onClick={() => setActiveTab("utilisateurs")}
          >
            <FaUsers /> Utilisateurs
          </li>
          <li
            className={activeTab === "commentaires" ? "active" : ""}
            onClick={() => setActiveTab("commentaires")}
          >
            <FaComments /> Commentaires
          </li>
          <li
            className={activeTab === "messages" ? "active" : ""}
            onClick={() => setActiveTab("messages")}
          >
            <FaEnvelopeOpenText /> Messages
          </li>
        </ul>
      </aside>

      {/* CONTENU */}
      <main className="bo-content">{renderTable()}</main>
    </div>
  );
}

export default BackOffice;
