import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherRegisterPage } from './voucher-register.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherRegisterPageRoutingModule {}
