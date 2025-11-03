// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(express.json());

// --- CORS ---
// 🔹 Autorise ton front Render + ton front local
const allowedOrigins = [
    "https://bubu-and-food.onrender.com", // ton front Render
    "http://localhost:5173", // ton front local
];

app.use(
    cors({
        origin: (origin, callback) => {
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
        endpoints: [
            "/api/auth",
            "/api/recettes",
            "/api/saisons",
            "/api/upload-image",
        ],
    });
});

// --- Import des routes ---
const authRoutes = require("./routes/authRoutes");
const recetteRoutes = require("./routes/recetteRoutes");
const saisonRoutes = require("./routes/saisonRoutes");

// --- Utilisation des routes ---
app.use("/api/auth", authRoutes); // ✅ Nouvelle route d'authentification
app.use("/api/recettes", recetteRoutes);
app.use("/api/saisons", saisonRoutes);

// --- Configuration du dossier uploads ---
const UPLOAD_ROOT = path.join(__dirname, "uploads");
const IMAGES_DB_DIR = path.join(UPLOAD_ROOT, "ImagesDb");

// Crée automatiquement le dossier si nécessaire
fs.mkdirSync(IMAGES_DB_DIR, { recursive: true });

// Sert les fichiers statiques
app.use("/uploads", express.static(UPLOAD_ROOT));
app.use("/assets/ImagesDb", express.static(IMAGES_DB_DIR));

// --- Multer : stockage et filtrage des fichiers ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGES_DB_DIR);
    },
    filename: (req, file, cb) => {
        const original = file.originalname.replace(/\s+/g, "_");
        const ext = path.extname(original).toLowerCase();
        const base = path.basename(original, ext);
        const filename = `${Date.now()}-${base}${ext}`;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else
        cb(
            new Error(
                "Format non supporté (seuls PNG, JPG, WEBP, GIF autorisés)"
            ),
            false
        );
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // max 5 Mo
});

// --- Nouvelle route : upload d'image ---
app.post("/api/upload-image", (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("❌ Erreur upload :", err);
            return res.status(400).json({ error: true, message: err.message });
        }

        if (!req.file) {
            return res
                .status(400)
                .json({ error: true, message: "Aucun fichier reçu." });
        }

        const filename = req.file.filename;
        const url = `${req.protocol}://${req.get("host")}/assets/ImagesDb/${filename}`;
        res.json({ filename, url });
    });
});

// --- Middleware global d’erreur ---
app.use((err, req, res, next) => {
    console.error("❌ Erreur serveur :", err);
    res.status(err.status || 500).json({
        error: true,
        message: err.message || "Erreur interne du serveur",
    });
});

// --- Connexion MongoDB ---
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
            console.log(`📁 Dossier images : ${IMAGES_DB_DIR}`);
        });
    })
    .catch((err) => {
        console.error("❌ Erreur de connexion MongoDB :", err.message);
        process.exit(1);
    });
