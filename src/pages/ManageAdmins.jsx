import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import axios from "../axios";
import { useStateContext } from "../context/CreateContext";
import Pagnation from "../components/Pagnation";
import CardPerson from "../components/CardPreson";
import InputForm from "../components/InputForm";
import { FaKey } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import Done from "../components/Done";
const ManageAdmins = () => {
  const [employees, setEmployees] = useState([]);
  const { token } = useStateContext();
  const [addProject, setAddProject] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("admins", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        console.log(res.data);
        setEmployees(res.data);
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
          {!done ? (
            <div>
              <Preson
                setaddProject={setAddProject}
                onChange={setAddProject}
                token={token}
                setDone={setDone}
              />
            </div>
          ) : (
            <div>
              <Done
                setIsReset={setAddProject}
                title={"New Project manager has been added successfully!"}
              />
            </div>
          )}
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

export default ManageAdmins;

const Preson = ({ HandleAddProject, setaddProject, token, setDone }) => {
  const regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [matchPassword, setMatchPassword] = useState("");
  const [matchPasswordValid, setMatchPasswordValid] = useState(true);
  const [showMatchPassword, setMatchShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(true);
  const [img, setImg] = useState(null);
  const [showUpload, setshowUpload] = useState(false);
  useEffect(() => {
    if (password) {
      const result = regexPattern.test(password);
      console.log(result);
      setPasswordValid(result);
    } else {
      setPasswordValid(true);
    }
    if (matchPassword) {
      if (password == matchPassword) {
        setMatchPasswordValid(true);
      } else {
        setMatchPasswordValid(false);
      }
    } else {
      setMatchPasswordValid(true);
    }
  }, [password, matchPassword]);

  const test = () => {
    setaddProject(false);
  };

  const addEmployees = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append("firstName", firstName);
    bodyFormData.append("lastName", lastName);
    bodyFormData.append("email", email);
    bodyFormData.append("phoneNo", phone);
    bodyFormData.append("password", password);
    img && bodyFormData.append("img", img, img?.name);
    try {
      const res = await axios.post("managers", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        // onUploadProgress: (progressEvent) => {
        //   console.log(progressEvent.loaded);
        // },
      });

      setDone(true);
    } catch (err) {
      console.log(err);
      setValid(false);
    }
  };

  return (
    <>
      {showUpload && (
        <>
          <UploadPhoto setImg={setImg} setshowUpload={setshowUpload} />
          <div
            className="overflow__upload"
            onClick={() => setshowUpload(false)}
          ></div>
        </>
      )}

      <div className=" bg-white px-10 py-5 rounded-lg add__project w-[711px] h-[650px]">
        <div className="relative h-full">
          <div className="h-full">
            <div className="bg-[#136F9A] w-[220px] h-[220px] rounded-full flex items-center justify-center overflow-hidden absolute img__absolute">
              <img src={img} alt="" className="w-full h-full" />
            </div>

            <div className="flex flex-col gap-4 h-full justify-center mt-10 ">
              <p
                className="text-center text-[#38AEE6] cursor-pointer text-decoration-line: underline"
                onClick={() => setshowUpload(true)}
              >
                Upload Photo
              </p>

              <div className="flex gap-2 justify-between items-center">
                <div className="w-[50%]">
                  <InputFormPassword
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
                  <InputFormPassword
                    onChange={setLastName}
                    value={lastName}
                    type={"text"}
                    valid={valid}
                    icon={<PersonIcon />}
                    placeholder={"Enter last name"}
                    name={"Last Name"}
                  />
                </div>
              </div>
              <InputForm
                onChange={setEmail}
                value={email}
                type={"email"}
                valid={valid}
                icon={<EmailIcon />}
                placeholder={"Email address"}
                name={"Email"}
              />
              <div className="flex gap-2 items-center justify-between max-w-[99%]">
                <div className="max-w-[50%]">
                  <InputFormPassword
                    onChange={setPassword}
                    value={password}
                    type={`${showPassword ? "text" : "password"}`}
                    valid={passwordValid}
                    icon={
                      <FaKey
                        className={`w-[20.34px] h-[20.7px] ${
                          !valid && "text-red-500"
                        }`}
                      />
                    }
                    placeholder={"Enter password"}
                    name={"Password"}
                    lastIcon={
                      showPassword ? (
                        <AiFillEye
                          className={`w-[25.05px] h-[20.96px]`}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          className={`w-[25.05px] h-[20.96px]`}
                          onClick={() => setShowPassword(true)}
                        />
                      )
                    }
                  />
                </div>
                <div className="max-w-[50%]">
                  <InputFormPassword
                    onChange={setMatchPassword}
                    value={matchPassword}
                    type={`${showMatchPassword ? "text" : "password"}`}
                    valid={matchPasswordValid}
                    icon={
                      <FaKey
                        className={`w-[20.34px] h-[20.7px] ${
                          !valid && "text-red-500"
                        }`}
                      />
                    }
                    placeholder={"Confirm password"}
                    name={"Confirm Password"}
                    lastIcon={
                      showMatchPassword ? (
                        <AiFillEye
                          className={`w-[25.05px] h-[20.96px]`}
                          onClick={() => setMatchShowPassword(false)}
                        />
                      ) : (
                        <AiFillEyeInvisible
                          className={`w-[25.05px] h-[20.96px]`}
                          onClick={() => setMatchShowPassword(true)}
                        />
                      )
                    }
                  />
                </div>
              </div>
              <InputForm
                onChange={setPhone}
                value={phone}
                type={"tel"}
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
                  onClick={addEmployees}
                >
                  Add
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
    </>
  );
};

const InputFormPassword = ({
  icon,
  lastIcon,
  onChange,
  value,
  type,
  valid,
  placeholder,
  name,
}) => {
  return (
    <div
      className={`flex items-center justify-between border border-[#0D425B] h-[67px] w-full ${
        !valid && "border-red-500 "
      } px-3 py-1 rounded-lg gap-1 bg-[#ECECEC]`}
    >
      <div>{icon}</div>
      <div className=" h-full flex flex-col justify-center w-[60%]">
        {value && <p className="text-[12px] text-[#0D425B]">{name}</p>}
        <input
          type={type}
          className="border-none outline-none bg-[#ECECEC] text-[#0D425B] font-bold placeholder:font-normal placeholder:text-sm placeholder:text-[#0d425bc7]"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          required
          placeholder={placeholder}
        />
      </div>
      <div className="w-[25%] flex items-center justify-end">
        <div>{lastIcon}</div>
        <div className="">{!valid && <IconWrong />}</div>
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

const IconWrong = () => {
  return (
    <svg
      width="27.05"
      height="21.96"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.2693 12.6992H16.7693V18.9492H14.2693V12.6992ZM14.2681 20.1992H16.7681V22.6992H14.2681V20.1992Z"
        fill="#F44336"
      />
      <path
        d="M17.7281 5.44916C17.2931 4.63041 16.4456 4.12166 15.5181 4.12166C14.5906 4.12166 13.7431 4.63041 13.3081 5.45041L4.13562 22.7792C3.93208 23.1597 3.83126 23.5867 3.8431 24.0181C3.85493 24.4495 3.97902 24.8704 4.20312 25.2392C4.424 25.6096 4.73767 25.9161 5.11319 26.1283C5.4887 26.3405 5.91306 26.4511 6.34437 26.4492H24.6919C25.5769 26.4492 26.3781 25.9967 26.8344 25.2392C27.0581 24.8702 27.182 24.4494 27.1938 24.0181C27.2057 23.5868 27.1051 23.1598 26.9019 22.7792L17.7281 5.44916ZM6.34437 23.9492L15.5181 6.62041L24.6981 23.9492H6.34437Z"
        fill="#F44336"
      />
    </svg>
  );
};

const UploadPhoto = ({ setImg, setshowUpload }) => {
  const HandleUpload = (e) => {
    setImg(e);
    setshowUpload(false);
  };
  return (
    <div className="w-[676px] h-[346px] upload__photo bg-white rounded-xl">
      <div className="relative">
        <div>
          <svg
            width="676"
            height="153"
            viewBox="0 0 676 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.99999C0 4.47715 4.47715 0 10 0H666C671.523 0 676 4.47715 676 10V100.646C676 104.707 673.544 108.365 669.785 109.902L579.839 146.685C578.114 147.391 576.226 147.6 574.388 147.29L381.265 114.668C370.777 112.897 365.142 126.553 373.826 132.694L375.851 134.125C384.331 140.122 379.18 153.471 368.87 152.217L8.79284 108.43C3.77384 107.819 0 103.559 0 98.5027V9.99999Z"
              fill="url(#paint0_linear_474_793)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_474_793"
                x1="7.04164"
                y1="7.5422e-06"
                x2="78.0168"
                y2="249.017"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#D9D9D9" stop-opacity="0.7" />
                <stop offset="1" stop-color="#38AEE6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="upload__text">
          <h3 className="text-[24px] font-bold text-[#0D425B]">
            Upload Profile Photo
          </h3>
        </div>

        <div className="upload__file text-center mt-10">
          {/* <h3 className="text-[24px] font-semibold text-[#EF4444]">
            JPG or PNG no larger than 5 MB
          </h3> */}
          <h3 className="text-[24px] font-semibold text-[#38AEE6]">
            JPG or PNG no larger than 5 MB
          </h3>
          <div className="flex items-center justify-center">
            <input
              type="file"
              id="upload"
              hidden
              onChange={(e) => HandleUpload(e.target.files[0])}
            />
            <label for="upload" id="lable">
              Choose file
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
