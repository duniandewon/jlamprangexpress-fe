import { forwardRef, useImperativeHandle, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import fetch from "utils/fetch";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";

import Typography from "components/SuiTypography";

import style from "modals/modalStyle";

const AddMemberModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const queryClient = useQueryClient();

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setAddress("");
    setPhoneNumber("");
  };

  const toggleModal = () => {
    resetStates();
    setModalOpen((prevState) => !prevState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "phone-number":
        setPhoneNumber(value);
        break;

      case "address":
        setAddress(value);
        break;

      default:
        break;
    }
  };

  const handleAddNewMember = (data) => {
    const options = {
      data,
      method: "POST",
      url: "/user/register",
    };

    return fetch(options);
  };

  const handleAddNewMemberMutation = useMutation(handleAddNewMember, {
    onMutate: async (data) => {
      toggleModal();

      await queryClient.cancelQueries(["members"]);

      const previousValue = queryClient.getQueryData(["members"]);

      queryClient.setQueryData(["members"], (old) => [...old, data]);

      return previousValue;
    },
    onError: (err, variables, previousValue) => queryClient.setQueryData(["todos"], previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    handleAddNewMemberMutation.mutate({
      username,
      email,
      address,
      phoneNumber,
      password: "sajkvkj",
    });
  };

  useImperativeHandle(ref, () => ({ toggleModal }), []);

  return (
    <Modal open={modalOpen} onClose={toggleModal}>
      <Box sx={style(800)}>
        <Typography variant="h3" mb={2}>
          Add Member
        </Typography>
        <form autoComplete="off" onSubmit={onSubmit} noValidate>
          <Grid container spacing={3} mb={3}>
            <Grid item sm={12}>
              <TextField
                type="text"
                size="large"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                type="text"
                size="large"
                placeholder="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                type="text"
                size="large"
                placeholder="phone number"
                name="phone-number"
                value={phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                type="text"
                size="large"
                placeholder="address"
                name="address"
                value={address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button type="submit" variant="contained" color="dark">
              Submit
            </Button>
            <Button type="button" variant="outlined" color="dark" onClick={toggleModal}>
              cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
});

export default AddMemberModal;
