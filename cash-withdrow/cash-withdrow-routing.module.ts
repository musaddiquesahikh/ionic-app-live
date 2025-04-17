import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashWithdrowPage } from './cash-withdrow.page';

const routes: Routes = [
  {
    path: '',
    component: CashWithdrowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashWithdrowPageRoutingModule {}
