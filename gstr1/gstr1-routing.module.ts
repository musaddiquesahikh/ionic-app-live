import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GSTR1Page } from './gstr1.page';

const routes: Routes = [
  {
    path: '',
    component: GSTR1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GSTR1PageRoutingModule {}
