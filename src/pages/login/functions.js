import fetch from "utils/fetch";

const onLogin = async (email, password, success, error) => {
  const options = {
    method: "POST",
    url: "/user/login",
    data: { email, password },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(options);

    const { accessToken } = res.data;

    success(accessToken);
  } catch (err) {
    if (error) error(err);
  }
};

export default onLogin;
