import { useMemo } from "react";
import PropTypes from "prop-types";

import { Doughnut } from "react-chartjs-2";

import Card from "@mui/material/Card";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import configs from "components/SuiDoughnutChart/config";

function DoughnutChart({ title, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || []);

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          height: "100%",
        }}
        p={2}
      >
        <SuiBox mb={1}>
          <SuiTypography variant="h6">{title}</SuiTypography>
        </SuiBox>
        <SuiBox sx={{ position: "relative" }}>
          <SuiBox
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {useMemo(
              () => (
                <SuiBox sx={{ textAlign: "center" }}>
                  <SuiTypography variant="h2" fontWeight="bold">
                    {chart.labels[chart.datasets.data.indexOf(Math.max(...chart.datasets.data))]}
                  </SuiTypography>
                  <SuiTypography variant="subtitle1">
                    {new Intl.NumberFormat().format(Math.max(...chart.datasets.data))}
                  </SuiTypography>
                </SuiBox>
              ),
              [chart]
            )}
          </SuiBox>
          {useMemo(
            () => (
              <SuiBox height={height}>
                <Doughnut data={data} options={options} />
              </SuiBox>
            ),
            [chart, height]
          )}
        </SuiBox>
        <SuiBox
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {chart.labels.map((label, i) => (
            <SuiTypography
              key={label}
              variant="body2"
              sx={{ color: chart.datasets.backgroundColors[i] }}
            >
              {label}
            </SuiTypography>
          ))}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

DoughnutChart.defaultProps = {
  title: "",
  height: "19.125rem",
};

DoughnutChart.propTypes = {
  title: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default DoughnutChart;
