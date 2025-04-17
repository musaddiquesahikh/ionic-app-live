import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewBankPageRoutingModule } from './add-new-bank-routing.module';

import { AddNewBankPage } from './add-new-bank.page';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    AddNewBankPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [AddNewBankPage,]
})
export class AddNewBankPageModule {}
