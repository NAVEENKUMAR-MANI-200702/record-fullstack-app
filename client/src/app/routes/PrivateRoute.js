import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import authStore from '../store/auth/authStore';

const PrivateRoute = observer(() => {
  if (!authStore.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
});

export default PrivateRoute;
export { PrivateRoute };
