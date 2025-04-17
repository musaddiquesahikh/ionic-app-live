import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgControl, NgControlStatus, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddCashLedgerPageRoutingModule } from './add-cash-ledger-routing.module';
import { AddCashLedgerPage } from './add-cash-ledger.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReactivePageModule } from '../reactive/reactive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddCashLedgerPageRoutingModule,
    TranslateModule,ReactivePageModule

  ],
  declarations: [AddCashLedgerPage]
})
export class AddCashLedgerPageModule {}
