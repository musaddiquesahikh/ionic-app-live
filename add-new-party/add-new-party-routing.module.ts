import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewPartyPage } from './add-new-party.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewPartyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewPartyPageRoutingModule {}
