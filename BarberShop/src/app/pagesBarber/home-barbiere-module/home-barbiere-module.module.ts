import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBarbiereModuleRoutingModule } from './home-barbiere-module-routing.module';
import { HomeBarbiereModuleComponent } from './home-barbiere-module.component';
import { DashboardBarbiereComponent } from './dashboard-barbiere/dashboard-barbiere.component';
import { AppuntamentiBarbiereComponent } from './appuntamenti-barbiere/appuntamenti-barbiere.component';
import { ShopBarbiereComponent } from './shop-barbiere/shop-barbiere.component';
import { ServiziBarbiereComponent } from './servizi-barbiere/servizi-barbiere.component';
import { BachecaTagliBarbiereComponent } from './bacheca-tagli-barbiere/bacheca-tagli-barbiere.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeBarbiereModuleComponent,
    DashboardBarbiereComponent,
    AppuntamentiBarbiereComponent,
    ShopBarbiereComponent,
    ServiziBarbiereComponent,
    BachecaTagliBarbiereComponent,
  ],
  imports: [
    CommonModule,
    HomeBarbiereModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeBarbiereModuleModule {}
