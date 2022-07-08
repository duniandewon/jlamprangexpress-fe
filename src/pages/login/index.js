import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

import PageLayout from "layout/PageLayout";

import Typography from "components/SuiTypography";
import Input from "components/SuiInput";
import Button from "components/SuiButton";

import useAuth from "utils/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <PageLayout>
      <Box
        sx={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Card
          sx={{
            p: 2,
            width: {
              xs: "90%",
              md: 400,
            },
          }}
        >
          <Box mb={2}>
            <Typography variant="h2" textAlign="center">
              Login
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
              Jlamparang Express
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box mb={1.5}>
              <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <Typography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  username
                </Typography>
              </Box>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
              />
            </Box>
            <Box mb={1.5}>
              <Box mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <Typography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  password
                </Typography>
              </Box>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
              <Switch />
              <Typography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </Typography>
            </Box>
            <Button type="submit" variant="gradient" color="dark" sx={{ width: "100%" }}>
              Login
            </Button>
          </form>
          <Typography
            fontWeight="medium"
            sx={{ color: "#6C757D", fontSize: 12 }}
            mt={4}
            textAlign="center"
          >
            Forgot password?&nbsp;
            <Typography component="span" sx={{ color: "#7928CA", fontSize: 12 }}>
              Contact admin
            </Typography>
            &nbsp; to recover your password.
          </Typography>
        </Card>
      </Box>
    </PageLayout>
  );
}

export default Login;
