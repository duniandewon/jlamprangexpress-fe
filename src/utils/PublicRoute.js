import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "hooks/useAuth";

function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  if (!auth) return <Outlet />;

  return <Navigate to={from} replace />;
}

export default ProtectedRoute;
