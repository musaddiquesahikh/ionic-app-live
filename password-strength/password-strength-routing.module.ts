import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordStrengthPage } from './password-strength.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordStrengthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordStrengthPageRoutingModule {}
