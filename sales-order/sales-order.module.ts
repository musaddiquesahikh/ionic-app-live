import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesOrderPageRoutingModule } from './sales-order-routing.module';

import { SalesOrderPage } from './sales-order.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { InvoiceBetaPage } from '../invoice-beta/invoice-beta.page';
import { PartyListPage } from '../party-list/party-list.page';
import { ShowItemPage } from '../show-item/show-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesOrderPageRoutingModule,TranslateModule,
  ],
  declarations: [SalesOrderPage,PartyListPage,ShowItemPage,CreateNewItemPage,AddNewPartyPage,InvoiceBetaPage]
})
export class SalesOrderPageModule {}
