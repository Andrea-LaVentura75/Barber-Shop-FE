import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeClienteModuleRoutingModule } from './home-cliente-module-routing.module';
import { HomeClienteModuleComponent } from './home-cliente-module.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { PrenotaClienteComponent } from './prenota-cliente/prenota-cliente.component';
import { ShopClienteComponent } from './shop-cliente/shop-cliente.component';
import { BachecaTagliClienteComponent } from './bacheca-tagli-cliente/bacheca-tagli-cliente.component';


@NgModule({
  declarations: [
    HomeClienteModuleComponent,
    DashboardClienteComponent,
    PrenotaClienteComponent,
    ShopClienteComponent,
    BachecaTagliClienteComponent
  ],
  imports: [
    CommonModule,
    HomeClienteModuleRoutingModule
  ]
})
export class HomeClienteModuleModule { }
