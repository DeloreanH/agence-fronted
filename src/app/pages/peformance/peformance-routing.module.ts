import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeformanceComponent } from './peformance.component';


const routes: Routes = [
  { path: '', component: PeformanceComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PeformanceRoutingModule {}
