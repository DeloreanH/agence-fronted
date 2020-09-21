
export interface IGraphSeries {
  data: number[];
  label: string;
  type?: string;
}

export interface IGraph{
  title: string;
  categories: string[];
  series: IGraphSeries[];
}

export interface IPizza{
  title: string;
  series: number[];
  labels: string[];
}

