// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// --- Initialisation ---
const app = express();

// --- Middlewares ---
app.use(express.json());

// --- CORS ---
// Autorise uniquement ton front déployé sur Render
const allowedOrigin = "https://bubu-and-food.onrender.com";

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
    })
);

// --- Routes principales ---
app.get("/", (req, res) => {
    res.json({
        status: "✅ API BubuFood opérationnelle",
        message: "Bienvenue sur l’API officielle de BubuFood",
        endpoints: ["/api/recettes"],
    });
});

// Import des routes (sera créé juste après)
const recetteRoutes = require("./routes/recetteRoutes");
app.use("/api/recettes", recetteRoutes);

// --- Gestion des fichiers statiques si besoin (images, uploads, etc.) ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("🍃 Connecté à MongoDB Atlas avec succès !");
        app.listen(PORT, () => {
            console.log(`🚀 Serveur BubuFood lancé sur le port ${PORT}`);
            console.log(`🌐 Front autorisé : ${allowedOrigin}`);
        });
    })
    .catch((err) => {
        console.error("❌ Erreur de connexion à MongoDB :", err.message);
        process.exit(1);
    });
