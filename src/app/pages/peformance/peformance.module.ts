import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeformanceComponent } from './peformance.component';
import { RouterModule } from '@angular/router';
import { PeformanceRoutingModule } from './peformance-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';


import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { FormComponent } from './components/form/form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { LoaderModule } from '../../common/components/loader/loader.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './components/graph/graph.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [PeformanceComponent, RelatorioComponent, FormComponent, GraphComponent, PizzaComponent],
  providers: [
    {
      provide: LOCALE_ID,
       useValue: 'pt-BR'
    }
  ],
  imports: [
    CommonModule,
    PeformanceRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    LoaderModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule,
    ChartsModule,
    MatBadgeModule
  ],
  exports: [RouterModule],
})
export class PeformanceModule {}
