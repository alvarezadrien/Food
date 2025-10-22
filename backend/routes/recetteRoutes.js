// routes/recetteRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
    getAllRecettes,
    getRecetteById,
    createRecette,
    updateRecette,
    deleteRecette,
    searchRecettes,
} = require("../controllers/recetteController");

// ---------------------------------------------
// 📘 ROUTES RECETTES — BUBUFOOD API
// ---------------------------------------------

// ✅ GET toutes les recettes avec pagination & filtres optionnels
// Exemple : GET /api/recettes?page=2&limit=10&categorie=Végétarien
router.get("/", getAllRecettes);

// 🔍 Recherche de recettes par titre ou description
// Exemple : GET /api/recettes/search?q=poulet
router.get("/search", searchRecettes);

// ✅ GET une seule recette par ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    // Vérifie si l'ID est valide avant d’appeler le contrôleur
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: true, message: "ID de recette invalide" });
    }

    try {
        await getRecetteById(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ POST — Ajouter une nouvelle recette
// Exemple body JSON : { titre, description, image, categorie, ingredients }
router.post("/", async (req, res, next) => {
    try {
        await createRecette(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ PUT — Modifier une recette
router.put("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: true, message: "ID de recette invalide" });
    }

    try {
        await updateRecette(req, res);
    } catch (err) {
        next(err);
    }
});

// ✅ DELETE — Supprimer une recette
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: true, message: "ID de recette invalide" });
    }

    try {
        await deleteRecette(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
