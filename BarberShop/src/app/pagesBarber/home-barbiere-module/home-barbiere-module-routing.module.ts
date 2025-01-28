import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeBarbiereModuleComponent } from './home-barbiere-module.component';
import { DashboardBarbiereComponent } from './dashboard-barbiere/dashboard-barbiere.component';
import { AppuntamentiBarbiereComponent } from './appuntamenti-barbiere/appuntamenti-barbiere.component';
import { ShopBarbiereComponent } from './shop-barbiere/shop-barbiere.component';
import { ServiziBarbiereComponent } from './servizi-barbiere/servizi-barbiere.component';
import { BachecaTagliBarbiereComponent } from './bacheca-tagli-barbiere/bacheca-tagli-barbiere.component';

const routes: Routes = [
  {
    path: '',
    component: HomeBarbiereModuleComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardBarbiereComponent },
      { path: 'appuntamenti', component: AppuntamentiBarbiereComponent },
      { path: 'shop', component: ShopBarbiereComponent },
      { path: 'servizi', component: ServiziBarbiereComponent },
      { path: 'bacheca-tagli', component: BachecaTagliBarbiereComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeBarbiereModuleRoutingModule {}
