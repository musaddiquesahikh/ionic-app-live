import { DatePipe } from '@angular/common';
import { Component, EventEmitter,Directive, HostListener, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-new-bank',
  templateUrl: './add-new-bank.page.html',
  styleUrls: ['./add-new-bank.page.scss'],
})
export class AddNewBankPage implements OnInit {

  payment: any = {
    opening_balance: 0
  };
  createItem: any = {};
  bankData: any = []
  submit: boolean

  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  BankForm: FormGroup;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router,
    public toastController: ToastController, private translate: TranslateService,public datepipe: DatePipe
    , private formBuilder:FormBuilder,private popoverController: PopoverController) 
    { 
      this.BankForm = this.formBuilder.group({
        'bank_name': ['', Validators.required],
        'bank_branch': ['', Validators.required],
        'account_no': ['', Validators.required],
        'ifsc_code': [null, Validators.compose([Validators.required, Validators.pattern( /^[A-Z]{4}0\d{6}$/)])],
        'user': ['', Validators.required],
        'address': ['', Validators.required],
        'opening_balance': ['', Validators.required],
        'as_on': ['', Validators.required],
        'company_name':this.api.getCompanyId()
      })
     
    }
  
  ngOnInit() {
    // this.submit = false
    let today_date = Date.now();
    this.BankForm.value.as_on = today_date
    this.dateChange()
  }
  get c(){return this.BankForm.controls}

  dateChange(){
    let today_date = Date.now();

    this.BankForm.get('as_on').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    console.log(this.BankForm.value.as_on,'date');

  }
  
  async addBankAccount() {

    if (this.BankForm.value.bank_name && this.BankForm.value.bank_branch && this.BankForm.value.account_no && this.BankForm.value.ifsc_code && this.BankForm.value.user &&
      this.BankForm.value.address && this.BankForm.value.as_on) {
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
      this.BankForm.value.company_name = companyId;
      let header = this.api.getHeader();

      this.api.createNewBank(this.BankForm.value, header).subscribe(async (response: any) => {
        console.log(response,'responseeee');

        if (response.status == 200) {
          this.bankData = response.data
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.BANK CREATED SUCCESSFULLY'),
            duration: 2000,
            position:'middle'
            // color: "success"
          });
          toast.present();
          this.popoverController.dismiss(response.data)
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
        if (response.status == 403) {
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
  // ifscValidator() {
  //   return (control) => {
  //     const ifscPattern = /^[A-Z]{4}0\d{6}$/;
  //     const valid = ifscPattern.test(control.value);
  //     return valid ? null : { invalidIFSC: true };
  //   };
  // }
}
