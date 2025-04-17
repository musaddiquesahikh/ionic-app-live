import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBankTransactionPage } from './view-bank-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBankTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBankTransactionPageRoutingModule {}
