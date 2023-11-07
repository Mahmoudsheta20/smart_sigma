import { useState } from "react";
import axios from "../axios";
import { HandleDate } from "../utils/main";
const ProjectTable = ({
  projects,
  showingEnd,
  showingStart,
  HandleUpdate,
  setDeleteProject,
  token,
}) => {
  const [showingData, setShowingData] = useState([]);
  const content = projects?.content?.slice(showingStart, showingEnd);

  const HandleDelete = async (id) => {
    console.log(token);
    try {
      const res = await axios.delete(
        `projects/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(res.data);
      setDeleteProject(true);
    } catch (err) {
      console.log(err);
    }
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

      <div className="items-start self-stretch flex flex-col mt-3 gap-3 max-md:max-w-full relative">
        {content?.length > 0 &&
          content.map((data) => (
            <>
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
                  <button
                    className="text-[14px] w-[58px] h-[36px] bg-[#136F9A] text-white rounded-lg"
                    onClick={() =>
                      HandleUpdate(
                        data.title,
                        data.deadline,
                        data.description,
                        data.managerID
                      )
                    }
                  >
                    update
                  </button>
                  <button
                    className="text-[14px] w-[58px] h-[36px] bg-[#FF6B6B] text-white rounded-lg"
                    onClick={() => HandleDelete(data.projectId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ProjectTable;
