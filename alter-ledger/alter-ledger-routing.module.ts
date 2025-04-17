import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterLedgerPage } from './alter-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: AlterLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterLedgerPageRoutingModule {}
