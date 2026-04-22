import React from "react";
import { ArrowRight } from "lucide-react";

const LearningCard = ({ item }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm w-64 flex-shrink-0">

      <img
        src={item.image}
        alt={item.title}
        className="h-32 w-full object-cover rounded-lg mb-3"
      />

      <p className="text-sm font-medium leading-tight line-clamp-2">
        {item.title}
      </p>

      <p className="text-xs text-gray-500 mt-1">Progress</p>

      <div className="h-2 bg-gray-200 rounded-full mt-1">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${item.progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>Powered by YouTube</span>
        <span className="font-medium text-gray-700">
          {item.progress}%
        </span>
      </div>

    </div>
  );
};

const LearningSection = ({ data }) => {
  return (
    <div>

      <div className="flex justify-between items-center mb-3">

        <h3 className="font-bold text-gray-900">
          Learning In progress
        </h3>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition">
          View More
          <ArrowRight size={16} />
        </button>

      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {data.map((item, i) => (
          <LearningCard key={i} item={item} />
        ))}
      </div>

    </div>
  );
};

export default LearningSection;