import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { listManage } from "../utils/main";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/CreateContext";
const Dashboard = () => {
  const { token, user, LogOut } = useStateContext();
  console.log(token);
  if (!token) {
    console.log(token);
    // If not authenticated, redirect to the login page
    return <Navigate to="/" />;
  }
  console.log(user);
  return (
    <div className="App bg-[#DCDCDC] min-h-screen w-[100%] ">
      <div className=" min mx-auto flex gap-5 px-10">
        <NavBar user={user} LogOut={LogOut} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

const NavBar = ({ user, LogOut }) => {
  return (
    <div className="w-[20%] h-screen py-5 ">
      <div className="bg-white h-full rounded-lg px-4 flex flex-col justify-between py-10">
        <div>
          <h4 className="text-lg font-bold text-[#0D425B]">
            <span className="text-[#38AEE6]">Smart</span> Sigma
          </h4>
        </div>

        <div className="flex items-center flex-col mt-10 px-10">
          <div className="bg-[#136F9A] w-[170px] h-[170px] rounded-full flex items-center justify-center">
            <svg
              className="w-[100px]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[20px] text-[#0D425B] font-semibold mt-5">
              {user}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          {listManage.map((manage, i) => (
            <ManageCard
              key={i}
              icon={manage.icon}
              bgColor={manage.bgColor}
              title={manage.title}
              link={manage.to}
              bgColorActive={manage.bgColorActive}
              exact={manage.exact}
            />
          ))}
        </div>
        <div
          className="w-full flex flex-col gap-5 justify-center items-center"
          onClick={LogOut}
        >
          <NavLink
            to={"/"}
            end
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? `bg-[#1A83B5] flex items-center h-[45px] w-[230px] rounded-lg px-3 gap-3`
                : `bg-[#1A83B5] flex items-center h-[45px] w-[230px] rounded-lg px-3 gap-3`
            }
          >
            <IconClose />
            <h3 className="text-[#fff] font-semibold">Log Out</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const ManageCard = ({ bgColor, icon, title, link, bgColorActive, exact }) => {
  return (
    <NavLink
      to={link}
      end
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? `${bgColorActive} flex items-center h-[45px] w-[230px] rounded-lg px-3 gap-3`
          : `${bgColor} flex items-center h-[45px] w-[230px] rounded-lg px-3 gap-3`
      }
    >
      {icon}
      <h3 className="text-[#fff] font-semibold">{title}</h3>
    </NavLink>
  );
};

const IconClose = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9375 21.875C16.1861 21.875 16.4246 21.7762 16.6004 21.6004C16.7762 21.4246 16.875 21.1861 16.875 20.9375C16.875 20.6889 16.7762 20.4504 16.6004 20.2746C16.4246 20.0988 16.1861 20 15.9375 20H8.125C7.46196 20 6.82607 19.7366 6.35723 19.2678C5.88839 18.7989 5.625 18.163 5.625 17.5V7.5C5.625 6.83696 5.88839 6.20107 6.35723 5.73223C6.82607 5.26339 7.46196 5 8.125 5H15.9375C16.1861 5 16.4246 4.90123 16.6004 4.72541C16.7762 4.5496 16.875 4.31114 16.875 4.0625C16.875 3.81386 16.7762 3.5754 16.6004 3.39959C16.4246 3.22377 16.1861 3.125 15.9375 3.125H8.125C6.96468 3.125 5.85188 3.58594 5.03141 4.40641C4.21094 5.22688 3.75 6.33968 3.75 7.5V17.5C3.75 18.6603 4.21094 19.7731 5.03141 20.5936C5.85188 21.4141 6.96468 21.875 8.125 21.875H15.9375ZM17.1763 7.74875C17.2667 7.66518 17.3727 7.60024 17.4882 7.55765C17.6038 7.51506 17.7266 7.49565 17.8496 7.50052C17.9727 7.5054 18.0935 7.53446 18.2054 7.58606C18.3172 7.63766 18.4177 7.71078 18.5012 7.80125L22.2513 11.8638C22.4113 12.037 22.5002 12.2642 22.5002 12.5C22.5002 12.7358 22.4113 12.963 22.2513 13.1362L18.5012 17.1987C18.3323 17.3813 18.0978 17.4892 17.8494 17.4988C17.6009 17.5084 17.3588 17.4189 17.1763 17.25C16.9937 17.0811 16.8858 16.8466 16.8762 16.5981C16.8666 16.3496 16.9561 16.1075 17.125 15.925L19.4225 13.4362H9.6875C9.43886 13.4362 9.2004 13.3375 9.02459 13.1617C8.84877 12.9858 8.75 12.7474 8.75 12.4987C8.75 12.2501 8.84877 12.0117 9.02459 11.8358C9.2004 11.66 9.43886 11.5612 9.6875 11.5612H19.4212L17.1238 9.0725C17.0402 8.98206 16.9752 8.87604 16.9326 8.76051C16.8901 8.64497 16.8706 8.52217 16.8755 8.39912C16.8804 8.27608 16.9095 8.1552 16.9611 8.0434C17.0127 7.93159 17.0858 7.83229 17.1763 7.74875Z"
        fill="white"
      />
    </svg>
  );
};
