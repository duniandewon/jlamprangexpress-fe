import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirect, children }) {
  if (!isAllowed) return <Navigate to={redirect} replace />;

  return children || <Outlet />;
}

ProtectedRoute.defaultProps = {
  isAllowed: false,
  redirect: "/login",
  children: null,
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool,
  redirect: PropTypes.string,
  children: PropTypes.node,
};

export default ProtectedRoute;
