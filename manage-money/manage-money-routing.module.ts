import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMoneyPage } from './manage-money.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMoneyPageRoutingModule {}
