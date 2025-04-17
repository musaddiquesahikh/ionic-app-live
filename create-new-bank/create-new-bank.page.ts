import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs';

@Component({
  selector: 'app-create-new-bank',
  templateUrl: './create-new-bank.page.html',
  styleUrls: ['./create-new-bank.page.scss'],
})
export class CreateNewBankPage implements OnInit {
  payment: any = {
    opening_balance: 0
  };
  createItem: any = {};
  bankData: any = []
  submit: boolean

  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  BankForm: FormGroup;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public location: Location,
    public toastController: ToastController, private translate: TranslateService,public datepipe: DatePipe
    , private formBuilder:FormBuilder,private popoverController: PopoverController) {
      this.BankForm = this.formBuilder.group({
        'bank_name': ['', Validators.required],
        'bank_branch': ['', Validators.required],
        'account_no': ['', Validators.required],
        'ifsc_code': ['', Validators.required],
        'user': ['', Validators.required],
        'address': ['', Validators.required],
        'opening_balance': ['', Validators.required],
        'as_on': ['', Validators.required]
      })
     }

  ngOnInit() {
    this.submit = false
    let today_date = Date.now();
    this.payment.as_on = today_date
    this.dateChange()
  }
  dateChange(){
     this.payment.as_on  = this.datepipe.transform(this.payment.as_on, 'yyyy-MM-dd')

  }
  
  async addBankAccount() {

    if (this.payment.bank_name && this.payment.bank_branch && this.payment.account_no && this.payment.ifsc_code && this.payment.user &&
      this.payment.address && this.payment.as_on) {
      this.submit = true
    } else {
      this.submit = false
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        position:'middle'
        // color: "warning"
      });
      toast.present();
    }
    if (this.submit == true) {
      this.createItem = JSON.parse(sessionStorage.getItem("currentCompany"));
      let companyId = this.createItem[0].id;
      this.payment.company_name = companyId;
      let header = this.api.getHeader();

      this.api.createNewBank(this.payment, header).subscribe(async (response: any) => {
        console.log(response);

        if (response.status == 200) {
          this.bankData = response.data
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.BANK CREATED SUCCESSFULLY'),
            duration: 2000,
            position:'middle'
            // color: "success"
          });
          toast.present();
          this.modalCtrl.dismiss(response.data)
        }
        if (response.status == 500) {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 2000,
            position:'middle'
            // color: "warning"
          });
          toast.present();
        }
      });
    }
  }

  back() {
    this.popoverController.dismiss()
  }
}
