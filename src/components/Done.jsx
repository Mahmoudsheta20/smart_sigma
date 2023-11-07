const Done = ({ setIsReset, title }) => {
  return (
    <div className="flex items-center justify-between flex-col h-[346px] bg-white py-10 rounded-lg done w-[711px] ">
      <div className="flex flex-col items-center gap-8">
        <svg
          width="119"
          height="119"
          viewBox="0 0 119 119"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="59.5" cy="59.5" r="59.5" fill="#4CAF50" />
          <path
            d="M25 56L50.5 81.5L95 37"
            stroke="white"
            stroke-width="15"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="text-[#4CAF50] text-[20px] font-semibold">{title}</p>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          className=" bg-[#38AEE6] px-5 h-[51px] w-[213px] text-white rounded-lg py-1 text-lg"
          onClick={() => setIsReset(false)}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Done;
