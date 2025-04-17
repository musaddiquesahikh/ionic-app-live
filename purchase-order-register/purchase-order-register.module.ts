import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrderRegisterPageRoutingModule } from './purchase-order-register-routing.module';

import { PurchaseOrderRegisterPage } from './purchase-order-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrderRegisterPageRoutingModule,TranslateModule
  ],
  declarations: [PurchaseOrderRegisterPage]
})
export class PurchaseOrderRegisterPageModule {}
