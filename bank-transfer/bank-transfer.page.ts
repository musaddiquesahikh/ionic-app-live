import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { modalController } from '@ionic/core';

@Component({
  selector: 'app-bank-transfer',
  templateUrl: './bank-transfer.page.html',
  styleUrls: ['./bank-transfer.page.scss'],
})
export class BankTransferPage implements OnInit {
  bankTransfer: FormGroup;
  bankList: any = []
  cashLedger: any = []
  data: any = {}
  bankData
  info: any = []

  constructor(fb: FormBuilder, public api: ApiService, public toastController: ToastController, 
    public location: Location,private popoverController: PopoverController) {
    this.bankTransfer = fb.group({
      'bank': [null, Validators.required],
      'to_bank': [null, Validators.required],
      'amount': [null, Validators.required],
      'date': [null, Validators.required],
      'company': [this.api.getCompanyId()]
    });
  }

  ngOnInit() {
    this.getData()
    this.getBank()
    console.log("data areceived", this.bankData);
    if (this.bankData) {
      this.getParticularContra()
    }
    const currentDate = new Date().toISOString().substring(0, 10);
    this.bankTransfer.controls['date'].setValue(currentDate);
  }

  getParticularContra() {
    let header = this.api.getHeader();
    let id = this.bankData.id
    this.api.getparticularContraEntry(id, header).subscribe((response: any) => {
      console.log("getparticularContraEntry", response);
      this.bankTransfer.patchValue(
        response.data
      );
    })
  }

  getBank() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called bank", response);
      if(response.status != 500){
      this.bankList = response
      }else{
        this.bankList=[]
      }
    })
  }

  getData() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.data.company_id = companyId
    this.api.selectedCashLedger(this.data, header).subscribe((response: any[]) => {
      this.cashLedger = response
      console.log("98", this.cashLedger);
    })
  }

  submitForm() {
    let header = this.api.getHeader();
    if (this.bankData) {
      this.bankTransfer.value.id = this.bankData.id
      this.api.editBankToBank(this.bankTransfer.value, header).subscribe(async (response: any) => {
        console.log("after edit editBankToBank", response);
        if (response.status == 'success') {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.info = response.status
          modalController.dismiss(response.status)
        }
      })
    } else {
      this.markFormTouched(this.bankTransfer);
      if (this.bankTransfer.valid) {
        // You will get form value if your form is valid
        var formValues = this.bankTransfer.getRawValue;
      }
      if (this.bankTransfer.valid) {
        console.log("data", this.bankTransfer.value);
        let header = this.api.getHeader();
        this.api.bankToBank(this.bankTransfer.value, header).subscribe(async (response: any) => {
          console.log(response);
          if (response.status == 'success') {
            const toast = await this.toastController.create({
              message: response.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            // modalController.dismiss(response.status)
            this.popoverController.dismiss(response.status)

          }

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
