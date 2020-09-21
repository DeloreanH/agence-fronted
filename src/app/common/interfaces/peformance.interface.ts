import { Moment } from 'moment';

export interface IPeformanceCollection {
  start_date: string;
  end_date: string;
  avg_fixed_cost: number;
  users: IUserPeformance[];
}

export interface IUserPeformance {
  name: string;
  total_fixed_cost: number;
  total_net_income: number;
  total_commission: number;
  total_profit: number;
  data: IMonthlyPeformance[];
}

export interface IMonthlyPeformance {
  date_period: string;
  fixed_cost: number;
  net_income: number;
  commission: number;
  profit: number;
}

export interface IDataForm {
  users: string[];
  startDate: Moment;
  endDate: Moment;
}
