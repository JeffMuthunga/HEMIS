import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function InstitutionsChart() {
  const theme = useTheme();

  // Chart options and data
  const chartOptions: ApexOptions = {
    chart: {
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
  };

  const institutionsByType = {
    series: [50, 30, 20], // Example data for institution types
    options: {
      chart: {
        ...chartOptions.chart,
        type: "pie" as const, // Explicitly define the chart type
      },
      colors: chartOptions.colors,
      dataLabels: chartOptions.dataLabels,
      legend: chartOptions.legend,
      labels: ["Public", "Private", "Vocational"], // This should be part of the chart options
    } as ApexOptions, // Use type assertion for proper typing
  };

  const institutionsByLocation = {
    series: [
      {
        name: "Number of Institutions",
        data: [10, 15, 25, 30, 20], // Example data for location distribution
      },
    ],
    options: {
      chart: {
        ...chartOptions.chart,
        type: "bar" as const, // Define chart type explicitly
      },
      colors: chartOptions.colors,
      dataLabels: chartOptions.dataLabels,
      legend: chartOptions.legend,
      xaxis: {
        categories: ["Ohangwena", "Zambezi", "Erongo", "Khomas", "Oshana"],
      },
    } as ApexOptions,
  };

  // Institution Enrollment Capacity (Heatmap)
  const institutionEnrollmentCapacity = {
    series: [
      { name: "University of Namibia", data: [3000, 4000, 3500] },
      {
        name: "Namibia University of Science and Technology",
        data: [2000, 3000, 2500],
      },
      {
        name: "International University of Management",
        data: [4000, 5000, 4500],
      },
    ], // Example data for various institutions
    options: {
      chart: {
        ...chartOptions.chart,
        type: "heatmap" as const,
      },
      colors: chartOptions.colors,
      dataLabels: chartOptions.dataLabels,
      legend: chartOptions.legend,
      xaxis: { categories: ["2022", "2023", "2024"] },
    } as ApexOptions,
  };

  return (
    <div className="flex flex-col gap-24">
      {/* Institutions by Type (Pie Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Institutions by Type
        </Typography>
        <ReactApexChart
          options={institutionsByType.options}
          series={institutionsByType.series}
          type="pie"
          height={300}
        />
      </Paper>

      {/* Institutions by Location (Bar Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Institutions by Regions
        </Typography>
        <ReactApexChart
          options={institutionsByLocation.options}
          series={institutionsByLocation.series}
          type="bar"
          height={300}
        />
      </Paper>

      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Institutions Enrollment Capacity from 2022 to 2024
        </Typography>
        <ReactApexChart
          options={institutionEnrollmentCapacity.options}
          series={institutionEnrollmentCapacity.series}
          type="bar"
          height={300}
        />
      </Paper>
    </div>
  );
}

export default InstitutionsChart;
