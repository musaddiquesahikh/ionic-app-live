import { ShowItemPage } from './../show-item/show-item.page';
import { ShowItemPageModule } from './../show-item/show-item.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesInvoicePageRoutingModule } from './sales-invoice-routing.module';
import { SalesInvoicePage } from './sales-invoice.page';
import { PartyListPage } from "../party-list/party-list.page";
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { CreateNewItemPage } from "../create-new-item/create-new-item.page";
import { InvoiceBetaPage } from "../invoice-beta/invoice-beta.page";
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesInvoicePageRoutingModule,
    TranslateModule
  ],
  declarations: [SalesInvoicePage,ShowItemPage, PartyListPage, 
    AddNewPartyPage,CreateNewItemPage,InvoiceBetaPage],
    providers: [AndroidPermissions],
    
})
export class SalesInvoicePageModule {}
