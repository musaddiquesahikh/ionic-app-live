import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentINPage } from './payment-in.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentINPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentINPageRoutingModule {}
