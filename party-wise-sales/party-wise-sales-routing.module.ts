import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseSalesPage } from './party-wise-sales.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseSalesPageRoutingModule {}
