import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentOutPageRoutingModule } from './payment-out-routing.module';
import { PaymentOutPage } from './payment-out.page';
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';
import { BankPage } from '../bank/bank.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentOutPageRoutingModule,
    TranslateModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PaymentOutPage, CashPage, ChequePage, BankPage]
})
export class PaymentOutPageModule {}
