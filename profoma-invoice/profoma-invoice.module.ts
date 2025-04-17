import { TranslateModule } from '@ngx-translate/core';
import { InvoiceBetaPage } from './../invoice-beta/invoice-beta.page';
import { InvoiceBetaPageRoutingModule } from './../invoice-beta/invoice-beta-routing.module';
import { PartyListPageModule } from '../party-list/party-list.module';
import { ShowItemPage } from '../show-item/show-item.page';
import { PartyListPage } from '../party-list/party-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfomaInvoicePageRoutingModule } from './profoma-invoice-routing.module';

import { ProfomaInvoicePage } from './profoma-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfomaInvoicePageRoutingModule,TranslateModule
  ],
  declarations: [ProfomaInvoicePage,InvoiceBetaPage,PartyListPage,ShowItemPage]
})
export class ProfomaInvoicePageModule {}
