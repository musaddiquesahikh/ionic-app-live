import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAttendenceModalPage } from './employee-attendence-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAttendenceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAttendenceModalPageRoutingModule {}
