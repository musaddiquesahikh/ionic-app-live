import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentoutPageRoutingModule } from './paymentout-routing.module';
import { PaymentoutPage } from './paymentout.page';
import { TranslateModule } from '@ngx-translate/core';
import { BankPage } from '../bank/bank.page';
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentoutPageRoutingModule,TranslateModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PaymentoutPage,CashPage, ChequePage, BankPage]
})
export class PaymentoutPageModule {}
