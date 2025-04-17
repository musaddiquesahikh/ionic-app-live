import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryChallanPageRoutingModule } from './delivery-challan-routing.module';

import { DeliveryChallanPage } from './delivery-challan.page';
import { CreateNewItemPage } from "../create-new-item/create-new-item.page";
// import { AddNewPartyPage } from "../create-new-party/create-new-party.page";
import { PartyListPage } from "../party-list/party-list.page";
import { ShowItemPage } from "../show-item/show-item.page";
import { InvoiceBetaPage } from "../invoice-beta/invoice-beta.page";
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryChallanPageRoutingModule,TranslateModule
  ],
  declarations: [DeliveryChallanPage, CreateNewItemPage,AddNewPartyPage, PartyListPage,
     ShowItemPage,InvoiceBetaPage]
})
export class DeliveryChallanPageModule {}
