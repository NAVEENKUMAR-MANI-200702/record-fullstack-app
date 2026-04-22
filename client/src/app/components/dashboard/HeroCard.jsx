import React from "react";

const HeroCard = () => {
  return (
    <div className="bg-black text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">

      <div className="max-w-md">

        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Powered by</p>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/YouTube_2024_%28white_text%29.svg/1280px-YouTube_2024_%28white_text%29.svg.png"
            alt="YouTube"
            className="h-6 object-contain"
          />
        </div>

        <h2 className="text-2xl font-semibold leading-snug mb-4">
          Claim Skill badges from <br /> YouTube Contents
        </h2>

        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium">
          Try the tool →
        </button>
      </div>

      <div className="w-full md:w-72">
        <img
            src="https://i.vimeocdn.com/video/1605392852-658c363f3af4408ba00ae26bff8744ff57442054b7360db1c0bd632d092e3868-d?f=webp"
            alt="Web Development"
            className="rounded-xl w-full object-cover"
        />
      </div>

    </div>
  );
};

export default HeroCard;