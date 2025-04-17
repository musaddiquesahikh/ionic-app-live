import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditLedgerPageRoutingModule } from './edit-ledger-routing.module';
import { EditLedgerPage } from './edit-ledger.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLedgerPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EditLedgerPage]
})
export class EditLedgerPageModule {}
