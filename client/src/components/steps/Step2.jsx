import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { forwardRef, useImperativeHandle } from "react";
import formStore from "../../store/formStore";
import authStore from "../../store/authStore";

const options = [
  "Build my Skill Repository",
  "Get a Good Job",
  "Upskill for Current Role",
  "Explore New Skills",
  "Make Learning a Habit!",
  "Others",
];

const Step2 = observer(
  forwardRef((props, ref) => {
    const [selected, setSelected] = useState([]);

    const userId = authStore.user?._id || authStore.user?.id;
    const name = formStore.formData?.step1?.name || "User";

    useImperativeHandle(ref, () => ({
      async save() {
        await formStore.saveStep(userId, "step2", {
          goals: selected,
        });
      },
    }));

    useEffect(() => {
      const data = formStore.formData?.step2;
      if (data?.goals) {
        setSelected(data.goals);
      }
    }, [formStore.formData]);

    const toggleOption = (option) => {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    };

    const handleBack = () => {
      formStore.prevStep();
    };

    return (
      <div className="w-full">
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Hey {name} 👋
            </h2>

            <p className="text-gray-500 text-center mb-6 text-sm">
              Let us know, how would you like to use Record for:
            </p>

            <div className="text-sm font-medium mb-3">
              What's your main goal?
            </div>

            <div className="space-y-3">
              {options.map((option, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }),
);

export default Step2;
