import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowCompanyListPage } from './show-company-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShowCompanyListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowCompanyListPageRoutingModule {}
