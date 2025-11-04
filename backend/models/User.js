// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Le nom d'utilisateur est requis"],
            minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"],
            maxlength: [20, "Le nom d'utilisateur doit contenir au maximum 20 caractères"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "L'email est requis"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: (v) => validator.isEmail(v),
                message: "Veuillez fournir un email valide",
            },
        },
        password: {
            type: String,
            required: [true, "Le mot de passe est requis"],
            minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
            maxlength: [128, "Le mot de passe est trop long"],
            select: false, // ne jamais renvoyer le password par défaut
        },
    },
    { timestamps: true }
);

// 🔹 Hash du mot de passe avant enregistrement (une seule fois)
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// 🔹 Méthode pour comparer un mot de passe
userSchema.methods.comparePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

// 🔹 Nettoyage de la sortie JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model("User", userSchema);
