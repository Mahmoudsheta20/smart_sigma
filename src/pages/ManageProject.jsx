import React, { useState, useEffect } from "react";
import { listManage, listProjectCard } from "../utils/main";
import InputForm from "../components/InputForm";
import { LiaCalendarTimesSolid } from "react-icons/lia";
import axios from "../axios";
import { useStateContext } from "../context/CreateContext";
import Pagnation from "../components/Pagnation";
import ProjectTable from "../components/ProjectTable";
import SearchBar from "../components/SearchBar";
import Done from "../components/Done";
const Home = () => {
  const [addProject, setaddProject] = useState(false);
  const [updateProject, setUpdateProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [state, setstate] = useState([]);
  const [showingStart, setShowingStart] = useState(0);
  const [showingEnd, setShowingEnd] = useState(10);
  const [deleteProject, setDeleteProject] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [managerID, setManagerID] = useState("");

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

  const HandleUpdate = (title, deadline, description, id) => {
    setUpdateProject(true);
    setTitle(title);
    setDescription(description);
    setDeadline(deadline);
    setManagerID(id);
  };

  return (
    <>
      {addProject && (
        <>
          <div className="overflow"></div>
          <AddProject onChange={setaddProject} token={token} />
        </>
      )}
      {updateProject && (
        <>
          <div className="overflow"></div>
          <UpdateProject
            onChange={setUpdateProject}
            token={token}
            Title={title}
            Deadline={deadline}
            Description={description}
            id={managerID}
          />
        </>
      )}
      {deleteProject && (
        <>
          <div className="overflow"></div>
          <Done />
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
            HandleUpdate={HandleUpdate}
            setDeleteProject={setDeleteProject}
            token={token}
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

const AddProject = ({ onChange, token }) => {
  const [valid, setvalid] = useState(true);
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [managerID, setManagerID] = useState("");
  const [manager, setManager] = useState([]);
  const [searchFilter, setSearchFilter] = useState(null);
  const HandleAddProject = async () => {
    try {
      const res = await axios.post(
        "projects",
        {
          title,
          description,
          deadline,
          managerID: 7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data);
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getManager = async () => {
      try {
        const res = await axios.get("managers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(res.data);
        setManager(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getManager();
  }, []);
  console.log(manager);
  useEffect(() => {
    let Filter = manager.filter((item) => {
      if (
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(managerID.toLowerCase()) ||
        item.staffId == managerID
      ) {
        return item;
      }
    });

    setSearchFilter(Filter);
  }, [managerID]);

  const HandleSearch = (id) => {
    setManagerID(`${id}`);
    setSearchFilter(null);
  };

  return (
    <>
      {done ? (
        <Done
          setIsReset={onChange}
          title={"New project has been saved successfully!"}
        />
      ) : (
        <div className=" bg-white px-12 py-10 rounded-lg add__project w-[711px] h-[624px]">
          <div className="relative h-full">
            <div className="h-full">
              <h2 className="text-[24px] font-bold text-[#0D425B] text-center">
                Add Project
              </h2>
              <div className="flex flex-col gap-4 h-full justify-center pt-2">
                <InputForm
                  onChange={setTitle}
                  value={title}
                  type={"text"}
                  valid={valid}
                  icon={<Icon />}
                  placeholder={"Enter project name"}
                  name={"Title"}
                />
                <TextArea
                  name={"Description"}
                  value={description}
                  valid={valid}
                  onChange={setDescription}
                />
                <InputForm
                  onChange={setDeadline}
                  value={deadline}
                  type={"datetime-local"}
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
                <div className="relative">
                  <InputForm
                    onChange={setManagerID}
                    value={managerID}
                    type={"text"}
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

                  {searchFilter && (
                    <div className="shadow-lg border-2 border-[#0D425B] absolute top-[120%] w-full h-[200px] rounded-lg px-4 py-2 bg-[#ECECEC]">
                      <div className="w-full  overflow-auto h-full search__filter ">
                        {searchFilter.map((item) => (
                          <div
                            className="flex gap-5 py-1 cursor-pointer hover:bg-white px-1 rounded-lg"
                            onClick={() => HandleSearch(item.staffId)}
                          >
                            <p className="text-[15px]">
                              <span className="text-[17px]">ID: </span>
                              {item.staffId}
                            </p>
                            <p className="text-[15px]">
                              <span className="text-[17px]">name: </span>
                              {item.firstName} {item.lastName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-5 mt-3">
                  <button
                    className="w-[50%] bg-[#38AEE6] text-white rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                    onClick={HandleAddProject}
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
      )}{" "}
    </>
  );
};

const UpdateProject = ({
  onChange,
  token,
  id,
  Title,
  Description,
  Deadline,
  projectId,
}) => {
  const [valid, setvalid] = useState(true);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState(Title);
  const [description, setDescription] = useState(Description);
  const [deadline, setDeadline] = useState(Deadline);
  const [managerID, setManagerID] = useState(id);

  const HandleAddProject = async () => {
    try {
      const res = await axios.put(
        "projects/1",
        {
          title: "Project 12",
          description: "Description 12",
          deadline: "2024-12-15T00:00:00",
          managerID: 3,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data);
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {done ? (
        <Done
          setIsReset={onChange}
          title={"New project has been saved successfully!"}
        />
      ) : (
        <div className=" bg-white px-12 py-10 rounded-lg add__project w-[711px] h-[624px]">
          <div className="relative h-full">
            <div className="h-full">
              <h2 className="text-[24px] font-bold text-[#0D425B] text-center">
                Update Project
              </h2>
              <div className="flex flex-col gap-4 h-full justify-center pt-2">
                <InputForm
                  onChange={setTitle}
                  value={title}
                  type={"text"}
                  valid={valid}
                  icon={<Icon />}
                  placeholder={"Enter project name"}
                  name={"Title"}
                />
                <TextArea
                  name={"Description"}
                  value={description}
                  valid={valid}
                  onChange={setDescription}
                />
                <InputForm
                  onChange={setDeadline}
                  value={deadline}
                  type={"datetime-local"}
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
                <div className="relative">
                  <InputForm
                    onChange={setManagerID}
                    value={managerID}
                    type={"text"}
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
                </div>

                <div className="flex items-center justify-between gap-5 mt-3">
                  <button
                    className="w-[50%] bg-[#38AEE6] text-white rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                    onClick={HandleAddProject}
                  >
                    update
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
      )}{" "}
    </>
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

const TextArea = ({
  icon,
  valid,
  name,
  value,
  lastIcon,
  IconWrong,
  onChange,
}) => {
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
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder="Enter Description"
          className="border-none outline-none bg-[#ECECEC] text-[#0D425B] font-bold placeholder:font-normal placeholder:text-sm placeholder:text-[#0d425bc7]"
        ></textarea>
      </div>

      {lastIcon}
      {!valid && <IconWrong />}
    </div>
  );
};
