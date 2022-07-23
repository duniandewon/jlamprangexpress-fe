import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";
import Select from "components/MySelect";

import Typography from "components/SuiTypography";

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

const InputPackageModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState({});
  const [recietNumber, setRecietNumber] = useState("");
  const [expedition, setExpedition] = useState("");
  const [reciever, setReciever] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [additionalFee, setAdditionalFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cost, setCost] = useState(0);
  const [platform, setPlatform] = useState("");

  const [step, setStep] = useState(0);

  const resetForm = () => {
    setMember({});
    setRecietNumber("");
    setExpedition("");
    setReciever("");
    setWeight("");
    setAddress("");
    setAdditionalFee(0);
    setDiscount(0);
    setCost(0);
    setPlatform("");
    setStep(0);
  };

  const toggleModal = () => {
    resetForm();
    setModalOpen((prevState) => !prevState);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({
      user: member.id,
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

  const total = useMemo(() => {
    const subTotal = parseInt(cost, 10) + parseInt(additionalFee, 10);

    const grandTotal = subTotal - (subTotal * parseInt(discount, 10)) / 100;

    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
      grandTotal
    );
  }, [step, discount, cost, additionalFee]);

  const handleCheckReciet = () => {
    if (!Object.keys(member).length) return alert("Pilih member terlebih dahulu");

    if (!recietNumber.length) return alert("Isi nomor resi terlebih dahulu");

    setReciever("Abolfaz");

    setAddress("Depok");

    setWeight("139");

    setCost(20000);

    setAdditionalFee(5000);

    setDiscount(0);

    return setStep(1);
  };

  useImperativeHandle(ref, () => ({ toggleModal }), []);

  const renderCheckReciet = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Select label="Pilih member" options={options} onSelect={handleSelect} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              size="large"
              placeholder="Nomer Resi"
              name="recietNumber"
              value={recietNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Expedisi"
              name="expedition"
              value={expedition}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="text"
              size="large"
              placeholder="Platform"
              name="platform"
              value={platform}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="button" variant="gradient" color="dark" onClick={handleCheckReciet}>
              cek resi
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderPackageInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <TextField
          type="text"
          size="large"
          placeholder="Penerima"
          name="reciever"
          value={reciever}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          type="text"
          size="large"
          placeholder="Alamat / kota tujuan"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          type="text"
          size="large"
          placeholder="Berat (kg)"
          name="weight"
          value={weight}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          type="number"
          size="large"
          placeholder="Tarif"
          name="cost"
          value={cost}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          type="number"
          size="large"
          placeholder="Biaya Tambahan"
          name="additionalFee"
          value={additionalFee}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TextField
          type="number"
          size="large"
          placeholder="Diskon"
          name="discount"
          value={discount}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="body1">{total}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
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
          {step >= 1 ? renderPackageInfo() : renderCheckReciet()}
        </form>
      </Box>
    </Modal>
  );
});

export default InputPackageModal;
