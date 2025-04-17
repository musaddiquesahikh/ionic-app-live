import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GSTR2Page } from './gstr2.page';

const routes: Routes = [
  {
    path: '',
    component: GSTR2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GSTR2PageRoutingModule {}
