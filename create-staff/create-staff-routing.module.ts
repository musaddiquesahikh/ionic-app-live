import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateStaffPage } from './create-staff.page';

const routes: Routes = [
  {
    path: '',
    component: CreateStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStaffPageRoutingModule {}
