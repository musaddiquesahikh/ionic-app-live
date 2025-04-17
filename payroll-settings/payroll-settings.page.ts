import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-payroll-settings',
  templateUrl: './payroll-settings.page.html',
  styleUrls: ['./payroll-settings.page.scss'],
})
export class PayrollSettingsPage implements OnInit {
  user: any = {};
  //ptyyes: boolean = false;
  abc: boolean
  abc1: boolean
  abc2: boolean

  constructor(public modalCtrl: ModalController, public api: ApiService, public location: Location) { }

  ngOnInit() {
    this.user.pf = '0',
      this.user.tan = '0',
      this.user.pt = '0'
    this.user.yearly_deduction = '0'
  }
  valueChanged() {
    if (this.user.pt == '1') {
      this.abc = true
    } else {
      this.abc = false
    }
  }

  valueTan() {
    if (this.user.tan == '1') {
      this.abc1 = true
    } else {
      this.abc1 = false
    }
  }

  valuePf() {
    if (this.user.pf == '1') {
      this.abc2 = true
    } else {
      this.abc2 = false
    }
  }

  submit() {
    this.user.company = this.api.getCompanyId()
    console.log("successful", this.user);
    let header = this.api.getHeader()
    this.api.payrollSetting(this.user, header).subscribe(async (response: any) => {
      console.log(response);
      this.location.back();
    })
  }
  dismiss(){
    this.location.back()
  }
}
