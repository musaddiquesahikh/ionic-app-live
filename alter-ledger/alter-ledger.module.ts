import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlterLedgerPageRoutingModule } from './alter-ledger-routing.module';
import { AlterLedgerPage } from './alter-ledger.page';
import { CreateNewLedgerPage } from "../create-new-ledger/create-new-ledger.page";
import { EditLedgerPage } from "../edit-ledger/edit-ledger.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterLedgerPageRoutingModule,
    TranslateModule
  ],
  declarations: [AlterLedgerPage,CreateNewLedgerPage, EditLedgerPage]
})
export class AlterLedgerPageModule {}
