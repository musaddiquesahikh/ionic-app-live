import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyWiseProformaPage } from './party-wise-proforma.page';

const routes: Routes = [
  {
    path: '',
    component: PartyWiseProformaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyWiseProformaPageRoutingModule {}
