import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemWisePurchasePage } from './item-wise-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: ItemWisePurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemWisePurchasePageRoutingModule {}
