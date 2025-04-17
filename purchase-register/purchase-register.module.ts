import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseRegisterPageRoutingModule } from './purchase-register-routing.module';
import { PurchaseRegisterPage } from './purchase-register.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseRegisterPageRoutingModule,
    TranslateModule
  ],
  declarations: [PurchaseRegisterPage]
})
export class PurchaseRegisterPageModule {}
