import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaveReportPage } from './leave-report.page';

const routes: Routes = [
  {
    path: '',
    component: LeaveReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveReportPageRoutingModule {}
