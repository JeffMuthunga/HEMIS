import FusePageSimple from "@fuse/core/FusePageSimple";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import FuseLoading from "@fuse/core/FuseLoading";
import AnalyticsDashboardAppHeader from "./AnalyticsDashboardAppHeader";
import EnrollmentGrowth from "./widgets/EnrollmentViewsMaleVsFemale";
import { useGetAnalyticsDashboardWidgetsQuery } from "./AnalyticsDashboardApi";

const container = {
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * The analytics dashboard app.
 */
function AnalyticsDashboardApp() {
  const { isLoading } = useGetAnalyticsDashboardWidgetsQuery();

  if (isLoading) {
    return <FuseLoading />;
  }

  return (
    <FusePageSimple
      header={<AnalyticsDashboardAppHeader />}
      content={
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
            <EnrollmentGrowth />
          </motion.div>
        </motion.div>
      }
    />
  );
}

export default AnalyticsDashboardApp;
