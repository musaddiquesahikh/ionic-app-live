import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeloginPage } from './codelogin.page';

const routes: Routes = [
  {
    path: '',
    component: CodeloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeloginPageRoutingModule {}
