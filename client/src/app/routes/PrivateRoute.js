import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/auth/authStore";

const PrivateRoute = observer(() => {
  const location = useLocation();

  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (authStore.isOnboardingCompleted && location.pathname === "/Onboarding") {
    return <Navigate to="/dashboard" replace />;
  }

  if (!authStore.isOnboardingCompleted && location.pathname === "/dashboard") {
    return <Navigate to="/Onboarding" replace />;
  }

  return <Outlet />;
});

export default PrivateRoute;