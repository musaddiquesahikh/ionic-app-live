import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMoneyPageRoutingModule } from './manage-money-routing.module';

import { ManageMoneyPage } from './manage-money.page';
import { PaymentInOutPage } from "../payment-in-out/payment-in-out.page";
import { CreateNewBankPage } from "../create-new-bank/create-new-bank.page";
import { PaymentOutPage } from "../payment-out/payment-out.page";
import { CreateNewLedgerPage } from "../create-new-ledger/create-new-ledger.page";
import { EditBankPage } from "../edit-bank/edit-bank.page";
// import { CreateCashLedgerPage } from "../create-cash-ledger/create-cash-ledger.page";
import { EditCashLedgerPage } from "../edit-cash-ledger/edit-cash-ledger.page";
import { TranslateModule } from '@ngx-translate/core';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMoneyPageRoutingModule,
    TranslateModule
  ],
  declarations: [ManageMoneyPage,PaymentInOutPage,CreateNewBankPage, PaymentOutPage, CreateNewLedgerPage, 
    AddCashLedgerPage, EditCashLedgerPage]
})
export class ManageMoneyPageModule {}
