import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CashDepositPageRoutingModule } from './cash-deposit-routing.module';
import { CashDepositPage } from './cash-deposit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashDepositPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [CashDepositPage]
})
export class CashDepositPageModule {}
