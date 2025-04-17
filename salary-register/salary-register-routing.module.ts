import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaryRegisterPage } from './salary-register.page';

const routes: Routes = [
  {
    path: '',
    component: SalaryRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryRegisterPageRoutingModule {}
