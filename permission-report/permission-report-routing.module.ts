import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionReportPage } from './permission-report.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionReportPageRoutingModule {}
