/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";

import Typography from "components/SuiTypography";
import Select from "components/MySelect";

import style from "modals/modalStyle";

const options = [
  {
    id: "KS-1",
    value: "Hamid",
  },
  {
    id: "KS-2",
    value: "Sofie",
  },
  {
    id: "KS-3",
    value: "Hanan",
  },
  {
    id: "KS-4",
    value: "Abolfaz",
  },
  {
    id: "KS-5",
    value: "Syafiq",
  },
  {
    id: "KS-6",
    value: "Upang",
  },
  {
    id: "KS-7",
    value: "Verra",
  },
];

const DepositModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deposit, setDeposit] = useState("");
  const [member, setMember] = useState({});

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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ deposit, member });
    if (Object.keys(member).length) toggleModal();
    resetState();
  };

  return (
    <Modal open={modalOpen} onClose={toggleModal}>
      <Box sx={style}>
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
