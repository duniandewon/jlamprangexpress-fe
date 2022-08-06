/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";

import Box from "components/SuiBox";
import Typography from "components/SuiTypography";
import Button from "components/SuiButton";
import Table from "components/SuiTable";

import DashboardLayout from "layout/DashboardLayout";

import AddMember from "modals/AddMemberModal";
import { Link } from "react-router-dom";

function Users() {
  const [members, setMembers] = useState([]);

  const queryClient = useQueryClient();
  const AddMemberModalRef = useRef();

  const dataTableData = useMemo(
    () => ({
      columns: [
        { Header: "nama", accessor: "username", width: "15%" },
        { Header: "alamat", accessor: "address", width: "20%" },
        { Header: "No Telp", accessor: "phoneNumber", width: "20%" },
        { Header: "email", accessor: "email", width: "20%" },
      ],

      rows: members.map((member) => ({
        ...member,
        username: <Link to={`/member/members-detail?id=${member._id}`}>{member.username}</Link>,
      })),
    }),
    [members]
  );

  const handleOpenAddMemberModal = () => AddMemberModalRef.current.toggleModal();

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
            <Button variant="gradient" color="dark" onClick={handleOpenAddMemberModal}>
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
        title="List Member"
        table={dataTableData}
        entriesPerPage={{ defaultValue: 15, entries: [10, 15, 20, 25] }}
        pagination={{ variant: "gradient", color: "dark" }}
        canSearch
      />
    ),
    [members]
  );

  useEffect(() => {
    setMembers(queryClient.getQueryData(["members"]));
  }, []);

  return (
    <DashboardLayout>
      <Box py={3} px={2}>
        {renderHeader()}
        {renderMembersList()}
      </Box>
      <AddMember ref={AddMemberModalRef} />
    </DashboardLayout>
  );
}

export default Users;
