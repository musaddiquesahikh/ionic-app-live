import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EwayBillRegisterPage } from './eway-bill-register.page';

const routes: Routes = [
  {
    path: '',
    component: EwayBillRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EwayBillRegisterPageRoutingModule {}
