import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfomaInvoicePage } from './profoma-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: ProfomaInvoicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfomaInvoicePageRoutingModule {}
