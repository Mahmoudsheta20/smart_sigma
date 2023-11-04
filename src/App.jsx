import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/ManageProject";
import Login from "./pages/Login";
import axios from "./axios";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("profile");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App bg-[#DCDCDC] min-h-screen w-[100%] ">
      <Outlet />
    </div>
  );
}

export default App;
