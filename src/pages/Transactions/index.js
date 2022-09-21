/* eslint-disable no-underscore-dangle */
import React, { useCallback, useMemo, useRef } from "react";

import Grid from "@mui/material/Grid";

import useTransactions from "hooks/useTransactions";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";

import DashboardLayout from "layout/DashboardLayout";

import DepositModal from "modals/DepositModal";

import formatCurrency from "utils/formatCurrency";

function Transactions() {
  const { data: transactions, isLoading } = useTransactions();

  const depositModalRef = useRef();

  const transactionsData = useMemo(
    () => ({
      columns: [
        { Header: "Tanggal", accessor: "date", width: "10%" },
        { Header: "Nama", accessor: "user", width: "20%" },
        { Header: "Type", accessor: "transactionType", width: "12%" },
        { Header: "Jumlah", accessor: "amount", width: "12%" },
      ],
      rows: transactions
        ? transactions.map(({ date, user, transactionType, amount }) => ({
            date,
            user: user.username,
            transactionType,
            amount: formatCurrency(amount, "id-ID", "IDR"),
          }))
        : [],
    }),
    [transactions, isLoading]
  );

  const handleOpendepositModal = () => depositModalRef.current.toggleModal();

  const renderHeader = useCallback(
    () => (
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
            <Button variant="gradient" color="dark" onClick={handleOpendepositModal}>
              deposite
            </Button>
          </Box>
        </Grid>
      </Grid>
    ),
    []
  );

  const renderTransactionsList = useCallback(
    () => (
      <Table
        title="List Transaksi"
        table={transactionsData}
        entriesPerPage={{ defaultValue: 15, entries: [10, 15, 20, 25] }}
        pagination={{ variant: "gradient", color: "dark" }}
        canSearch
      />
    ),
    [transactions, isLoading]
  );

  return (
    <DashboardLayout>
      <Box py={3} px={2}>
        {renderHeader()}
        {renderTransactionsList()}
      </Box>
      <DepositModal ref={depositModalRef} />
    </DashboardLayout>
  );
}

export default Transactions;
