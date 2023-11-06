import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/ManageProject";
import Login from "./pages/Login";
import axios from "./axios";
import { useEffect } from "react";
import { useStateContext } from "./context/CreateContext";
function App() {
  const { token } = useStateContext();
  if (token) {
    console.log(token);
    // If not authenticated, redirect to the login page
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="App bg-[#DCDCDC] min-h-screen w-[100%] ">
      <Outlet />
    </div>
  );
}

export default App;
