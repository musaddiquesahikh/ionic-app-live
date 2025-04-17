import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewReportPageRoutingModule } from './view-report-routing.module';
import { ViewReportPage } from './view-report.page';
import { PayslipPage } from "../payslip/payslip.page";
import { LeaveReportPage } from "../leave-report/leave-report.page";
import { SalaryRegisterPage } from "../salary-register/salary-register.page";
import { SalesRegisterPage } from "../sales-register/sales-register.page";
import { BillWiseProfitPage } from "../bill-wise-profit/bill-wise-profit.page";
import { ItemWiseSalesPage } from "../item-wise-sales/item-wise-sales.page";
import { PartyWiseSalesPage } from "../party-wise-sales/party-wise-sales.page";
import { PurchaseRegisterPage } from "../purchase-register/purchase-register.page";
import { ItemWisePurchasePage } from "../item-wise-purchase/item-wise-purchase.page";
import { PartyWisePurchasePage } from "../party-wise-purchase/party-wise-purchase.page";
import { TrialBalancePage } from "../trial-balance/trial-balance.page";
import { CategoryWiseReportPage } from "../category-wise-report/category-wise-report.page";
import { LedgerReportPage } from "../ledger-report/ledger-report.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReportPageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewReportPage, PayslipPage, SalaryRegisterPage,  BillWiseProfitPage,
  ItemWiseSalesPage,PartyWiseSalesPage, PurchaseRegisterPage, ItemWisePurchasePage, PartyWisePurchasePage, TrialBalancePage,
  CategoryWiseReportPage, LedgerReportPage]
})
export class ViewReportPageModule {}
