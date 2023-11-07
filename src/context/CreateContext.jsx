import axios from "../axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const Context = createContext();

export const StoreContext = ({ children }) => {
  const cookis = new Cookies();

  const [token, setToken_] = useState(
    cookis.get("token") || sessionStorage.getItem("token")
  );

  const [user, setUser] = useState("");
  const [Remember, setRemember] = useState(false);
  const [state, setstate] = useState(true);
  const [valid, setvalid] = useState(true);
  console.log(token);
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setUser(decode.email);
    }
  }, []);
  // useEffect(() => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  // }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  const HandleCookis = (jwt_token, exp) => {
    cookis.set("token", jwt_token, {
      expires: new Date(exp * 1000),
    });
  };

  const HandleSesstion = (token) => {
    sessionStorage.setItem("token", token);
  };

  const Login = async (user, remember) => {
    try {
      const req = await axios.post("auth/login", user);
      console.log(req.data);
      const { token } = req.data;
      const decode = jwtDecode(token);
      console.log("decode", decode);
      setToken(token);
      setvalid(true);
      if (remember) {
        HandleCookis(token, decode.exp);
      } else {
        HandleSesstion(token);
      }
      setUser(decode.email);
      return true;
    } catch (err) {
      setvalid(false);
      return false;
    }
  };

  const LogOut = () => {
    setUser(null);
    cookis.remove("token");
    sessionStorage.clear("token");
    setToken(null);
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  };
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        Login,
        LogOut,
        contextValue,
        valid,
        setvalid,
        token,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
