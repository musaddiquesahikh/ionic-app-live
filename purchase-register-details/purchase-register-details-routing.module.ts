import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseRegisterDetailsPage } from './purchase-register-details.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRegisterDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseRegisterDetailsPageRoutingModule {}
