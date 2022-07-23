/* eslint-disable no-console */
import { useCallback } from "react";

import useAuth from "hooks/useAuth";
import useFetchPrivate from "hooks/useFetchPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const fetchPrivate = useFetchPrivate();

  const logout = useCallback(async () => {
    setAuth("");

    try {
      const options = {
        method: "GET",
        url: "/user/logout",
      };

      await fetchPrivate(options);
    } catch (err) {
      console.log("logout error", err);
    }
  }, []);

  return logout;
};

export default useLogout;
