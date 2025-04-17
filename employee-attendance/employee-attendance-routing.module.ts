import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAttendancePage } from './employee-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAttendancePageRoutingModule {}
