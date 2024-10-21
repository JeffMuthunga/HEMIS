import { lazy } from "react";
import { FuseRouteItemType } from "@fuse/utils/FuseUtils";

const AnalyticsDashboardApp = lazy(() => import("./AnalyticsDashboardApp"));

/**
 * The Staff Analytics Dashboard App Route
 */
const AnalyticsDashboardAppRoute: FuseRouteItemType = {
  path: "dashboards/staff_analytics",
  element: <AnalyticsDashboardApp />,
};

export default AnalyticsDashboardAppRoute;
