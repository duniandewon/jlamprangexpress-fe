import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const fetch = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const privateFetch = (options) =>
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

export default (options) =>
  new Promise((resolve, reject) => {
    fetch(options)
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
