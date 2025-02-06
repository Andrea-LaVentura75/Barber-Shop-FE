import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClienteModuleComponent } from './home-cliente-module.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { PrenotaClienteComponent } from './prenota-cliente/prenota-cliente.component';
import { ShopClienteComponent } from './shop-cliente/shop-cliente.component';
import { BachecaTagliClienteComponent } from './bacheca-tagli-cliente/bacheca-tagli-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: HomeClienteModuleComponent,
    children: [
      { path: 'dashboard', component: DashboardClienteComponent },
      { path: 'prenota/:idBarbiere', component: PrenotaClienteComponent },
      { path: 'prenota', component: PrenotaClienteComponent },
      {
        path: 'portfolio/:idBarbiere',
        component: BachecaTagliClienteComponent,
      },
      {
        path: 'shop/:idBarbiere',
        component: ShopClienteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClienteModuleRoutingModule {}
