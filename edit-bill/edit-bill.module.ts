import { InvoiceSettingPage } from './../invoice-setting/invoice-setting.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditBillPageRoutingModule } from './edit-bill-routing.module';
import { EditBillPage } from './edit-bill.page';
import { ShowItemPage } from "../show-item/show-item.page";
import { PartyListPage } from "../party-list/party-list.page";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBillPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditBillPage,ShowItemPage, PartyListPage,InvoiceSettingPage]
})
export class EditBillPageModule {}
