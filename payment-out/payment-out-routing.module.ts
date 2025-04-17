import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentOutPage } from './payment-out.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class PaymentOutPageRoutingModule {}
