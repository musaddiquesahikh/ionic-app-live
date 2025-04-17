import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateCashLedgerPageRoutingModule } from './create-cash-ledger-routing.module';
import { CreateCashLedgerPage } from './create-cash-ledger.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCashLedgerPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreateCashLedgerPage]
})
export class CreateCashLedgerPageModule {}
