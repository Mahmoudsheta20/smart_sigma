import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "../axios";
import { useStateContext } from "../context/CreateContext";
import Pagnation from "../components/Pagnation";
import CardPerson from "../components/CardPreson";
import InputForm from "../components/InputForm";
import { FaKey } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const { token } = useStateContext();
  const [addProject, setAddProject] = useState(false);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("employees", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(res.data);
        setEmployees(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployees();
  }, []);
  console.log(employees);
  return (
    <>
      {addProject && (
        <>
          <div className="overflow"></div>
          <div>
            <Preson setaddProject={setAddProject} onChange={setAddProject} />
          </div>
        </>
      )}
      <div className="py-10 w-full relative px-2">
        <SearchBar setaddProject={setAddProject} />
        <h3 className="text-[20px] font-bold text-[#0D425B] mt-6">
          Employees Info
        </h3>
        <div className="card__person mt-6">
          {employees.length > 0 &&
            employees.map((employee) => (
              <CardPerson
                firstName={employee.firstName}
                lastName={employee.lastName}
                staffId={employee.staffId}
                email={employee.email}
                phoneNo={employee.phoneNo}
                img={employee.imgSrc}
              />
            ))}
        </div>
        <Pagnation />
      </div>
    </>
  );
};

export default ManageEmployee;

const Preson = ({ HandleAddProject, setaddProject }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);

  const test = () => {
    setaddProject(false);
  };
  return (
    <div className=" bg-white px-10 py-5 rounded-lg add__project w-[711px] h-[650px]">
      <div className="relative h-full">
        <div className="h-full">
          <div className="bg-[#136F9A] w-[220px] h-[220px] rounded-full flex items-center justify-center overflow-hidden absolute img__absolute">
            <img
              src={`https://task-manager-media.s3.amazonaws.com/images/`}
              alt=""
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-4 h-full justify-center mt-10 ">
            <p className="text-center text-[#38AEE6] cursor-pointer text-decoration-line: underline">
              Upload Photo
            </p>

            <div className="flex gap-2 justify-between items-center">
              <div className="w-[50%]">
                <InputForm
                  onChange={setFirstName}
                  value={firstName}
                  type={"text"}
                  valid={valid}
                  icon={<PersonIcon />}
                  placeholder={"Enter first name"}
                  name={"First Name"}
                />
              </div>
              <div className="w-[50%]">
                <InputForm
                  onChange={setEmail}
                  value={email}
                  type={"email"}
                  valid={valid}
                  icon={<PersonIcon />}
                  placeholder={"Enter last name"}
                  name={"Last Name"}
                />
              </div>
            </div>
            <InputForm
              onChange={setLastName}
              value={lastName}
              type={"text"}
              valid={valid}
              icon={<EmailIcon />}
              placeholder={"Enter last name"}
              name={"Last Name"}
            />
            <div className="flex gap-2 items-center justify-between">
              <div className="w-[50%]">
                <InputForm
                  onChange={setPassword}
                  value={password}
                  type={"password"}
                  valid={valid}
                  icon={
                    <FaKey
                      className={`w-[24.34px] h-[24.7px] ${
                        !valid && "text-red-500"
                      }`}
                    />
                  }
                  placeholder={"Enter password"}
                  name={"Password"}
                />
              </div>
              <div className="w-[50%]">
                <InputForm
                  onChange={setPassword}
                  value={password}
                  type={"password"}
                  valid={valid}
                  icon={
                    <FaKey
                      className={`w-[24.34px] h-[24.7px] ${
                        !valid && "text-red-500"
                      }`}
                    />
                  }
                  placeholder={"Confirm password"}
                  name={"Confirm Password"}
                />
              </div>
            </div>
            <InputForm
              onChange={setPhone}
              value={phone}
              type={"text"}
              valid={valid}
              icon={
                <BsFillTelephoneFill
                  className={`w-[24.34px] h-[24.7px] ${
                    !valid && "text-red-500"
                  }`}
                />
              }
              placeholder={"Enter phone number"}
              name={"Phone Number"}
            />
            <div className="flex items-center justify-between gap-5 mt-7">
              <button
                className="w-[50%] bg-[#38AEE6] text-white rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                onClick={test}
              >
                update
              </button>
              <button
                className="w-[50%] bg-[#DCDCDC] text-[#666666] rounded-lg py-3 text-[20px] font-semibold h-[67px]"
                onClick={test}
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

const PersonIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33331 17.0003C1.33331 15.8511 1.78986 14.7489 2.60252 13.9362C3.41517 13.1235 4.51737 12.667 5.66665 12.667H14.3333C15.4826 12.667 16.5848 13.1235 17.3974 13.9362C18.2101 14.7489 18.6666 15.8511 18.6666 17.0003C18.6666 17.575 18.4384 18.1261 18.032 18.5324C17.6257 18.9387 17.0746 19.167 16.5 19.167H3.49998C2.92534 19.167 2.37424 18.9387 1.96791 18.5324C1.56159 18.1261 1.33331 17.575 1.33331 17.0003Z"
        stroke="#0D425B"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M10 8.3335C11.7949 8.3335 13.25 6.87842 13.25 5.0835C13.25 3.28857 11.7949 1.8335 10 1.8335C8.20507 1.8335 6.75 3.28857 6.75 5.0835C6.75 6.87842 8.20507 8.3335 10 8.3335Z"
        stroke="#0D425B"
        stroke-width="2"
      />
    </svg>
  );
};

const EmailIcon = () => {
  return (
    <svg
      width="28"
      height="23"
      viewBox="0 0 28 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.3448 0.959961H2.70497C1.21724 0.959961 0.0135249 2.19507 0.0135249 3.70464L0 20.1727C0 21.6823 1.21724 22.9174 2.70497 22.9174H24.3448C25.8325 22.9174 27.0497 21.6823 27.0497 20.1727V3.70464C27.0497 2.19507 25.8325 0.959961 24.3448 0.959961ZM24.3448 6.44932L13.5249 13.311L2.70497 6.44932V3.70464L13.5249 10.5663L24.3448 3.70464V6.44932Z"
        fill="#0D425B"
      />
    </svg>
  );
};
