import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';
import { EditPartyPage } from '../edit-party/edit-party.page'
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';
import { PermissionGuard } from '../guards/permission.guard';
import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';

@Component({
  selector: 'app-party-details',
  templateUrl: './party-details.page.html',
  styleUrls: ['./party-details.page.scss'],
})
export class PartyDetailsPage implements OnInit {
  partyList: any = {}
  item;
  data1: any = {}
  start_date: Date
  end_date: Date
  company: any = []
  transData: any = []
  trans: any = {
    "start_date": '',
    "end_date": '',
    "company_id": '',
    "party": ''
  }
  private selectSegment: string = 'details';
  // @Input() a;
  constructor(public modalCtrl: ModalController, public router: Router, public api: ApiService,
    public translate: TranslateService, public permission: PermissionGuard, public alertCtrl: AlertController) { }

  ngOnInit() {

    console.log("received data", this.item);
    this.data1 = this.item
    console.log("hgfh", this.data1);
    this.api.defaultDate().subscribe((response: any) => {
      console.log("api called", response);
      this.start_date = response.start_date
      console.log("start_date", this.start_date);

      this.end_date = response.end_date
      this.transaction()
    })

    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    console.log("current company", this.partyList);


    // this.item = this.partyDetails;
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectSegment = event.target.value;
  }
  modelDismiss() {
    console.log("clicked", this.data1);
    this.modalCtrl.dismiss(this.data1);
  }

  async presentModal(data) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: CreateNewPartyPage,
            cssClass: 'my-custom-class',
            componentProps: {
              partyList: data
            }
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              if(Object.keys(user).length === 0) {
              }else{
                this.data1=user
                this.item=user
              }
              // this.getparty();
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
          // this.location.back()
        }
      }
    }
  }
  transaction() {

    let companyId = this.api.getCompanyId()
    console.log("company_id", companyId);

    this.trans.start_date = this.start_date
    this.trans.end_date = this.end_date
    this.trans.company_id = companyId
    this.trans.party = this.data1.id;
    let header = this.api.getHeader();
    console.log("trans", this.trans);

    this.api.partyTransaction(this.trans, header).subscribe((response: any) => {
      console.log("api called", response);
      this.transData = response.data
    })

  }
  async transactionDetails(item: any) {
    console.log(item);
    let a = item.type
    console.log(a);
    if (a == "expense") {
      let b = item.id
      const modal = await this.modalCtrl.create({
        component: EditExpensePage,
        cssClass: 'my-custom-class',
        componentProps: {
          particularData: b
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address ", user)
          this.ngOnInit()
        });
      console.log("selected item", b)
      return await modal.present();
    }
    if (a == 'sales' || a == 'purchase') {

      item.invoice_id = item.id
      const modal = await this.modalCtrl.create({
        component: EditBillPage,
        cssClass: 'my-custom-class',
        componentProps: {
          billData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data) => {
          const user = data.data; // Here's your selected user!
          console.log("from address ", user)
          this.ngOnInit()
        });
      // console.log("selected item", this.item)
      return await modal.present();

    }
    if (a == "voucher") {
      let b = item.invoice_no

      const modal = await this.modalCtrl.create({
        component: EditJournalVoucherPage,
        cssClass: 'my-custom-class',
        componentProps: {
          data: b
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 123 ", user)
          this.ngOnInit()
        });
      return await modal.present();

    }
    if (a == "payment_in") {
      this.paymentInTransaction(item)
    }
    if (a == "payment_out") {
      this.paymentOutTransaction(item)
    }
  }
  async paymentInTransaction(item) {
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
        this.data1=user;
        this.ngOnInit()
      });
    console.log("selected item", this.item)
    return await modal.present();
  }

  async paymentOutTransaction(item) {
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
        this.ngOnInit()
      });
    console.log("selected item", this.item)
    return await modal.present();
  }

}
