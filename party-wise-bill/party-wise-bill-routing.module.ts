import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseBillPage } from './party-wise-bill.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseBillPageRoutingModule {}
