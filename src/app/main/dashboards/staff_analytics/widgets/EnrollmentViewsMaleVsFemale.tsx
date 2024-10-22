import { useTheme } from "@mui/material/styles"; // Import MUI theme hook
import Paper from "@mui/material/Paper"; // Import Paper component from MUI
import Typography from "@mui/material/Typography"; // Import Typography component from MUI
import ReactApexChart from "react-apexcharts"; // Import ReactApexChart for rendering charts
import { ApexOptions } from "apexcharts"; // Import ApexOptions type from apexcharts
import { useState } from "react"; // Import useState hook from React

function StaffAnalyticsWidget() { // Define StaffAnalyticsWidget functional component
  const theme = useTheme(); // Use MUI's theme hook for accessing theme colors

  // Define common chart options with type ApexOptions
  const chartOptions: ApexOptions = {
    chart: {
      height: "100%", // Set chart height to 100%
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    colors: [
      theme.palette.primary.main, // Use primary color from theme
      theme.palette.secondary.main, // Use secondary color from theme
      theme.palette.error.main, // Use error color from theme
      theme.palette.warning.main, // Use warning color from theme
      theme.palette.info.main, // Use info color from theme
    ],
    dataLabels: {
      enabled: false, // Disable data labels
    },
    legend: {
      show: true, // Show legend
    },
  };

  // Data for Staff Distribution by Department (Pie Chart)
  const staffByDepartment = {
    series: [30, 25, 15, 10, 20, 14], // Example data for departments
    options: {
      ...chartOptions, // Spread common chart options
      labels: [
        "Mathematical and Computer Science",
        "Education",
        "Health Science",
        "Business",
        "Agriculture",
        "Communication Studies",
      ], // Add labels for pie chart
      chart: { type: "pie" as const }, // Explicitly define chart type as "pie"
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  // Data for Staff Age Distribution (Bar Chart)
  const staffByAge = {
    series: [
      {
        name: "Number of Staff", // Label for the series
        data: [5, 15, 25, 10, 5], // Example age group distribution
      },
    ],
    options: {
      ...chartOptions, // Spread common chart options
      xaxis: { categories: ["20-30", "31-40", "41-50", "51-60", "61-70"] }, // Define categories for the x-axis
      chart: { type: "bar" as const }, // Explicitly define chart type as "bar"
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  // Data for Staff by Employment Type (Donut Chart)
  const staffByEmploymentType = {
    series: [60, 30, 10], // Example data for employment types
    options: {
      ...chartOptions, // Spread common chart options
      labels: ["Full-time", "Part-time", "Adjunct"], // Add labels for donut chart
      chart: { type: "donut" as const }, // Explicitly define chart type as "donut"
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  // Data for Staff by Gender (Donut Chart)
  const staffByGender = {
    series: [55, 45], // Example data for gender distribution
    options: {
      ...chartOptions, // Spread common chart options
      labels: ["Male", "Female"], // Add labels for donut chart
      chart: { type: "donut" as const }, // Explicitly define chart type as "donut"
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  // Data for Staff Distribution by Qualification (Pie Chart)
  const staffByQualification = {
    series: [20, 35, 30, 15], // Example data for qualification distribution
    options: {
      ...chartOptions, // Spread common chart options
      labels: ["Diploma", "Undergraduate", "Masters", "PhD"], // Add labels for pie chart
      chart: { type: "pie" as const }, // Explicitly define chart type as "pie"
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  // Data for Staff by Nationality (Bar Chart)
  const staffByNationality = {
    series: [
      {
        name: "Staff Count", // Label for the series
        data: [10, 25, 15, 5, 30, 23, 10, 8], // Example nationality data
      },
    ],
    options: {
      ...chartOptions, // Spread common chart options
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
        ], // Add categories for the x-axis
      },
      chart: { type: "bar" as const }, // Explicitly define chart type as "bar"
      title: { text: "Staff by Nationality" }, // Add a title to the chart
    } as ApexOptions, // Assert the options object as ApexOptions
  };

  return (
      <div className="flex flex-col gap-24">
        {/* Staff Distribution by Department (Pie Chart) */}
        <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
          <Typography className="text-xl font-medium m-24">
            Staff Distribution by Department
          </Typography>
          <ReactApexChart
              options={staffByDepartment.options} // Pass options for the pie chart
              series={staffByDepartment.series} // Pass series data
              type="pie" // Specify the chart type as "pie"
              height={300} // Set chart height to 300px
          />
        </Paper>

        {/* Staff Age Distribution (Bar Chart) */}
        <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
          <Typography className="text-xl font-medium m-24">
            Staff Age Distribution
          </Typography>
          <ReactApexChart
              options={staffByAge.options} // Pass options for the bar chart
              series={staffByAge.series} // Pass series data
              type="bar" // Specify the chart type as "bar"
              height={300} // Set chart height to 300px
          />
        </Paper>

        {/* Staff by Nationality (Bar Chart) */}
        <Paper className="flex flex-col shadow rounded-xl overflow-hidden">
          <Typography className="text-xl font-medium m-24">
            Staff by Nationality
          </Typography>
          <ReactApexChart
              options={staffByNationality.options} // Pass options for the bar chart
              series={staffByNationality.series} // Pass series data
              type="bar" // Specify the chart type as "bar"
              height={300} // Set chart height to 300px
          />
        </Paper>

        <div className="flex flex-row justify-between gap-6">
          {/* Staff by Employment Type (Donut Chart) */}
          <Paper
              className="flex flex-col shadow rounded-xl overflow-hidden"
              style={{ width: "32%" }} // Set width to 32% for the first chart
          >
            <Typography className="text-xl font-medium m-24">
              Staff by Employment Type
            </Typography>
            <ReactApexChart
                options={staffByEmploymentType.options} // Pass options for the donut chart
                series={staffByEmploymentType.series} // Pass series data
                type="donut" // Specify the chart type as "donut"
                height={300} // Set chart height to 300px
            />
          </Paper>

          {/* Staff Gender Distribution (Donut Chart) */}
          <Paper
              className="flex flex-col shadow rounded-xl overflow-hidden"
              style={{ width: "32%" }} // Set width to 32% for the second chart
          >
            <Typography className="text-xl font-medium m-24">
              Staff Gender Distribution
            </Typography>
            <ReactApexChart
                options={staffByGender.options} // Pass options for the donut chart
                series={staffByGender.series} // Pass series data
                type="donut" // Specify the chart type as "donut"
                height={300} // Set chart height to 300px
            />
          </Paper>

          {/* Staff Distribution by Qualification (Pie Chart) */}
          <Paper
              className="flex flex-col shadow rounded-xl overflow-hidden"
              style={{ width: "32%" }} // Set width to 32% for the third chart
          >
            <Typography className="text-xl font-medium m-24">
              Staff Distribution by Qualification
            </Typography>
            <ReactApexChart
                options={staffByQualification.options} // Pass options for the pie chart
                series={staffByQualification.series} // Pass series data
                type="pie" // Specify the chart type as "pie"
                height={300} // Set chart height to 300px
            />
          </Paper>
        </div>
      </div>
  );
}

export default StaffAnalyticsWidget; // Export the component as default
