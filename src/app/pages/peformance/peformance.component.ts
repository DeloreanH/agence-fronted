import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../common/components/loader/loader.service';
import { PeformanceService } from '../../core/services/peformance.service';
import { IDataForm, IPeformanceCollection } from '../../common/interfaces/peformance.interface';
import { IGraph, IPizza } from '../../common/interfaces/graph.interface';
import { isEqual } from 'lodash';
import { ToastService } from '../../core/services/toast.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-peformance',
  templateUrl: './peformance.component.html',
  styleUrls: ['./peformance.component.scss'],
})
export class PeformanceComponent {
  peformanceCollection: IPeformanceCollection;
  dataRelatorio: IPeformanceCollection;
  dataGraph: IGraph;
  dataPizza: IPizza;
  dataForm: IDataForm;
  RelatorioBadget = false;
  graphBadget = false;
  pizzaBadget = false;

  constructor(
    private loaderService: LoaderService,
    private peformanceService: PeformanceService,
    private toastService: ToastService,
  ) {}

  tabEvent(tab: MatTabChangeEvent): void{
    this.disableBadget(tab.tab.textLabel);
  }

  resetBadgets(): void{
    this.RelatorioBadget = false;
    this.graphBadget = false;
    this.pizzaBadget = false;
  }

  disableBadget(labelName: string): void{
    switch (labelName) {
      case 'Gráfico':
        this.graphBadget = true;
        break;
      case 'Relatorio':
        this.RelatorioBadget = true;
        break;
      case 'Pizza':
        this.pizzaBadget = true;
        break;
    }
  }
  async calculateRelatorio(): Promise<void> {
    try {
      this.showLoading();
      const usersPeformance = await this.getUsersPeformance();
      if (usersPeformance && usersPeformance.users ) {
        this.dataRelatorio = usersPeformance;
      } else {
        this.errorNoUsers();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.hiddenLoading();
    }
  }

  async getUsersPeformance(): Promise<IPeformanceCollection> {
    try {
      if (this.peformanceCollection) {
        return this.peformanceCollection;
      } else {
        const { startDate, users, endDate } = this.dataForm;
        const result = await this.peformanceService.getUsersPeformance( users, startDate.format('YYYY-MM'), endDate.format('YYYY-MM'))
          .toPromise();
        this.peformanceCollection = result;
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  async calculateGraph(): Promise<void> {
    try {
      this.showLoading();
      const usersPeformance = await this.getUsersPeformance();
      if (usersPeformance && usersPeformance.users) {
        this.dataGraph = this.peformanceService.createPeformanceGraph(usersPeformance);
      } else {
        this.errorNoUsers();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.hiddenLoading();
    }
  }

  async calculatePizza(): Promise<void> {
    try {
      this.showLoading();
      const usersPeformance = await this.getUsersPeformance();
      if (usersPeformance && usersPeformance.users) {
        this.dataPizza = this.peformanceService.createPeformancePizza(usersPeformance);
      } else {
        this.errorNoUsers();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.hiddenLoading();
    }
  }

  updateDataForm(data: IDataForm): void {
    if (data && !isEqual(this.dataForm, data)) {
      this.clearData();
    }
    this.dataForm = data;
  }

  clearData(): void {
    this.resetBadgets();
    this.dataGraph = null;
    this.dataPizza = null;
    this.dataRelatorio = null;
    this.peformanceCollection = null;
  }

  errorNoUsers(): void {
    if (this.dataForm.users.length === 1) {
      this.toastService.error('El usuario seleccionado no posee datos registrados');
    } else {
      this.toastService.error('Los usuarios seleccionados no poseen datos registrados');
    }
  }

  showLoading(): void {
    this.loaderService.show();
  }

  hiddenLoading(time = 700): void {
    setTimeout(() => {
      this.loaderService.hide();
    }, time);
  }

}
