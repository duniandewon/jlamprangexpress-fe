/* eslint-disable no-underscore-dangle */
import React, { useMemo, useRef } from "react";

import Grid from "@mui/material/Grid";

import useDeliveries from "hooks/useDeliveries";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";

import DashboardLayout from "layout/DashboardLayout";

import InputPackageModal from "modals/InputPackageModal";

// import formatCurrency from "utils/formatCurrency";

function Packeges() {
  const { data: deliveries, isLoading } = useDeliveries();

  const inputPackageModalRef = useRef();

  const packagesData = useMemo(
    () => ({
      columns: [
        { Header: "resi", accessor: "resi", width: "15%" },
        { Header: "member", accessor: "member", width: "20%" },
        { Header: "penerima", accessor: "reciever", width: "20%" },
        { Header: "tanggal", accessor: "date", width: "15%" },
        { Header: "Eksoedisi", accessor: "expedition", width: "10%" },
        { Header: "Tagihan", accessor: "fee" },
      ],

      rows: deliveries
        ? deliveries.map(
            ({ receiptNumber, user, reciever, createdAt, expedition, shippingCost }) => ({
              resi: receiptNumber,
              member: user ? user.username : "-",
              reciever: reciever ? reciever.name : "-",
              date: createdAt,
              expedition,
              fee: shippingCost,
            })
          )
        : [],
    }),
    [deliveries, isLoading]
  );

  const handleOpenInputPackageModal = () => inputPackageModalRef.current.toggleModal();

  const renderHeader = () => (
    <Grid container mb={3}>
      <Grid item xs={12} md={8}>
        <Typography variant="h2">Transaksi</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button variant="gradient" color="dark" onClick={handleOpenInputPackageModal}>
            input paket
          </Button>
        </Box>
      </Grid>
    </Grid>
  );

  const renderDeliveries = () => (
    <Table
      title="List Paket"
      table={packagesData}
      entriesPerPage={{ defaultValue: 15, entries: [10, 15, 20, 25] }}
      pagination={{ variant: "gradient", color: "dark" }}
      canSearch
    />
  );

  return (
    <DashboardLayout>
      <Box py={3} px={2}>
        {renderHeader()}
        {renderDeliveries()}
      </Box>
      <InputPackageModal ref={inputPackageModalRef} />
    </DashboardLayout>
  );
}

export default Packeges;
