import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryWiseReportPage } from './category-wise-report.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryWiseReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryWiseReportPageRoutingModule {}
