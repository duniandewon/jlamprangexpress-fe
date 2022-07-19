import React, { useCallback, useEffect } from "react";

import Grid from "@mui/material/Grid";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";

import DashboardLayout from "layout/DashboardLayout";

import useRefreshToken from "hooks/useRefreshToken";

import data from "pages/Members/dataTableData";

function Users() {
  const { refresh } = useRefreshToken();

  useEffect(() => {
    refresh();
  }, []);

  const renderHeader = useCallback(
    () => (
      <Grid container mb={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h2">Member</Typography>
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
          </Box>
        </Grid>
      </Grid>
    ),
    []
  );

  const renderMembersList = useCallback(
    () => (
      <Table
        title="List Paket"
        table={data}
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
        {renderMembersList()}
      </Box>
    </DashboardLayout>
  );
}

export default Users;
