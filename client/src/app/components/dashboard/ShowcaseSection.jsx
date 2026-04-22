import React from "react";
import { ArrowRight } from "lucide-react";

const ShowcaseCard = ({ item }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col justify-between">

      <div className="flex items-center justify-between">

        <img
          src={item.logo}
          alt={item.name}
          className="w-10 h-10 object-contain"
        />

        <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-100">
          Connect
        </button>
      </div>

      <p className="mt-4 font-semibold text-gray-900">
        {item.name}
      </p>

      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
        {item.desc}
      </p>

    </div>
  );
};

const ShowcaseSection = () => {
  const data = [
    {
      name: "LeetCode",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      desc: "Highlight your problem solving skills with coding challenges completed.",
    },
    {
      name: "HackerRank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
      desc: "Prove your expertise through coding badges, challenges, and achievements.",
    },
    {
      name: "Dribbble",
      logo: "https://1000logos.net/wp-content/uploads/2025/03/Dribbble-Emblem.png",
      desc: "Display your creative designs and build a strong visual portfolio.",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">
          Showcase in one profile
        </h3>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition">
          View More
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <ShowcaseCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShowcaseSection;