import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentRegisterPageRoutingModule } from './payment-register-routing.module';

import { PaymentRegisterPage } from './payment-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentRegisterPageRoutingModule,TranslateModule
  ],
  declarations: [PaymentRegisterPage]
})
export class PaymentRegisterPageModule {}
