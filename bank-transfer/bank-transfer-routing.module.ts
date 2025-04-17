import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankTransferPage } from './bank-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: BankTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankTransferPageRoutingModule {}
