import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewLedgerPage } from './create-new-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewLedgerPageRoutingModule {}
