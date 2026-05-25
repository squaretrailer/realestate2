import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token === "mock_auth") setUser({ name: "Admin" });
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === "admin@re.estate" && password === "admin123") {
      localStorage.setItem("admin_token", "mock_auth");
      setUser({ name: "Admin" });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};