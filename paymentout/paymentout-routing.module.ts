import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentoutPage } from './paymentout.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: PaymentoutPage
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [Location],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class PaymentoutPageRoutingModule {}
