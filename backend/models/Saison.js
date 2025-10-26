const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema(
    {
        nom: { type: String, required: true, trim: true },
        emoji: { type: String, default: "" },      // optionnel : "🥦", "🍎", etc.
        image: { type: String, default: "" },      // optionnel : URL/chemin d'image
    },
    { _id: false }
);

const saisonSchema = new mongoose.Schema(
    {
        // Ex: "Automne", "Hiver", "Printemps", "Été"
        saison: {
            type: String,
            enum: ["Printemps", "Été", "Automne", "Hiver"],
            required: true,
            trim: true,
        },

        // Mois couverts par cet enregistrement (1=janvier … 12=décembre)
        // Ex: Automne = [9,10,11]
        mois: {
            type: [Number],
            validate: {
                validator: (arr) => arr.every((m) => m >= 1 && m <= 12),
                message: "Les mois doivent être des entiers entre 1 et 12.",
            },
            required: true,
        },

        // Année spécifique si tu veux affiner (optionnel)
        annee: {
            type: Number,
            default: null,
        },

        // Produits de saison
        produits: {
            fruits: { type: [produitSchema], default: [] },
            legumes: { type: [produitSchema], default: [] },
        },

        // Texte libre (optionnel) pour un petit éditorial
        description: { type: String, default: "" },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

// Virtual id pour le front
saisonSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

// Petits indexes utiles : rechercher par mois ou saison
saisonSchema.index({ saison: 1 });
saisonSchema.index({ mois: 1 });
saisonSchema.index({ annee: 1 });

module.exports = mongoose.model("Saison", saisonSchema);
