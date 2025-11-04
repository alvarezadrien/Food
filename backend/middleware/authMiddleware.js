const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour vérifier et décoder le token JWT
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Accès refusé : token manquant." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur introuvable." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Erreur authMiddleware :", error);
        res.status(401).json({ msg: "Token invalide ou expiré." });
    }
};

module.exports = authMiddleware;
