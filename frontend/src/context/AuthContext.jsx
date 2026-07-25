import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("hiddenpaths_user");
    const token = localStorage.getItem("hiddenpaths_token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      authService
        .me()
        .then((res) => {
          setUser(res.data.data);
          localStorage.setItem("hiddenpaths_user", JSON.stringify(res.data.data));
        })
        .catch((err) => {
         
          if (err.response && err.response.status === 401) {
            logout();
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("hiddenpaths_token", data.token);
    const { token, ...userData } = data;
    localStorage.setItem("hiddenpaths_user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  // Used only by the Welcome/onboarding screen to save interests using the
  // short-lived session created at registration, without treating the user
  // as "logged in" yet (per the required flow: register -> welcome -> login).
  const registerAndGetToken = async (formData) => {
    const res = await authService.register(formData);
    return res.data.data; // includes .token, used once then discarded
  };

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    return persistSession(res.data.data);
  };

  const logout = () => {
    localStorage.removeItem("hiddenpaths_token");
    localStorage.removeItem("hiddenpaths_user");
    setUser(null);
  };

  const refreshUser = async () => {
    const res = await authService.me();
    setUser(res.data.data);
    localStorage.setItem("hiddenpaths_user", JSON.stringify(res.data.data));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, logout, registerAndGetToken, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
