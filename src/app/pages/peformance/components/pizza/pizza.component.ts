import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { IGraph, IPizza } from '../../../../common/interfaces/graph.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit, OnChanges {

  barChartOptions: ChartOptions = {
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: (tooltipItem, data) => {
          const label = data.labels[tooltipItem.index];
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          const currencyPipe = new CurrencyPipe('pt');
          const formattedNumber = currencyPipe.transform(datasetLabel, 'R$', 'symbol');
          return label + ': ' + formattedNumber;
        }
      }
    },
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartPlugins = [];
  pieChartData: SingleDataSet = [];
  title = '';

  @Input() data: IPizza;

  constructor() { }

  ngOnInit(): void {
    this.initializePizza();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.initializePizza();
    }
  }

  initializePizza(): void {
    if (this.data) {
      this.pieChartData = this.data.series;
      this.barChartLabels = this.data.labels;
      this.title = this.data.title;
    }
  }

}
