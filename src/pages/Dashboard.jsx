import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/CreateContext";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const { token, user, LogOut } = useStateContext();
  if (!token) {
    return <Navigate to="/" />;
  }
  console.log(user);
  return (
    <div className="App bg-[#DCDCDC] min-h-screen w-[100%]">
      <div className=" min mx-auto flex gap-5 px-10">
        <NavBar user={user} LogOut={LogOut} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
