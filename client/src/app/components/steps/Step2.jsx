import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { forwardRef, useImperativeHandle } from "react";
import formStore from "../../store/formStore";
import authStore from "../../store/auth/authStore";

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

    const userId = authStore.user?.id || authStore.user?._id;
    const name = formStore.formData?.step1?.name || "User";

    useImperativeHandle(ref, () => ({
      async save() {
        const res = await formStore.saveStep("step2", {
          goals: selected,
        });

        return res === true;
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
      <div className="w-full flex items-center justify-center px-4 py-12 max-w-md mx-auto">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Hey {name} 👋</h2>
            <p className="text-slate-500 text-sm">
              Let us know, how would you like to use Record for:
            </p>
          </div>

          <div>
            <div className="text-lg font-semibold mb-4">
              What's your main goal?
            </div>
            <div className="space-y-3">
              {options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="w-5 h-5 rounded cursor-pointer accent-black"
                  />
                  <span className="text-slate-900">{option}</span>
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
