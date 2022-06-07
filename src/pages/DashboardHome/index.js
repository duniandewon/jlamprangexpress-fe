import React from "react";

import Footer from "examples/Footer";

import DashboardLayout from "layout/DashboardLayout";

import SuiBox from "components/SuiBox";

function Dashboard() {
  return (
    <DashboardLayout>
      <SuiBox py={3}>
        <SuiBox mb={3}>Dashboard</SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
