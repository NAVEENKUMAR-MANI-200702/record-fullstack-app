import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); // or home
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.removeItem("step");
  }, []);

  return (
    <div className="w-full text-center">
      <h2 className="text-2xl font-semibold mb-2">🎉 You're all set!</h2>

      <p className="text-gray-500">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Success;
