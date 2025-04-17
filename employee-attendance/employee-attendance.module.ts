import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAttendancePageRoutingModule } from './employee-attendance-routing.module';

import { EmployeeAttendancePage } from './employee-attendance.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeAttendancePageRoutingModule,
    TranslateModule
  ],
  declarations: [EmployeeAttendancePage]
})
export class EmployeeAttendancePageModule {}
