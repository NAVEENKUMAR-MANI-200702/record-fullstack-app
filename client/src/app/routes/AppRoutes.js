import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Onboarding from "../pages/Onboarding";
import authStore from "../store/auth/authStore";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import AuthCallback from "../pages/AuthCallback";

const AppRoutes = () => {
  useEffect(() => {
    authStore.checkLoginStatus();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<PublicRoute restricted={true} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
