import { useCallback, useMemo, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PaidIcon from "@mui/icons-material/Paid";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import Box from "@mui/material/Box";
import Typography from "components/SuiTypography";
import Table from "components/SuiTable";

import DashboardLayout from "layout/DashboardLayout";

function MembersDetail() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleMenu = (e) => (anchorEl ? setAnchorEl(null) : setAnchorEl(e.currentTarget));

  // const handleCloseMenu = () => setAnchorEl(null);

  const cards = useMemo(
    () => [
      {
        title: "tagihan",
        icon: <PaidIcon fontSize="medium" sx={{ color: "rgb(52, 71, 103)" }} />,
        number: "Rp 5.000.000",
      },
      {
        title: "saldo",
        icon: <AccountBalanceWalletIcon fontSize="medium" sx={{ color: "rgb(52, 71, 103)" }} />,
        number: "Rp 5.000",
      },
      {
        title: "paket",
        icon: <LocalShippingIcon fontSize="medium" sx={{ color: "rgb(52, 71, 103)" }} />,
        number: "5.000",
      },
      {
        title: "poin",
        icon: <SavingsIcon fontSize="medium" sx={{ color: "rgb(52, 71, 103)" }} />,
        number: "5.000",
      },
    ],
    []
  );

  const dataTableData = useMemo(
    () => ({
      columns: [
        { Header: "resi", accessor: "resi" },
        { Header: "penerima", accessor: "reciever" },
        { Header: "alamat", accessor: "address" },
        { Header: "tanggal", accessor: "date" },
        { Header: "Eksoedisi", accessor: "expedition" },
        { Header: "tarif", accessor: "fee" },
      ],

      rows: [],
    }),
    []
  );

  const renderPackages = useCallback(
    () => (
      <Table
        title="Pengiriman Paket"
        table={dataTableData}
        entriesPerPage={{ defaultValue: 15, entries: [10, 15, 20, 25] }}
        pagination={{ variant: "gradient", color: "dark" }}
        canSearch
      />
    ),
    []
  );

  const renderCard = useCallback(
    (title, icon, number) => (
      <Box
        key={title}
        sx={{
          padding: 2,
          color: "#fff",
          borderRadius: 2,
          background: "linear-gradient(310deg, rgba(20, 23, 39, 0.9), rgba(58, 65, 111, 0.9))",
          display: "grid",
          gridTemplateColumns: "60% 1fr",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            width: 50,
            height: 50,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gridColumn: "2",
            gridRow: "1 / 3",
            justifySelf: "end",
          }}
        >
          {icon}
        </Box>
        <Typography variant="body1" textTransform="capitalize" color="white">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="white" mt={2}>
          {number}
        </Typography>
      </Box>
    ),
    []
  );

  const renderMenu = useCallback(
    () => (
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleToggleMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
      >
        <MenuItem onClick={handleToggleMenu}>Edit</MenuItem>
        <MenuItem onClick={handleToggleMenu}>Remove</MenuItem>
      </Menu>
    ),
    [anchorEl]
  );

  const renderUserDetail = useCallback(
    () => (
      <Box
        sx={{
          borderRadius: 2,
          padding: 2,
          gridColumn: "span 2",
          gridRow: "span 2",
          background: "linear-gradient(310deg, rgba(20, 23, 39, 0.9), rgba(58, 65, 111, 0.9))",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: 60,
                height: 60,
                fontSize: 20,
                fontWeight: "700",
                backgroundColor: "#fff",
                color: "rgb(52, 71, 103)",
              }}
            >
              DN
            </Avatar>
            <Typography variant="h3" color="white" fontWeight="bold">
              Dunia Ndewon
            </Typography>
          </Box>
          <IconButton
            aria-label="more-btn"
            id="more-btn"
            sx={{ alignSelf: "flex-start" }}
            onClick={handleToggleMenu}
          >
            <MoreVertIcon color="white" />
          </IconButton>
          {renderMenu()}
        </Box>
        <Box mt={2} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="white" fontWeight="bold">
              Email
            </Typography>
            <Typography variant="body2" color="white">
              duniandewon@gmail.com
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="white" fontWeight="bold">
              Phone Number
            </Typography>
            <Typography variant="body2" color="white">
              085718520582
            </Typography>
          </Box>
          <Box sx={{ gridColumn: "1 / 3" }}>
            <Typography variant="subtitle2" color="white" fontWeight="bold">
              Address
            </Typography>
            <Typography variant="body2" color="white">
              Jl Jlamprang no 19 pekalongan, jawa tengah
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
    [anchorEl]
  );

  const renderHeader = useCallback(
    () => (
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 }}>
        {renderUserDetail()}
        {cards.map((card) => renderCard(card.title, card.icon, card.number))}
      </Box>
    ),
    [anchorEl]
  );

  return (
    <DashboardLayout>
      <Box py={3} px={2}>
        {renderHeader()}
        {renderPackages()}
      </Box>
    </DashboardLayout>
  );
}

export default MembersDetail;
