import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCashLedgerPage } from './create-cash-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCashLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCashLedgerPageRoutingModule {}
