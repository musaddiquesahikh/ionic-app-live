import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPaymentInPage } from './edit-payment-in.page';

const routes: Routes = [
  {
    path: '',
    component: EditPaymentInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPaymentInPageRoutingModule {}
