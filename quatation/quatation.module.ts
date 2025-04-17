import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuatationPageRoutingModule } from './quatation-routing.module';
import { QuatationPage } from './quatation.page';
import { PartyListPage } from "../party-list/party-list.page";
import { ShowItemPage } from "../show-item/show-item.page";
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { InvoiceBetaPage } from "../invoice-beta/invoice-beta.page";
import { TranslateModule } from '@ngx-translate/core';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuatationPageRoutingModule,TranslateModule
  ],
  declarations: [QuatationPage,PartyListPage,ShowItemPage,CreateNewItemPage,AddNewPartyPage,InvoiceBetaPage ]
})
export class QuatationPageModule {}
