import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuedPaymentReportPage } from './dued-payment-report.page';

const routes: Routes = [
  {
    path: '',
    component: DuedPaymentReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuedPaymentReportPageRoutingModule {}
