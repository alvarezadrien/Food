import React, { useEffect, useState } from "react";
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
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
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
  });

  const [editForm, setEditForm] = useState(null); // null = pas d’édition
  const [showPopup, setShowPopup] = useState(false);

  // === FETCH ===
  const fetchRecettes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/recettes?limit=500`);
      const data = await res.json();
      setRecettes(data.recettes || []);
      setFiltered(data.recettes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiBase) fetchRecettes();
  }, [apiBase]);

  // === RECHERCHE ===
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      recettes.filter(
        (r) =>
          r.nom.toLowerCase().includes(lower) ||
          (r.description && r.description.toLowerCase().includes(lower))
      )
    );
  }, [search, recettes]);

  // === UPLOAD ===
  const uploadImage = async (file, target = "create") => {
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    try {
      const res = await fetch(uploadEndpoint, { method: "POST", body: fd });
      const data = await res.json();
      if (target === "create") {
        setForm((f) => ({ ...f, image: data.filename }));
      } else {
        setEditForm((f) => ({ ...f, image: data.filename }));
      }
      setMsg("✅ Image téléversée !");
    } catch {
      setMsg("❌ Erreur d'upload");
    } finally {
      setUploading(false);
      setTimeout(() => setMsg(""), 2500);
    }
  };

  // === CREATE ===
  const createRecette = async () => {
    const payload = {
      ...form,
      ingredients: form.ingredients.split("\n").filter(Boolean),
      allergenes: form.allergenes.split("\n").filter(Boolean),
      preparation: form.preparation.split("\n").filter(Boolean),
    };
    try {
      await fetch(`${apiBase}/api/recettes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMsg("✅ Recette ajoutée !");
      setForm({
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
      });
      fetchRecettes();
    } catch {
      setMsg("❌ Erreur ajout recette");
    } finally {
      setTimeout(() => setMsg(""), 2500);
    }
  };

  // === UPDATE ===
  const updateRecette = async () => {
    if (!editForm) return;
    const payload = {
      ...editForm,
      ingredients: editForm.ingredients.split("\n").filter(Boolean),
      allergenes: editForm.allergenes.split("\n").filter(Boolean),
      preparation: editForm.preparation.split("\n").filter(Boolean),
    };
    try {
      await fetch(`${apiBase}/api/recettes/${editForm._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      fetchRecettes();
      setShowPopup(false);
      setMsg("✅ Recette modifiée !");
    } catch {
      setMsg("❌ Erreur modification");
    } finally {
      setTimeout(() => setMsg(""), 2500);
    }
  };

  // === DELETE ===
  const deleteRecette = async (id) => {
    if (!window.confirm("Supprimer cette recette ?")) return;
    try {
      await fetch(`${apiBase}/api/recettes/${id}`, { method: "DELETE" });
      fetchRecettes();
      setMsg("🗑️ Supprimé !");
    } catch {
      setMsg("❌ Erreur suppression");
    } finally {
      setTimeout(() => setMsg(""), 2500);
    }
  };

  return (
    <div className="bo-container">
      <aside className="bo-sidebar">
        <h2>BubuFood Admin</h2>
        <ul>
          <li
            className={activeTab === "recettes" ? "active" : ""}
            onClick={() => setActiveTab("recettes")}
          >
            <FaUtensils /> Recettes
          </li>
          <li>
            <FaUsers /> Utilisateurs
          </li>
          <li>
            <FaComments /> Commentaires
          </li>
          <li>
            <FaEnvelopeOpenText /> Messages
          </li>
        </ul>
      </aside>

      <main className="bo-content">
        <header className="bo-header">
          <h1>📚 Gestion des recettes</h1>
          <div className="bo-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <FaTimes />
              </button>
            )}
          </div>
        </header>

        {msg && <div className="bo-message">{msg}</div>}

        <section className="bo-grid">
          {/* FORM CREATION */}
          <div className="bo-card">
            <h3>➕ Nouvelle recette</h3>
            <input
              type="text"
              placeholder="Nom"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
            />
            <textarea
              rows="2"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="bo-row">
              <select
                value={form.categorie}
                onChange={(e) =>
                  setForm({ ...form, categorie: e.target.value })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={form.difficulte}
                onChange={(e) =>
                  setForm({ ...form, difficulte: e.target.value })
                }
              >
                {DIFFICULTES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Durée (ex : 45 min)"
              value={form.duree}
              onChange={(e) => setForm({ ...form, duree: e.target.value })}
            />
            <input
              type="number"
              placeholder="Portions"
              min="1"
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
              rows="3"
              placeholder="Ingrédients (un par ligne)"
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
            />
            <textarea
              rows="3"
              placeholder="Préparation (une étape par ligne)"
              value={form.preparation}
              onChange={(e) =>
                setForm({ ...form, preparation: e.target.value })
              }
            />

            <div className="bo-upload">
              <input
                type="file"
                id="createFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files[0] && uploadImage(e.target.files[0], "create")
                }
              />
              <button
                className="btn-upload"
                onClick={() => document.getElementById("createFile").click()}
                disabled={uploading}
              >
                <FaUpload /> {uploading ? "Envoi..." : "Téléverser une image"}
              </button>
            </div>

            {form.image && (
              <img
                src={`${apiBase}/assets/ImagesDb/${form.image}`}
                alt="preview"
                className="bo-preview"
              />
            )}

            <button className="btn-add" onClick={createRecette}>
              <FaPlusCircle /> Ajouter
            </button>
          </div>

          {/* TABLE */}
          <div className="bo-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Durée</th>
                  <th>Difficulté</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
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
                          setEditForm({
                            ...r,
                            ingredients: (r.ingredients || []).join("\n"),
                            allergenes: (r.allergenes || []).join("\n"),
                            preparation: (r.preparation || []).join("\n"),
                          });
                          setShowPopup(true);
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
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* === POPUP EDITION === */}
      {showPopup && editForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              <FaTimes />
            </button>
            <h2>✏️ Modifier la recette</h2>

            <input
              type="text"
              value={editForm.nom}
              onChange={(e) =>
                setEditForm({ ...editForm, nom: e.target.value })
              }
            />
            <textarea
              rows="2"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />

            <div className="bo-row">
              <select
                value={editForm.categorie}
                onChange={(e) =>
                  setEditForm({ ...editForm, categorie: e.target.value })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select
                value={editForm.difficulte}
                onChange={(e) =>
                  setEditForm({ ...editForm, difficulte: e.target.value })
                }
              >
                {DIFFICULTES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <textarea
              rows="3"
              value={editForm.ingredients}
              onChange={(e) =>
                setEditForm({ ...editForm, ingredients: e.target.value })
              }
            />
            <textarea
              rows="3"
              value={editForm.allergenes}
              onChange={(e) =>
                setEditForm({ ...editForm, allergenes: e.target.value })
              }
            />
            <textarea
              rows="3"
              value={editForm.preparation}
              onChange={(e) =>
                setEditForm({ ...editForm, preparation: e.target.value })
              }
            />

            <div className="bo-upload">
              <input
                type="file"
                id="editFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files[0] && uploadImage(e.target.files[0], "edit")
                }
              />
              <button
                className="btn-upload"
                onClick={() => document.getElementById("editFile").click()}
              >
                <FaUpload /> Changer l’image
              </button>
            </div>
            {editForm.image && (
              <img
                src={`${apiBase}/assets/ImagesDb/${editForm.image}`}
                alt="preview"
                className="bo-preview"
              />
            )}
            <button className="btn-save" onClick={updateRecette}>
              <FaSave /> Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackOffice;
