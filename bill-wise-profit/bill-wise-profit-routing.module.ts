import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillWiseProfitPage } from './bill-wise-profit.page';

const routes: Routes = [
  {
    path: '',
    component: BillWiseProfitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillWiseProfitPageRoutingModule {}
