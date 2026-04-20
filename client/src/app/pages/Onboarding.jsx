import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import formStore from "../store/formStore";

import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";
import Step5 from "../components/steps/Step5";
import Success from "../components/steps/Success";

const Onboarding = observer(() => {
  const stepRef = useRef();
  const renderStep = () => {
    switch (formStore.currentStep) {
      case 1:
        return <Step1 ref={stepRef} />;
      case 2:
        return <Step2 ref={stepRef} />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 ref={stepRef} />;
      case 5:
        return <Step5 />;
      case 6:
        return <Success />;
      default:
        return <div>Done 🎉</div>;
    }
  };

  const handleContinue = async () => {
    if (stepRef.current?.save) {
      await stepRef.current.save(); // ✅ save to API
    }

    formStore.nextStep(); // move next
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") {
        formStore.nextStep();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="w-full h-2 bg-gray-200">
        <div
          className="h-2 bg-blue-500 transition-all"
          style={{ width: `${formStore.progress}%` }}
        ></div>
      </div>

      {/* 🔙 Top Nav */}
      <div className="p-4 flex justify-between items-center">
        {formStore.currentStep > 1 && (
          <button
            onClick={() => formStore.prevStep()}
            className="text-sm text-gray-600"
          >
            ← Back
          </button>
        )}
        <div></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 overflow-auto">
        {" "}
        {renderStep()}
      </div>

      <div className="bg-black text-white p-4 flex justify-end items-center">
        <span className="text-sm mr-4 opacity-70">or press Enter</span>

        <button
          onClick={handleContinue}
          className="bg-blue-600 px-6 py-2 rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
});

export default Onboarding;
