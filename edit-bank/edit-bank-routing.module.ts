import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBankPage } from './edit-bank.page';

const routes: Routes = [
  {
    path: '',
    component: EditBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBankPageRoutingModule {}
