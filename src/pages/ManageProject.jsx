import React, { useState, useEffect } from "react";
import { listManage, listProjectCard } from "../utils/main";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import InputForm from "../components/InputForm";
import { LiaCalendarTimesSolid } from "react-icons/lia";
import axios from "../axios";
import { useStateContext } from "../context/CreateContext";
const Home = () => {
  const [addProject, setaddProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [state, setstate] = useState([]);
  const [showingStart, setShowingStart] = useState(0);
  const [showingEnd, setShowingEnd] = useState(10);
  const { token } = useStateContext();
  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get("projects", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProject();
  }, []);
  let maxLength = projects?.content?.length;

  const HandleNext = () => {
    if (showingEnd < maxLength) {
      setShowingStart((e) => e + 10);
      setShowingEnd((e) => e + 10);
    }
  };
  const Handleprev = () => {
    if (showingStart > 0) {
      setShowingStart((e) => e - 10);
      setShowingEnd((e) => e - 10);
    }
  };

  return (
    <>
      {addProject && (
        <>
          <div className="overflow"></div>
          <AddProject onChange={setaddProject} />
        </>
      )}

      <div className="w-full relative">
        <div className="pb-5 pt-10 flex  justify-between w-full gap-5">
          {listProjectCard.map((project, i) => (
            <ProjectCard
              key={i}
              icon={project.icon}
              bgColor={project.bgColor}
              title_first={project.title_first}
              title_secend={project.title_second}
              number={project.number}
              textColor={project.textColor}
              bgIcon={project.bgIcon}
            />
          ))}
        </div>
        <SearchBar setaddProject={setaddProject} />
        <div className="mt-3">
          <h2 className="text-[20px] font-bold text-[#0D425B] mb-3">
            Projects Info
          </h2>
          <ProjectTable
            projects={projects}
            showingStart={showingStart}
            showingEnd={showingEnd}
          />
        </div>

        <Pagnation
          HandleNext={HandleNext}
          Handleprev={Handleprev}
          showingStart={showingStart}
          showingEnd={showingEnd}
        />
      </div>
    </>
  );
};

export default Home;

