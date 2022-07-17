/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import fetch from "utils/fetch";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    // localStorage.clear();
    // setIsLoggedIn(false);
  }, []);

  const onLogin = async (email, password) => {
    const options = {
      method: "POST",
      url: "/user/login",
      data: { email, password },
    };

    try {
      const res = await fetch(options);

      const { accessToken } = res.data;

      localStorage.setItem("token", accessToken);
      navigate("/home", { state: { from: location }, replace: true });
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return { onLogin, isLoggedIn };
};

export default useAuth;
