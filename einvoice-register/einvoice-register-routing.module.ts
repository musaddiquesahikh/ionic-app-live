import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EInvoiceRegisterPage } from './einvoice-register.page';

const routes: Routes = [
  {
    path: '',
    component: EInvoiceRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EInvoiceRegisterPageRoutingModule {}
