/* eslint-disable no-underscore-dangle */
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";

import Typography from "components/SuiTypography";
import Select from "components/MySelect";

import useFetchPrivate from "hooks/useFetchPrivate";

import style from "modals/modalStyle";

const DepositModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [member, setMember] = useState({});

  const queryClient = useQueryClient();
  const fetch = useFetchPrivate();

  const members = queryClient.getQueryData(["members"]);

  const options = useMemo(
    () => (members ? members.map((mem) => ({ id: mem._id, value: mem.username })) : []),
    [members]
  );

  const toggleModal = () => setModalOpen((prevState) => !prevState);

  const handleChange = (e) => {
    setDeposit(e.target.value);
  };

  const handleSelect = (mem) => setMember(mem);

  useImperativeHandle(ref, () => ({ toggleModal }), []);

  const resetState = () => {
    setDeposit("");
    setMember({});
  };

  const handleNewDposit = (data) => {
    const configs = {
      data: {
        transactionType: "credit",
        ...data,
      },
      method: "POST",
      url: "/transaction",
    };

    return fetch(configs);
  };

  const handleNewDpositMutation = useMutation(handleNewDposit, {
    onMutate: async (data) => {
      toggleModal();

      await queryClient.cancelQueries(["transactions"]);

      const previousValue = queryClient.getQueryData(["transactions"]);

      queryClient.setQueryData(["transactions"], (old) => [...old, data]);

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["deliveries"], previousValue),
    onSettled: () => {
      queryClient.invalidateQueries(["deliveries"]);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(member).length)
      handleNewDpositMutation.mutate({ user: member.id, amount: deposit });
    resetState();
  };

  return (
    <Modal open={modalOpen} onClose={toggleModal}>
      <Box sx={style(800)}>
        <Typography variant="h3" mb={2}>
          Deposit Saldo
        </Typography>
        <form autoComplete="off" onSubmit={onSubmit} noValidate>
          <Grid container spacing={3} mb={2}>
            <Grid item lg={6}>
              <Select label="Pilih member" options={options} onSelect={handleSelect} />
            </Grid>
            <Grid item lg={6}>
              <TextField
                type="number"
                size="large"
                placeholder="amount"
                name="amount"
                value={deposit}
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

export default DepositModal;
