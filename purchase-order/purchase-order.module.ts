import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrderPageRoutingModule } from './purchase-order-routing.module';

import { PurchaseOrderPage } from './purchase-order.page';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { InvoiceBetaPage } from '../invoice-beta/invoice-beta.page';
import { PartyListPage } from '../party-list/party-list.page';
import { ShowItemPage } from '../show-item/show-item.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrderPageRoutingModule,
    TranslateModule
  ],
  declarations:[PurchaseOrderPage,PartyListPage,ShowItemPage,CreateNewItemPage,AddNewPartyPage,InvoiceBetaPage ]
})
export class PurchaseOrderPageModule {}
