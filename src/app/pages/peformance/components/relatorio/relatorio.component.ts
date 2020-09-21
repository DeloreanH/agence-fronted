import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMonthlyPeformance, IUserPeformance } from '../../../../common/interfaces/peformance.interface';
import * as moment from 'moment';

export enum Fields {
  date_period = 'date_period',
  fixed_cost = 'fixed_cost',
  net_income = 'net_income',
  commission = 'commission',
  profit = 'profit',
}
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit, OnChanges {
  Fields = Fields;

  displayedColumns: string[] = [Fields.date_period, Fields.net_income, Fields.fixed_cost, Fields.commission, Fields.profit];
  dataSource = new MatTableDataSource<IMonthlyPeformance>([]);
  @Input() user: IUserPeformance;
  @Input() expanded: boolean;

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.init();
    }
  }

  init(): void {
    if (this.user) {
      this.dataSource = new MatTableDataSource(this.user.data);
    }
  }

  formatDate(date: string | moment.Moment): string{
    return moment(date, 'YYYY-MM').locale('es').format('MMMM YYYY');
  }

}
