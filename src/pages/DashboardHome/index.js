import { useCallback, useMemo, useRef } from "react";

import Grid from "@mui/material/Grid";

import useMembers from "hooks/useMembers";
import useDeliveries from "hooks/useDeliveries";
import useTransactions from "hooks/useTransactions";

import DashboardLayout from "layout/DashboardLayout";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";
import DoughnutChart from "components/SuiDoughnutChart";

import BarChart from "examples/Charts/BarCharts/VerticalBarChart";

import CreditCardIcon from "examples/Icons/CreditCard";
import SpaceShipIcon from "examples/Icons/SpaceShip";
import CubeIcon from "examples/Icons/Cube";
import ShopIcon from "examples/Icons/Shop";

import Card from "pages/DashboardHome/Card";

import DepositModal from "modals/DepositModal";
import InputPackagesModal from "modals/InputPackageModal";
import AddMember from "modals/AddMemberModal";

import formatCurrency from "utils/formatCurrency";

const chartData = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "JNE",
      color: "info",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      label: "POST",
      color: "dark",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    },
    {
      label: "TIKI",
      color: "primary",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "Wahana",
      color: "warning",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "Ninja",
      color: "error",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "Ninja",
      color: "error",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "Lion",
      color: "secondary",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "JNT",
      color: "success",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
    {
      label: "SICEPAT",
      color: "light",
      data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
    },
  ],
};

const doughnutChartData = {
  labels: ["JNE", "POS", "TIKI", "Wahana", "Ninja", "Lion", "JNT", "SICEPAT"],
  datasets: {
    label: "# of Votes",
    data: [22128, 12316, 6178, 19013, 30, 5176, 2110, 9],
    backgroundColors: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
      "rgba(153, 234, 215, 1)",
      "rgba(255, 27, 100, 1)",
    ],
  },
};

const LOCALE = "id-ID";
const CURRENCY = "IDR";

function Dashboard() {
  const depositModalRef = useRef();
  const inputPackageModalRef = useRef();
  const AddMemberModalRef = useRef();

  const { data: members, isLoading } = useMembers();
  const { data: deliveries } = useDeliveries();
  const { data: transactions } = useTransactions();

  const handleOpendepositModal = () => depositModalRef.current.toggleModal();

  const handleOpenInputPackageModal = () => inputPackageModalRef.current.toggleModal();

  const handleOpenAddMemberModal = () => AddMemberModalRef.current.toggleModal();

  const cards = useMemo(() => {
    const membersCount = members ? members.length : 0;
    const totalDeposit = transactions
      ? transactions.reduce((prevVal, curVal) => {
          if (curVal.transactionType === "credit") return prevVal + curVal.amount;
          return prevVal;
        }, 0)
      : 0;

    return [
      {
        title: "paket",
        amount: deliveries ? deliveries.length : 0,
        icon: <CubeIcon size="25px" />,
      },
      {
        title: "member",
        amount: membersCount,
        icon: <ShopIcon size="25px" />,
      },
      {
        title: "tot. Deposit",
        amount: formatCurrency(totalDeposit, LOCALE, CURRENCY),
        icon: <CreditCardIcon size="25px" />,
      },
      {
        title: "tot. ongkir",
        amount: formatCurrency(1798565401, LOCALE, CURRENCY),
        icon: <SpaceShipIcon size="25px" />,
      },
    ];
  }, [members, deliveries, transactions, isLoading]);

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
        ? deliveries.map(({ receiptNumber, user, createdAt, expedition, shippingCost }) => ({
            resi: receiptNumber,
            member: user.username,
            reciever: "-",
            date: createdAt,
            expedition,
            fee: shippingCost,
          }))
        : [],
    }),
    [deliveries]
  );

  const renderHeader = useCallback(
    () => (
      <Box sx={{ display: "flex", alignItems: "center" }} mb={3}>
        <Typography variant="h2" sx={{ flex: 1 }}>
          Dashboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button variant="gradient" color="dark" onClick={handleOpenAddMemberModal}>
            Add Memeber
          </Button>
          <Button variant="gradient" color="dark" onClick={handleOpendepositModal}>
            Deposit
          </Button>
          <Button variant="gradient" color="dark" onClick={handleOpenInputPackageModal}>
            Input Paket
          </Button>
        </Box>
      </Box>
    ),
    []
  );

  const renderCards = useCallback(
    () => (
      <Grid container mb={3} spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} md={6} lg={3} key={card.title}>
            <Card {...card} />
          </Grid>
        ))}
      </Grid>
    ),
    [members, deliveries, isLoading]
  );

  const renderPackagesStatistic = useCallback(
    () => (
      <Grid item md={12} lg={8}>
        <BarChart chart={chartData} title="Statik Pengiriman" height="25rem" />
      </Grid>
    ),
    []
  );

  const renderPackagesTrend = useCallback(
    () => (
      <Grid item md={12} lg={4}>
        <DoughnutChart title="Trend Pengiriman" chart={doughnutChartData} />
      </Grid>
    ),
    []
  );

  const renderPackagesList = useCallback(
    () => (
      <Table
        title="List Paket"
        table={packagesData}
        action="input paket"
        onClick={handleOpenInputPackageModal}
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
        <Grid container spacing={3} mb={3}>
          {renderPackagesStatistic()}
          {renderPackagesTrend()}
        </Grid>
        {renderPackagesList()}
      </Box>
      <DepositModal ref={depositModalRef} />
      <InputPackagesModal ref={inputPackageModalRef} />
      <AddMember ref={AddMemberModalRef} />
    </DashboardLayout>
  );
}

export default Dashboard;
