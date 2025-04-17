import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashDepositPage } from './cash-deposit.page';

const routes: Routes = [
  {
    path: '',
    component: CashDepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashDepositPageRoutingModule {}
