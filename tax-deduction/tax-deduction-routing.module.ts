import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxDeductionPage } from './tax-deduction.page';

const routes: Routes = [
  {
    path: '',
    component: TaxDeductionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxDeductionPageRoutingModule {}
