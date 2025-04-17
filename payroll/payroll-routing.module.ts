import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollPage } from './payroll.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollPage
  },
  {
    path: 'salary-register',
    loadChildren: () => import('../salary-register/salary-register.module').then( m => m.SalaryRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPageRoutingModule {}
