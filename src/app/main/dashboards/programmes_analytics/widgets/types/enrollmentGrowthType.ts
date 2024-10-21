type DateString = string;

type DataPoint = {
  x: Number;
  y: number;
};

type Series = {
  name: string;
  data: DataPoint[];
};

type enrollmentGrowthType = {
  series: Series[];
};

export default enrollmentGrowthType;
