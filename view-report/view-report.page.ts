import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { PermissionGuard } from '../guards/permission.guard';

import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.page.html',
  styleUrls: ['./view-report.page.scss'],
})
export class ViewReportPage implements OnInit {
  steps: introJs.Step[] = []
  intro: introJs.IntroJs;
  attendance: any;

  constructor(public modalCtrl1: ModalController, public router: Router, private permission: PermissionGuard,
    public translate: TranslateService, public location: Location, public alertCtrl: AlertController,public api: ApiService) { }

  ngOnInit() {
    let t = JSON.parse(localStorage.getItem("reports"))

    if (t) {
      setTimeout(() => {
        this.introMethod();
      }, 1000);
    }
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      console.log("respkkk", response.data.role,response);
      // this.roleres = response.data.id;
      this.attendance = response.data.attendance;
    });
  }
  modelDismiss() {
    this.modalCtrl1.dismiss();

  }
  async salesRegister() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.view);
        if (hh.actions.view) {
          this.router.navigate(['/sales-register'])
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
        }
      }
    }
  }
  bill() {
    this.router.navigate(['/bill-wise-profit'])
  }
  itemsale() {
    this.router.navigate(['/item-wise-sales'])
  }
  partysale() {
    this.router.navigate(['/party-wise-sales'])
  }

  partyWbill() {
    this.router.navigate(['/party-wise-bill'])
  }
  purchase() {
    this.router.navigate(['/purchase-register'])
  }
  purchaseOrder() {
    this.router.navigate(['/purchase-order-register'])
  }
  expense() {
    this.router.navigate(['/expense-register'])
  }
  DuedPayment() {
    this.router.navigate(['/dued-payment-report'])
  }
  item_purchase() {
    this.router.navigate(['/item-wise-purchase'])
  }
  party_purchase() {
    this.router.navigate(['/party-wise-purchase'])
  }
  category() {
    this.router.navigate(['/category-wise-report'])
  }
  ledger() {
    this.router.navigate(['/ledger-report'])
  }
  Payment() {
    this.router.navigate(['/payment-register'])
  }
  Voucher() {
    this.router.navigate(['/voucher-register'])
  }
  attendace() {
    this.router.navigate(['/attendance-report'])
  }
  gstr1() {
    this.router.navigate(['/gstr1'])
  }
  gstr2() {
    this.router.navigate(['/gstr2'])
  }
  gstr3() {
    this.router.navigate(['/gstr3'])
  }
  trailBalance() {
    this.router.navigate(['/trial-balance'])
  }
  proforma() {
    this.router.navigate(['/proforma-register'])
  }
  viewQuotation() {
    this.router.navigate(['/view-quatation'])
  }
  viewChallan() {
    this.router.navigate(['/view-challan'])
  }
  PartyWiseItemSale() {
    this.router.navigate(['/party-wise-item-sales'])
  }
  PartyWiseItemPurch() {
    this.router.navigate(['/party-wise-item-purchase'])
  }
  PartyWiseBill(){
    this.router.navigate(['/party-wise-bill'])
  }
  CategoryWiseSale(){
    this.router.navigate(['/category-wise-sales'])
  }
  salesRdetails(){
    this.router.navigate(['/sales-register-details'])
  }
  PurchRdetails(){
    this.router.navigate(['/purchase-register-details'])
  }
  CategoryWisePurchase(){
    this.router.navigate(['/category-wise-purchase'])
  }
  EwayBillReg(){
    this.router.navigate(['/eway-bill-register'])
  }
  EinvoiceReg(){
    this.router.navigate(['/einvoice-register']) 
  }
  inventory() {
    this.router.navigate(['/inventory'])
  }
  SalesOrder() {
    this.router.navigate(['/sales-order-register'])
  }
  SalesOrder1() {
    this.router.navigate(['/add-new-employee'])
  }
  EmployeeAttendance() {
    this.router.navigate(['/employee-attendance'])
  }
  SalesOrder2() {
    this.router.navigate(['/employee-attendence-modal'])
  }
  SalesOrder3() {
    this.router.navigate(['/leave-report'])
  }
  SalesOrderregister() {
    this.router.navigate(['/sales-order'])
  }
  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('view').click()
      // document.getElementById('view').click()
      localStorage.setItem('reports', 'true');
      localStorage.setItem('sales-register', 'true');
      // localStorage.setItem('edit_invoice', 'true');
    });
    intro.onexit(function () {
      localStorage.setItem('reports', 'false');
      localStorage.setItem('sales-register', 'true');
      // localStorage.setItem('edit_invoice', 'false');

    });

    intro.setOptions({
      steps: [
        {
          onclick: document.getElementById('step1').click(),
          element: '#step1',
          intro: 'Click Here for Sales Ragister',
        },
        {
          element: '#view',
          intro: 'Click Here For View Sales Invoices Report',
        }

      ],

      disableInteraction: false,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement: true,
      scrollTo: "element",
      scrollPadding: 30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Done</ion-button>',
    }).start();
  }
}