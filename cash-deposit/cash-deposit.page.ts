import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cash-deposit',
  templateUrl: './cash-deposit.page.html',
  styleUrls: ['./cash-deposit.page.scss'],
})
export class CashDepositPage implements OnInit {
  cashDeposit: FormGroup;
  bankList: any = []
  cashLedger: any = []
  data: any = {}
  bankData
  info: any = []

  constructor(fb: FormBuilder, public api: ApiService, public toastController: ToastController, 
    public location: Location,private popoverController: PopoverController) {
    this.cashDeposit = fb.group({
      'bank': [null, Validators.required],
      'ledger': [null, Validators.required],
      'amount': [null, Validators.required],
      'date': [null, Validators.required],
      'company': [this.api.getCompanyId()]
    });
  }

  ngOnInit() {
    this.getData()
    console.log("data areceived", this.bankData);
    if (this.bankData) {
      this.getParticularContra()
    }
     const currentDate = new Date().toISOString().substring(0, 10);
     this.cashDeposit.controls['date'].setValue(currentDate);
  }
  getParticularContra() {
    let header = this.api.getHeader();
    let id = this.bankData.id
    this.api.getparticularContraEntry(id, header).subscribe((response: any) => {
      console.log("getparticularContraEntry", response);
      this.cashDeposit.patchValue(response.data);
      console.log(" this.cashDeposit", this.cashDeposit);
      
    })
  }

  getData() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called bank", response);
      if(response.status != 500){
          this.bankList = response
      }else{
        this.bankList = []
      }
    
    })
    this.data.company_id = companyId
    this.api.selectedCashLedger(this.data, header).subscribe((response: any) => {
      if(response.status != 500){
      this.cashLedger = response
      }else{
      this.cashLedger = []

      }
      console.log("98", this.cashLedger);
    })
  }

  submitForm() {
    let header = this.api.getHeader();
    if (this.bankData) {
      this.cashDeposit.value.id = this.bankData.id
      this.api.editCashDeposit(this.cashDeposit.value, header).subscribe(async (response: any) => {
        console.log("after edit editCashDeposit", response);
        if (response.status == 'success') {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 500,
            position: 'middle'
          });
          toast.present();
          modalController.dismiss(response.status)
        }
      })
    } else {
      this.markFormTouched(this.cashDeposit);
      if (this.cashDeposit.valid) {
        // You will get form value if your form is valid
        var formValues = this.cashDeposit.getRawValue;
      }
      if (this.cashDeposit.valid) {
        console.log("data", this.cashDeposit.value);
        // this.cashDeposit.value.company_id = this.api.getCompanyId()
        let header = this.api.getHeader();
        this.api.CashDeposit(this.cashDeposit.value, header).subscribe(async (response: any) => {
          console.log(response);
          if (response.status == 'success') {
            const toast = await this.toastController.create({
              message: response.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          }
          this.info = response.status
          this.popoverController.dismiss(response.status);
          // modalController.dismiss(response.status)
        })

      }
    }
  }
  
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
  back() {
    this.popoverController.dismiss()
  }
}
