import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoupenPage } from './coupen.page';

const routes: Routes = [
  {
    path: '',
    component: CoupenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoupenPageRoutingModule {}
