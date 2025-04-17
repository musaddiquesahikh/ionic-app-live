import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollPageRoutingModule } from './payroll-routing.module';

import { PayrollPage } from './payroll.page';
import { AddNewEmployeePage } from "../add-new-employee/add-new-employee.page";
import { PayrollSettingsPage } from "../payroll-settings/payroll-settings.page";
import { TaxDeductionPage } from "../tax-deduction/tax-deduction.page";
import { PayslipPage } from "../payslip/payslip.page";
import { SalaryRegisterPage } from "../salary-register/salary-register.page";
import { LeaveReportPage } from "../leave-report/leave-report.page";
import { AttendencePage } from '../attendence/attendence.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPageRoutingModule,TranslateModule
  ],
  declarations: [ ]
})
export class PayrollPageModule {}
