import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleICPage } from './multiple-ic.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleICPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleICPageRoutingModule {}
