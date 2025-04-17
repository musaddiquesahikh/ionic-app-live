import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EWayPage } from './e-way.page';

const routes: Routes = [
  {
    path: '',
    component: EWayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EWayPageRoutingModule {}
