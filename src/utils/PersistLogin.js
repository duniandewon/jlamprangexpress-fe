/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useSoftUIController, setLayout } from "context";

import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

function PersistLogin() {
  const [, dispatch] = useSoftUIController();

  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    setLayout(dispatch, "page");

    const verifyRefreshToken = async () => {
      await refresh();

      if (isMounted) setIsLoading(false);
    };

    if (!auth && persist) verifyRefreshToken();
    else setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return !persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />;
}

export default PersistLogin;
