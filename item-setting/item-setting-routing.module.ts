import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemSettingPage } from './item-setting.page';

const routes: Routes = [
  {
    path: '',
    component: ItemSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemSettingPageRoutingModule {}
