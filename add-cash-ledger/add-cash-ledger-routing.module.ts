import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCashLedgerPage } from './add-cash-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: AddCashLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [Location],
})
export class AddCashLedgerPageRoutingModule {}
