import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionReportPageRoutingModule } from './permission-report-routing.module';

import { PermissionReportPage } from './permission-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionReportPageRoutingModule
  ],
  declarations: [PermissionReportPage]
})
export class PermissionReportPageModule {}
