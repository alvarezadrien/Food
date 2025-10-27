// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

// --- CORS ---
// 🔹 Autorise ton front Render + ton front local
const allowedOrigins = [
    "https://bubu-and-food.onrender.com", // front déployé sur Render
    "http://localhost:5173", // front local Vite
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Autorise les requêtes sans origine (ex: Postman) ou provenant d'une origine connue
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn("❌ Origine non autorisée :", origin);
                callback(new Error("CORS non autorisé"));
            }
        },
        credentials: true,
    })
);

// --- Route principale ---
app.get("/", (req, res) => {
    res.json({
        status: "✅ API BubuFood opérationnelle",
        message: "Bienvenue sur l’API officielle de BubuFood",
        endpoints: ["/api/recettes", "/api/saisons"],
    });
});

// --- Import des routes ---
const recetteRoutes = require("./routes/recetteRoutes");
const saisonRoutes = require("./routes/saisonRoutes"); // ✅ nouvelle importation

app.use("/api/recettes", recetteRoutes);
app.use("/api/saisons", saisonRoutes); // ✅ nouvelle route connectée

// --- Fichiers statiques ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets/ImagesDb", express.static(path.join(__dirname, "uploads/ImagesDb")));

// --- Middleware global d’erreur ---
app.use((err, req, res, next) => {
    console.error("❌ Erreur serveur :", err);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || "Erreur interne du serveur",
    });
});

// --- Connexion à MongoDB Atlas ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI non défini dans le fichier .env");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("🍃 Connecté à MongoDB Atlas avec succès !");
        app.listen(PORT, () => {
            console.log(`🚀 Serveur BubuFood lancé sur le port ${PORT}`);
            console.log(`🌐 Origines autorisées :`, allowedOrigins);
        });
    })
    .catch((err) => {
        console.error("❌ Erreur de connexion à MongoDB :", err.message);
        process.exit(1);
    });
