import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonthlyPeformance, IPeformanceCollection } from '../../common/interfaces/peformance.interface';
import { HttpService } from './http.service';
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
import { IGraph, IGraphSeries, IPizza } from '../../common/interfaces/graph.interface';
import { GRAPH_TYPES } from '../../common/enums/graph-types';


@Injectable({
  providedIn: 'root'
})
export class PeformanceService extends HttpService {

  private momentPeriod = extendMoment(moment);

  constructor(private http: HttpClient) {
    super();
  }

  /*
   *  server call to fetch the data of selected users in a specific range
   */
  getUsersPeformance( users: string[], startDate: string, endDate: string ): Observable<IPeformanceCollection> {
    const params = {'users[]': users, start_date: startDate, end_date: endDate };
    const apiUrl = `:API_URL/peformance/users`;
    const request = this.http.get(apiUrl, { params });
    return this.fetch(request);
  }


  /*
   * Assemble the final structure that is neededd to build the graph
   */
  createPeformanceGraph(collection: IPeformanceCollection): IGraph {
    const title = 'Rendimiento Comercial';
    const datePeriods: string[] = this.datePeriodsFromRange(collection.start_date, collection.end_date);
    const categories = datePeriods.map( period => moment(period, 'YYYY-MM').locale('es').format('MMMM YYYY'));
    const series: IGraphSeries[] = [];
    collection.users.forEach( userPeformances => {
        const userSeries = this.getUserGraphSeries(userPeformances.data, datePeriods);
        series.push({label: userPeformances.name, data: userSeries, type: GRAPH_TYPES.BAR });
    });
    series.push({label: 'Costo Fijo Medio', data: new Array(datePeriods.length).fill(collection.avg_fixed_cost), type: GRAPH_TYPES.LINE});
    return { categories, series, title};
  }


  /*
   * Assemble the final structure that is needed to build the pizza graph
   */
  createPeformancePizza(collection: IPeformanceCollection): IPizza {
    const title = 'Participacion por ingreso neto';
    const series: number[] = [];
    const labels: string[] = [];
    collection.users.forEach( userPeformances => {
        const total = userPeformances.data
        .map( data => data.net_income )
        .reduce((accu, current) => accu + current );
        series.push(total);
        labels.push(userPeformances.name);
    });
    return { series, title, labels };
  }


  /*
   * Generates the month intervals of the selected range,
   * it is used in the creation of the series and categories of the graph
   */
  private datePeriodsFromRange(startDate: string, endDate: string): string[] {
    const datePeriods = [];
    const range = this.momentPeriod.range(moment(startDate), moment(endDate));
    for (const month of range.by('month')) {
      datePeriods.push(month.format('YYYY-MM'));
    }
    return datePeriods;
  }

  /*
   * generates the series for each user in the performance collection,
   * used to create the graph
   */
  private getUserGraphSeries(userPeformances: IMonthlyPeformance[], datePeriods: string[]): number[]{
    const series: number[] = [];
    datePeriods.forEach(interval => {
      const match = userPeformances.find( peformance => peformance.date_period === interval);
      if (match) {
        series.push(match.net_income);
       } else {
        series.push(0);
       }
    });
    return series;
  }

}
