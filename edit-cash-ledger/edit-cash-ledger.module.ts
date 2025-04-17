import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditCashLedgerPageRoutingModule } from './edit-cash-ledger-routing.module';
import { EditCashLedgerPage } from './edit-cash-ledger.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCashLedgerPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditCashLedgerPage]
})
export class EditCashLedgerPageModule {}
