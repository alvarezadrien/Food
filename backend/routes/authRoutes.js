const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Middleware de sécurité

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
};

// ---------------------------
// 🟢 INSCRIPTION
// ---------------------------
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("🟢 Requête inscription reçue :", req.body);

        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires." });
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
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("❌ Erreur inscription :", error);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
});

// ---------------------------
// 🟠 CONNEXION
// ---------------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🟠 Requête de connexion reçue :", req.body);

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email et mot de passe requis." });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
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

// ---------------------------
// 🔹 GET /:id — Récupérer un utilisateur
// ---------------------------
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable." });
        res.status(200).json(user);
    } catch (error) {
        console.error("❌ Erreur GET utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// ---------------------------
// ✏️ PUT /profile — Mettre à jour le profil (🔒 sécurisé)
// ---------------------------
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user.id; // récupéré depuis le token

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        console.log(`✅ Profil mis à jour pour : ${user.email}`);

        res.status(200).json({
            message: "Profil mis à jour avec succès !",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("❌ Erreur mise à jour profil :", error);
        res
            .status(500)
            .json({ message: "Erreur serveur lors de la mise à jour du profil." });
    }
});

// ---------------------------
// 🔐 PUT /password — Modifier le mot de passe (🔒 sécurisé)
// ---------------------------
router.put("/password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ msg: "Champs manquants." });
        }

        const user = await User.findById(req.user.id).select("+password");
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Mot de passe actuel incorrect." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        console.log(`🔑 Mot de passe mis à jour pour : ${user.email}`);
        res.status(200).json({ msg: "Mot de passe mis à jour avec succès ✅" });
    } catch (error) {
        console.error("❌ Erreur changement de mot de passe :", error);
        res
            .status(500)
            .json({ msg: "Erreur serveur lors du changement de mot de passe." });
    }
});

// ---------------------------
// 🔴 DELETE /:id — Supprimer un utilisateur (🔒 sécurisé)
// ---------------------------
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: "Action non autorisée." });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ message: "Utilisateur introuvable." });

        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("❌ Erreur suppression utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

module.exports = router;
