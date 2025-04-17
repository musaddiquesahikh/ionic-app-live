import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuatationPage } from './quatation.page';

const routes: Routes = [
  {
    path: '',
    component: QuatationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuatationPageRoutingModule {}
