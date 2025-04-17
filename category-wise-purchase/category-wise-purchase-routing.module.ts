import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryWisePurchasePage } from './category-wise-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryWisePurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryWisePurchasePageRoutingModule {}
