import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function RegionOfOriginPieChart() {
  const theme = useTheme();

  // Data for the number of people per region
  const series = [500, 400, 300, 250, 200, 150, 100]; // Example data for the regions

  // Region names
  const labels = [
    "Khomas",
    "Oshana",
    "Ohangwena",
    "Omusati",
    "Erongo",
    "Kavango East",
    "Others",
  ];

  // Chart options
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: "100%",
    },
    labels, // Region names for the chart
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.grey[500],
    ],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      // formatter: (val) => `${val.toFixed(2)}%`, // Format the percentages to 2 decimal places
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} people`, // Show the number of people in the tooltip
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%", // Defines the size of the inner circle
          labels: {
            show: true,
            total: {
              show: false,
              label: "Total",
              formatter: () => "1900", // Total number of people
            },
          },
        },
      },
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-xl font-medium tracking-tight leading-6 truncate">
          People by Region of Origin
        </Typography>
      </div>
      <div className="flex flex-col flex-auto h-320 mt-12">
        <ReactApexChart
          className="flex-auto w-full h-full"
          options={chartOptions}
          series={series}
          type="donut"
          height="100%"
        />
      </div>
    </Paper>
  );
}

export default RegionOfOriginPieChart;
