import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWisePurchasePage } from './party-wise-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWisePurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWisePurchasePageRoutingModule {}
