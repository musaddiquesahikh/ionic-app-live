import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentRegisterPage } from './payment-register.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRegisterPageRoutingModule {}
