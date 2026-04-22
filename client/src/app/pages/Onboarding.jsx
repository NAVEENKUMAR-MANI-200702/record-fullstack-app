import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { ChevronLeft, Sailboat } from "lucide-react";
import formStore from "../store/formStore";

import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";
import Step5 from "../components/steps/Step5";
import Success from "../components/steps/Success";
import skillsStore from "../store/SkillsStore";
import { TOTAL_STEPS_LIMIT } from "../../static/Constant";

const TOTAL_STEPS = TOTAL_STEPS_LIMIT;

const Onboarding = observer(() => {
  const stepRef = useRef();

  const renderStep = () => {
    switch (formStore.currentStep) {
      case 1:
        return <Step1 ref={stepRef} />;
      case 2:
        return <Step2 ref={stepRef} />;
      case 3:
        return <Step3 ref={stepRef} />;
      case 4:
        return <Step4 ref={stepRef} />;
      case 5:
        return <Step5 ref={stepRef} />;
      case 6:
        return <Success />;
      default:
        return null;
    }
  };

  const handleContinue = async () => {
    if (formStore.currentStep >= 6 || formStore.saving) return;
    if (stepRef.current?.save) {
      const saved = await stepRef.current.save();
      if (!saved) return;
    }
    formStore.nextStep();
  };

  const handleBack = async () => {
    await formStore.prevStep();
  };

  useEffect(() => {
    const handleKey = async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        await handleContinue();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [formStore.currentStep]);

  useEffect(() => {
    formStore.fetchForm();
    skillsStore.fetchSkills();
  }, []);

  const isSuccessScreen = formStore.currentStep === 6;
  const progress = Math.round((formStore.currentStep / TOTAL_STEPS) * 100);

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB] overflow-hidden">
      {!isSuccessScreen && (
        <header className="w-full bg-white border-b border-gray-100 px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-8">
          {/* Back Button */}
          <div className="w-16 sm:w-24 shrink-0">
            {formStore.currentStep > 1 && (
              <button
                onClick={handleBack}
                disabled={formStore.loading}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-200 bg-white rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm"
              >
                <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                <span>Back</span>
              </button>
            )}
          </div>

          {/* Progress Track */}
          <div className="flex-1 relative py-4 sm:py-6">
            <div className="h-1 sm:h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-800 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="absolute top-0 transition-all duration-500 ease-out"
              style={{ left: `calc(${progress}% - 12px)` }}
            >
              <Sailboat
                size={16}
                className="text-gray-400 fill-gray-50 sm:w-5 sm:h-5"
              />
            </div>
          </div>

          {/* Logo */}
          <div className="w-16 sm:w-24 shrink-0 flex justify-end">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-orange-500 rounded-sm" />
          </div>
        </header>
      )}
      <main className="flex-1 flex items-center justify-center px-4 overflow-auto">
        <div className="w-full">{renderStep()}</div>
      </main>

      {!isSuccessScreen && (
        <footer className="bg-black border-t border-gray-100 p-3 sm:p-4 flex justify-end items-center gap-3 sm:gap-6">
          {formStore.error && (
            <span className="text-red-500 text-xs sm:text-sm animate-pulse">
              {formStore.error}
            </span>
          )}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs text-gray-400 font-medium tracking-wide uppercase hidden sm:block">
              Press Enter ↵
            </span>
            <button
              onClick={handleContinue}
              disabled={formStore.saving}
              className="bg-blue-600 text-white 
          px-4 py-1.5 text-sm          
          sm:px-8 sm:py-2.5 sm:text-base
          rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {formStore.saving ? "Saving..." : "Continue"}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
});

export default Onboarding;
