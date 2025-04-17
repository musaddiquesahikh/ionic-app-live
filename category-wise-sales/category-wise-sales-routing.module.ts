import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryWiseSalesPage } from './category-wise-sales.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryWiseSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryWiseSalesPageRoutingModule {}
