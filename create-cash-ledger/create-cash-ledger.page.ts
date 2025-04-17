import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-cash-ledger',
  templateUrl: './create-cash-ledger.page.html',
  styleUrls: ['./create-cash-ledger.page.scss'],
})
export class CreateCashLedgerPage implements OnInit {
  company: any
  cash: any = {}
  submit: boolean

  constructor(public api: ApiService, public modalCtrl: ModalController, public router: Router,
    public location: Location, public toastController: ToastController, private translate: TranslateService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.submit = false
    let today_date = Date.now();
    this.cash.as_on = today_date
    this.dateChange()
  }
  dateChange(){
    this.cash.as_on  = this.datepipe.transform(this.cash.as_on, 'yyyy-MM-dd')

 }
  async submitCashLedger() {
    if (this.cash.ledger_name && this.cash.opening_balance && this.cash.as_on) {
      this.submit = true
    } else {
      this.submit = false
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
    if (this.submit == true) {

      console.log('user final data', this.cash);
      this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
      let companyId = this.company[0].id;
      this.cash.company_name = companyId;
      let header = this.api.getHeader();

      this.api.createCashLedger(this.cash, header).subscribe(async (response: any) => {
        console.log(response);
        let a = response.status
        console.log(a);

        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.CASH LEDGER CREATED SUCCESSFULLY'),
            duration: 2000,
            color: "success"
          });
          toast.present();
          this.cash = response.data
          this.modalCtrl.dismiss(this.cash)
        }
        if (response.status == 500) {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 2000,
            color: "warning"
          });
          toast.present();
        }

      });
    }
  }

  back() {
    this.modalCtrl.dismiss()
  }
}
