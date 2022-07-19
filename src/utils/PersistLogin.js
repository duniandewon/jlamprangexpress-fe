import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useRefreshToken from "hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { refresh } = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Persist login error", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth) verifyRefreshToken();
    else setIsLoading(false);
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />;
}

export default PersistLogin;
