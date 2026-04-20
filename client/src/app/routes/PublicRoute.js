import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../stores/AuthStore';

const PublicRoute = observer(({ restricted = false }) => {
  if (authStore.isLoggedIn && restricted) {
    return <Navigate to="/monitor/website" replace />;
  }
  return <Outlet />;
});

export default PublicRoute;
export { PublicRoute };
