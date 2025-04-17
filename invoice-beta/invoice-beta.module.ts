import { InvoiceSettingPage } from './../invoice-setting/invoice-setting.page';
import { PartyListPage } from './../party-list/party-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoiceBetaPageRoutingModule } from './invoice-beta-routing.module';
import { ShowItemPage } from "../show-item/show-item.page";
import { TranslateModule } from '@ngx-translate/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MatAutocomplete } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoiceBetaPageRoutingModule,
    TranslateModule,
    FormsModule,ReactiveFormsModule
    // AndroidPermissions
  ],
  declarations: [ShowItemPage,PartyListPage,InvoiceSettingPage],
  providers: [AndroidPermissions],
})
export class InvoiceBetaPageModule {}
