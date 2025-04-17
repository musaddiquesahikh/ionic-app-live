import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceSettingPageRoutingModule } from './invoice-setting-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceSettingPageRoutingModule,
    TranslateModule
  ],
  declarations: [],

})
export class InvoiceSettingPageModule {}
