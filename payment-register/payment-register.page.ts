import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';

@Component({
  selector: 'app-payment-register',
  templateUrl: './payment-register.page.html',
  styleUrls: ['./payment-register.page.scss'],
})
export class PaymentRegisterPage implements OnInit {
  item: any = {}
  expenseData: any = [];
  length: any;
  pagination: any;
  page_number: number = 1
  companyId: any;
  data1: any;
  pagination1: any;
  e: any = {};
  salesData: any=[];
  PartyDataS: any=[];
  data: any;

  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.item = response
    });
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    // this.item.party_id = this.expenseData[0].party_id
    // this.item.party_name = this.expenseData[0].party_name
    this.page_number++
    console.log(this.expenseData, "pppaaginatin 1", this.expenseData.party_id);
    if (this.pagination.next_page) {
      this.api.PaymentRegister(s, this.item).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.expenseData
          this.expenseData = []
          let p = t.concat(response.data)
          this.expenseData = [...new Set(p)]
          this.data1 = this.expenseData
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 600,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.expenseData, this.data1, "pppaaginatin 2");
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  submit() {
    this.item.company = this.api.getCompanyId()
    console.log("companyId");
    let s = ''
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    this.api.PaymentRegister(s, this.e).subscribe(async (response: any) => {
      console.log(response, 'ii');

      if (response.status == 200) {
        this.expenseData = response.data
        this.pagination = response.pagination_data
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.expenseData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        this.expenseData
        this.expenseData = response.data
        console.log(this.length == 0);
        this.length = response.data.length
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 800,
            color: "warning"
          });
          toast.present();
        }
      }
    });
  }
  getSales(ev) {

    let s = ev.target.value;
    this.e.company = this.item.company
    this.e.end_date = this.item.end_date
    this.e.start_date = this.item.start_date
    this.api.PaymentRegister(s, this.e).subscribe(async (response: any) => {
      if (s && s.trim() == '') {
        this.expenseData = []
        console.log(this.salesData = [], 'sercfg');
      } else {
        console.log(s);
        this.expenseData = this.salesData
        this.PartyDataS = response
        this.salesData = this.PartyDataS.data
        this.data = this.PartyDataS.data.party_name
        console.log(this.PartyDataS, 'sercresp');
      }
    });
  }

  async selected(item) {
    let a = item.payment_in_or_out
    if (a == 'Payment In') {
      console.log(item);
      const modal = await this.modalCtrl.create({
        component: EditPaymentInPage,
        cssClass: 'my-custom-class',
        componentProps: {
          data: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 1009 ", user)
          // this.viewTransaction()
        });
      console.log("selected item", this.item)
      return await modal.present();
    }
    if (a == 'Payment Out') {
      console.log("inside pay out");
      ('inside out')
      // console.log("out page", item);
      const modal = await this.modalCtrl.create({
        component: EditPaymentOutPage,
        cssClass: 'my-custom-class',
        componentProps: {
          data: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 1009 ", user)
          // this.viewTransaction()
        });
      console.log("selected item", this.item)
      return await modal.present();
    }
  }
  
  deleteInvoice(payID: any) {
    console.log(payID,this.permission.Role.permissions, 'permissiondata');
    for (let cc of this.permission.roles.data.permissions) {
      if (cc.page_name === 'manage_money') {
        if (cc.actions.delete) {
          let confirmmsg = this.translate.instant("MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE PAYMENT?")
          if (confirm(confirmmsg)) {
            this.api.post3('delete_pay_in_out/', { id: payID }).subscribe(async (response: any) => {
              if (response.status === 200) {
                const toast = await this.toastController.create({
                  message: response.msg,
                  duration: 4000,
                  position: "middle"
                });
                toast.present();
                this.submit()
              }
              else {
                const toast = await this.toastController.create({
                  message: response.msg,
                  duration: 4000,
                  position: "middle"
                });
                toast.present();
              }
            }, async (error) => {
              const toast = await this.toastController.create({
                message: error,
                duration: 4000,
                position: "middle"
              });
              toast.present();
            })
          }
        }
      }
    }
  }
}
