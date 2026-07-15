import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Context = createContext();

// Try to read a role claim from common JWT claim names used by ASP.NET Core Identity
const extractRole = (decoded) => {
  if (!decoded) return null;
  return (
    decoded.role ||
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    decoded.roles ||
    null
  );
};

export const AuthContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Reject/clear obviously expired tokens
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        logout();
        return { ok: false, role: null };
      }

      const decodedRole = extractRole(decoded);

      localStorage.setItem("tc", token);
      setUser(decoded);
      setRole(decodedRole);
      setLogged(true);

      // Return the role synchronously so the caller can redirect
      // right away instead of waiting for the next render's state update.
      return { ok: true, role: decodedRole };
    } catch (err) {
      console.error("Invalid token received:", err);
      logout();
      return { ok: false, role: null };
    }
  };

  const logout = () => {
    localStorage.removeItem("tc");
    setLogged(false);
    setUser(null);
    setRole(null);
  };

  // Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("tc");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
          setRole(extractRole(decoded));
          setLogged(true);
        }
      } catch {
        logout();
      }
    }
    setAuthLoading(false);
  }, []);

  return (
    <Context.Provider value={{ logged, user, role, login, logout, authLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContext provider");
  }
  return context;
};

export default Context;