import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext("");

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState("");

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
