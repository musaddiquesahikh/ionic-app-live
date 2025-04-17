import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowStaffListPage } from './show-staff-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShowStaffListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowStaffListPageRoutingModule {}
