import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrderRegisterPage } from './sales-order-register.page';

const routes: Routes = [
  {
    path: '',
    component: SalesOrderRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrderRegisterPageRoutingModule {}
