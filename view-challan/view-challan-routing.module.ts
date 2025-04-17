import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewChallanPage } from './view-challan.page';

const routes: Routes = [
  {
    path: '',
    component: ViewChallanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewChallanPageRoutingModule {}
