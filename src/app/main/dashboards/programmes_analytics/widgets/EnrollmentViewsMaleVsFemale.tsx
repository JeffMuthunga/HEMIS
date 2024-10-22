import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

function ProgramsChart() {
  const theme = useTheme();

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

  const programsByCategory = {
    series: [40, 35, 25], // Example data for program categories
    options: {
      ...chartOptions,
      labels: ["Undergraduate", "Postgraduate", "Diploma"],
      chart: { type: "donut" as const },
    },
  };

  const programsByDuration = {
    series: [
      {
        name: "Number of Programs",
        data: [15, 25, 30, 20], // Example durations
      },
    ],
    options: {
      ...chartOptions,
      xaxis: { categories: ["1 Year", "2 Years", "3 Years", "4 Years"] },
      chart: { type: "bar" as const },
      // title: { text: "Programs by Duration" },
    },
  };

  // Popular Programs by Student Enrollment (Bubble Chart)
  const popularProgramsByEnrollment = {
    series: [
      {
        name: "Number of students enrolled",
        data: [120, 80, 100, 50, 120], // Enrollment data for each program
      },
    ],
    options: {
      chart: {
        type: "line" as const, // Casting 'line' as a constant
        height: 350,
      },
      stroke: {
        curve: "smooth" as const, // Explicitly cast 'smooth' as a constant type
      },
      xaxis: {
        categories: [
          "Computer Science",
          "Business Administration",
          "Engineering",
          "Agriculture",
          "Education",
        ], // Program names as x-axis labels
      },
      title: {
        align: "center",
      },
      markers: {
        size: 4, // Optional: Adds markers at each data point
      },
      dataLabels: {
        enabled: false, // Disable data labels if not needed
      },
      yaxis: {
        title: {
          text: "Enrollment",
        },
      },
    },
  };

  const programsByStemType = {
    series: [28, 72], // Example data
    options: {
      chart: { type: "pie" as const },
      labels: ["STEM Type", "Non-STEM type"],
      // title: { text: "Programs by STEM Type" },
    },
  };

  return (
    <div className="flex flex-col gap-24">
      {/* Programs by Category (Donut Chart) */}
      <div className="flex flex-row gap-6">
        <Paper
          className="flex flex-col shadow rounded-xl overflow-hidden"
          style={{ margin: 0, flexGrow: 1 }}
        >
          <Typography className="text-xl font-medium m-24">
            Programs by Category
          </Typography>
          <ReactApexChart
            options={programsByCategory.options}
            series={programsByCategory.series}
            type="donut"
            height={300}
          />
        </Paper>

        <Paper
          className="flex flex-col shadow rounded-xl overflow-hidden"
          style={{ margin: 0, flexGrow: 1 }}
        >
          <Typography className="text-xl font-medium m-24">
            Programs by STEM Type
          </Typography>
          <ReactApexChart
            options={programsByStemType.options}
            series={programsByStemType.series}
            type="pie"
            height={300}
          />
        </Paper>
      </div>

      {/* Programs by Duration (Bar Chart) */}
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Programs by Duration
        </Typography>
        <ReactApexChart
          options={programsByDuration.options}
          series={programsByDuration.series}
          type="bar"
          height={300}
        />
      </Paper>
      <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
        <Typography className="text-xl font-medium m-24">
          Popular Programs by Student Enrollment from 2020-2024
        </Typography>
        <ReactApexChart
          options={popularProgramsByEnrollment.options}
          series={popularProgramsByEnrollment.series}
          type="line"
          height={300}
        />
      </Paper>
    </div>
  );
}

export default ProgramsChart;
