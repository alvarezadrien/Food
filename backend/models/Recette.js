// models/Recette.js
const mongoose = require("mongoose");

// ---------------------------------------------
// 🍽️ Modèle Recette — BubuFood (version complète)
// ---------------------------------------------
const recetteSchema = new mongoose.Schema(
    {
        // 🔸 Nom / Titre de la recette
        nom: {
            type: String,
            required: [true, "Le nom de la recette est obligatoire"],
            trim: true,
        },

        // 🔸 Courte description de la recette
        description: {
            type: String,
            required: [true, "La description est obligatoire"],
            trim: true,
        },

        // 🔸 Image principale de la recette
        image: {
            type: String,
            default: "/Images/default.png", // image par défaut
        },

        // 🔸 Catégorie principale (pour affichage par section)
        categorie: {
            type: String,
            enum: [
                "Petit_dejeuner",
                "Entrees",
                "Plats_principaux",
                "Soupes",
                "Salades",
                "Sauces",
                "Snacks_apero",
                "Desserts",
                "Autre",
            ],
            default: "Autre",
        },

        // 🔸 Liste des ingrédients (à développer plus tard)
        ingredients: {
            type: [String],
            default: [],
        },

        // 🔸 Liste des allergènes éventuels
        allergenes: {
            type: [String],
            default: [],
        },

        // 🔸 Durée totale de préparation
        duree: {
            type: String,
            default: "Non précisée",
        },

        // 🔸 Niveau de difficulté
        difficulte: {
            type: String,
            enum: ["Facile", "Moyenne", "Difficile"],
            default: "Facile",
        },

        // 🔸 Nombre de personnes (quantité prévue)
        portions: {
            type: Number,
            default: 2,
        },

        // 🔸 Étapes de préparation (pour l’affichage futur)
        preparation: {
            type: [String],
            default: [],
        },

        // 🔸 Fonctionnalité de partage / likes
        favoris: {
            type: Number,
            default: 0,
        },
        partages: {
            type: Number,
            default: 0,
        },

        // 🔸 Données pour avis (préparées pour plus tard)
        noteMoyenne: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        nombreAvis: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true, // ajoute createdAt et updatedAt
        toJSON: { virtuals: true },
    }
);

// 💡 Champ virtuel “id” pour compatibilité front React
recetteSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// 🔹 Active les virtuals dans les conversions JSON
recetteSchema.set("toObject", { virtuals: true });
recetteSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Recette", recetteSchema);
