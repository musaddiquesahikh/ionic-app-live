import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequePage } from './cheque.page';

const routes: Routes = [
  {
    path: '',
    component: ChequePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequePageRoutingModule {}
