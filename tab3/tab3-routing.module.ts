import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { Location } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Tab3PageRoutingModule {}
