import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalVouchersPage } from './journal-vouchers.page';

const routes: Routes = [
  {
    path: '',
    component: JournalVouchersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalVouchersPageRoutingModule {}
