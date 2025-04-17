import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LedgerReportPageRoutingModule } from './ledger-report-routing.module';
import { LedgerReportPage } from './ledger-report.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LedgerReportPageRoutingModule,
    TranslateModule
  ],
  declarations: [LedgerReportPage]
})
export class LedgerReportPageModule {}
