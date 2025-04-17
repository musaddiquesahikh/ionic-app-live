import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateNewLedgerPageRoutingModule } from './create-new-ledger-routing.module';
import { CreateNewLedgerPage } from './create-new-ledger.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateNewLedgerPageRoutingModule,
    TranslateModule,ReactiveFormsModule
  ],
  declarations: [CreateNewLedgerPage]
})
export class CreateNewLedgerPageModule {}
