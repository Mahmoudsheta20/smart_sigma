import React from "react";
import SearchBar from "../components/SearchBar";

const ManageEmployee = () => {
  return (
    <div className="py-10 w-full relative">
      <SearchBar />
      <h3 className="text-[20px] font-bold text-[#0D425B] mt-6">
        Employees Info
      </h3>
      <div className="card__person mt-6">
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
        <CardPerson />
      </div>
      <Pagnation />
    </div>
  );
};

export default ManageEmployee;

const CardPerson = () => {
  return (
    <div className="w-[220px] h-[300px] rounded-xl bg-[#0D425B] relative">
      <div className=" absolute top-0 ">
        <svg
          width="220"
          height="124"
          viewBox="0 0 220 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10C0 4.47716 4.47715 0 10 0H210C215.523 0 220 4.47715 220 10V84.6889C220 87.2758 218.998 89.762 217.203 91.6254L192.64 117.133C189.755 120.128 185.317 121.026 181.495 119.386L133.324 98.7251C125.734 95.4697 118.33 103.678 122.348 110.893C126.146 117.713 119.689 125.68 112.231 123.377L7.04956 90.8979C2.85848 89.6037 0 85.7294 0 81.343V10Z"
            fill="url(#paint0_linear_329_660)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_329_660"
              x1="2.29166"
              y1="6.23277e-06"
              x2="107.971"
              y2="146.017"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#D9D9D9" stop-opacity="0.7" />
              <stop offset="1" stop-color="#38AEE6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute img__person ">
        <div className="bg-[#136F9A] w-[80px] h-[80px] rounded-full flex items-center justify-center">
          <svg
            className="w-[60px]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>

      <div className="txt__person text-white px-5">
        <h3 className="text-[15px] font-medium text-center text-white">
          Abdelrhman Ali
        </h3>
        <div className="mt-1">
          <p className="text-[12px]">
            <span className="text-[14px]">ID:</span> 2222222
          </p>
          <p className="text-[12px]">
            <span className="text-[14px]">Email:</span> aaa141@gmail.com
          </p>
          <p className="text-[12px]">
            <span className="text-[14px]">Phone:</span> 01124652109
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 button__person">
        <button className="text-[14px] w-[58px] h-[36px] bg-[#136F9A] text-white rounded-lg">
          update
        </button>
        <button className="text-[14px] w-[58px] h-[36px] bg-[#FF6B6B] text-white rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
};

const Pagnation = () => {
  return (
    <div className="flex items-center justify-between absolute w-full bottom-[30px]">
      <div>
        <p>showing 1 of 10 entries</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-[58px] h-[28px] border-2 border-[#0D425B] rounded-lg bg-white flex items-center justify-center">
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.54321 12L2.08363 7L6.54321 2"
              stroke="#0D425B"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button className="w-[58px] h-[28px] border-2 border-[#0D425B] rounded-lg bg-[#0D425B] flex items-center justify-center">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.97192 2L6.4315 7L1.97192 12"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
