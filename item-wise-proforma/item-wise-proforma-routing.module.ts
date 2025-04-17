import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemWiseProformaPage } from './item-wise-proforma.page';

const routes: Routes = [
  {
    path: '',
    component: ItemWiseProformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemWiseProformaPageRoutingModule {}
