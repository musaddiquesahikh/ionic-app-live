import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceTemplatePage } from './invoice-template.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceTemplatePageRoutingModule {}
