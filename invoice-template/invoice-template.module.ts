import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoiceTemplatePageRoutingModule } from './invoice-template-routing.module';
import { InvoiceTemplatePage } from './invoice-template.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceTemplatePageRoutingModule,
    TranslateModule
  ],
  declarations: [InvoiceTemplatePage]
})
export class InvoiceTemplatePageModule {}
