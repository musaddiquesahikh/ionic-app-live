import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseRegisterPage } from './purchase-register.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRegisterPageRoutingModule {}
