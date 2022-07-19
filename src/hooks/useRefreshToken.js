import fetch from "utils/fetch";

import useAuth from "hooks/useAuth";

const useRefreshToken = () => {
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
      console.log("refresh token err", err);
      return 1;
    }
  };

  return { refresh };
};

export default useRefreshToken;
