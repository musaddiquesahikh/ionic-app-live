import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfinityPage } from './infinity.page';

const routes: Routes = [
  {
    path: '',
    component: InfinityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfinityPageRoutingModule {}
