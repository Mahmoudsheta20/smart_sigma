import axios from "../axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
const Context = createContext();

export const StoreContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  const Login = (user) => {
    setUser(user);
  };

  const LogOut = () => {
    setUser(null);
  };
  return (
    <Context.Provider value={{ user, setUser, Login, LogOut, contextValue }}>
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
