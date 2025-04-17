import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCashLedgerPage } from './edit-cash-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: EditCashLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCashLedgerPageRoutingModule {}
