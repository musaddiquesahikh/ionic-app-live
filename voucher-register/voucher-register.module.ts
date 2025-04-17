import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherRegisterPageRoutingModule } from './voucher-register-routing.module';

import { VoucherRegisterPage } from './voucher-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherRegisterPageRoutingModule,TranslateModule
  ],
  declarations: [VoucherRegisterPage]
})
export class VoucherRegisterPageModule {}
