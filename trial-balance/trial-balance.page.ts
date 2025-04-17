import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { BankTransferPage } from '../bank-transfer/bank-transfer.page';
import { CashDepositPage } from '../cash-deposit/cash-deposit.page';
import { CashWithdrowPage } from '../cash-withdrow/cash-withdrow.page';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.page.html',
  styleUrls: ['./trial-balance.page.scss'],
})
export class TrialBalancePage implements OnInit {
  user: any = {}
  company: any = []
  header: any
  trailData: any = []
  trailBalData: any = []
  particularTr: boolean
  particularTr1: boolean
  trBalDetails: boolean
  particularTrail: any = []
  public loading: boolean;
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController, private translate:TranslateService) { }

  ngOnInit() {
    this.company = JSON.parse(sessionStorage.getItem("selectedCompany"));
    this.header = this.api.getHeader();
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.user = response
      this.trBalDetails = false
      this.particularTr = false
      this.particularTr1 = false
    });
  }
  myBackButton() {
    this.modalCtrl.dismiss();
  }
  submit() {
    this.loading=true
    let companyId = this.api.getCompanyId()
    this.user.company = companyId
    this.api.trailBalance(this.user, this.header).subscribe((response: any) => {
      console.log("api called", response);
      this.trailData = response.data
      this.loading=false
    })
  }
  partucularTrail(item) {
    this.particularTr = false
    console.log(item);
    let companyId = this.api.getCompanyId()
    this.user.company = companyId
    console.log(item);
    this.user.type = item.type
    this.user.ledger_under = item.ledger_under
    this.api.particularTrailBalance(this.user, this.header).subscribe(async (response: any) => {
      console.log("api called 76876", response);
      this.particularTrail = response.data
      if (this.particularTrail == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 500,
          position: 'middle'
        });
        toast.present();

      } else {
        this.particularTr = true
      }
    })
  }
  trailBalanceData(item) {
    this.trBalDetails = false
    let companyId = this.api.getCompanyId()
    this.user.company = companyId
    console.log(item);
    this.user.type = item.type
    this.user.ledger_under = item.ledger_under
    this.api.trailBalanceData(this.user, this.header).subscribe(async (response: any) => {
      console.log("api called nnnn", response);
      this.trailBalData = response.data
      if (this.trailBalData == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 500,
          position: 'middle'
        });
        toast.present();

      } else {
        this.trBalDetails = true
      }

      this.modalCtrl.getTop();
    })
  }

  async selectTransaction(item) {
    console.log("dsfd", item.type);
    //  let a =item.type
    //  console.log("s",a);

    if (item.type == "Payment In") {
      this.paymentInTransaction(item)
    }
    if (item.type == "Payment Out") {
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
    if (item.type == "from_bank") {
        const modal = await this.modalCtrl.create({
        component: BankTransferPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      console.log("selected party", item)
      return await modal.present();
     }

     if(item.type == "withdrawal"){
      const modal = await this.modalCtrl.create({
        component: CashWithdrowPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      console.log("selected party", item)
      return await modal.present();
     }

     if(item.type == "deposit"){
      const modal = await this.modalCtrl.create({
        component: CashDepositPage,
        cssClass: 'my-custom-class',
        componentProps: {
          bankData: item
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      console.log("selected party", item)
      return await modal.present();
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
    const modal = await this.modalCtrl.create({
      component: EditPaymentInPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      },
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.9
    });
    console.log("selected item", item)
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
    console.log("selected item", item)
    return await modal.present();
  }
}