const NavBar = () => {
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
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[20px] text-[#0D425B] font-semibold mt-5">
              Mahmoud Sheta
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          {listManage.map((manage) => (
            <ManageCard
              icon={manage.icon}
              bgColor={manage.bgColor}
              title={manage.title}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <ManageCard
            icon={<IconClose />}
            bgColor={"bg-[#1A83B5]"}
            title={"Log Out"}
          />
        </div>
      </div>
    </div>
  );
};

const ManageCard = ({ bgColor, icon, title }) => {
  return (
    <div
      className={`${bgColor} flex items-center h-[45px] w-[230px] rounded-lg px-3 gap-3`}
    >
      {icon}
      <h3 className="text-[#fff] font-semibold">{title}</h3>
    </div>
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

const ProjectCard = ({
  icon,
  bgColor,
  title_first,
  title_secend,
  number,
  textColor,
  bgIcon,
}) => {
  return (
    <div
      className={`w-[25%] h-[144.71px] ${bgColor} rounded-lg py-3 px-5 relative`}
    >
      <div className={`project__card ${bgIcon}`}>{icon}</div>
      <div className="flex flex-col justify-between h-full">
        <div className="w-full flex flex-col justify-end items-end">
          <p className={`text-end text-[24px] font-semibold mr-4 ${textColor}`}>
            {number}
          </p>
          <p className="w-[90px] h-[3px] bg-[#0D425B] text-end"></p>
        </div>
        <div>
          <p className={`text-[20px] font-semibold ${textColor}`}>
            {title_first}
          </p>
          <p className={`text-[20px] font-semibold ${textColor}`}>
            {title_secend}
          </p>
        </div>
      </div>
    </div>
  );
};

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

const ProjectTable = ({ projects, showingEnd, showingStart }) => {
  const [showingData, setShowingData] = useState([]);
  const content = projects?.content?.slice(showingStart, showingEnd);

  const HandleDate = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the date as "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  return (
    <div>
      <div className="bg-cyan-700 self-stretch flex flex-col mt-4 py-1.5 rounded-md max-md:max-w-full">
        <div className="items-start self-center flex w-full  px-5 max-w-[100%] justify-between gap-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="flex items-center w-[80%] justify-between relative">
            <div className="justify-center text-white text-lg font-medium leading-6 self-stretch">
              ID
            </div>
            <div className="justify-center text-white text-lg font-medium leading-6 self-stretch absolute left-[10%]">
              Title
            </div>
            <div className="justify-center text-white text-lg font-medium leading-6 absolute left-[32%]">
              Description
            </div>
            <div className="justify-center text-white text-lg font-medium leading-6 self-stretch absolute left-[58%]">
              Manager
            </div>
            <div className="justify-center text-white text-lg font-medium leading-6 self-stretch absolute left-[75%]">
              Progress
            </div>
            <div className="justify-center text-white text-lg font-medium leading-6 self-stretch absolute left-[90%]">
              Deadline
            </div>
          </div>
        </div>
      </div>

      <div className="items-start self-stretch flex flex-col mt-3 gap-3 max-md:max-w-full">
        {content?.length > 0 &&
          content.map((data) => (
            <div className="h-[50px] shadow-lg bg-white w-full rounded-lg flex items-center px-5 justify-between ">
              <div className="w-[80%] flex items-center justify-between relative">
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 self-stretch">
                  {data.projectId}
                </div>
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 self-stretch absolute left-[10%]">
                  {data.title}
                </div>
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 absolute left-[32%]">
                  {data.description}
                </div>
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 absolute left-[58%]">
                  {data.managerName}
                </div>
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 absolute left-[75%]">
                  {data.progress}%
                </div>
                <div className="justify-center text-cyan-900 text-lg font-medium leading-6 self-stretch whitespace-nowrap absolute left-[90%]">
                  {HandleDate(data.deadline)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[14px] w-[58px] h-[36px] bg-[#136F9A] text-white rounded-lg">
                  update
                </button>
                <button className="text-[14px] w-[58px] h-[36px] bg-[#FF6B6B] text-white rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const Pagnation = ({ HandleNext, Handleprev, showingStart, showingEnd }) => {
  return (
    <div className="flex items-center justify-between absolute w-full bottom-[30px]">
      <div>
        <p>{`showing ${showingStart + 1} of ${showingEnd} entries`}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="w-[58px] h-[28px] border-2 border-[#0D425B] rounded-lg bg-white flex items-center justify-center"
          onClick={Handleprev}
        >
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
        <button
          className="w-[58px] h-[28px] border-2 border-[#0D425B] rounded-lg bg-[#0D425B] flex items-center justify-center"
          onClick={HandleNext}
        >
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

const AddProject = ({ onChange }) => {
  const [valid, setvalid] = useState(true);
  const [password, setPassword] = useState("");
  return (
    <div className=" bg-white px-12 py-10 rounded-lg add__project w-[711px] h-[624px]">
      <div className="relative h-full">
        <div className="h-full">
          {/* <div>
            <div className="img_reset flex items-center justify-center">
              <svg
                className="w-[100px]"
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
            <div className="text-center text-rest">
              <p className="text-[20px] text-[#0D425B] font-semibold">
                Mahmoud Sheta
              </p>
            </div>
          </div> */}
          <h2 className="text-[24px] font-bold text-[#0D425B] text-center">
            Add Project
          </h2>
          <div className="flex flex-col gap-4 h-full justify-center pt-2">
            <InputForm
              onChange={setPassword}
              value={password}
              type={"text"}
              valid={valid}
              icon={<Icon />}
              placeholder={"Enter project name"}
              name={"Title"}
            />
            <TextArea name={"Description"} value={password} valid={valid} />
            <InputForm
              onChange={setPassword}
              value={password}
              type={"password"}
              valid={valid}
              icon={
                <LiaCalendarTimesSolid
                  className={`w-[24.34px] h-[24.7px] ${
                    !valid && "text-red-500"
                  }`}
                />
              }
              placeholder={"Enter project deadline "}
              name={"Deadline"}
            />
            <InputForm
              onChange={setPassword}
              value={password}
              type={"password"}
              valid={valid}
              icon={
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33331 16.9998C1.33331 15.8506 1.78986 14.7484 2.60252 13.9357C3.41517 13.1231 4.51737 12.6665 5.66665 12.6665H14.3333C15.4826 12.6665 16.5848 13.1231 17.3974 13.9357C18.2101 14.7484 18.6666 15.8506 18.6666 16.9998C18.6666 17.5745 18.4384 18.1256 18.032 18.5319C17.6257 18.9382 17.0746 19.1665 16.5 19.1665H3.49998C2.92534 19.1665 2.37424 18.9382 1.96791 18.5319C1.56159 18.1256 1.33331 17.5745 1.33331 16.9998Z"
                    stroke="#0D425B"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 8.33325C11.7949 8.33325 13.25 6.87818 13.25 5.08325C13.25 3.28833 11.7949 1.83325 10 1.83325C8.20507 1.83325 6.75 3.28833 6.75 5.08325C6.75 6.87818 8.20507 8.33325 10 8.33325Z"
                    stroke="#0D425B"
                    stroke-width="2"
                  />
                </svg>
              }
              placeholder={"Enter ID of the manager"}
              name={"Manager ID"}
            />

            <div className="flex items-center justify-between gap-5 mt-3">
              <button
                className="w-[50%] bg-[#38AEE6] text-white rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                // onClick={() => onChange(3)}
              >
                Add
              </button>
              <button
                className="w-[50%] bg-[#DCDCDC] text-[#666666] rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                onClick={() => onChange(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Icon = () => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 2C0 2.83 0.717857 3.5 1.60714 3.5H5.89286V14C5.89286 14.83 6.61071 15.5 7.5 15.5C8.38929 15.5 9.10714 14.83 9.10714 14V3.5H13.3929C14.2821 3.5 15 2.83 15 2C15 1.17 14.2821 0.5 13.3929 0.5H1.60714C0.717857 0.5 0 1.17 0 2Z"
        fill="#0D425B"
      />
    </svg>
  );
};

const TextArea = ({ icon, valid, name, value, lastIcon, IconWrong }) => {
  return (
    <div
      className={`flex items-start border border-[#0D425B] h-[162px] ${
        !valid && "border-red-500 "
      } px-5 py-3 rounded-lg gap-4 bg-[#ECECEC]`}
    >
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1"
      >
        <path
          d="M4 16H12V14H4V16ZM4 12H12V10H4V12ZM2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V2C1.69779e-06 1.45 0.196001 0.979002 0.588001 0.587002C0.980001 0.195002 1.45067 -0.000664969 2 1.69779e-06H10L16 6V18C16 18.55 15.804 19.021 15.412 19.413C15.02 19.805 14.5493 20.0007 14 20H2ZM9 7V2H2V18H14V7H9Z"
          fill="#0D425B"
        />
      </svg>

      <div className="w-full h-full flex flex-col justify-center">
        {value && <p className="text-[12px] text-[#0D425B]">{name}</p>}
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Enter Description"
          className="border-none outline-none bg-[#ECECEC] text-[#0D425B] font-bold placeholder:font-normal placeholder:text-sm placeholder:text-[#0d425bc7]"
        ></textarea>
      </div>

      {lastIcon}
      {!valid && <IconWrong />}
    </div>
  );
};
