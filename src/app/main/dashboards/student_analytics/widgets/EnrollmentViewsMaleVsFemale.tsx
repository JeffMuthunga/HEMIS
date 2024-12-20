import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Tooltip } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useAppSelector } from "app/store/hooks";
import _ from "@lodash";
import EnrollmentGrowthType from "./types/enrollmentGrowthType";
import { selectWidget } from "../AnalyticsDashboardApi";

function EnrollmentGenderComparisonWidget() {
  const theme = useTheme();

  const widget = useAppSelector(
    selectWidget<EnrollmentGrowthType>("enrollmentGrowth")
  );

  if (!widget) {
    return null;
  }

  const { series } = widget;

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
    ],
    dataLabels: {
      enabled: false,
    },
    // fill: {
    //   colors: [theme.palette.primary.dark, theme.palette.primary.light],
    //   opacity: 0.5,
    // },
    // grid: {
    //   show: false,
    //   padding: {
    //     bottom: -40,
    //     left: 0,
    //     right: 0,
    //   },
    // },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      axisBorder: {
        show: true, // Show x-axis line
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true, // Show ticks on the x-axis
        color: theme.palette.divider,
      },
      labels: {
        offsetY: 5, // Adjust this to align labels better
        style: {
          colors: theme.palette.text.primary, // Use primary color for better contrast
        },
      },
      tickAmount: 3,
      tooltip: {
        enabled: false,
      },
      type: "datetime",
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary, // Set the label color to the primary text color
        },
        offsetX: -10, // Move labels outside the chart
      },
      max: (max) => max + 250,
      min: (min) => min - 250,
      show: true, // Show y-axis
      tickAmount: 5,
      axisBorder: {
        show: true, // Show y-axis line
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true, // Show ticks on the y-axis
        color: theme.palette.divider,
      },
    },
    grid: {
      show: true, // Show grid lines
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-xl font-medium tracking-tight leading-6 truncate">
          Enrollment Growth from 2018-2024
        </Typography>
      </div>
      <div className="flex flex-col flex-auto h-320 mt-12">
        <ReactApexChart
          className="flex-auto w-full h-full"
          options={chartOptions}
          series={_.cloneDeep(series)}
          type={chartOptions?.chart?.type}
          height={chartOptions?.chart?.height}
        />
      </div>
    </Paper>
  );
}

export default EnrollmentGenderComparisonWidget;
