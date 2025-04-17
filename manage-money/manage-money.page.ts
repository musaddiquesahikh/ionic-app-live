import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { EditBankPage } from '../edit-bank/edit-bank.page';
import { EditCashLedgerPage } from '../edit-cash-ledger/edit-cash-ledger.page';
import { Router } from '@angular/router';
import { ViewBankTransactionPage } from '../view-bank-transaction/view-bank-transaction.page';
import { ViewCashTransactionPage } from '../view-cash-transaction/view-cash-transaction.page';
import { PaymentOutPage } from '../payment-out/payment-out.page';
import { CashWithdrowPage } from '../cash-withdrow/cash-withdrow.page';
import { CashDepositPage } from '../cash-deposit/cash-deposit.page';
import { BankTransferPage } from '../bank-transfer/bank-transfer.page';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';
import { AddNewBankPage } from '../add-new-bank/add-new-bank.page';
import { PaymentINPage } from '../payment-in/payment-in.page';
import { PaymentoutPage } from '../paymentout/paymentout.page';
import { Stats } from 'fs';

@Component({
  selector: 'app-manage-money',
  templateUrl: './manage-money.page.html',
  styleUrls: ['./manage-money.page.scss'],
})
export class ManageMoneyPage implements OnInit {

  payment: any;
  item: any
  cash: any = []
  company: any
  b: any
  msg: any
  bankid: any
  company_name: any

  private selectSegment: string = 'bank';
  on_tour: boolean;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router,
    public toastController: ToastController, private translate: TranslateService, public permission: PermissionGuard,
    public alertCtrl: AlertController, private location: Location, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getBank()
    this.permission1()
    let t = JSON.parse(localStorage.getItem('manage_money'))
    if (t) {
      setTimeout(() => {
        this.introMethod();
      }, 900);
    }
  }
  async permission1() {

    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'sales_voucher') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
        } else {
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

  getBank() {
    console.log("emited to withdrow");
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("pppp", response);
      if (response.status == 500) {
        this.b = this.translate.instant('HEADER.NO DATA AVAILABLE')
      } else {
        this.payment = response
        console.log("item dsfgdsg", this.payment);
      }
    });
    let data = {
      "company_id": companyId
    }
    this.api.cashLedgerList(data, header).subscribe((response: any) => {
      console.log("qqqqqqq", response);
      if (response.status == 500) {
        this.msg = this.translate.instant('HEADER.NO DATA AVAILABLE')
      } else {
        this.cash = response;
        console.log("item", this.cash);
      }
    });
  }

  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
  }
  async presentModal(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditBankPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: item
            }
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address /'; ", user)
              this.getBank()
            });
          console.log("data.item", item.id);
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }

  async editCashModal(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          console.log("poyu", item);
          const modal = await this.modalCtrl.create({
            component: EditCashLedgerPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: item
            }

          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 989 ", user)
              this.getBank()
            });
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }

  async paymentIn() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: PaymentINPage,
            cssClass: 'my-custom-class',
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 989 ", user)
              this.getBank()
            });
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  async paymentOut() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: PaymentoutPage,
            cssClass: 'my-custom-class',
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 98009 ", user)
              this.getBank()
            });
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }
  async addCashLedger(ev: any) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
          const popover = await this.popoverController.create({
            component: AddCashLedgerPage,
            event: ev,
            translucent: false,

          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 009 ", user)
              this.getBank()
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }

  async viewBankTransaction(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.view);
        if (hh.actions.view) {
          const modal = await this.modalCtrl.create({
            component: ViewBankTransactionPage,
            cssClass: 'my-custom-class',
            componentProps: {
              item: item
            }
          });

          console.log("selected item", this.item)
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  async viewCashTransaction(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.view);
        if (hh.actions.view) {
          const modal = await this.modalCtrl.create({
            component: ViewCashTransactionPage,
            cssClass: 'my-custom-class',
            componentProps: {
              item: item
            }

          });

          console.log("selected item", this.item)
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  doRefresh($event) {
    //this.listCompany()
    this.getBank()
    $event.target.complete();
  }
  async deleteBank(item: any) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete) {
          const alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE BANK?'),
            cssClass: 'alertHeader',
            buttons: [
              {
                text: this.translate.instant('HEADER.YES'),
                role: "done",
                cssClass: 'alertButton',
                handler: () => {
                  // console.log("I loved it clicke");
                  let header = this.api.getHeader();
                  // let data = { id: item }
                  console.log("this.item", item);
                  this.api.deleteBank(item, header).subscribe(async (response: any) => {
                    console.log(response, 'delete party');
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position: 'middle'
                    });
                    toast.present();
                    this.getBank()
                  })
                },
              },
              {
                text: this.translate.instant('HEADER.CANCEL'),
                role: "cancel",
                cssClass: 'alertButton'
              },
            ],
          });
          alert.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  async deleteCash(item: any) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete == true) {
          console.log("mmrd", hh.actions.delete);
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE CASH'),
            buttons: [
              {
                text: 'yes',
                handler: () => {
                  let header = this.api.getHeader();
                  let data = { id: item }
                  console.log("this.item", item);
                  this.api.deleteCash(data, header).subscribe(async (response: any) => {
                    console.log(response, 'delete party');
                    let a = response.msg
                    console.log(a, 'loggg');
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position: 'middle'
                    });
                    toast.present();
                    this.getBank()
                    if (response.status == 403) {
                      const toast = await this.toastController.create({
                        message: response.message,
                        duration: 2000,
                        position: 'middle'
                      });
                      toast.present();
                    }
                  })
                },
              },
              {
                text: this.translate.instant('HEADER.CANCEL'),
                role: "cancel",

              },
            ]
          });
          alert.present();

        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          // this.location.back()
          this.modalCtrl.dismiss();
        }
      }
    }
  }
  async createNewBank(ev: any) {
    // this.router.navigate(['/create-new-bank'])  
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popover = await this.popoverController.create({
            component: AddNewBankPage,
            event: ev,
            translucent: false,

          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 009 ", user)
              this.getBank()
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          // this.location.back()
          this.modalCtrl.dismiss()
        }
      }
    }
  }
  async cashWithdrow($event) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          // this.router.navigate(['/cash-withdrow'])
          const popover = await this.popoverController.create({
            component: CashWithdrowPage,
            cssClass: 'my-custom-class',
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 1009 ", user)
              console.log("emited from withdrow");

              this.getBank()
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }
  async cashDeposit($event) {
    // this.router.navigate(['/cash-deposit'])
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popover = await this.popoverController.create({
            component: CashDepositPage,
            cssClass: 'my-custom-class',
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 1009 ", user)
              this.getBank()
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  async bankTransfer($event) {
    // this.router.navigate(['/bank-transfer'])
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popover = await this.popoverController.create({
            component: BankTransferPage,
            cssClass: 'my-custom-class',
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 1009 ", user)
              this.getBank()
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }
  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      localStorage.setItem("manage_money", "false");
    });
    intro.onexit(function () {
      localStorage.setItem("manage_money", "false");
    })
    intro.setOptions({
      steps: [
        {
          element: '#cw',
          intro: 'Here you can record contra(internal) entries to cash withdraws and get details in both bank balance and cash balance sheets.',
        },
        {
          element: '#cd',
          intro: 'Here you can record contra(internal) entries to cash deposit and get details in both bank balance and cash balance sheets.',
        },
        {
          element: '#bb',
          intro: 'Here you can record contra(internal) entries bank to bank transfer and get details in bank balance sheets.',
        },
        {
          element: '#bank',
          intro: 'Here you can add your bank or bank details to record your bank transactions.',
        },
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
    })
    intro.start();
  }
}

