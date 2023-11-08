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
const ManageProfile = ({ HandleAddProject, setaddProject, token }) => {
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
    bodyFormData.append("password", password);
    bodyFormData.append("img", img, img.name);
    try {
      const res = await axios.post("employees", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        // onUploadProgress: (progressEvent) => {
        //   console.log(progressEvent.loaded);
        // },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(img);
  return (
    <>
      {showUpload && (
        <>
          <UploadPhoto setImg={setImg} setshowUpload={setshowUpload} />
          <div className="overflow__upload"></div>
        </>
      )}
      <div className="w-full mt-10">
        <h3 className="text-[20px] font-bold text-[#0D425B] mt-6">
          Profile info
        </h3>
        <div className="mt-[100px] flex justify-center items-center w-full">
          <div className=" bg-white px-10 py-5 rounded-lg  w-[800px] h-[731px]">
            <div className="relative h-full">
              <div className="h-full">
                <div className="bg-[#136F9A] w-[220px] h-[220px] rounded-full flex items-center justify-center overflow-hidden absolute img__absolute">
                  <img
                    src={`https://task-manager-media.s3.amazonaws.com/images/`}
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <div className="flex flex-col gap-5 h-full justify-center mt-10 ">
                  <p
                    className="text-center text-[#38AEE6] cursor-pointer text-decoration-line: underline"
                    onClick={() => setshowUpload(true)}
                  >
                    Upload Photo
                  </p>

                  <div className="flex gap-10 justify-between items-center">
                    <div className="w-full">
                      <InputForm
                        onChange={setFirstName}
                        value={firstName}
                        type={"text"}
                        valid={valid}
                        icon={<PersonIcon />}
                        placeholder={"Enter first name"}
                        name={"First Name"}
                        lastIcon={<EditIcon />}
                      />
                    </div>
                    <div className="w-full">
                      <InputForm
                        onChange={setLastName}
                        value={lastName}
                        type={"text"}
                        valid={valid}
                        icon={<PersonIcon />}
                        placeholder={"Enter last name"}
                        name={"Last Name"}
                        lastIcon={<EditIcon />}
                      />
                    </div>
                  </div>

                  <InputForm
                    onChange={setEmail}
                    value={email}
                    type={"email"}
                    valid={valid}
                    icon={<IDicon />}
                    placeholder={"Enter last name"}
                    name={"ID"}
                    lastIcon={<LockIocn />}
                  />

                  <InputForm
                    onChange={setPhone}
                    value={phone}
                    type={"tel"}
                    valid={valid}
                    icon={<EmailIcon />}
                    placeholder={"Enter phone number"}
                    name={"Phone Number"}
                    lastIcon={<EditIcon />}
                  />

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
                    lastIcon={<EditIcon />}
                  />
                  <div>
                    <h3 className="text-[13px] text-[#0D425B] font-medium">
                      Change Password
                    </h3>
                    <div className="flex gap-10 items-center mt-2">
                      <div className="w-full">
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
                      <div className="w-full">
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
                  </div>

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
        </div>
      </div>
    </>
  );
};

export default ManageProfile;

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
            <label for="upload">Choose file</label>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1829 1.86009C13.8413 1.20197 14.7341 0.832348 15.665 0.83252C16.5959 0.832692 17.4885 1.20265 18.1467 1.861C18.8048 2.51936 19.1744 3.41219 19.1742 4.34307C19.1741 5.27395 18.8041 6.16664 18.1457 6.82475L17.7167 7.25375L12.7539 2.29092L13.1829 1.86192V1.86009ZM11.4577 3.58709L2.02524 13.0178C1.89792 13.1456 1.81119 13.3083 1.77591 13.4853L0.851907 18.0686C0.821762 18.2167 0.828719 18.37 0.872159 18.5148C0.915599 18.6596 0.994172 18.7914 1.10088 18.8985C1.20759 19.0055 1.33913 19.0846 1.48377 19.1285C1.62841 19.1724 1.78167 19.1799 1.92991 19.1503L6.52057 18.2336C6.69776 18.1978 6.86041 18.1104 6.98807 17.9824L16.4206 8.54992L11.4577 3.58709Z"
        fill="#0D425B"
      />
    </svg>
  );
};

const IDicon = () => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 4.52197C1.25 3.66002 1.59241 2.83337 2.2019 2.22388C2.8114 1.61438 3.63805 1.27197 4.5 1.27197H17.5C18.362 1.27197 19.1886 1.61438 19.7981 2.22388C20.4076 2.83337 20.75 3.66002 20.75 4.52197V15.3553C20.75 16.2173 20.4076 17.0439 19.7981 17.6534C19.1886 18.2629 18.362 18.6053 17.5 18.6053H4.5C3.63805 18.6053 2.8114 18.2629 2.2019 17.6534C1.59241 17.0439 1.25 16.2173 1.25 15.3553V4.52197Z"
        stroke="#0D425B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.2502 5.60547H16.4168M14.2502 9.9388H16.4168M5.5835 14.2721H16.4168M5.5835 7.77214C5.5835 8.34677 5.81177 8.89787 6.2181 9.3042C6.62443 9.71053 7.17553 9.9388 7.75016 9.9388C8.3248 9.9388 8.8759 9.71053 9.28223 9.3042C9.68856 8.89787 9.91683 8.34677 9.91683 7.77214C9.91683 7.1975 9.68856 6.6464 9.28223 6.24007C8.8759 5.83374 8.3248 5.60547 7.75016 5.60547C7.17553 5.60547 6.62443 5.83374 6.2181 6.24007C5.81177 6.6464 5.5835 7.1975 5.5835 7.77214Z"
        stroke="#0D425B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const LockIocn = () => {
  return (
    <svg
      width="16"
      height="22"
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 21.9385V7.93848H3V5.93848C3 4.55514 3.48767 3.37581 4.463 2.40048C5.43833 1.42514 6.61733 0.937811 8 0.938477C9.38333 0.938477 10.5627 1.42614 11.538 2.40148C12.5133 3.37681 13.0007 4.55581 13 5.93848V7.93848H16V21.9385H0ZM8 16.9385C8.55 16.9385 9.021 16.7425 9.413 16.3505C9.805 15.9585 10.0007 15.4878 10 14.9385C10 14.3885 9.804 13.9175 9.412 13.5255C9.02 13.1335 8.54933 12.9378 8 12.9385C7.45 12.9385 6.979 13.1345 6.587 13.5265C6.195 13.9185 5.99933 14.3891 6 14.9385C6 15.4885 6.196 15.9595 6.588 16.3515C6.98 16.7435 7.45067 16.9391 8 16.9385ZM5 7.93848H11V5.93848C11 5.10514 10.7083 4.39681 10.125 3.81348C9.54167 3.23014 8.83333 2.93848 8 2.93848C7.16667 2.93848 6.45833 3.23014 5.875 3.81348C5.29167 4.39681 5 5.10514 5 5.93848V7.93848Z"
        fill="#0D425B"
      />
    </svg>
  );
};
