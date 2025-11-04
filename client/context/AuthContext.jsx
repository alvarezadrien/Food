import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL || "https://food-jllh.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Fonction pour décoder un token JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("❌ Erreur décodage JWT :", err);
      return {};
    }
  };

  // 🔹 Charger user et token depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const decoded = parseJwt(storedToken);

      // Vérifie si le token a expiré
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("⚠️ Token expiré. Déconnexion automatique.");
        logout();
      } else {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }

    setLoading(false);
  }, []);

  /* ============================================================
     ✅ Connexion utilisateur
  ============================================================ */
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.msg || data.message || "Erreur de connexion");

      // Stocke le token et les infos utilisateur
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          username: data.username,
          email: data.email,
        })
      );

      setUser({ id: data.id, username: data.username, email: data.email });
      setToken(data.token);

      return data;
    } catch (error) {
      console.error("❌ Erreur lors de la connexion :", error);
      throw error;
    }
  };

  /* ============================================================
     ✅ Inscription utilisateur
  ============================================================ */
  const signup = async (username, email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.msg || data.message || "Erreur d'inscription");

      return data;
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error);
      throw error;
    }
  };

  /* ============================================================
     ✅ Déconnexion
  ============================================================ */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  /* ============================================================
     🔄 Rafraîchir les infos utilisateur
  ============================================================ */
  const refreshUser = async () => {
    if (!token || !user?.id) return;
    try {
      const res = await fetch(`${API_URL}/api/auth/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) setUser(data);
    } catch (err) {
      console.warn("⚠️ Impossible de rafraîchir le profil :", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        refreshUser,
        setUser,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
