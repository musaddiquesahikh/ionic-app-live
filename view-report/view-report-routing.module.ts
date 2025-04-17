import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportPage } from './view-report.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReportPage
  },
  {
    path: 'sales-register',
    loadChildren: () => import('../sales-register/sales-register.module').then( m => m.SalesRegisterPageModule)
  },
  {
    path: 'bill-wise-profit',
    loadChildren: () => import('../bill-wise-profit/bill-wise-profit.module').then( m => m.BillWiseProfitPageModule)
  },
  {
    path: 'item-wise-sales',
    loadChildren: () => import('../item-wise-sales/item-wise-sales.module').then( m => m.ItemWiseSalesPageModule)
  },
  {
    path: 'party-wise-sales',
    loadChildren: () => import('../party-wise-sales/party-wise-sales.module').then( m => m.PartyWiseSalesPageModule)
  },
  {
    path: 'purchase-register',
    loadChildren: () => import('../purchase-register/purchase-register.module').then( m => m.PurchaseRegisterPageModule)
  },
  {
    path: 'item-wise-purchase',
    loadChildren: () => import('../item-wise-purchase/item-wise-purchase.module').then( m => m.ItemWisePurchasePageModule)
  },
  {
    path: 'party-wise-purchase',
    loadChildren: () => import('../party-wise-purchase/party-wise-purchase.module').then( m => m.PartyWisePurchasePageModule)
  },
  {
    path: 'trial-balance',
    loadChildren: () => import('../trial-balance/trial-balance.module').then( m => m.TrialBalancePageModule)
  },
  {
    path: 'category-wise-report',
    loadChildren: () => import('../category-wise-report/category-wise-report.module').then( m => m.CategoryWiseReportPageModule)
  },
  {
    path: 'ledger-report',
    loadChildren: () => import('../ledger-report/ledger-report.module').then( m => m.LedgerReportPageModule)
  },
  {
    path: 'gstr1',
    loadChildren: () => import('../gstr1/gstr1.module').then( m => m.GSTR1PageModule)
  },
  {
    path: 'gstr2',
    loadChildren: () => import('../gstr2/gstr2.module').then( m => m.GSTR2PageModule)
  },
  {
    path: 'gstr3',
    loadChildren: () => import('../gstr3/gstr3.module').then( m => m.GSTR3PageModule)
  },
  {
    path: 'salary-register',
    loadChildren: () => import('../salary-register/salary-register.module').then( m => m.SalaryRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReportPageRoutingModule {}
