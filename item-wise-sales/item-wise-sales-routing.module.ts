import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemWiseSalesPage } from './item-wise-sales.page';

const routes: Routes = [
  {
    path: '',
    component: ItemWiseSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemWiseSalesPageRoutingModule {}
