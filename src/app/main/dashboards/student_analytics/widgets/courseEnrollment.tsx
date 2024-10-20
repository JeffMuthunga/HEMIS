import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useAppSelector } from "app/store/hooks";
import _ from "@lodash";

function EnrollmentCoursesComparisonWidget() {
  const theme = useTheme();

  // Updated mock data: Number of students in 7 different courses
  const series = [
    {
      name: "Students",
      data: [120, 150, 300, 200, 180, 220, 130], // Number of students per course
    },
  ];

  // Updated categories for 7 courses
  const categories = [
    "Math",
    "Science",
    "History",
    "Art",
    "Engineering",
    "Business",
    "Literature",
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: "100%",
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
      },
    },
    xaxis: {
      categories, // Updated to 7 courses
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
        offsetX: -10,
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
      shared: true,
      intersect: false,
    },
  };

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-xl overflow-hidden">
      <div className="flex items-start justify-between m-24 mb-0">
        <Typography className="text-xl font-medium tracking-tight leading-6 truncate">
          Number of Students per Course
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

export default EnrollmentCoursesComparisonWidget;
