import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';
import { BankPage } from '../bank/bank.page';
import { IonicModule } from '@ionic/angular';
import { EditPaymentOutPageRoutingModule } from './edit-payment-out-routing.module';
import { EditPaymentOutPage } from './edit-payment-out.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPaymentOutPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditPaymentOutPage,CashPage, ChequePage, BankPage]
})
export class EditPaymentOutPageModule {}
