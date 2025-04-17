import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewBankPage } from './add-new-bank.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewBankPageRoutingModule {}
