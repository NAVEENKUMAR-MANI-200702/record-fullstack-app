import React from "react";
import { useNavigate } from "react-router-dom";
import formStore from "../../store/formStore";

const Success = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = async () => {
    const success = await formStore.completeOnboarding();

    if (success) {
      navigate("/dashboard");
    } else {
      console.error("Failed to complete onboarding");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-10">
      <h2 className="text-2xl font-semibold mb-2">🎉 You're all set!</h2>
      <p className="text-gray-500 mb-6">
        Your profile has been set up successfully.
      </p>

      <button
        onClick={handleGoToDashboard}
        className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Success;