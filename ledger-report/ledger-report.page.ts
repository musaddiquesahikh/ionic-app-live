import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';
import { ExpenseDetailsPage } from '../expense-details/expense-details.page';
import { PermissionGuard } from '../guards/permission.guard';
import { log } from 'console';


@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.page.html',
  styleUrls: ['./ledger-report.page.scss'],
})
export class LedgerReportPage implements OnInit {
  items: any = [];
  company: any = []
  ledger_list: any = []
  ledger_type: any
  data: any = {}
  displayDate: any = {}
  a: any = []
  model: boolean
  pagination: any;
  LedgerData: any = [];
  page_number: number = 1;

  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard, public location: Location, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.model = false
    this.getData()
  }
  getData() {
    let companyId = this.api.getCompanyId()
    console.log("party details", companyId);
    let header = this.api.getHeader();
    this.api.ledgerReport(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.ledger_list = response.data;
      console.log("item", this.ledger_list);

    });
    this.api.defaultDate().subscribe((response: any) => {
      console.log(response);
      this.displayDate = response

    });
  }
  isItemAvailable: Boolean = false;
  initializeItems() {
    this.items = this.ledger_list;

  }
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    console.log("test", val);
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.ledger_list.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  backButton() {
    this.modalCtrl.dismiss();
  }

  private async generateItems() {
    let s = ''
    this.data.company = this.api.getCompanyId()
    this.data.page_number = this.pagination.page_number + 1
    console.log(this.page_number, 'loksabha');
    this.page_number++
    console.log(this.data, "pppaaginatin 1");
    if (this.data.type == 'party') {
      if (this.pagination.next_page) {
        this.api.post3("get_party_ledger_pag/" + this.data.party + "/", { company_id: this.data.company_id, start_date: this.data.start_date, end_date: this.data.end_date, page_number: this.data.page_number }).subscribe(async (response: any) => {
          this.pagination = response.pagination_data
          console.log(response.status, 'mkk');
          // if (response.status == 200) {
          console.log('////mmmm');
          let t = this.LedgerData
          this.LedgerData = []
          let p = t.concat(response.data)
          this.LedgerData = [...new Set(p)]
          // }
        });
      } else if (this.pagination.next_page == false) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 3000,
          position: 'middle'

        });
        toast.present();
      }
    }
    else if (this.data.type == 'cash') {
      if (this.pagination.next_page) {
        this.api.post3("get_cash_ledger_pag/" + this.data.ledger + "/" + this.data.company_id + "/", { company: this.data.company_id, start_date: this.data.start_date, end_date: this.data.end_date, page_number: this.data.page_number }).subscribe(async (response: any) => {
          this.pagination = response.pagination_data
          console.log(response.status, 'mkk');
          // if (response.status == 200) {
          console.log('////mmmm');
          let t = this.LedgerData
          this.LedgerData = []
          let p = t.concat(response.data)
          this.LedgerData = [...new Set(p)]
          // }
        });
      } else if (this.pagination.next_page == false) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 3000,
          position: 'middle'

        });
        toast.present();
      }
    }
    else if (this.data.type == 'bank') {
      if (this.pagination.next_page) {
        this.api.post3("get_bank_ledger_pag/" + this.data.bank_id + "/", { company_name: this.data.company_name, start_date: this.data.start_date, end_date: this.data.end_date, page_number: this.data.page_number }).subscribe(async (response: any) => {
          this.pagination = response.pagination_data
          console.log(response.status, 'mkk');
          // if (response.status == 200) {
          console.log('////mmmm');
          let t = this.LedgerData
          this.LedgerData = []
          let p = t.concat(response.data)
          this.LedgerData = [...new Set(p)]
          // }
        });
      } else if (this.pagination.next_page == false) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 3000,
          position: 'middle'

        });
        toast.present();
      }
    }
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  async selectedLedger(item: any) {

    console.log("pppp", item);
    this.data.company_id = this.api.getCompanyId()
    this.data.id = item.id
    this.data.start_date = this.displayDate.start_date
    this.data.end_date = this.displayDate.end_date
    this.data.type = item.type
    console.log("data", this.data);
    if (this.data.type == 'ledger') {
      this.model = false
      let header = this.api.getHeader();
      this.api.getLedgerData(this.data, header).subscribe(async (response: any) => {
        console.log("api called serfew", response);
        this.LedgerData = response.data
        if (this.LedgerData.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();


        } else {
          this.model = true
        }
      })
    }

    else if (this.data.type == 'party') {
      this.model = false
      let header = this.api.getHeader();
      this.data.party = item.id
      this.api.post3("get_party_ledger_pag/" + this.data.party + "/", { company_id: this.data.company_id, start_date: this.data.start_date, end_date: this.data.end_date }).subscribe(async (response: any) => {
        this.pagination = response.pagination_data
        // this.api.partyTransaction(this.data, header).subscribe(async (response: any) => {
        //   console.log("api called serfew", response);
        // this.LedgerData = response.data
        this.LedgerData = response.data
        if (this.LedgerData.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();


        } else {
          this.model = true
        }
      })
    }
    else if (this.data.type == 'bank') {
      this.model = false
      let header = this.api.getHeader();
      this.data.bank_id = item.id
      this.data.company_name = this.api.getCompanyId()
      this.api.post3("get_bank_ledger_pag/" + this.data.bank_id + "/", { company_name: this.data.company_name, start_date: this.data.start_date, end_date: this.data.end_date }).subscribe(async (response: any) => {
        // this.api.viewBankLedger(this.data, header).subscribe(async (response: any) => {
        //   console.log("api called serfew", response);
        this.pagination = response.pagination_data
        this.LedgerData = response.data
        if (this.LedgerData.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();


        } else {
          this.model = true
        }
      })
    }
    if (this.data.type == 'cash') {
      this.model = false
      let header = this.api.getHeader();
      this.data.ledger = item.id
      console.log(this.data.ledger, this.data.company_id, 'ideesss');

      this.data.company_id = this.api.getCompanyId()
      this.api.post3("get_cash_ledger_pag/" + this.data.ledger + "/" + this.data.company_id + "/", { company: this.data.company_id, start_date: this.data.start_date, end_date: this.data.end_date }).subscribe(async (response: any) => {
        // this.api.viewCashLedger(this.data, header).subscribe(async (response: any) => {
        // console.log("api called serfew", response);
        this.pagination = response.pagination_data
        this.LedgerData = response.data
        if (this.LedgerData.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();


        } else {
          this.model = true
        }
      })
    }

    if (this.data.type == 'expense') {
      let category_id = item.id
      console.log("ljkh", category_id);
      const modal = await this.modalCtrl.create({
        component: ExpenseDetailsPage,
        cssClass: 'my-custom-class',
        componentProps: {
          data: item
        }
      });
      console.log("selected item", item)
      return await modal.present();
    }

  }
  async getLedger(item) {
    console.log("ffff", item);
    if (item.type == "payment_in") {
      this.paymentInTransaction(item)
    }

    if (item.type == "payment_out") {
      this.paymentOutTransaction(item)
    }
    if (item.type == "expense") {
      this.expenseTransaction(item)
    }
    if (item.type == "voucher") {
      this.voucherTransaction(item)
    }

    if (item.type == "sales") {
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
      console.log("selected party", item)
      return await modal.present();
    }

    if (item.type == "purchase") {
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
      console.log("selected party", item)
      return await modal.present();
    }
  }
  async paymentInTransaction(item) {
    console.log(item);
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditPaymentInPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: item,
            },
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.9
          });
          console.log("selected item", item)
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

  async paymentOutTransaction(item) {
    console.log("inside pay out");
    ('inside out')
    // console.log("out page", item);
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditPaymentOutPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: item
            },
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.9
          });
          console.log("selected item", item)
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
  async expenseTransaction(item) {
    console.log(item);
    let a = item.id
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditExpensePage,
            cssClass: 'my-custom-class',
            componentProps: {
              particularData: a,
            },
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.9
          });
          console.log("selected item", item)
          return await modal.present();
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

  async voucherTransaction(item) {
    console.log(item);
    let a = item.invoice_no
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditJournalVoucherPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: a
            },
            breakpoints: [0, 0.3, 0.5, 0.8],
            initialBreakpoint: 0.9
          });
          console.log("selected item", a)
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

}
