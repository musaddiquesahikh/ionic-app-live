import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollSettingsPage } from './payroll-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollSettingsPageRoutingModule {}
