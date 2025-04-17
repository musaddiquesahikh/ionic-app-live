import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentGatewayPageRoutingModule } from './payment-gateway-routing.module';

import { PaymentGatewayPage } from './payment-gateway.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentGatewayPageRoutingModule,
    TranslateModule
  ],
  declarations: [PaymentGatewayPage]
})
export class PaymentGatewayPageModule {}
