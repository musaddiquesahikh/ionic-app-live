import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BankTransferPageRoutingModule } from './bank-transfer-routing.module';
import { BankTransferPage } from './bank-transfer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankTransferPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [BankTransferPage]
})
export class BankTransferPageModule {}
