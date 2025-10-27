import React, { useEffect, useMemo, useState } from "react";
import "./BackOffice.css";
import {
  FaUtensils,
  FaUsers,
  FaComments,
  FaEnvelopeOpenText,
  FaPlusCircle,
  FaTrashAlt,
  FaEdit,
  FaUpload,
  FaSave,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

const CATEGORIES = [
  "Petit_dejeuner",
  "Entrees",
  "Plats_principaux",
  "Soupes",
  "Salades",
  "Sauces",
  "Snacks_apero",
  "Desserts",
  "Autre",
];

const DIFFICULTES = ["Facile", "Moyenne", "Difficile"];

function BackOffice() {
  const [activeTab, setActiveTab] = useState("recettes");
  const apiBase = import.meta.env.VITE_API_URL; // ex: https://bubufood.onrender.com
  const uploadEndpoint = `${apiBase}/api/upload-image`;

  // === États ===
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // === Formulaire recette ===
  const emptyForm = useMemo(
    () => ({
      _id: null,
      nom: "",
      description: "",
      image: "",
      categorie: "Autre",
      ingredients: "",
      allergenes: "",
      duree: "",
      difficulte: "Facile",
      portions: 2,
      preparation: "",
    }),
    []
  );

  const [form, setForm] = useState(emptyForm);

  // === Données fictives pour les autres onglets ===
  const fakeUtilisateurs = [
    { id: 1, nom: "Adrien", email: "adrien@mail.com", role: "Admin" },
    { id: 2, nom: "Ange", email: "ange@mail.com", role: "Utilisateur" },
  ];
  const fakeCommentaires = [
    { id: 1, auteur: "Sophie", texte: "Super recette 😍", recette: "Lasagnes" },
    { id: 2, auteur: "Léo", texte: "Facile et délicieux !", recette: "Crêpes" },
  ];
  const fakeMessages = [
    {
      id: 1,
      nom: "Lucie",
      sujet: "Bug mobile",
      message: "Affichage décalé sur téléphone.",
    },
    {
      id: 2,
      nom: "Jean",
      sujet: "Suggestion",
      message: "Ajoutez une catégorie apéritif 🍹",
    },
  ];

  // === Fonctions utilitaires ===
  const showTempMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const toArray = (text) =>
    text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  // === API ===
  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/recettes?limit=500`);
      if (!res.ok) throw new Error("Erreur API");
      const data = await res.json();
      setRecettes(data.recettes || []);
    } catch (err) {
      console.error("❌ Erreur chargement :", err);
      showTempMsg("❌ Impossible de charger les recettes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apiBase) return;
    fetchRecettes();
  }, [apiBase]);

  // === Upload image ===
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);

    try {
      const res = await fetch(uploadEndpoint, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Erreur upload");
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.filename }));
      showTempMsg("✅ Image uploadée !");
    } catch (err) {
      console.error(err);
      showTempMsg("❌ Upload échoué");
    } finally {
      setUploading(false);
    }
  };

  // === CRUD ===
  const createRecette = async () => {
    const payload = {
      nom: form.nom,
      description: form.description,
      image: form.image,
      categorie: form.categorie,
      ingredients: toArray(form.ingredients),
      allergenes: toArray(form.allergenes),
      duree: form.duree,
      difficulte: form.difficulte,
      portions: form.portions,
      preparation: toArray(form.preparation),
    };

    try {
      const res = await fetch(`${apiBase}/api/recettes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      await fetchRecettes();
      setForm(emptyForm);
      showTempMsg("✅ Recette ajoutée !");
    } catch {
      showTempMsg("❌ Erreur ajout recette");
    }
  };

  const updateRecette = async () => {
    if (!form._id) return;
    const payload = {
      ...form,
      ingredients: toArray(form.ingredients),
      allergenes: toArray(form.allergenes),
      preparation: toArray(form.preparation),
    };

    try {
      const res = await fetch(`${apiBase}/api/recettes/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      await fetchRecettes();
      setForm(emptyForm);
      setIsEditing(false);
      showTempMsg("✅ Recette mise à jour !");
    } catch {
      showTempMsg("❌ Erreur maj recette");
    }
  };

  const deleteRecette = async (id) => {
    if (!window.confirm("Supprimer cette recette ?")) return;
    try {
      const res = await fetch(`${apiBase}/api/recettes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setRecettes((prev) => prev.filter((r) => r._id !== id));
      showTempMsg("🗑️ Recette supprimée");
    } catch {
      showTempMsg("❌ Erreur suppression");
    }
  };

  // === Filtrage local ===
  const recettesFiltrees = useMemo(() => {
    if (!q) return recettes;
    const needle = q.toLowerCase();
    return recettes.filter(
      (r) =>
        (r.nom || "").toLowerCase().includes(needle) ||
        (r.description || "").toLowerCase().includes(needle)
    );
  }, [recettes, q]);

  // === Vue principale ===
  const RecettesView = () => (
    <div className="bo-recettes">
      <div className="bo-header">
        <h2>📖 Gestion des recettes</h2>
        <span className="bo-msg">{msg}</span>
      </div>

      {/* Recherche */}
      <div className="bo-searchbar">
        <FaSearch />
        <input
          type="text"
          value={q}
          placeholder="Rechercher une recette..."
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button onClick={() => setQ("")}>
            <FaTimes />
          </button>
        )}
      </div>

      {/* Formulaire */}
      <div className="bo-form">
        <label>Nom *</label>
        <input
          type="text"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />

        <label>Description *</label>
        <textarea
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Image</label>
        <div className="bo-upload">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files[0] && uploadImage(e.target.files[0])
            }
          />
          <button
            className="btn-upload"
            onClick={() => document.getElementById("fileInput").click()}
            disabled={uploading}
          >
            <FaUpload /> {uploading ? "Envoi..." : "Choisir une image"}
          </button>
          <span>{form.image || "Aucun fichier"}</span>
        </div>

        {form.image && (
          <img
            src={`${apiBase}/assets/ImagesDb/${form.image}`}
            alt="preview"
            className="bo-preview"
            onError={(e) =>
              (e.target.src = `${apiBase}/assets/ImagesDb/default.png`)
            }
          />
        )}

        <div className="bo-grid-3">
          <div>
            <label>Catégorie</label>
            <select
              value={form.categorie}
              onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Difficulté</label>
            <select
              value={form.difficulte}
              onChange={(e) => setForm({ ...form, difficulte: e.target.value })}
            >
              {DIFFICULTES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Portions</label>
            <input
              type="number"
              value={form.portions}
              min={1}
              onChange={(e) => setForm({ ...form, portions: e.target.value })}
            />
          </div>
        </div>

        <label>Durée</label>
        <input
          type="text"
          value={form.duree}
          onChange={(e) => setForm({ ...form, duree: e.target.value })}
          placeholder="ex: 45 min"
        />

        <label>Allergènes (un par ligne)</label>
        <textarea
          rows="3"
          value={form.allergenes}
          onChange={(e) => setForm({ ...form, allergenes: e.target.value })}
        />

        <label>Ingrédients (un par ligne)</label>
        <textarea
          rows="4"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />

        <label>Préparation (une étape par ligne)</label>
        <textarea
          rows="5"
          value={form.preparation}
          onChange={(e) => setForm({ ...form, preparation: e.target.value })}
        />

        <div className="bo-actions">
          {isEditing ? (
            <>
              <button className="btn-primary" onClick={updateRecette}>
                <FaSave /> Enregistrer
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setForm(emptyForm);
                }}
              >
                <FaTimes /> Annuler
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={createRecette}>
              <FaPlusCircle /> Ajouter
            </button>
          )}
        </div>
      </div>

      {/* Tableau */}
      <div className="bo-table">
        <table>
          <thead>
            <tr>
              <th>Visuel</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Difficulté</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recettesFiltrees.map((r) => (
              <tr key={r._id}>
                <td>
                  <img
                    src={
                      r.image
                        ? `${apiBase}/assets/ImagesDb/${r.image}`
                        : `${apiBase}/assets/ImagesDb/default.png`
                    }
                    alt={r.nom}
                    className="bo-thumb"
                  />
                </td>
                <td>{r.nom}</td>
                <td>{r.categorie}</td>
                <td>{r.duree}</td>
                <td>{r.difficulte}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setIsEditing(true);
                      setForm({
                        ...r,
                        ingredients: (r.ingredients || []).join("\n"),
                        allergenes: (r.allergenes || []).join("\n"),
                        preparation: (r.preparation || []).join("\n"),
                      });
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteRecette(r._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && recettesFiltrees.length === 0 && (
              <tr>
                <td colSpan={6}>Aucune recette trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // === Autres vues ===
  const UtilisateursView = () => (
    <div className="bo-table">
      <h2>👥 Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {fakeUtilisateurs.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nom}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const CommentairesView = () => (
    <div className="bo-table">
      <h2>💬 Commentaires</h2>
      <table>
        <thead>
          <tr>
            <th>Auteur</th>
            <th>Texte</th>
            <th>Recette</th>
          </tr>
        </thead>
        <tbody>
          {fakeCommentaires.map((c) => (
            <tr key={c.id}>
              <td>{c.auteur}</td>
              <td>{c.texte}</td>
              <td>{c.recette}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const MessagesView = () => (
    <div className="bo-table">
      <h2>📩 Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Sujet</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {fakeMessages.map((m) => (
            <tr key={m.id}>
              <td>{m.nom}</td>
              <td>{m.sujet}</td>
              <td>{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // === Rendu principal ===
  return (
    <div className="backoffice-container">
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

      <main className="bo-content">
        {activeTab === "recettes" && <RecettesView />}
        {activeTab === "utilisateurs" && <UtilisateursView />}
        {activeTab === "commentaires" && <CommentairesView />}
        {activeTab === "messages" && <MessagesView />}
      </main>
    </div>
  );
}

export default BackOffice;
