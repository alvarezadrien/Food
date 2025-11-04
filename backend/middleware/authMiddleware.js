const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware d'authentification global
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Accès refusé : token manquant." });
        }

        const token = authHeader.split(" ")[1];

        // Vérification du token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                console.warn("⚠️ Token expiré détecté.");
                return res
                    .status(401)
                    .json({ msg: "Session expirée. Veuillez vous reconnecter." });
            } else if (error.name === "JsonWebTokenError") {
                console.warn("⚠️ Token invalide détecté.");
                return res.status(401).json({ msg: "Token invalide." });
            } else {
                console.error("❌ Erreur JWT inconnue :", error);
                return res
                    .status(401)
                    .json({ msg: "Erreur d'authentification inconnue." });
            }
        }

        // Recherche de l'utilisateur
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur introuvable." });
        }

        // ✅ Injection de l'utilisateur dans la requête
        req.user = user;

        next();
    } catch (error) {
        console.error("❌ Erreur authMiddleware :", error.message);
        res.status(500).json({ msg: "Erreur interne du middleware d'authentification." });
    }
};

module.exports = authMiddleware;
