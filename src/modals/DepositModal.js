/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from "react";

import { useFormik } from "formik";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";

import Typography from "components/SuiTypography";
import Select from "components/MySelect";

const options = [
  {
    id: "KS-1",
    value: "Hamid",
  },
  {
    id: "KS-2",
    value: "Mohammad Sofie",
  },
  {
    id: "KS-3",
    value: "Aminah Hanan",
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

  const toggleModal = () => setModalOpen((prevState) => !prevState);

  useImperativeHandle(ref, () => ({ toggleModal }), []);

  const onSubmit = (values) => {
    console.log(values);
    toggleModal();
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      member: "",
      amount: "",
    },
    onSubmit,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
  };

  return (
    <Modal open={modalOpen} onClose={toggleModal}>
      <Box sx={style}>
        <Typography variant="h3" mb={2}>
          Deposit Saldo
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3} mb={2}>
            <Grid item lg={6}>
              <Select label="Pilih member" options={options} />
            </Grid>
            <Grid item lg={6}>
              <TextField
                type="number"
                size="large"
                placeholder="amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
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
