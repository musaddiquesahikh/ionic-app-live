import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseBillsPage } from './party-wise-bills.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseBillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseBillsPageRoutingModule {}
