import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProformaRegisterPage } from './proforma-register.page';

const routes: Routes = [
  {
    path: '',
    component: ProformaRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProformaRegisterPageRoutingModule {}
