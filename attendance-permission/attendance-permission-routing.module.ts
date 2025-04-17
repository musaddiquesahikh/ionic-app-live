import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendancePermissionPage } from './attendance-permission.page';

const routes: Routes = [
  {
    path: '',
    component: AttendancePermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendancePermissionPageRoutingModule {}
