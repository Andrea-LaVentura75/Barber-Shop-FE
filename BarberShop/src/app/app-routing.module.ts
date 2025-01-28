import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'barbiere',
    loadChildren: () =>
      import(
        './pagesBarber/home-barbiere-module/home-barbiere-module.module'
      ).then((m) => m.HomeBarbiereModuleModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import(
        './pagesCliente/home-cliente-module/home-cliente-module.module'
      ).then((m) => m.HomeClienteModuleModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
