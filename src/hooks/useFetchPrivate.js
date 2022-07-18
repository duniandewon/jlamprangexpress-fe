/* eslint-disable no-param-reassign */
import { useEffect } from "react";
import { axiosPrivate } from "utils/fetch";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";

const useFetchPrivate = () => {
  const { refresh } = useRefreshToken();
  const { auth } = useAuth();

  const privateFetch = (options) =>
    new Promise((resolve, reject) => {
      axiosPrivate(options)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          const defaultError = {
            code: 500,
            status: "error",
            message: "Failed to fetch data. Please contact developer.",
          };

          if (typeof err.response === "undefined") reject(defaultError);
          else if (typeof err.response.data === "undefined") reject(defaultError);
          else reject(err.response.data);
        });
    });

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err?.config;
        if (err?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevReq);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [auth, refresh]);

  return privateFetch;
};

export default useFetchPrivate;
