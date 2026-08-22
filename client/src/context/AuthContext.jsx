import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/client.js";

const TOKEN_KEY = "dellertech_admin_token";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [email, setEmail] = useState(null);

  const login = useCallback(async (loginEmail, password) => {
    const { data } = await api.post("/auth/login", { email: loginEmail, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setEmail(data.email);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, email, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
