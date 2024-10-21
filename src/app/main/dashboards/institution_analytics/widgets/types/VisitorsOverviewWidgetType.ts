type DateString = string;

type DataPoint = {
  x: DateString;
  y: number;
};

type SeriesData = {
  name: string;
  data: DataPoint[];
};

type Series = {
  [key: string]: SeriesData[];
};

type Ranges = {
  [key: string]: string;
};

/**
 * Visitors Overview Widget Type
 */
type VisitorsOverviewWidgetType = {
  series: Series;
};

export default VisitorsOverviewWidgetType;
