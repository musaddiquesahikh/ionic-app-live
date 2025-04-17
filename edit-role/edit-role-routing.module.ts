import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRolePage } from './edit-role.page';

const routes: Routes = [
  {
    path: '',
    component: EditRolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRolePageRoutingModule {}
