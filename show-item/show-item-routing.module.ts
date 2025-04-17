import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowItemPage } from './show-item.page';

const routes: Routes = [
  {
    path: '',
    component: ShowItemPage
  },
  // {
  //   path: 'create-new-item',
  //   loadChildren: () => import('../create-new-item/create-new-item.module').then( m => m.CreateNewItemPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowItemPageRoutingModule {}
