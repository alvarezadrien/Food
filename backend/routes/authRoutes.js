// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

// ---------------------------
// 🟢 Route d'inscription
// ---------------------------
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("🟢 Requête inscription reçue :", req.body);

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        console.log("✅ Nouvel utilisateur créé :", newUser.email);

        res.status(201).json({
            message: "Inscription réussie ! Vous pouvez vous connecter.",
            user: { id: newUser._id, username: newUser.username, email: newUser.email },
        });
    } catch (error) {
        console.error("❌ Erreur inscription :", error);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
});

// ---------------------------
// 🟠 Route de connexion
// ---------------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🟠 Requête de connexion reçue :", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis." });
        }

        const user = await User.findOne({ email }).select("+password");
        console.log("🔍 Utilisateur trouvé :", user ? user.email : "aucun");

        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        console.log("🧩 Vérification du mot de passe...");
        const isMatch = await bcrypt.compare(password, user.password || "");

        console.log("🔒 Résultat comparaison bcrypt:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect." });
        }

        const token = createToken(user._id);

        console.log("✅ Connexion réussie pour :", user.email);

        res.status(200).json({
            message: "Connexion réussie !",
            token,
            id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.error("❌ Erreur connexion :", error);
        res.status(500).json({ message: "Erreur serveur lors de la connexion." });
    }
});

module.exports = router;
