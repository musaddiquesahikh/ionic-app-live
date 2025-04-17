import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuedPaymentReportPageRoutingModule } from './dued-payment-report-routing.module';

import { DuedPaymentReportPage } from './dued-payment-report.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DuedPaymentReportPageRoutingModule
  ],
  declarations: [DuedPaymentReportPage]
})
export class DuedPaymentReportPageModule {}
