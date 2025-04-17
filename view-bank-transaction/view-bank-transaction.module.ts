import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewBankTransactionPageRoutingModule } from './view-bank-transaction-routing.module';
import { ViewBankTransactionPage } from './view-bank-transaction.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBankTransactionPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewBankTransactionPage]
})
export class ViewBankTransactionPageModule {}
