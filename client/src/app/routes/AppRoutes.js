import React, { use, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import authStore from "../store/auth/authStore";

const AppRoutes = () => {

  useEffect(() => {
    authStore.checkLoginStatus();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
    </Routes>
  );
};

export default AppRoutes;
