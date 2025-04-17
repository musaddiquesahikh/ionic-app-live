import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQuatationPage } from './view-quatation.page';

const routes: Routes = [
  {
    path: '',
    component: ViewQuatationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQuatationPageRoutingModule {}
