import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentInOutPageRoutingModule } from './payment-in-out-routing.module';
import { PaymentInOutPage } from './payment-in-out.page';
import { CreateNewLedgerPage } from "../create-new-ledger/create-new-ledger.page";
// import { CreateNewPartyPage } from "../create-new-party/create-new-party.page";
import { CreateNewBankPage } from "../create-new-bank/create-new-bank.page";
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentInOutPageRoutingModule,
    TranslateModule
  ],
  declarations: [PaymentInOutPage,CreateNewLedgerPage,AddNewPartyPage,
    CreateNewBankPage,
    
  ]
})
export class PaymentInOutPageModule {}
