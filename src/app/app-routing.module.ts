import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'peformance',
    pathMatch: 'full',
  },
  {
    path: 'peformance',
    loadChildren: () => import('./pages/peformance/peformance.module').then(m => m.PeformanceModule)
  },
  {
    path: '**',
    redirectTo: '/peformance',
    pathMatch: 'full',
  },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
          routes,
          {
            useHash: true,
          },
          )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
