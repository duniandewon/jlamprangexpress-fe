/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import { forwardRef, useImperativeHandle, useState } from "react";

import { useFormik } from "formik";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";
import Select from "components/MySelect";

import Typography from "components/SuiTypography";

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

const InputPackageModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
    resetForm();
  };

  const onSubmit = (values) => {
    console.log(values);
    toggleModal();
    resetForm();
  };

  useImperativeHandle(ref, () => ({ toggleModal }), []);

  const { values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: {
      user: "",
      recietNumber: "",
      expedition: "",
      reciever: "",
      weight: "",
      address: "",
      additionalFee: "",
      discount: "",
      cost: "",
      platform: "",
    },
    onSubmit,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
  };

  const renderleftSide = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Select label="Pilih member" options={options} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextField
              type="text"
              size="large"
              placeholder="Nomer Resi"
              name="recietNumber"
              value={values.recietNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Expedisi"
              name="expedition"
              value={values.expedition}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Platform"
              name="platform"
              value={values.platform}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="button" variant="gradient" color="dark">
              cek resi
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderRightSide = () => (
    <Grid container spacing={3}>
      <Grid item lg={6}>
        <TextField
          type="text"
          size="large"
          placeholder="Penerima"
          name="reciever"
          value={values.reciever}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={6}>
        <TextField
          type="text"
          size="large"
          placeholder="Alamat / kota tujuan"
          name="address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Berat (kg)"
          name="weight"
          value={values.weight}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Tarif"
          name="cost"
          value={values.cost}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Biaya Tambahan"
          name="additionalFee"
          value={values.additionalFee}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Diskon"
          name="discount"
          value={values.discount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item lg={6}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="body1">Rp 0.00</Typography>
        </Box>
      </Grid>
      <Grid item lg={6}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button type="submit" variant="gradient" color="dark">
            save
          </Button>
          <Button type="button" variant="outlined" color="dark" onClick={toggleModal}>
            cancel
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Modal open={modalOpen} onClose={toggleModal}>
      <Box sx={style}>
        <Typography variant="h3" mb={2}>
          Input Paket
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item lg={6}>
              {renderleftSide()}
            </Grid>
            <Grid item lg={6}>
              {renderRightSide()}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
});

export default InputPackageModal;
