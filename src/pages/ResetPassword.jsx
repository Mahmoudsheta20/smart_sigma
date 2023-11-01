import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
const ResetPassword = () => {
  return (
    <div>
      <Email />
    </div>
  );
};

export default ResetPassword;

const Input = ({ icon, lastIcon, onChange, value, type, valid }) => {
  return (
    <div
      className={`flex items-center border ${
        !valid && "border-red-500 "
      } py-3 px-2 rounded-lg gap-2`}
    >
      {icon}
      <input
        type={type}
        className="w-full h-full border-none outline-none"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        required
      />
      {lastIcon}
      {!valid && <IconWrong />}
    </div>
  );
};

const Container = ({
  Header,
  Detials,
  onChange,
  value,
  isValid,
  type,
  icon,
}) => {
  return (
    <div className="h-full flex flex-col justify-between ">
      <div>
        <h2 className="text-2xl font-bold text-center text-[#0D425B]">
          {Header}
        </h2>
        <div className=" flex items-center justify-center pt-4">
          <p className="text-[#666666] w-[70%] text-lg text-center">
            {Detials}
          </p>
        </div>
      </div>
      <Input
        onChange={onChange}
        value={value}
        type={type}
        valid={isValid}
        icon={icon}
      />
      <Button />
    </div>
  );
};

const Email = () => {
  const [email, setEmail] = useState("");
  const [valid, setvalid] = useState(true);

  return (
    <Container
      Header={"Reset Password"}
      Detials={"Please enter your email address to search for your Account"}
      onChange={setEmail}
      value={email}
      isValid={valid}
      type={"email"}
      icon={<MdEmail className={`w-5 h-5 ${!valid && "text-red-500"}`} />}
    />
  );
};
const OTP = () => {
  return;
};
const ChangePassword = () => {
  return;
};
const Button = (prev) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <button className="w-[50%] bg-[#38AEE6] text-white rounded-lg py-3 text-lg">
        Next
      </button>
      <button
        className="w-[50%] bg-[#DCDCDC] text-[#666666] rounded-lg py-3 text-lg"
        onClick={() => prev(0)}
      >
        Back
      </button>
    </div>
  );
};

const IconWrong = () => {
  return (
    <svg
      width="23"
      height="23"
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
