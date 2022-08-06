import React from "react";
import PropTypes from "prop-types";

import MuiCard from "@mui/material/Card";
import MuiBox from "@mui/material/Box";

import SuiTypography from "components/SuiTypography";

function Card({ title, amount, icon }) {
  return (
    <MuiCard>
      <MuiBox sx={{ display: "flex", flexDirection: "row", px: 3, py: 2 }}>
        <MuiBox sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <SuiTypography variant="subtitle2" textTransform="uppercase" fontWeight="bold">
            {title}
          </SuiTypography>
          <SuiTypography variant="body2" textTransform="uppercase">
            {amount}
          </SuiTypography>
        </MuiBox>
        <MuiBox sx={{ alignSelf: "center" }}>{icon}</MuiBox>
      </MuiBox>
    </MuiCard>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.object.isRequired,
};

export default Card;
