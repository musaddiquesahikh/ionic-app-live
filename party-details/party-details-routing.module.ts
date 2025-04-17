import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyDetailsPage } from './party-details.page';

const routes: Routes = [
  {
    path: '',
    component: PartyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyDetailsPageRoutingModule {}
