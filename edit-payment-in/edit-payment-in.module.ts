import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';
import { BankPage } from '../bank/bank.page';
import { IonicModule } from '@ionic/angular';
import { EditPaymentInPageRoutingModule } from './edit-payment-in-routing.module';
import { EditPaymentInPage } from './edit-payment-in.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPaymentInPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditPaymentInPage,CashPage, ChequePage, BankPage]
})
export class EditPaymentInPageModule {}
