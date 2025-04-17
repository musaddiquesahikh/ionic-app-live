import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryWiseSalePage } from './category-wise-sale.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryWiseSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryWiseSalePageRoutingModule {}
