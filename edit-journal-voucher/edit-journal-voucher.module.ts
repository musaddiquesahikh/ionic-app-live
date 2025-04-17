import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditJournalVoucherPageRoutingModule } from './edit-journal-voucher-routing.module';
import { EditJournalVoucherPage } from './edit-journal-voucher.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditJournalVoucherPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditJournalVoucherPage]
})
export class EditJournalVoucherPageModule {}
