import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-cash-ledger',
  templateUrl: './add-cash-ledger.page.html',
  styleUrls: ['./add-cash-ledger.page.scss'],
})
export class AddCashLedgerPage implements OnInit {

  company: any
  cash: any = {}
  submit: boolean
  CashForm:FormGroup;

  constructor(public api: ApiService, public modalCtrl: ModalController, public router: Router,
    public toastController: ToastController, private translate: TranslateService, 
    public datepipe: DatePipe,private popoverController: PopoverController, private formBuilder:FormBuilder)
     { 
      this.CashForm = this.formBuilder.group({
        'ledger_name': ['', Validators.required],
       'opening_balance': [0, Validators.required], 
        'as_on': ['', Validators.required],

     }) 
    }

  ngOnInit() {
    // this.submit = false
    // let today_date = Date.now();
   
    
    // this.cash.as_on = today_date
    this.dateChange()
  }

  get c(){return this.CashForm.controls}

  dateChange(){
    let today_date = Date.now();

    this.CashForm.get('as_on').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    console.log(this.CashForm.value.as_on,'date');

 }
  async submitCashLedger() {

    if (this.CashForm.value.ledger_name && this.CashForm.value.opening_balance && this.CashForm.value.as_on) {
      this.submit = true
    } else {
      this.submit = false
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        // color: "warning"
        position: 'middle'
      });
      toast.present();
    }
    if (this.submit == true) {

      console.log('user final data', this.cash);
      this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
      let companyId = this.company[0].id;
      this.CashForm.value.company_name = companyId;
      let header = this.api.getHeader();

      this.api.createCashLedger(this.CashForm.value, header).subscribe(async (response: any) => {
        console.log(response);
        let a = response.status
        console.log(a);

        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.CASH LEDGER CREATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
      
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
