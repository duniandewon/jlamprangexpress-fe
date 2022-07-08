import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const auth = { token: false };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
