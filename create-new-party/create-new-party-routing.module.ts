import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CreateNewPartyPage } from './create-new-party.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewPartyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule.forChild()],
  exports: [RouterModule],
})
export class CreateNewPartyPageRoutingModule {}
