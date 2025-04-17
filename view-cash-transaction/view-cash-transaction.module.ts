import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewCashTransactionPageRoutingModule } from './view-cash-transaction-routing.module';
import { ViewCashTransactionPage } from './view-cash-transaction.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCashTransactionPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewCashTransactionPage]
})
export class ViewCashTransactionPageModule {}
