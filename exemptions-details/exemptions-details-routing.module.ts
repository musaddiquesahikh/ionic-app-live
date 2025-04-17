import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExemptionsDetailsPage } from './exemptions-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExemptionsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExemptionsDetailsPageRoutingModule {}
