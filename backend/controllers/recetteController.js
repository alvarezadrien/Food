// controllers/recetteController.js
const Recette = require("../models/Recette");

// ---------------------------------------------
// 🎯 Contrôleurs Recettes — BubuFood API
// ---------------------------------------------

// ✅ 1. Récupérer toutes les recettes avec pagination + filtres
exports.getAllRecettes = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, categorie } = req.query;
        const filter = {};

        if (categorie) {
            filter.categorie = categorie;
        }

        const total = await Recette.countDocuments(filter);
        const recettes = await Recette.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            recettes,
        });
    } catch (err) {
        next(err);
    }
};

// ✅ 2. Recherche de recettes (par nom ou description)
exports.searchRecettes = async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q)
            return res
                .status(400)
                .json({ message: "Paramètre de recherche manquant." });

        const results = await Recette.find({
            $or: [
                { nom: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ],
        });

        res.status(200).json({ results });
    } catch (err) {
        next(err);
    }
};

// ✅ 3. Récupérer une seule recette par ID
exports.getRecetteById = async (req, res, next) => {
    try {
        const recette = await Recette.findById(req.params.id);
        if (!recette) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }
        res.status(200).json(recette);
    } catch (err) {
        next(err);
    }
};

// ✅ 4. Créer une nouvelle recette
exports.createRecette = async (req, res, next) => {
    try {
        const {
            nom,
            description,
            image,
            categorie,
            ingredients,
            allergenes,
            duree,
            difficulte,
            portions,
            preparation,
        } = req.body;

        if (!nom || !description) {
            return res
                .status(400)
                .json({ message: "Le nom et la description sont requis." });
        }

        const nouvelleRecette = new Recette({
            nom,
            description,
            image: image || "/Images/default.png",
            categorie: categorie || "Autre",
            ingredients: ingredients || [],
            allergenes: allergenes || [],
            duree: duree || "Non précisée",
            difficulte: difficulte || "Facile",
            portions: portions || 2,
            preparation: preparation || [],
        });

        const recetteSauvee = await nouvelleRecette.save();

        res.status(201).json({
            message: "Recette ajoutée avec succès 🍽️",
            recette: recetteSauvee,
        });
    } catch (err) {
        next(err);
    }
};

// ✅ 5. Mettre à jour une recette existante
exports.updateRecette = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recetteMaj = await Recette.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!recetteMaj) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        res.status(200).json({
            message: "Recette mise à jour avec succès ✅",
            recette: recetteMaj,
        });
    } catch (err) {
        next(err);
    }
};

// ✅ 6. Supprimer une recette
exports.deleteRecette = async (req, res, next) => {
    try {
        const { id } = req.params;
        const recetteSupprimee = await Recette.findByIdAndDelete(id);

        if (!recetteSupprimee) {
            return res.status(404).json({ message: "Recette non trouvée" });
        }

        res.status(200).json({ message: "Recette supprimée avec succès 🗑️" });
    } catch (err) {
        next(err);
    }
};
