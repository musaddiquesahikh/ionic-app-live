import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLedgerPage } from './edit-ledger.page';

const routes: Routes = [
  {
    path: '',
    component: EditLedgerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLedgerPageRoutingModule {}
