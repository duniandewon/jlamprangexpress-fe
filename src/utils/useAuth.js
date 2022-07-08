import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetch from "utils/fetch";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
  }, []);

  const onLogin = async (email, password) => {
    const options = {
      method: "POST",
      url: "/user/login",
      data: { email, password },
    };

    try {
      const res = await fetch(options);

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  return { onLogin, isLoggedIn };
};

export default useAuth;
