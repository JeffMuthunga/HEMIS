import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import _ from "lodash";

function EnrollmentGenderComparisonWidget() {
  const theme = useTheme();

  // Data for male and female enrollment in each course
  const series = [
    {
      name: "Males",
      data: [60, 80, 150, 90, 120, 110, 65], // Male students in each course
    },
    {
      name: "Females",
      data: [60, 70, 150, 110, 60, 110, 65], // Female students in each course
    },
  ];

  // Courses
  const categories = [
    "Math",
    "Science",
    "History",
    "Art",
    "Engineering",
    "Business",
    "Literature",
  ];

  // Chart options
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: "100%",
      toolbar: {
        show: false,
      },
      stacked: false, // Keep bars grouped, not stacked
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        // endingShape: "rounded",
      },
    },
    xaxis: {
      categories, // Courses on the x-axis
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
        formatter: function (value) {
          return value.toFixed(0); // Display whole numbers for student counts
        },
      },
      axisBorder: {
        show: true,
        color: theme.palette.divider,
      },
      axisTicks: {
        show: true,
        color: theme.palette.divider,
      },
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: function (value, { seriesIndex, dataPointIndex, w }) {
          const totalStudents =
            series[0].data[dataPointIndex] + series[1].data[dataPointIndex];
          const percentage = ((value / totalStudents) * 100).toFixed(2);
          return `${value} students (${percentage}%)`;
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const total =
          series[0].data[opts.dataPointIndex] +
          series[1].data[opts.dataPointIndex];
        // const percentage = ((val / total) * 100).toFixed(2);
        return ` %`;
      },
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-xl font-medium tracking-tight leading-6 truncate">
          Male and Female Enrollment per Course
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
