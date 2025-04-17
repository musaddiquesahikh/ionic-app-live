import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeaveReportPageRoutingModule } from './leave-report-routing.module';
import { LeaveReportPage } from './leave-report.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaveReportPageRoutingModule,
    ReactiveFormsModule,TranslateModule
  ],
  declarations: [LeaveReportPage]
})
export class LeaveReportPageModule {}
