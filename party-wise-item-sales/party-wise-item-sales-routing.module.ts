import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseItemSalesPage } from './party-wise-item-sales.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseItemSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseItemSalesPageRoutingModule {}
