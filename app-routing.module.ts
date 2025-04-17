import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AuthGuard } from './guards/auth.guard';
import { PermissionGuard } from './guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-new-item',
    loadChildren: () => import('./create-new-item/create-new-item.module').then(m => m.CreateNewItemPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items" }
  },
  {
    path: 'expense',
    loadChildren: () => import('./expense/expense.module').then(m => m.ExpensePageModule),
    canActivate: [PermissionGuard], data: { pagename: "expense" }
  },
  {
    path: 'show-item',
    loadChildren: () => import('./show-item/show-item.module').then(m => m.ShowItemPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items" }
  },
  {
    path: 'party-list',
    loadChildren: () => import('./party-list/party-list.module').then(m => m.PartyListPageModule),
    canActivate: [PermissionGuard], data: { pagename: "parties" }

  },
  {
    path: 'add-new-business',
    loadChildren: () => import('./add-new-business/add-new-business.module').then(m => m.AddNewBusinessPageModule),
    
  },
  {
    path: 'create-staff',
    loadChildren: () => import('./create-staff/create-staff.module').then(m => m.CreateStaffPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting"}
  },
  {
    path: 'show-staff-list',
    loadChildren: () => import('./show-staff-list/show-staff-list.module').then(m => m.ShowStaffListPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting"}
  },
  {
    path: 'payment-in-out',
    loadChildren: () => import('./payment-in-out/payment-in-out.module').then(m => m.PaymentInOutPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
    
  },
  {
    path: 'create-new-ledger',
    loadChildren: () => import('./create-new-ledger/create-new-ledger.module').then(m => m.CreateNewLedgerPageModule),
     canActivate: [AuthGuard], data: { pagename: "ledgers"}
  },
  {
    path: 'manage-money',
    loadChildren: () => import('./manage-money/manage-money.module').then(m => m.ManageMoneyPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'payment-out',
    loadChildren: () => import('./payment-out/payment-out.module').then(m => m.PaymentOutPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'create-new-bank',
    loadChildren: () => import('./create-new-bank/create-new-bank.module').then(m => m.CreateNewBankPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'journal-vouchers',
    loadChildren: () => import('./journal-vouchers/journal-vouchers.module').then(m => m.JournalVouchersPageModule),
    canActivate: [PermissionGuard], data: { pagename: "voucher"}
  },
  {
    path: 'payroll',
    loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollPageModule)
  },
  {
    path: 'add-new-employee',
    loadChildren: () => import('./add-new-employee/add-new-employee.module').then(m => m.AddNewEmployeePageModule)
  },
  {
    path: 'tax-deduction',
    loadChildren: () => import('./tax-deduction/tax-deduction.module').then(m => m.TaxDeductionPageModule)
  },
  {
    path: 'payroll-settings',
    loadChildren: () => import('./payroll-settings/payroll-settings.module').then(m => m.PayrollSettingsPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting", actions: "edit" }
  },
  {
    path: 'attendence',
    loadChildren: () => import('./attendence/attendence.module').then(m => m.AttendencePageModule)
  },
  {
    path: 'payslip',
    loadChildren: () => import('./payslip/payslip.module').then(m => m.PayslipPageModule)
  },
  {
    path: 'salary-register',
    loadChildren: () => import('./salary-register/salary-register.module').then(m => m.SalaryRegisterPageModule)
  },
  {
    path: 'leave-report',
    loadChildren: () => import('./leave-report/leave-report.module').then(m => m.LeaveReportPageModule)
  },
  {
    path: 'view-report',
    loadChildren: () => import('./view-report/view-report.module').then(m => m.ViewReportPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'alter-ledger',
    loadChildren: () => import('./alter-ledger/alter-ledger.module').then(m => m.AlterLedgerPageModule),
    canActivate: [PermissionGuard], data: { pagename: "ledgers"}
  },
  {
    path: 'sales-register',
    loadChildren: () => import('./sales-register/sales-register.module').then(m => m.SalesRegisterPageModule),
     canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'bill-wise-profit',
    loadChildren: () => import('./bill-wise-profit/bill-wise-profit.module').then(m => m.BillWiseProfitPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'item-wise-sales',
    loadChildren: () => import('./item-wise-sales/item-wise-sales.module').then(m => m.ItemWiseSalesPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'party-wise-sales',
    loadChildren: () => import('./party-wise-sales/party-wise-sales.module').then(m => m.PartyWiseSalesPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'purchase-register',
    loadChildren: () => import('./purchase-register/purchase-register.module').then(m => m.PurchaseRegisterPageModule),
    canActivate: [PermissionGuard], data: { pagename: "purchase_voucher"}
  },
  {
    path: 'item-wise-purchase',
    loadChildren: () => import('./item-wise-purchase/item-wise-purchase.module').then(m => m.ItemWisePurchasePageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports" }
  },
  {
    path: 'party-wise-purchase',
    loadChildren: () => import('./party-wise-purchase/party-wise-purchase.module').then(m => m.PartyWisePurchasePageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'trial-balance',
    loadChildren: () => import('./trial-balance/trial-balance.module').then(m => m.TrialBalancePageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'category-wise-report',
    loadChildren: () => import('./category-wise-report/category-wise-report.module').then(m => m.CategoryWiseReportPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'ledger-report',
    loadChildren: () => import('./ledger-report/ledger-report.module').then(m => m.LedgerReportPageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'gstr1',
    loadChildren: () => import('./gstr1/gstr1.module').then(m => m.GSTR1PageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'gstr2',
    loadChildren: () => import('./gstr2/gstr2.module').then(m => m.GSTR2PageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'gstr3',
    loadChildren: () => import('./gstr3/gstr3.module').then(m => m.GSTR3PageModule),
    canActivate: [PermissionGuard], data: { pagename: "reports"}
  },
  {
    path: 'purchase-invoice',
    loadChildren: () => import('./purchase-invoice/purchase-invoice.module').then(m => m.PurchaseInvoicePageModule),
    canActivate: [PermissionGuard], data: { pagename: "purchase_voucher"}
  },
  {
    path: 'sales-invoice',
    loadChildren: () => import('./sales-invoice/sales-invoice.module').then(m => m.SalesInvoicePageModule),
    canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'edit-staff',
    loadChildren: () => import('./edit-staff/edit-staff.module').then(m => m.EditStaffPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting" }
  },
  {
    path: 'edit-party',
    loadChildren: () => import('./edit-party/edit-party.module').then(m => m.EditPartyPageModule),
      canLoad: [PermissionGuard], data: { pagename: "parties"}
  },
  {
    path: 'edit-item',
    loadChildren: () => import('./edit-item/edit-item.module').then(m => m.EditItemPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items" }
  },
  {
    path: 'item-details',
    loadChildren: () => import('./item-details/item-details.module').then(m => m.ItemDetailsPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items"}
  },
  {
    path: 'party-details',
    loadChildren: () => import('./party-details/party-details.module').then(m => m.PartyDetailsPageModule),
  
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sales-return',
    loadChildren: () => import('./sales-return/sales-return.module').then(m => m.SalesReturnPageModule),
    canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'quatation',
    loadChildren: () => import('./quatation/quatation.module').then(m => m.QuatationPageModule),
    canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'purchase-return',
    loadChildren: () => import('./purchase-return/purchase-return.module').then(m => m.PurchaseReturnPageModule),
    canActivate: [PermissionGuard], data: { pagename: "purchase_voucher"}
  },
  {
    path: 'delivery-challan',
    loadChildren: () => import('./delivery-challan/delivery-challan.module').then(m => m.DeliveryChallanPageModule),
    canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'edit-company',
    loadChildren: () => import('./edit-company/edit-company.module').then(m => m.EditCompanyPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting"}
  },
  {
    path: 'show-company-list',
    loadChildren: () => import('./show-company-list/show-company-list.module').then(m => m.ShowCompanyListPageModule)
  },
  {
    path: 'empty',
    loadChildren: () => import('./empty/empty.module').then(m => m.EmptyPageModule)
  },
  {
    path: 'edit-bank',
    loadChildren: () => import('./edit-bank/edit-bank.module').then(m => m.EditBankPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'edit-ledger',
    loadChildren: () => import('./edit-ledger/edit-ledger.module').then(m => m.EditLedgerPageModule),
    canActivate: [PermissionGuard], data: { pagename: "ledgers"}
  },

  {
    path: 'edit-cash-ledger',
    loadChildren: () => import('./edit-cash-ledger/edit-cash-ledger.module').then(m => m.EditCashLedgerPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'party-wise-item-purchase',
    loadChildren: () => import('./party-wise-item-purchase/party-wise-item-purchase.module').then(m => m.PartyWiseItemPurchasePageModule)
  },
  {
    path: 'party-wise-item-sales',
    loadChildren: () => import('./party-wise-item-sales/party-wise-item-sales.module').then(m => m.PartyWiseItemSalesPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'edit-bill',
    loadChildren: () => import('./edit-bill/edit-bill.module').then(m => m.EditBillPageModule),
     canActivate: [PermissionGuard], data: { pagename: "sales_voucher"}
  },
  {
    path: 'view-bank-transaction',
    loadChildren: () => import('./view-bank-transaction/view-bank-transaction.module').then(m => m.ViewBankTransactionPageModule)
  },
  {
    path: 'view-cash-transaction',
    loadChildren: () => import('./view-cash-transaction/view-cash-transaction.module').then(m => m.ViewCashTransactionPageModule)
  },
  {
    path: 'view-bank-transaction',
    loadChildren: () => import('./view-bank-transaction/view-bank-transaction.module').then(m => m.ViewBankTransactionPageModule)
  },
  {
    path: 'expense-details',
    loadChildren: () => import('./expense-details/expense-details.module').then(m => m.ExpenseDetailsPageModule),
    canActivate: [PermissionGuard], data: { pagename: "expense"}

  },
  {
    path: 'payment-gateway',
    loadChildren: () => import('./payment-gateway/payment-gateway.module').then(m => m.PaymentGatewayPageModule)
  },
  {
    path: 'edit-payment-in',
    loadChildren: () => import('./edit-payment-in/edit-payment-in.module').then(m => m.EditPaymentInPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'edit-payment-out',
    loadChildren: () => import('./edit-payment-out/edit-payment-out.module').then(m => m.EditPaymentOutPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'edit-expense',
    loadChildren: () => import('./edit-expense/edit-expense.module').then(m => m.EditExpensePageModule),
    canActivate: [PermissionGuard], data: { pagename: "expense"},
  },
  {
    path: 'edit-journal-voucher',
    loadChildren: () => import('./edit-journal-voucher/edit-journal-voucher.module').then(m => m.EditJournalVoucherPageModule),
    canActivate: [PermissionGuard], data: { pagename: "voucher"},
  },
  {
    path: '',
    redirectTo: 'invoice-beta',
    pathMatch: 'full'
  },
  {
    path: 'invoice-beta',
    loadChildren: () => import('./invoice-beta/invoice-beta.module').then(m => m.InvoiceBetaPageModule),
    canActivate: [PermissionGuard], data: { pagename: "sales_voucher"},
    
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting"}
  },
  {
    path: 'invoice-template',
    loadChildren: () => import('./invoice-template/invoice-template.module').then(m => m.InvoiceTemplatePageModule)
  },
  {
    path: 'infinity',
    loadChildren: () => import('./infinity/infinity.module').then(m => m.InfinityPageModule)
  },
  {
    path: 'codelogin',
    loadChildren: () => import('./codelogin/codelogin.module').then(m => m.CodeloginPageModule)
  },
  {
    path: 'qrcodelogin',
    loadChildren: () => import('./qrcodelogin/qrcodelogin.module').then(m => m.QrcodeloginPageModule)
  },
  {
    path: 'cash-withdrow',
    loadChildren: () => import('./cash-withdrow/cash-withdrow.module').then(m => m.CashWithdrowPageModule)
  },
  {
    path: 'cash-deposit',
    loadChildren: () => import('./cash-deposit/cash-deposit.module').then(m => m.CashDepositPageModule)
  },
  {
    path: 'bank-transfer',
    loadChildren: () => import('./bank-transfer/bank-transfer.module').then(m => m.BankTransferPageModule)
  },
  {
    path: 'view-quatation',
    loadChildren: () => import('./view-quatation/view-quatation.module').then(m => m.ViewQuatationPageModule)
  },
  {
    path: 'view-challan',
    loadChildren: () => import('./view-challan/view-challan.module').then(m => m.ViewChallanPageModule)
  },
  {
    path: 'cash',
    loadChildren: () => import('./cash/cash.module').then(m => m.CashPageModule)
  },
  {
    path: 'cheque',
    loadChildren: () => import('./cheque/cheque.module').then(m => m.ChequePageModule)
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then(m => m.BankPageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionPageModule),
    canActivate: [PermissionGuard], data: { pagename: "company_setting"}
  },
  {
    path: 'password-strength',
    loadChildren: () => import('./password-strength/password-strength.module').then(m => m.PasswordStrengthPageModule)
  },
  {
    path: 'custom',
    loadChildren: () => import('./custom/custom.module').then( m => m.CustomPageModule)
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
  
  
    path: 'create-role',
    loadChildren: () => import('./create-role/create-role.module').then( m => m.CreateRolePageModule)
  },
  {

    path: 'edit-role',
    loadChildren: () => import('./edit-role/edit-role.module').then( m => m.EditRolePageModule)
  },
  {
    path: 'profoma-invoice',
    loadChildren: () => import('./profoma-invoice/profoma-invoice.module').then( m => m.ProfomaInvoicePageModule)
  },

  {
    path: 'proforma-register',
    loadChildren: () => import('./proforma-register/proforma-register.module').then( m => m.ProformaRegisterPageModule)
  },
  {
    path: 'item-wise-proforma',
    loadChildren: () => import('./item-wise-proforma/item-wise-proforma.module').then( m => m.ItemWiseProformaPageModule)
  },
  {
    path: 'party-wise-proforma',
    loadChildren: () => import('./party-wise-proforma/party-wise-proforma.module').then( m => m.PartyWiseProformaPageModule)
  },
  {
    path: 'coupen',
    loadChildren: () => import('./coupen/coupen.module').then( m => m.CoupenPageModule)
  },
  {
    path: 'invoice-setting',
    loadChildren: () => import('./invoice-setting/invoice-setting.module').then( m => m.InvoiceSettingPageModule)
  },
  {
    path: 'e-way',
    loadChildren: () => import('./e-way/e-way.module').then( m => m.EWayPageModule)
  },
  {
    path: 'mymodal',
    loadChildren: () => import('./mymodal/mymodal.module').then( m => m.MymodalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'e-way',
    loadChildren: () => import('./e-way/e-way.module').then( m => m.EWayPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule),
    canActivate: [PermissionGuard], data: { pagename: "inventory"}
  },
  {
    path: 'adjust-stock',
    loadChildren: () => import('./adjust-stock/adjust-stock.module').then( m => m.AdjustStockPageModule),
    canActivate: [PermissionGuard], data: { pagename: "inventory"}

  },
  {
    path: 'tour',
    loadChildren: () => import('./tour/tour.module').then( m => m.TourPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'purchase',
    loadChildren: () => import('./purchase/purchase.module').then( m => m.PurchasePageModule)
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.module').then( m => m.ReactivePageModule)
  },
  {
    path: 'add-new-party',
    loadChildren: () => import('./add-new-party/add-new-party.module').then( m => m.AddNewPartyPageModule),
    canActivate: [PermissionGuard], data: { pagename: "parties"}
  },
  {
    path: 'create-new-party',
    loadChildren: () => import('./create-new-party/create-new-party.module').then(m => m.CreateNewPartyPageModule),
    canActivate: [PermissionGuard], data: { pagename: "parties"}
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items"}
  },
  {
    path: 'add-new-item',
    loadChildren: () => import('./add-new-item/add-new-item.module').then( m => m.AddNewItemPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items"}
  },
  {
    path: 'payment-in',
    loadChildren: () => import('./payment-in/payment-in.module').then( m => m.PaymentINPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'paymentout',
    loadChildren: () => import('./paymentout/paymentout.module').then( m => m.PaymentoutPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'add-cash-ledger',
    loadChildren: () => import('./add-cash-ledger/add-cash-ledger.module').then( m => m.AddCashLedgerPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'add-new-bank',
    loadChildren: () => import('./add-new-bank/add-new-bank.module').then( m => m.AddNewBankPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}

  },
  {
    path: 'purchase-order',
    loadChildren: () => import('./purchase-order/purchase-order.module').then( m => m.PurchaseOrderPageModule)
  },
  {
    path: 'purchase-order-register',
    loadChildren: () => import('./purchase-order-register/purchase-order-register.module').then( m => m.PurchaseOrderRegisterPageModule)
  },
  {
    path: 'expense-register',
    loadChildren: () => import('./expense-register/expense-register.module').then( m => m.ExpenseRegisterPageModule),
    canActivate: [PermissionGuard], data: { pagename: "expense" }
  },
  {
    path: 'payment-register',
    loadChildren: () => import('./payment-register/payment-register.module').then( m => m.PaymentRegisterPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'voucher-register',
    loadChildren: () => import('./voucher-register/voucher-register.module').then( m => m.VoucherRegisterPageModule),
    canActivate: [PermissionGuard], data: { pagename: "manage_money"}
  },
  {
    path: 'thermalprint',
    loadChildren: () => import('./thermalprint/thermalprint.module').then( m => m.ThermalprintPageModule)
  },
  {
    path: 'multiple-ic',
    loadChildren: () => import('./multiple-ic/multiple-ic.module').then( m => m.MultipleICPageModule)
  },
  {
    path: 'party',
    loadChildren: () => import('./party/party.module').then( m => m.PartyPageModule)
  },
  {
    path: 'party-wise-bill',
    loadChildren: () => import('./party-wise-bill/party-wise-bill.module').then( m => m.PartyWiseBillPageModule)
  },
  {
    path: 'eway-bill-register',
    loadChildren: () => import('./eway-bill-register/eway-bill-register.module').then( m => m.EwayBillRegisterPageModule)
  },
  {
    path: 'einvoice-register',
    loadChildren: () => import('./einvoice-register/einvoice-register.module').then( m => m.EInvoiceRegisterPageModule)
  },
  {
    path: 'dued-payment-report',
    loadChildren: () => import('./dued-payment-report/dued-payment-report.module').then( m => m.DuedPaymentReportPageModule)
  },
  {
    path: 'category-wise-sales',
    loadChildren: () => import('./category-wise-sales/category-wise-sales.module').then( m => m.CategoryWiseSalesPageModule)
  },
  {
    path: 'category-wise-purchase',
    loadChildren: () => import('./category-wise-purchase/category-wise-purchase.module').then( m => m.CategoryWisePurchasePageModule)
  },
  {
    path: 'item-setting',
    loadChildren: () => import('./item-setting/item-setting.module').then( m => m.ItemSettingPageModule),
    canActivate: [PermissionGuard], data: { pagename: "items"}
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'sales-order',
    loadChildren: () => import('./sales-order/sales-order.module').then( m => m.SalesOrderPageModule)
  },
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then( m => m.ConvertPageModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./testing/testing.module').then( m => m.TestingPageModule)
  },
  {
    path: 'party-wise-bills',
    loadChildren: () => import('./party-wise-bills/party-wise-bills.module').then( m => m.PartyWiseBillsPageModule)
  },
  {
    path: 'sales-register-details',
    loadChildren: () => import('./sales-register-details/sales-register-details.module').then( m => m.SalesRegisterDetailsPageModule)
  },
  {
    path: 'purchase-register-details',
    loadChildren: () => import('./purchase-register-details/purchase-register-details.module').then( m => m.PurchaseRegisterDetailsPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'attendance-report',
    loadChildren: () => import('./attendance-report/attendance-report.module').then( m => m.AttendanceReportPageModule)
  },
  {
    path: 'sales-order-register',
    loadChildren: () => import('./sales-order-register/sales-order-register.module').then( m => m.SalesOrderRegisterPageModule)
  },
  {
    path: 'employee-attendence-modal',
    loadChildren: () => import('./employee-attendence-modal/employee-attendence-modal.module').then( m => m.EmployeeAttendenceModalPageModule)
  },
  {
    path: 'employee-attendance',
    loadChildren: () => import('./employee-attendance/employee-attendance.module').then( m => m.EmployeeAttendancePageModule)
  },
  {
    path: 'attendance-permission',
    loadChildren: () => import('./attendance-permission/attendance-permission.module').then( m => m.AttendancePermissionPageModule)
  },
  {
    path: 'permission-report',
    loadChildren: () => import('./permission-report/permission-report.module').then( m => m.PermissionReportPageModule)
  },
  // {
  //   path: 'attendance',
  //   loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  // },
 
  // {
  //   path: 'add-cashledger',
  //   loadChildren: () => import('./add-cashledger/add-cashledger.module').then( m => m.AddCashledgerPageModule)
  // },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        TranslateModule.forRoot(),TranslateModule,

  ],
  exports: [RouterModule,TranslateModule]
})
export class AppRoutingModule { }
