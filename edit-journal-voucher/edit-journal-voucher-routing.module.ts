import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditJournalVoucherPage } from './edit-journal-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: EditJournalVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditJournalVoucherPageRoutingModule {}
