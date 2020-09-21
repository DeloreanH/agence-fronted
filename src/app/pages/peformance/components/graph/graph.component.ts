import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IGraph } from '../../../../common/interfaces/graph.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  barChartOptions: ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: label => `R$ ${label}`
        }
      }]
    },
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
    maintainAspectRatio: true
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  title = '';

  @Input() data: IGraph;

  constructor() { }

  ngOnInit(): void {
    this.initializeGraph();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.initializeGraph();
    }
  }

  initializeGraph(): void {
    if (this.data) {
      this.barChartData = this.data.series;
      this.barChartLabels = this.data.categories;
      this.title = this.data.title;
    }
  }

}
