import React from "react";
import { Info, Award } from "lucide-react";

const RightPanel = ({ stats }) => {
  return (
    <div className="w-full md:w-72 space-y-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
        
        <h3 className="font-semibold text-gray-900 mb-4">
          Skill Badges
        </h3>

        <div className="flex gap-4">

          <div className="flex-1 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">

            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <Award size={16} className="text-orange-500" />
              </div>

              <p className="text-2xl font-bold text-orange-500">
                {stats.roleBased}
              </p>
            </div>

            <p className="text-sm text-gray-600">
              Role Based
            </p>

          </div>

          <div className="flex-1 border border-gray-200 rounded-xl p-4 flex flex-col gap-2">

            <div className="flex items-center gap-2">
              <div className="bg-orange-100 p-2 rounded-full">
                <Award size={16} className="text-orange-500" />
              </div>

              <p className="text-2xl font-bold text-orange-500">
                {stats.superSkills}
              </p>
            </div>

            <p className="text-sm text-gray-600">
              Super Skills
            </p>

          </div>

        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">

        <div className="flex justify-between items-center mb-4">
          
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">
              Learning Activities
            </h3>
            <Info size={14} className="text-gray-400" />
          </div>

          <select className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-600 bg-gray-50">
            <option>Jan</option>
            <option>Feb</option>
            <option>Mar</option>
          </select>
        </div>

        <div className="grid grid-cols-7 text-xs text-gray-400 mb-2 px-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <span key={day} className="text-center">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 42 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gray-100 rounded-md hover:scale-110 transition"
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-400 mt-4">
          
          <span>Less</span>

          <div className="flex gap-1">
            <span className="w-3 h-3 bg-gray-200 rounded-sm"></span>
            <span className="w-3 h-3 bg-red-200 rounded-sm"></span>
            <span className="w-3 h-3 bg-red-300 rounded-sm"></span>
            <span className="w-3 h-3 bg-red-400 rounded-sm"></span>
            <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
          </div>

          <span>More</span>
        </div>

      </div>

    </div>
  );
};

export default RightPanel;