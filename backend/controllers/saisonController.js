const Saison = require("../models/Saison");

// 📍 GET toutes les saisons
exports.getAllSaisons = async (req, res) => {
    try {
        const saisons = await Saison.find().sort({ saison: 1 });
        res.json(saisons);
    } catch (error) {
        console.error("❌ Erreur getAllSaisons :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 GET une saison par nom (ex: /api/saisons/saison/Automne)
exports.getBySaisonName = async (req, res) => {
    try {
        const { nom } = req.params;
        const saison = await Saison.findOne({ saison: nom });
        if (!saison)
            return res.status(404).json({ message: "Saison non trouvée" });
        res.json(saison);
    } catch (error) {
        console.error("❌ Erreur getBySaisonName :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 GET une saison selon un mois numérique (ex: /api/saisons/mois/10)
exports.getByMonth = async (req, res) => {
    try {
        const mois = parseInt(req.params.mois);
        if (isNaN(mois) || mois < 1 || mois > 12) {
            return res.status(400).json({ message: "Mois invalide" });
        }

        // ✅ Recherche si le mois est contenu dans le tableau
        const saison = await Saison.findOne({ mois: { $in: [mois] } });
        if (!saison)
            return res
                .status(404)
                .json({ message: "Aucune saison trouvée pour ce mois" });

        res.json(saison);
    } catch (error) {
        console.error("❌ Erreur getByMonth :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 GET la saison actuelle selon la date du jour
exports.getCurrentSaison = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth() + 1; // JS → 0 = janvier
        const saison = await Saison.findOne({ mois: { $in: [currentMonth] } }); // ✅ Recherche dans tableau

        if (!saison)
            return res
                .status(404)
                .json({ message: "Aucune saison actuelle trouvée" });

        res.json(saison);
    } catch (error) {
        console.error("❌ Erreur getCurrentSaison :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 POST créer une saison (admin)
exports.createSaison = async (req, res) => {
    try {
        const { saison, mois, produits, description } = req.body;

        if (!saison || !mois) {
            return res
                .status(400)
                .json({ message: "Les champs 'saison' et 'mois' sont requis" });
        }

        const nouvelleSaison = new Saison({
            saison,
            mois,
            produits: produits || { fruits: [], legumes: [] },
            description: description || "",
        });

        await nouvelleSaison.save();
        res.status(201).json(nouvelleSaison);
    } catch (error) {
        console.error("❌ Erreur createSaison :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 PUT mise à jour d'une saison (admin)
exports.updateSaison = async (req, res) => {
    try {
        const saison = await Saison.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!saison)
            return res.status(404).json({ message: "Saison non trouvée" });

        res.json(saison);
    } catch (error) {
        console.error("❌ Erreur updateSaison :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// 📍 DELETE une saison (admin)
exports.deleteSaison = async (req, res) => {
    try {
        const saison = await Saison.findByIdAndDelete(req.params.id);
        if (!saison)
            return res.status(404).json({ message: "Saison non trouvée" });
        res.json({ message: "Saison supprimée avec succès" });
    } catch (error) {
        console.error("❌ Erreur deleteSaison :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
