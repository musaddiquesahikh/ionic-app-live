import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseRegisterDetailsPageRoutingModule } from './purchase-register-details-routing.module';

import { PurchaseRegisterDetailsPage } from './purchase-register-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseRegisterDetailsPageRoutingModule
  ],
  declarations: [PurchaseRegisterDetailsPage]
})
export class PurchaseRegisterDetailsPageModule {}
