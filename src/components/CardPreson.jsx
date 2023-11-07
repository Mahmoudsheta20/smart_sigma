const CardPerson = ({ firstName, lastName, email, phoneNo, staffId, img }) => {
  return (
    <div className=" h-[350px] rounded-xl bg-[#0D425B] relative">
      <div className="absolute top-0 ">
        <svg
          className="w-full"
          viewBox="0 0 220 124"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10C0 4.47716 4.47715 0 10 0H210C215.523 0 220 4.47715 220 10V84.6889C220 87.2758 218.998 89.762 217.203 91.6254L192.64 117.133C189.755 120.128 185.317 121.026 181.495 119.386L133.324 98.7251C125.734 95.4697 118.33 103.678 122.348 110.893C126.146 117.713 119.689 125.68 112.231 123.377L7.04956 90.8979C2.85848 89.6037 0 85.7294 0 81.343V10Z"
            fill="url(#paint0_linear_405_624)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_405_624"
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
      <div className="absolute img__person pl">
        <div className="bg-[#136F9A] w-[80px] h-[80px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={`https://task-manager-media.s3.amazonaws.com/images/${img}`}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="txt__person text-white ">
        <h3 className="text-[15px] font-medium text-center text-white">
          {firstName} {lastName}
        </h3>
        <div className="mt-1 pl-4 flex flex-col gap-1">
          <p className="text-[12px]">
            <span className="text-[14px]">ID:</span> {staffId}
          </p>
          <p className="text-[12px]">
            <span className="text-[14px]">Email:</span> {email}
          </p>
          <p className="text-[12px]">
            <span className="text-[14px]">Phone:</span> {phoneNo}
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

export default CardPerson;
