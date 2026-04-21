import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from "../store/auth/authStore";

const PublicRoute = observer(({ restricted = false }) => {
  if (authStore.isLoggedIn && restricted) {
    return <Navigate to="/Onboarding" replace />;
  }
  return <Outlet />;
});

export default PublicRoute;
export { PublicRoute };
