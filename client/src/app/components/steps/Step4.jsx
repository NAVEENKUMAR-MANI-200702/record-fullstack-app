import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { forwardRef, useImperativeHandle } from "react";
import formStore from "../../store/formStore";
import authStore from "../../store/authStore";

const SKILLS = {
  Business: [
    "Microsoft Project",
    "Operations Management",
    "Technical Writing",
    "Microsoft Access",
    "HR Analytics",
  ],
  Design: ["UI/UX", "Figma", "Adobe XD", "Canva", "Illustration"],
};

const Step4 = observer(
  forwardRef((props, ref) => {
    const userId = authStore.user?.id;

    const [selected, setSelected] = useState([]);

    const toggleSkill = (skill) => {
      if (selected.includes(skill)) {
        setSelected(selected.filter((s) => s !== skill));
      } else {
        if (selected.length >= 5) return; // max limit
        setSelected([...selected, skill]);
      }
    };

    useImperativeHandle(ref, () => ({
      async save() {
        await formStore.saveStep(userId, "step4", {
          skills: selected,
        });
      },
    }));

    return (
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">What's your Interest?</h2>

        <p className="text-gray-500 text-sm mb-4">
          Let us know what you are most curious about.
        </p>

        {/* Search */}
        <input
          placeholder="Search skills (eg: figma, frontend)"
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        {/* Selected Skills */}
        {selected.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-left">
              Selected Skills
            </div>

            <div className="flex flex-wrap gap-2">
              {selected.map((skill) => (
                <div
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full text-xs cursor-pointer"
                >
                  {skill} ✕
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skill Categories */}
        {Object.keys(SKILLS).map((category) => (
          <div key={category} className="mb-6 text-left">
            <h3 className="font-medium mb-2">{category}</h3>

            <div className="flex flex-wrap gap-2">
              {SKILLS[category].map((skill) => {
                const isSelected = selected.includes(skill);

                return (
                  <div
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 border rounded-full text-xs cursor-pointer 
                    ${isSelected ? "bg-red-500 text-white" : "bg-gray-100"}`}
                  >
                    {skill}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }),
);

export default Step4;
