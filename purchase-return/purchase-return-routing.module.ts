import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseReturnPage } from './purchase-return.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseReturnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseReturnPageRoutingModule {}
