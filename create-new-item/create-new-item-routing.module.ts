import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CreateNewItemPage } from './create-new-item.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule],
})
export class CreateNewItemPageRoutingModule {}
