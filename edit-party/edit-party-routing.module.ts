import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPartyPage } from './edit-party.page';

const routes: Routes = [
  {
    path: '',
    component: EditPartyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPartyPageRoutingModule {}
