import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpensePageRoutingModule } from './expense-routing.module';
import { ExpensePage } from './expense.page';
// import { CreateNewPartyPage } from "../create-new-party/create-new-party.page";
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';
import { BankPage } from '../bank/bank.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensePageRoutingModule,
    TranslateModule
  ],
  declarations: [ExpensePage,AddNewPartyPage, CashPage, ChequePage, BankPage]
})
export class ExpensePageModule {}
