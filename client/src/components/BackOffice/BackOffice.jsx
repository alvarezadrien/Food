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
  const apiBase = import.meta.env.VITE_API_URL;

  // ====== Recettes (Réel via API) ======
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Formulaire recette
  const emptyForm = useMemo(
    () => ({
      _id: null,
      nom: "",
      description: "",
      image: "", // contiendra juste le nom de fichier renvoyé par l'upload
      categorie: "Autre",
      ingredients: "", // texte multi-lignes -> sera transformé en array
      allergenes: "", // idem
      duree: "",
      difficulte: "Facile",
      portions: 2,
      preparation: "", // texte multi-lignes -> array
    }),
    []
  );

  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ====== Fake données pour autres onglets (non protégés pour le moment) ======
  const fakeUtilisateurs = [
    { id: 1, nom: "Adrien", email: "adrien@mail.com", role: "Admin" },
    { id: 2, nom: "Ange", email: "Ange@mail.com", role: "Utilisateur" },
  ];
  const fakeCommentaires = [
    { id: 1, auteur: "Sophie", texte: "Super recette 😍", recette: "Lasagnes" },
    { id: 2, auteur: "Léo", texte: "Facile et délicieux !", recette: "Crêpes" },
  ];
  const fakeMessages = [
    { id: 1, nom: "Lucie", sujet: "Affichage", message: "Bug sur mobile..." },
    {
      id: 2,
      nom: "Jean",
      sujet: "Suggestion",
      message: "Ajoutez une section apéro 🍹",
    },
  ];

  // ====== Helpers ======
  const showTempMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const toArrayFromText = (txt) =>
    txt
      ? txt
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  // ====== API calls ======
  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/recettes`);
      if (!res.ok) throw new Error("Erreur de chargement");
      const data = await res.json();
      setRecettes(data.recettes || data.results || []);
    } catch (e) {
      console.error(e);
      showTempMsg("❌ Impossible de charger les recettes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!apiBase) {
      showTempMsg("⚠️ VITE_API_URL manquant");
      return;
    }
    fetchRecettes();
  }, [apiBase]);

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const res = await fetch(`${apiBase}/api/upload-image`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Upload échoué");
      const data = await res.json();
      // data = { filename, url }
      setForm((f) => ({ ...f, image: data.filename }));
      showTempMsg("✅ Image uploadée");
    } catch (e) {
      console.error(e);
      showTempMsg("❌ Upload image échoué");
    } finally {
      setUploading(false);
    }
  };

  const createRecette = async () => {
    const payload = {
      nom: form.nom || "(Sans titre)",
      description: form.description || "",
      image: form.image || "", // juste le nom de fichier
      categorie: form.categorie || "Autre",
      ingredients: toArrayFromText(form.ingredients), // array<string>
      allergenes: toArrayFromText(form.allergenes), // array<string>
      duree: form.duree || "Non précisée",
      difficulte: form.difficulte || "Facile",
      portions: Number(form.portions) || 2,
      preparation: toArrayFromText(form.preparation), // array<string>
    };

    try {
      const res = await fetch(`${apiBase}/api/recettes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Création échouée");
      await fetchRecettes();
      setForm(emptyForm);
      showTempMsg("✅ Recette créée");
    } catch (e) {
      console.error(e);
      showTempMsg("❌ Erreur création recette");
    }
  };

  const updateRecette = async () => {
    const id = form._id;
    if (!id) return;
    const payload = {
      nom: form.nom || "(Sans titre)",
      description: form.description || "",
      image: form.image || "",
      categorie: form.categorie || "Autre",
      ingredients: toArrayFromText(form.ingredients),
      allergenes: toArrayFromText(form.allergenes),
      duree: form.duree || "Non précisée",
      difficulte: form.difficulte || "Facile",
      portions: Number(form.portions) || 2,
      preparation: toArrayFromText(form.preparation),
    };

    try {
      const res = await fetch(`${apiBase}/api/recettes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Mise à jour échouée");
      await fetchRecettes();
      setIsEditing(false);
      setForm(emptyForm);
      showTempMsg("✅ Recette mise à jour");
    } catch (e) {
      console.error(e);
      showTempMsg("❌ Erreur mise à jour");
    }
  };

  const deleteRecette = async (id) => {
    if (!window.confirm("Supprimer cette recette ?")) return;
    try {
      const res = await fetch(`${apiBase}/api/recettes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Suppression échouée");
      setRecettes((prev) => prev.filter((r) => (r._id || r.id) !== id));
      showTempMsg("🗑️ Recette supprimée");
    } catch (e) {
      console.error(e);
      showTempMsg("❌ Erreur suppression");
    }
  };

  const startEdit = (r) => {
    setIsEditing(true);
    setForm({
      _id: r._id || r.id || null,
      nom: r.nom || "",
      description: r.description || "",
      image: r.image || "",
      categorie: r.categorie || "Autre",
      ingredients: Array.isArray(r.ingredients) ? r.ingredients.join("\n") : "",
      allergenes: Array.isArray(r.allergenes) ? r.allergenes.join("\n") : "",
      duree: r.duree || "",
      difficulte: r.difficulte || "Facile",
      portions: r.portions || 2,
      preparation: Array.isArray(r.preparation) ? r.preparation.join("\n") : "",
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setForm(emptyForm);
  };

  // ====== Vues onglets ======
  const RecettesView = () => (
    <div className="bo-recettes">
      <div className="bo-header">
        <h2>📖 Gestion des Recettes</h2>
        <span className="bo-msg">{msg}</span>
      </div>

      {/* Formulaire création / édition */}
      <div className="bo-form">
        <div className="bo-form-row">
          <label>Nom *</label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder="Nom de la recette"
          />
        </div>

        <div className="bo-form-row">
          <label>Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Courte description"
            rows={3}
          />
        </div>

        <div className="bo-form-row">
          <label>Image (upload)</label>
          <div className="bo-upload">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={(e) =>
                e.target.files[0] && uploadImage(e.target.files[0])
              }
              disabled={uploading}
            />
            <button
              className="btn-upload"
              onClick={() => document.getElementById("fileInput").click()}
              disabled={uploading}
            >
              <FaUpload /> {uploading ? "Envoi..." : "Choisir une image"}
            </button>
            <span className="bo-filename">
              {form.image ? `Fichier: ${form.image}` : "Aucun fichier"}
            </span>
          </div>
          {form.image && (
            <img
              className="bo-preview"
              src={
                form.image.startsWith("http")
                  ? form.image
                  : `${apiBase}/assets/ImagesDb/${form.image}`
              }
              alt="aperçu"
              onError={(e) =>
                (e.target.src = `${apiBase}/assets/ImagesDb/default.png`)
              }
            />
          )}
        </div>

        <div className="bo-grid-3">
          <div className="bo-form-row">
            <label>Catégorie</label>
            <select
              value={form.categorie}
              onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="bo-form-row">
            <label>Difficulté</label>
            <select
              value={form.difficulte}
              onChange={(e) => setForm({ ...form, difficulte: e.target.value })}
            >
              {DIFFICULTES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="bo-form-row">
            <label>Portions</label>
            <input
              type="number"
              min={1}
              value={form.portions}
              onChange={(e) =>
                setForm({ ...form, portions: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="bo-grid-2">
          <div className="bo-form-row">
            <label>Durée</label>
            <input
              type="text"
              value={form.duree}
              onChange={(e) => setForm({ ...form, duree: e.target.value })}
              placeholder='ex: "45 min", "20 min + 2h repos"'
            />
          </div>

          <div className="bo-form-row">
            <label>Allergènes (un par ligne)</label>
            <textarea
              rows={3}
              value={form.allergenes}
              onChange={(e) => setForm({ ...form, allergenes: e.target.value })}
            />
          </div>
        </div>

        <div className="bo-form-row">
          <label>Ingrédients (un par ligne)</label>
          <textarea
            rows={5}
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            placeholder='Ex: "Farine 200g"\n"Lait 25cl"\n"Œufs 3"'
          />
        </div>

        <div className="bo-form-row">
          <label>Préparation (une étape par ligne)</label>
          <textarea
            rows={6}
            value={form.preparation}
            onChange={(e) => setForm({ ...form, preparation: e.target.value })}
          />
        </div>

        <div className="bo-actions">
          {isEditing ? (
            <>
              <button className="btn-primary" onClick={updateRecette}>
                <FaSave /> Enregistrer
              </button>
              <button className="btn-secondary" onClick={cancelEdit}>
                <FaTimes /> Annuler
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={createRecette}>
              <FaPlusCircle /> Ajouter la recette
            </button>
          )}
        </div>
      </div>

      {/* Tableau des recettes */}
      <div className="bo-table">
        <div className="bo-table-head">
          <h3>Liste des recettes</h3>
          {loading && <span className="bo-loading">Chargement...</span>}
        </div>
        <table>
          <thead>
            <tr>
              <th>Visuel</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Difficulté</th>
              <th>Durée</th>
              <th>Portions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recettes.map((r) => {
              const id = r._id || r.id;
              const imgSrc = r.image?.startsWith("http")
                ? r.image
                : `${apiBase}/assets/ImagesDb/${r.image || "default.png"}`;
              return (
                <tr key={id}>
                  <td>
                    <img
                      src={imgSrc}
                      alt={r.nom}
                      className="bo-thumb"
                      onError={(e) =>
                        (e.target.src = `${apiBase}/assets/ImagesDb/default.png`)
                      }
                    />
                  </td>
                  <td>{r.nom}</td>
                  <td>{r.categorie}</td>
                  <td>{r.difficulte}</td>
                  <td>{r.duree}</td>
                  <td>{r.portions}</td>
                  <td>
                    <button className="btn-edit" onClick={() => startEdit(r)}>
                      <FaEdit />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteRecette(id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
            {recettes.length === 0 && !loading && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Aucune recette pour l’instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const UtilisateursView = () => (
    <div className="bo-table">
      <h2>👥 Gestion des Utilisateurs</h2>
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
      <h2>💬 Gestion des Commentaires</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Auteur</th>
            <th>Texte</th>
            <th>Recette</th>
          </tr>
        </thead>
        <tbody>
          {fakeCommentaires.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
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
      <h2>📩 Messages des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Sujet</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {fakeMessages.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nom}</td>
              <td>{m.sujet}</td>
              <td>{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
