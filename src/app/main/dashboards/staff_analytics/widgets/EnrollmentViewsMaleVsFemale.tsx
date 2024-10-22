import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

function StaffAnalyticsWidget() {
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

  // Data for different charts
  const staffByDepartment = {
    series: [30, 25, 15, 10, 20, 14], // Example data for departments
    options: {
      ...chartOptions,
      labels: [
        "Mathematical and Computer Science",
        "Education",
        "Health Science",
        "Business",
        "Agriculture",
        "Communication Studies",
      ],
      chart: { type: "pie" as const },
    },
  };

  const staffByAge = {
    series: [
      {
        name: "Number of Staff",
        data: [5, 15, 25, 10, 5], // Age group distribution
      },
    ],
    options: {
      ...chartOptions,
      xaxis: { categories: ["20-30", "31-40", "41-50", "51-60", "61-70"] },
      chart: { type: "bar" as const},
      // title: { text: "Staff Age Distribution" },
    },
  };

  const staffByEmploymentType = {
    series: [60, 30, 10], // Full-time, Part-time, Adjunct
    options: {
      ...chartOptions,
      labels: ["Full-time", "Part-time", "Adjunct"],
      chart: { type: "donut" as const },
    },
  };

  const staffByGender = {
    series: [55, 45], // Male, Female
    options: {
      ...chartOptions,
      labels: ["Male", "Female"],
      chart: { type: "donut" as const },
    },
  };

  const staffByQualification = {
    series: [20, 35, 30, 15], // Example qualification distribution
    options: {
      ...chartOptions,
      labels: ["Diploma", "Undergraduate", "Masters", "PhD"],
      chart: { type: "pie" as const},
    },
  };

  const staffByNationality = {
    series: [
      {
        name: "Staff Count",
        data: [10, 25, 15, 5, 30, 23, 10, 8], // Example nationality data
      },
    ],
    options: {
      ...chartOptions,
      xaxis: {
        categories: [
          "South Africa",
          "Angola",
          "Botswana",
          "Zambia",
          "Namibia",
          "Zimbabwe",
          "Other African",
          "Europe/USA & Asia",
        ],
      },
      chart: { type: "bar" as const},
      title: { text: "Staff by Nationality" },
    },
  };

  return (
    <div className="flex flex-col gap-24">
      {/* Staff Distribution by Department (Pie Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Staff Distribution by Department
        </Typography>
        <ReactApexChart
          options={staffByDepartment.options}
          series={staffByDepartment.series}
          type="pie"
          height={300}
        />
      </Paper>

      {/* Staff Age Distribution (Histogram/Bar Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Staff Age Distribution
        </Typography>
        <ReactApexChart
          options={staffByAge.options}
          series={staffByAge.series}
          type="bar"
          height={300}
        />
      </Paper>
      {/* Staff by Nationality (Bar Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Staff by Nationality
        </Typography>
        <ReactApexChart
          options={staffByNationality.options}
          series={staffByNationality.series}
          type="bar"
          height={300}
        />
      </Paper>
      <div className="flex flex-row justify-between gap-6">
        {/* Staff by Employment Type (Donut Chart) */}
        <Paper
          className="flex flex-col shadow rounded-xl overflow-hidden"
          style={{ width: "32%" }}
        >
          <Typography className="text-xl font-medium m-24">
            Staff by Employment Type
          </Typography>
          <ReactApexChart
            options={staffByEmploymentType.options}
            series={staffByEmploymentType.series}
            type="donut"
            height={300}
          />
        </Paper>

        {/* Staff Gender Distribution (Donut Chart) */}
        <Paper
          className="flex flex-col shadow rounded-xl overflow-hidden"
          style={{ width: "32%" }}
        >
          <Typography className="text-xl font-medium m-24">
            Staff Gender Distribution
          </Typography>
          <ReactApexChart
            options={staffByGender.options}
            series={staffByGender.series}
            type="donut"
            height={300}
          />
        </Paper>

        {/* Staff Distribution by Qualification (Pie Chart) */}
        <Paper
          className="flex flex-col shadow rounded-xl overflow-hidden"
          style={{ width: "32%" }}
        >
          <Typography className="text-xl font-medium m-24">
            Staff Distribution by Qualification
          </Typography>
          <ReactApexChart
            options={staffByQualification.options}
            series={staffByQualification.series}
            type="pie"
            height={300}
          />
        </Paper>
      </div>
    </div>
  );
}

export default StaffAnalyticsWidget;
