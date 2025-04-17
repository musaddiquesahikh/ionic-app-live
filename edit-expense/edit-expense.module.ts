import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditExpensePageRoutingModule } from './edit-expense-routing.module';
import { EditExpensePage } from './edit-expense.page';
import { CashPage } from '../cash/cash.page';
import { ChequePage } from '../cheque/cheque.page';
import { BankPage } from '../bank/bank.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExpensePageRoutingModule,
    TranslateModule
  ],
  declarations: [EditExpensePage, CashPage, ChequePage, BankPage]
})
export class EditExpensePageModule {}
