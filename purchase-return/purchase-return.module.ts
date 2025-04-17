import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PurchaseReturnPageRoutingModule } from './purchase-return-routing.module';
import { PurchaseReturnPage } from './purchase-return.page';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { ShowItemPage } from "../show-item/show-item.page";
import { PartyListPage } from "../party-list/party-list.page";
import { InvoiceBetaPage } from "../invoice-beta/invoice-beta.page";
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseReturnPageRoutingModule,
    TranslateModule
  ],
  declarations: [PurchaseReturnPage, CreateNewItemPage, AddNewPartyPage,
    ShowItemPage,PartyListPage,InvoiceBetaPage]
})
export class PurchaseReturnPageModule {}
