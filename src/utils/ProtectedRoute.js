import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "hooks/useAuth";

function ProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
