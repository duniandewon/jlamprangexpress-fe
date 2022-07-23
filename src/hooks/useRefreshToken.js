import { useLocation, useNavigate } from "react-router-dom";

import fetch from "utils/fetch";

import useAuth from "hooks/useAuth";

const useRefreshToken = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const refresh = async () => {
    const options = {
      method: "GET",
      url: "/user/refresh-token",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(options);

      const { accessToken } = res.data;

      setAuth(accessToken);

      return accessToken;
    } catch (err) {
      return navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return { refresh };
};

export default useRefreshToken;
