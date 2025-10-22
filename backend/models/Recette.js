// models/Recette.js
const mongoose = require("mongoose");

// ---------------------------------------------
// 🍽️ Modèle Recette — Compatible CarteFood.jsx
// ---------------------------------------------
const recetteSchema = new mongoose.Schema(
    {
        // ID généré automatiquement par MongoDB (_id)
        titre: {
            type: String,
            required: [true, "Le titre de la recette est obligatoire"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "La description est obligatoire"],
            trim: true,
        },
        image: {
            type: String,
            default: "/Images/default.png", // Chemin d'image par défaut
        },

        // 🔹 Champs optionnels pour extension future
        categorie: {
            type: String,
            default: "Autre",
        },
        ingredients: {
            type: [String],
            default: [],
        },
        tempsPreparation: {
            type: String,
            default: "Non précisé",
        },
        difficulte: {
            type: String,
            default: "Facile",
        },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt
        toJSON: { virtuals: true },
    }
);

// 💡 Création d’un champ virtuel “id” pour coller au front React
recetteSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// 🔹 Active les virtuals aussi lors de la conversion JSON
recetteSchema.set("toObject", { virtuals: true });
recetteSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Recette", recetteSchema);
