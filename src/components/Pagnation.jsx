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

export default Pagnation;
