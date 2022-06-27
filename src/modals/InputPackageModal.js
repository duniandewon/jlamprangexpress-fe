import { forwardRef, useImperativeHandle, useState } from "react";

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

const InputPackageModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState({});
  const [recietNumber, setRecietNumber] = useState("");
  const [expedition, setExpedition] = useState("");
  const [reciever, setReciever] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [additionalFee, setAdditionalFee] = useState("");
  const [discount, setDiscount] = useState("");
  const [cost, setCost] = useState("");
  const [platform, setPlatform] = useState("");

  const resetForm = () => {
    setMember({});
    setRecietNumber("");
    setExpedition("");
    setReciever("");
    setWeight("");
    setAddress("");
    setAdditionalFee("");
    setDiscount("");
    setCost("");
    setPlatform("");
  };

  const toggleModal = () => {
    resetForm();
    setModalOpen((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      member,
      recietNumber,
      expedition,
      reciever,
      weight,
      address,
      additionalFee,
      discount,
      cost,
      platform,
    });
    toggleModal();
  };

  const handleSelect = (mem) => setMember(mem);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "recietNumber":
        setRecietNumber(value);
        break;

      case "expedition":
        setExpedition(value);
        break;

      case "reciever":
        setReciever(value);
        break;

      case "weight":
        setWeight(value);
        break;

      case "address":
        setAddress(value);
        break;

      case "additionalFee":
        setAdditionalFee(value);
        break;

      case "discount":
        setDiscount(value);
        break;

      case "cost":
        setCost(value);
        break;

      case "platform":
        setPlatform(value);
        break;

      default:
        break;
    }
  };

  useImperativeHandle(ref, () => ({ toggleModal }), []);

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
        <Select label="Pilih member" options={options} onSelect={handleSelect} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextField
              type="text"
              size="large"
              placeholder="Nomer Resi"
              name="recietNumber"
              value={recietNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Expedisi"
              name="expedition"
              value={expedition}
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Platform"
              name="platform"
              value={platform}
              onChange={handleChange}
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
          value={reciever}
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={6}>
        <TextField
          type="text"
          size="large"
          placeholder="Alamat / kota tujuan"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Berat (kg)"
          name="weight"
          value={weight}
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Tarif"
          name="cost"
          value={cost}
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Biaya Tambahan"
          name="additionalFee"
          value={additionalFee}
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Diskon"
          name="discount"
          value={discount}
          onChange={handleChange}
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
        <form autoComplete="off" onSubmit={onSubmit}>
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
