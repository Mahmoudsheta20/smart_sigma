import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const SearchBar = ({ setaddProject }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-white h-[35px] w-[363px] rounded-md px-2 gap-2">
          <AiOutlineSearch className="w-[16px] h-[16px]" />
          <input
            type="text"
            placeholder="Write here...."
            className="placeholder:text-[12px] placeholder:text-[#0D425B]"
          />
        </div>
        <button className="h-[35px] w-[87px] bg-[#136F9A] text-[12px] font-medium rounded-md text-white">
          Search
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[29px] w-[144px] bg-white flex items-center rounded-md px-2 gap-2">
          <svg
            width="17"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.33333 3.25H2.66667C2.22464 3.25 1.80072 3.42559 1.48816 3.73816C1.17559 4.05072 1 4.47464 1 4.91667V14.9167C1 15.3587 1.17559 15.7826 1.48816 16.0952C1.80072 16.4077 2.22464 16.5833 2.66667 16.5833H7.41417M12.6667 10.75V14.0833H16M12.6667 8.25V4.91667C12.6667 4.47464 12.4911 4.05072 12.1785 3.73816C11.866 3.42559 11.442 3.25 11 3.25H9.33333"
              stroke="#0D425B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4.33337 8.24992H7.66671M4.33337 11.5833H6.83337M4.33337 3.24992C4.33337 2.80789 4.50897 2.38397 4.82153 2.07141C5.13409 1.75885 5.55801 1.58325 6.00004 1.58325H7.66671C8.10874 1.58325 8.53266 1.75885 8.84522 2.07141C9.15778 2.38397 9.33337 2.80789 9.33337 3.24992C9.33337 3.69195 9.15778 4.11587 8.84522 4.42843C8.53266 4.74099 8.10874 4.91659 7.66671 4.91659H6.00004C5.55801 4.91659 5.13409 4.74099 4.82153 4.42843C4.50897 4.11587 4.33337 3.69195 4.33337 3.24992ZM9.33337 14.0833C9.33337 14.9673 9.68456 15.8152 10.3097 16.4403C10.9348 17.0654 11.7827 17.4166 12.6667 17.4166C13.5508 17.4166 14.3986 17.0654 15.0237 16.4403C15.6489 15.8152 16 14.9673 16 14.0833C16 13.1992 15.6489 12.3514 15.0237 11.7262C14.3986 11.1011 13.5508 10.7499 12.6667 10.7499C11.7827 10.7499 10.9348 11.1011 10.3097 11.7262C9.68456 12.3514 9.33337 13.1992 9.33337 14.0833Z"
              stroke="#0D425B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p className="text-[12px] ">Generate report</p>
        </div>

        <div className="h-[29px] w-[144px] bg-[#136F9A] flex items-center rounded-md px-2 gap-5">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1875 1.875H2.8125C2.29473 1.875 1.875 2.29473 1.875 2.8125V12.1875C1.875 12.7053 2.29473 13.125 2.8125 13.125H12.1875C12.7053 13.125 13.125 12.7053 13.125 12.1875V2.8125C13.125 2.29473 12.7053 1.875 12.1875 1.875Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 5V10M5 7.5H10"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p
            className="text-[12px] text-white"
            onClick={() => setaddProject(true)}
          >
            Add Project
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
