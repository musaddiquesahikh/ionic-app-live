import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCashTransactionPage } from './view-cash-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCashTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCashTransactionPageRoutingModule {}
