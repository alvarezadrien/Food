import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL || "https://food-jllh.onrender.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Charger user et token depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decodedToken = parseJwt(storedToken);

        // Vérifie si le token a expiré
        if (decodedToken.exp * 1000 < Date.now()) {
          console.warn("⚠️ Token expiré. Déconnexion automatique.");
          logout();
        } else {
          setUser(parsedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement du token :", error);
        logout();
      }
    }

    setLoading(false);
  }, []);

  // 🧩 Fonction pour décoder un token JWT
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
    } catch (error) {
      console.error("Erreur décodage JWT :", error);
      return {};
    }
  };

  // ✅ Connexion
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur de connexion");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setToken(data.token);

    return data;
  };

  // ✅ Inscription
  const signup = async (username, email, password) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur d'inscription");
    return data;
  };

  // ✅ Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        setUser,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
