import axios from "axios";

const fetch = axios.create({
  baseURL: "http://localhost:5000/api",
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
