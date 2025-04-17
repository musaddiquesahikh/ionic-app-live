import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  ledger: any = {}
  ledgerCategory: any = []
  submit: boolean
  data: any = []
  groupForm: FormGroup;

  constructor(public api: ApiService, public toastController: ToastController, public router: Router,
    public modelCtrl: ModalController, private translate: TranslateService,
    private fb: FormBuilder,private popoverController: PopoverController) {
      this.groupForm=fb.group({
        'ledger_name': ['', Validators.required],
        'ledger_under': ['', Validators.required],
        'company': [this.api.getCompanyId()]

      })
     }

  ngOnInit() {
    this.getData()
    this.submit = false
  }

  getData() {
    let company = this.api.getCompanyId()
    this.api.createLedgerCategory(company).subscribe((response: any[]) => {
      console.log("sadfdsaf", response);
      this.ledgerCategory = response["Data"]
      console.log("a", this.ledgerCategory)
    });
  }

  async createGroup() {
    if (this.groupForm.value.ledger_name && this.groupForm.value.ledger_under) {
      this.submit = true
      console.log("jhgjhgj", this.ledger);
    } else {
      this.markFormTouched(this.groupForm);
      this.submit = false
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
    if (this.submit == true) {
      console.log("aaaa", this.ledger);
      let header = this.api.getHeader();
      this.groupForm.value.company = this.api.getCompanyId()
      this.api.createLedgerGroup(this.groupForm.value, header).subscribe(async (response: any) => {
        console.log(response, 'create group');
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.GROUP CREATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          // this.router.navigateByUrl('/alter-ledger')
          this.data = response.data
          this.popoverController.dismiss(response.data)
        }
      })
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
