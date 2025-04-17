import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GSTR3Page } from './gstr3.page';

const routes: Routes = [
  {
    path: '',
    component: GSTR3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GSTR3PageRoutingModule {}
