import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewBusinessPage } from './add-new-business.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewBusinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewBusinessPageRoutingModule {}
