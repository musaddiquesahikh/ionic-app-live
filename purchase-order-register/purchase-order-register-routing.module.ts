import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseOrderRegisterPage } from './purchase-order-register.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrderRegisterPageRoutingModule {}
