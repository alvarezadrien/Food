const express = require("express");
const router = express.Router();
const saisonController = require("../controllers/saisonController");

// 📍 Routes publiques
router.get("/", saisonController.getAllSaisons);
router.get("/saison/:nom", saisonController.getBySaisonName);
router.get("/mois/:mois", saisonController.getByMonth);
router.get("/actuelle", saisonController.getCurrentSaison);

// 📍 Routes admin (à protéger plus tard avec middleware d’auth)
router.post("/", saisonController.createSaison);
router.put("/:id", saisonController.updateSaison);
router.delete("/:id", saisonController.deleteSaison);

module.exports = router;
