import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThermalprintPage } from './thermalprint.page';

const routes: Routes = [
  {
    path: '',
    component: ThermalprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThermalprintPageRoutingModule {}
