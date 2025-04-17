import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdjustStockPage } from './adjust-stock.page';

const routes: Routes = [
  {
    path: '',
    component: AdjustStockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdjustStockPageRoutingModule {}
