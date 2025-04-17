import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { PermissionGuard } from '../guards/permission.guard';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
// import { log } from 'console';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.page.html',
  styleUrls: ['./sales-register.page.scss'],
})
export class SalesRegisterPage implements OnInit {
  sales: any[];
  company: any = []
  item: any = {}
  companyId: any;
  salesData: any = [];
  selected_invoice: any = []
  length: any
  isItemAvailable: boolean = false;
  numbers: any;
  items: any;
  intro: introJs.IntroJs;
  steps: introJs.Step[] = []
  pagination: any;
  page_number: number = 0
  pagination1: any;
  s: any = [];
  e: any = {};
  Searchdata: any = [];
  PartyDataS: any = [];
  data: any;
  public loading: boolean;
  showAlertCheckbox: boolean = true;
  summary: any;
  event: any;

  constructor(private router: Router, public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, public permission: PermissionGuard, public alertCtrl: AlertController) {

    const storedPreference = localStorage.getItem('showAlertPreference');
    if (storedPreference === 'false') {
      this.showAlertCheckbox = false;
    }
  }

  ngOnInit() {
    let t = JSON.parse(localStorage.getItem('sales-register'))
    if (t) {
      setTimeout(() => {
        this.introMethod();
      }, 1000);
    }
    this.intro = introJs();
    this.intro.setOptions({
      steps: this.steps,
    });
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item = response
    });
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.page_number++
    console.log(this.salesData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.salesRegister(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.PartyDataS
          this.PartyDataS = []
          let p = t.concat(response.data)
          this.PartyDataS = [...new Set(p)]
        }
      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 3000,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.salesData, "pppaaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  myBackButton() {
    this.modalCtrl.dismiss();
  }

  submit() {
    this.loading = true
    this.salesData = []
    this.companyId = this.api.getCompanyId()
    this.item.company = this.companyId
    console.log("companyId", this.companyId);
    console.log(this.item, this.e, 'submit kk');
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    let header = this.api.getHeader();

    this.api.salesRegister(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      if (response.status == 200) {
        this.PartyDataS = response.data
        this.salesData = response.data
        this.summary=response.summary
      console.log(this.summary,'summary');
      
        this.loading = false
        this.pagination = response.pagination_data
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.salesData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      }
    });
  }

  async selected(selected_invoice) {
    console.log("asd");
    console.log(selected_invoice);
    const modal = await this.modalCtrl.create({
      component: EditBillPage,
      cssClass: 'my-custom-class',
      componentProps: {
        billData: selected_invoice,
        open: true
      },
      breakpoints: [0, 0.3, 0.5, 1],
      // initialBreakpoint: 1
    });
    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data;
        console.log("from address 123 ", user)
        this.submit()
      });
    return await modal.present();
  }
  excel() {
    let companyId = this.api.getCompanyId()
    this.item.company = companyId
    console.log("companyId", companyId);
    this.e.companyId = companyId
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let header = this.api.getHeader();
    this.api.exportSalesRegister(this.e, header).subscribe((response: any) => {
      console.log("dsafdsdsafas", response);
      if (response.status != 500) {
        window.location.href = response.url
      }
    });
  }
  async deleteInvoice(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'sales_voucher') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete == true) {
          console.log(item);
          const toast = await this.toastController.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE INVOICE?'),
            position: "bottom",
            buttons: [
              {
                text: this.translate.instant('HEADER.YES'),
                role: "done",
                handler: () => {
                  let header = this.api.getHeader();
                  let company = this.api.getCompanyId()
                  let data = { id: item, company: company }
                  console.log("this.item", item);
                  this.api.deleteInvoice(data, header).subscribe(async (response: any) => {
                    console.log(response, 'delete party');
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position: "middle"
                    });
                    toast.present();
                    this.submit()
                  },
                    async (error) => {
                      console.log("pppp", error);

                      const toast = await this.toastController.create({
                        message: error,
                        duration: 2000,
                        position: "middle"
                      });
                      toast.present();
                      this.submit()
                    })
                },
              },
              {
                text: this.translate.instant('HEADER.CANCEL'),
                role: "cancel",
              },
            ],
          });
          toast.present();
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
search(ev:any){
  this.event=ev.target.value;
  console.log(this.event,'searchh');
  this.PartyDataS
}
  getSales(ev) {
    let s = ev.target.value;
    this.e.company = this.item.company
    this.e.end_date = this.item.end_date
    this.e.start_date = this.item.start_date
    let header = this.api.getHeader();
    this.api.salesRegister(this.event, this.e,header).subscribe(async (response: any) => {
      this.PartyDataS = response.data
      if (s && s.trim() === '') {
        this.salesData = []
        console.log(this.salesData = [], s,'sercfg');
      } else {
        this.PartyDataS = response.data
        this.PartyDataS[0]
        console.log(response.data[0], 'sercresp');
      }
    });
  }

  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On Complete");
      document.getElementById('submit').click()
      localStorage.setItem('sales-register', 'false')

    });
    intro.onexit(function () {
      localStorage.setItem('sales-register', 'false')
    })
    intro.setOptions({
      steps: [
        {
          element: '#from',
          intro: 'select start date.',
        },
        {
          element: '#to',
          intro: 'select end date.',
        },
        {
          element: '#submit',
          intro: 'Click submit, you will see the list of sales invoice',
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
      doneLabel: '<ion-button size="small">Submit</ion-button>',
    }).start();
  }

  async showAlert() {
    if (!this.showAlertCheckbox) {
      return;
    }

    if (this.loading) {
      localStorage.setItem('showAlertPreference','true');
      const alert = await this.alertCtrl.create({
        header: 'For delete invoice ',
        message: `
      <img  src="../../assets/icon/Delete_invoice.jpeg" >
      `,
        cssClass: 'custom-alert',
        buttons: [
         
          {
            text: 'OK',
            role: 'done',
            handler: () => {
              localStorage.setItem('showAlertPreference','false');
              this.showAlertCheckbox = false;
              
            }
          }
        ]

      });

      await alert.present();
    }
  }
  async handleCheckboxChange() {
    localStorage.setItem('showAlertPreference', this.showAlertCheckbox.toString());
  }
}
