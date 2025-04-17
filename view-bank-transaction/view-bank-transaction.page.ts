import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';
import * as XLSX from 'xlsx';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { BankTransferPage } from '../bank-transfer/bank-transfer.page';
import { CashWithdrowPage } from '../cash-withdrow/cash-withdrow.page';
import { CashDepositPage } from '../cash-deposit/cash-deposit.page';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-view-bank-transaction',
  templateUrl: './view-bank-transaction.page.html',
  styleUrls: ['./view-bank-transaction.page.scss'],
})
export class ViewBankTransactionPage implements OnInit {
  company: any = []
  data1: any = {}
  bankData1: any = []
  fileName = 'bTransaction.xlsx';
  length: any
  item

  constructor(public api: ApiService, public router: Router, public modalCtrl: ModalController,
    private route: ActivatedRoute, public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {
    console.log("received bank id", this.item)
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.data1 = response
    });
  }
  viewTransaction() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.company.company_name = this.company[0].id
    console.log("p", this.company.company_name);
    this.data1.company_name = this.company.company_name
    this.data1.bank_id = this.item

    console.log(this.data1);

    let header = this.api.getHeader();
    this.api.viewBankLedger(this.data1, header).subscribe(async (response: any) => {
      console.log("api called", response);
      this.bankData1 = response.data
      console.log("lll", this.bankData1);
      if (this.bankData1) {
        this.length = this.bankData1.length
      }

      let a = response.data
      if (this.bankData1 == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();

      }
    });

  }
  Mdissmiss() {
    this.modalCtrl.dismiss()
    this.router.navigate(['/manage-money'])
  }

  async selectTransaction(item) {
    console.log("dsfd", item.type);
    //  let a =item.type
    //  console.log("s",a);

    if (item.type == "payment_in") {
      this.paymentInTransaction(item)
    }
    if (item.type == "payment_out") {
      this.paymentOutTransaction(item)
    }
    if (item.type == "expense") {
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
      console.log("selected item", b)
      return await modal.present();
    }

    if (item.type == "voucher") {
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
      console.log("selected item", b)
      return await modal.present();
    }

    if (item.type == "sales") {
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
    if (item.type == "to_bank") {
      const modal = await this.modalCtrl.create({
        component: BankTransferPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 1009 ", user)
          this.viewTransaction()
        });

      console.log("selected party", item)
      return await modal.present();
    }

    if (item.type == "withdrawal") {
      const modal = await this.modalCtrl.create({
        component: CashWithdrowPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 1009 ", user)
          this.viewTransaction()
        });
      console.log("selected party", item)
      return await modal.present();
    }

    if (item.type == "deposit") {
      const modal = await this.modalCtrl.create({
        component: CashDepositPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item,
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 1009 ", user)
          this.viewTransaction()
        });
      console.log("selected party", item)
      return await modal.present();
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
        this.viewTransaction()
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
        this.viewTransaction()
      });
    console.log("selected item", this.item)
    return await modal.present();
  }

  export() {
    let header = this.api.getHeader();
    this.api.viewBankLedger(this.data1, header).subscribe((response: any) => {
      console.log("api called", response);
      this.bankData1 = response.data
    });
  }
  exportexcel(): void {

    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
  async deleteTransaction(item) {
    console.log(item);
    let a = item.type
    if (a == 'expense') {
      const toast = await this.toastController.create({
        header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE EXPENSE?'),
        position: "bottom",
        buttons: [
          {
            text: this.translate.instant('HEADER.YES'),
            role: "done",
            handler: () => {
              // console.log("I loved it clicke");
              let header = this.api.getHeader();
              let company = this.api.getCompanyId()
              let data = { id: item.id, company: company }
              console.log("this.item", data);
              this.api.deleteExpense(data, header).subscribe(async (response: any) => {
                console.log(response, 'delete party');
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.viewTransaction()
              },

                async (error) => {
                  console.log("pppp", error);

                  const toast = await this.toastController.create({
                    message: error,
                    duration: 2000,
                    position: 'middle'
                  });
                  toast.present();
                  this.viewTransaction()
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
    if (a == 'payment_in' || a == 'payment_out') {
      const toast = await this.toastController.create({
        header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE PAYMENT IN?'),
        position: "bottom",
        buttons: [
          {
            text: this.translate.instant('HEADER.YES'),
            role: "done",
            handler: () => {
              // console.log("I loved it clicke");
              let header = this.api.getHeader();
              let company = this.api.getCompanyId()
              let data = { id: item.id, company: company }
              console.log("this.item", data);
              this.api.deletePaymentIn(data, header).subscribe(async (response: any) => {
                console.log(response, 'delete party');
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.viewTransaction()
              },

                async (error) => {
                  console.log("pppp", error);

                  const toast = await this.toastController.create({
                    message: error,
                    duration: 2000,
                    position: 'middle'
                  });
                  toast.present();
                  this.viewTransaction()
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
    if (a == 'deposit' || a == 'withdrawal') {
      const toast = await this.toastController.create({
        header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE DEPOSIT/WITHDROW ENTRY?'),
        position: "bottom",
        buttons: [
          {
            text: this.translate.instant('HEADER.YES'),
            role: "done",
            handler: () => {
              let header = this.api.getHeader();
              this.api.deleteContra(item.id, header).subscribe(async (response: any) => {
                console.log(response, 'delete Contra');
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.viewTransaction()
              },

                async (error) => {
                  console.log("pppp", error);

                  const toast = await this.toastController.create({
                    message: error,
                    duration: 2000,
                    position: 'middle'
                  });
                  toast.present();
                  this.viewTransaction()
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
    if (a == 'to_bank') {
      const toast = await this.toastController.create({
        header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE BANK TO BANK ENTRY ?'),
        position: "bottom",
        buttons: [
          {
            text: this.translate.instant('HEADER.YES'),
            role: "done",
            handler: () => {
              let header = this.api.getHeader();
              this.api.deleteContra(item.id, header).subscribe(async (response: any) => {
                console.log(response, 'delete Contra');
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 2000,
                  position: 'middle'
                });
                toast.present();
                this.viewTransaction()
              },

                async (error) => {
                  console.log("pppp", error);

                  const toast = await this.toastController.create({
                    message: error,
                    duration: 2000,
                    position: 'middle'
                  });
                  toast.present();
                  this.viewTransaction()
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
      this.viewTransaction()
    }
  }
}

