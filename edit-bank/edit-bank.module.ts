import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditBankPageRoutingModule } from './edit-bank-routing.module';
import { EditBankPage } from './edit-bank.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBankPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditBankPage]
})
export class EditBankPageModule {}
