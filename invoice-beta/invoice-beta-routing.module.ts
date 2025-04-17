import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceBetaPage } from './invoice-beta.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceBetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceBetaPageRoutingModule {}
