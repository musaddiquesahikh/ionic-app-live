import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentINPageRoutingModule } from './payment-in-routing.module';
import { PaymentINPage } from './payment-in.page';
import { TranslateModule } from '@ngx-translate/core';
import { CreateNewLedgerPage } from '../create-new-ledger/create-new-ledger.page';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';
import { PartyListPage } from '../party-list/party-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentINPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [PaymentINPage,CreateNewLedgerPage,AddNewPartyPage,
    CreateNewBankPage,AddCashLedgerPage,PartyListPage],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class PaymentINPageModule {}
