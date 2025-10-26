const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Saison = require("./models/Saison");

dotenv.config();

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch((err) => console.error("❌ Erreur connexion MongoDB :", err));

const saisonsData = [
    {
        saison: "Printemps",
        mois: [3, 4, 5],
        description:
            "Le printemps est la saison du renouveau 🌸. Les étals se remplissent de légumes verts et de fruits frais qui marquent le retour des beaux jours.",
        produits: {
            legumes: [
                { nom: "Asperge", emoji: "🥦" },
                { nom: "Artichaut", emoji: "🌿" },
                { nom: "Radis", emoji: "🌸" },
                { nom: "Petit pois", emoji: "🟢" },
                { nom: "Carotte nouvelle", emoji: "🥕" },
                { nom: "Épinard", emoji: "🍃" },
            ],
            fruits: [
                { nom: "Fraise", emoji: "🍓" },
                { nom: "Cerise", emoji: "🍒" },
                { nom: "Abricot", emoji: "🍑" },
                { nom: "Rhubarbe", emoji: "🌿" },
            ],
        },
    },
    {
        saison: "Été",
        mois: [6, 7, 8],
        description:
            "L’été est la saison des barbecues, des salades colorées et des fruits juteux ☀️. C’est le moment idéal pour des repas frais et ensoleillés.",
        produits: {
            legumes: [
                { nom: "Tomate", emoji: "🍅" },
                { nom: "Courgette", emoji: "🥒" },
                { nom: "Aubergine", emoji: "🍆" },
                { nom: "Poivron", emoji: "🫑" },
                { nom: "Concombre", emoji: "🥒" },
            ],
            fruits: [
                { nom: "Pastèque", emoji: "🍉" },
                { nom: "Melon", emoji: "🍈" },
                { nom: "Pêche", emoji: "🍑" },
                { nom: "Prune", emoji: "🟣" },
                { nom: "Framboise", emoji: "🍇" },
            ],
        },
    },
    {
        saison: "Automne",
        mois: [9, 10, 11],
        description:
            "L’automne 🍂 apporte des saveurs réconfortantes et des couleurs chaudes. Les potirons et les pommes envahissent nos cuisines.",
        produits: {
            legumes: [
                { nom: "Potiron", emoji: "🎃" },
                { nom: "Butternut", emoji: "🥣" },
                { nom: "Chou de Bruxelles", emoji: "🥬" },
                { nom: "Panais", emoji: "🥕" },
                { nom: "Poireau", emoji: "🧅" },
            ],
            fruits: [
                { nom: "Pomme", emoji: "🍏" },
                { nom: "Poire", emoji: "🍐" },
                { nom: "Raisin", emoji: "🍇" },
                { nom: "Châtaigne", emoji: "🌰" },
                { nom: "Figue", emoji: "🟣" },
            ],
        },
    },
    {
        saison: "Hiver",
        mois: [12, 1, 2],
        description:
            "L’hiver ❄️ est la saison des plats mijotés et des légumes racines. Les fruits d’agrumes apportent un peu de soleil dans les assiettes.",
        produits: {
            legumes: [
                { nom: "Chou", emoji: "🥬" },
                { nom: "Carotte", emoji: "🥕" },
                { nom: "Navet", emoji: "🤍" },
                { nom: "Poireau", emoji: "🧅" },
                { nom: "Céleri-rave", emoji: "🥔" },
            ],
            fruits: [
                { nom: "Orange", emoji: "🍊" },
                { nom: "Clémentine", emoji: "🍊" },
                { nom: "Pomme", emoji: "🍏" },
                { nom: "Poire", emoji: "🍐" },
                { nom: "Kiwi", emoji: "🥝" },
            ],
        },
    },
];

async function seedSaisons() {
    try {
        await Saison.deleteMany({});
        console.log("🗑️ Anciennes saisons supprimées");

        await Saison.insertMany(saisonsData);
        console.log("✅ Nouvelles saisons ajoutées avec succès");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Erreur lors du seeding :", error);
        mongoose.connection.close();
    }
}

seedSaisons();
