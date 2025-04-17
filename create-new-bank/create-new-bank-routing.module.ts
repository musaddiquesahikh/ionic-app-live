import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewBankPage } from './create-new-bank.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewBankPageRoutingModule {}
