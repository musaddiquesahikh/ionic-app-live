import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceBetaPage } from '../invoice-beta/invoice-beta.page';

import { InvoiceSettingPage } from './invoice-setting.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceSettingPageRoutingModule {}
