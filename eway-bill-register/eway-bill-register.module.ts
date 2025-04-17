import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EwayBillRegisterPageRoutingModule } from './eway-bill-register-routing.module';

import { EwayBillRegisterPage } from './eway-bill-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EwayBillRegisterPageRoutingModule
  ],
  declarations: [EwayBillRegisterPage]
})
export class EwayBillRegisterPageModule {}
