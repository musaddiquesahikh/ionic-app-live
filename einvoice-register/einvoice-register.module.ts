import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EInvoiceRegisterPageRoutingModule } from './einvoice-register-routing.module';

import { EInvoiceRegisterPage } from './einvoice-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    EInvoiceRegisterPageRoutingModule
  ],
  declarations: [EInvoiceRegisterPage]
})
export class EInvoiceRegisterPageModule {}
