import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseRegisterPage } from './expense-register.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseRegisterPageRoutingModule {}
