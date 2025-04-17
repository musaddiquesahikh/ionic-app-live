import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateNewBankPageRoutingModule } from './create-new-bank-routing.module';
import { CreateNewBankPage } from './create-new-bank.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReactivePage } from '../reactive/reactive.page';
import { ReactivePageModule } from '../reactive/reactive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateNewBankPageRoutingModule,
    TranslateModule,ReactiveFormsModule,ReactivePageModule
  ],
  declarations: [CreateNewBankPage]
})
export class CreateNewBankPageModule {}
