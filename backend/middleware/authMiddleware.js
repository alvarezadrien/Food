const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware pour vérifier le token JWT et attacher l'utilisateur à la requête
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "Accès refusé : token manquant." });
        }

        const token = authHeader.split(" ")[1];

        // Vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Recherche de l’utilisateur correspondant
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur introuvable." });
        }

        // ✅ Injection de l’utilisateur dans req pour les routes suivantes
        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Erreur authMiddleware :", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Session expirée. Veuillez vous reconnecter." });
        }

        return res.status(401).json({ msg: "Token invalide." });
    }
};

module.exports = authMiddleware;
