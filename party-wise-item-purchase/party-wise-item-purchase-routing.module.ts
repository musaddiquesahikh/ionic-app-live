import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseItemPurchasePage } from './party-wise-item-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseItemPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseItemPurchasePageRoutingModule {}
