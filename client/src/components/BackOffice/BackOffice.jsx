import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const apiBase = import.meta.env.VITE_API_URL;
  const uploadEndpoint = `${apiBase}/api/upload-image`;

  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const scrollRef = useRef(null);

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

  // Messages temporaires
  const showTempMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(""), 2500);
  };

  const toArray = (text) =>
    text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/recettes?limit=500`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecettes(data.recettes || []);
    } catch {
      showTempMsg("❌ Impossible de charger les recettes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiBase) fetchRecettes();
  }, [apiBase]);

  // Upload image avec sauvegarde auto
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);

    try {
      const res = await fetch(uploadEndpoint, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Erreur upload");
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.filename }));
      showTempMsg("✅ Image enregistrée !");
      if (isEditing) {
        await updateRecette({ ...form, image: data.filename }, true);
      }
    } catch (err) {
      console.error("❌ Upload :", err);
      showTempMsg("❌ Erreur upload", "error");
    } finally {
      setUploading(false);
    }
  };

  // CRUD
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
      showTempMsg("❌ Erreur ajout recette", "error");
    }
  };

  const updateRecette = async (updated = form, silent = false) => {
    if (!updated._id && !form._id) return;
    const payload = {
      ...updated,
      ingredients: toArray(updated.ingredients),
      allergenes: toArray(updated.allergenes),
      preparation: toArray(updated.preparation),
    };
    try {
      const res = await fetch(
        `${apiBase}/api/recettes/${updated._id || form._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error();
      await fetchRecettes();
      if (!silent) {
        showTempMsg("✅ Recette mise à jour !");
      }
    } catch {
      showTempMsg("❌ Erreur maj recette", "error");
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
      showTempMsg("❌ Erreur suppression", "error");
    }
  };

  const recettesFiltrees = useMemo(() => {
    if (!q) return recettes;
    const needle = q.toLowerCase();
    return recettes.filter(
      (r) =>
        (r.nom || "").toLowerCase().includes(needle) ||
        (r.description || "").toLowerCase().includes(needle)
    );
  }, [recettes, q]);

  const RecettesView = () => (
    <div className="bo-recettes" ref={scrollRef}>
      <div className="bo-header">
        <h2>📖 Gestion des recettes</h2>
        {msg && (
          <span
            className={`bo-toast ${msg.type === "error" ? "error" : "success"}`}
          >
            {msg.text}
          </span>
        )}
      </div>

      <div className="bo-top">
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
        <button className="btn-primary" onClick={createRecette}>
          <FaPlusCircle /> Nouvelle recette
        </button>
      </div>

      <div className="bo-flex">
        <div className="bo-form">
          <h3>{isEditing ? "Modifier la recette" : "Nouvelle recette"}</h3>
          <input
            type="text"
            placeholder="Nom de la recette"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
          <textarea
            rows="2"
            placeholder="Courte description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="bo-upload">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files[0] && uploadImage(e.target.files[0])
              }
              style={{ display: "none" }}
            />
            <button
              className="btn-upload"
              onClick={() => document.getElementById("fileInput").click()}
              disabled={uploading}
            >
              <FaUpload /> {uploading ? "Envoi..." : "Choisir une image"}
            </button>
            <span>{form.image || "Aucune image"}</span>
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

          <div className="bo-grid-2">
            <select
              value={form.categorie}
              onChange={(e) => setForm({ ...form, categorie: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={form.difficulte}
              onChange={(e) => setForm({ ...form, difficulte: e.target.value })}
            >
              {DIFFICULTES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Durée ex: 45 min"
            value={form.duree}
            onChange={(e) => setForm({ ...form, duree: e.target.value })}
          />
          <input
            type="number"
            min="1"
            placeholder="Portions"
            value={form.portions}
            onChange={(e) => setForm({ ...form, portions: e.target.value })}
          />

          <textarea
            rows="3"
            placeholder="Allergènes (un par ligne)"
            value={form.allergenes}
            onChange={(e) => setForm({ ...form, allergenes: e.target.value })}
          />
          <textarea
            rows="4"
            placeholder="Ingrédients (un par ligne)"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          />
          <textarea
            rows="4"
            placeholder="Préparation (une étape par ligne)"
            value={form.preparation}
            onChange={(e) => setForm({ ...form, preparation: e.target.value })}
          />

          {isEditing && (
            <button className="btn-save" onClick={updateRecette}>
              <FaSave /> Sauvegarder
            </button>
          )}
        </div>

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
                  <td colSpan="6">Aucune recette trouvée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
      </main>
    </div>
  );
}

export default BackOffice;
