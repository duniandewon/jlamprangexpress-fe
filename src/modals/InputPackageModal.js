/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import TextField from "components/SuiInput";
import Button from "components/SuiButton";
import Select from "components/MySelect";
import Typography from "components/SuiTypography";

import useFetchPrivate from "hooks/useFetchPrivate";

import style from "modals/modalStyle";

const InputPackageModal = forwardRef((_, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [member, setMember] = useState({});
  const [receiptNumber, setReceiptNumber] = useState("");
  const [expedition, setExpedition] = useState("");
  const [reciever, setReciever] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalFee, setAdditionalFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cost, setCost] = useState(0);
  const [platform, setPlatform] = useState("");

  const [step, setStep] = useState(0);

  const fetch = useFetchPrivate();
  const queryClient = useQueryClient();

  const members = queryClient.getQueryData(["members"]);

  const options = useMemo(
    () => (members ? members.map((mem) => ({ id: mem._id, value: mem.username })) : []),
    [members]
  );

  const resetForm = () => {
    setMember({});
    setReceiptNumber("");
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

  const handleAddNewPackege = (data) => {
    const configs = {
      data,
      method: "POST",
      url: "/delivery",
    };

    return fetch(configs);
  };

  const handleAddNewPackegeMutation = useMutation(handleAddNewPackege, {
    onMutate: async (data) => {
      toggleModal();

      await queryClient.cancelQueries(["deliveries"]);

      const previousValue = queryClient.getQueryData(["deliveries"]);

      queryClient.setQueryData(["members"], (old) => [...old, data]);

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
    handleAddNewPackegeMutation.mutate({
      user: member.id,
      shippingCost: cost,
      receiptNumber,
      expedition,
      reciever: {
        name: reciever,
        address,
        phoneNumber,
      },
      weight,
      additionalFee,
      discount,
      platform,
    });
  };

  const handleSelect = (mem) => setMember(mem);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "receiptNumber":
        setReceiptNumber(value);
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

      case "phoneNumber":
        setPhoneNumber(value);
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

    if (!receiptNumber.length) return alert("Isi nomor resi terlebih dahulu");

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
              name="receiptNumber"
              value={receiptNumber}
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
      <Grid item xs={12} lg={4}>
        <TextField
          type="text"
          size="large"
          placeholder="Penerima"
          name="reciever"
          value={reciever}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          type="text"
          size="large"
          placeholder="Alamat / kota tujuan"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TextField
          type="text"
          size="large"
          placeholder="Nomer Handphone"
          name="phoneNumber"
          value={phoneNumber}
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
      <Box sx={style(800)}>
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
