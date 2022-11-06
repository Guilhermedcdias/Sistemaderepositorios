import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { crud, createSession } from "../services/api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const recoveredToken = localStorage.getItem("token");

    if (recoveredUser && recoveredToken) {
      setUser(JSON.parse(recoveredUser));
      crud.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token",response.data.token);
    crud.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    setUser(response.data.user);
    navigate("/");
  };
  const logout = () => {
    console.log("Logout");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    crud.defaults.headers.Authorization = null;
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
