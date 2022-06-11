import React, { useCallback } from "react";

import Grid from "@mui/material/Grid";

import DashboardLayout from "layout/DashboardLayout";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";

import CreditCardIcon from "examples/Icons/CreditCard";
import SpaceShipIcon from "examples/Icons/SpaceShip";
import CubeIcon from "examples/Icons/Cube";
import ShopIcon from "examples/Icons/Shop";

import Card from "pages/DashboardHome/Card";

import data from "pages/DashboardHome/dataTableData";

const cards = [
  {
    title: "paket",
    amount: "66,474",
    icon: <CubeIcon size="25px" />,
  },
  {
    title: "member",
    amount: "201",
    icon: <ShopIcon size="25px" />,
  },
  {
    title: "tot. Deposit",
    amount: "Rp 1,779,492,276",
    icon: <CreditCardIcon size="25px" />,
  },
  {
    title: "tot. ongkir",
    amount: "Rp 1,798,565,401",
    icon: <SpaceShipIcon size="25px" />,
  },
];

function Dashboard() {
  const renderHeader = useCallback(
    () => (
      <Grid container mb={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button variant="gradient" color="dark">
              Add Memeber
            </Button>
            <Button variant="gradient" color="dark">
              Deposit
            </Button>
            <Button variant="gradient" color="dark">
              Input Paket
            </Button>
          </Box>
        </Grid>
      </Grid>
    ),
    []
  );

  const renderCards = useCallback(
    () => (
      <Grid container mb={3} spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} md={3} key={card.title}>
            <Card {...card} />
          </Grid>
        ))}
      </Grid>
    ),
    []
  );

  const renderPackagesList = useCallback(
    () => (
      <Table
        title="List Paket"
        table={data}
        action="input paket"
        entriesPerPage={{ defaultValue: 15, entries: [10, 15, 20, 25] }}
        pagination={{ variant: "gradient", color: "dark" }}
        canSearch
      />
    ),
    []
  );

  return (
    <DashboardLayout>
      <Box py={3} px={2}>
        {renderHeader()}
        {renderCards()}
        {renderPackagesList()}
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
