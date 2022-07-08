/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetch from "utils/fetch";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onLogin = async (email, password) => {
    const options = {
      method: "POST",
      url: "/user/login",
      data: { email, password },
    };

    try {
      const res = await fetch(options);

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return { onLogin };
};

export default useAuth;
