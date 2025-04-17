import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.page.html',
  styleUrls: ['./create-staff.page.scss'],
})
export class CreateStaffPage implements OnInit {
  emp: any = {};
  company: any = []
  companyData: any
  submit: boolean
  data: any = []
  hide = "hide"
  show = "show"
  rolesData: any;
  on_tour: boolean;
  otp:any;
  constructor(public toastController: ToastController, public modalCtrl: ModalController, public api: ApiService, public router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.submit = false
    this.getRoles()
  }
  async addStaff() {

    if (this.emp.first_name && this.emp.last_name && this.emp.mobile_num && this.emp.email && this.emp.role) {
      this.submit = true
    } else {
      this.submit = false
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }

    if (this.submit == true) {

      this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
      let companyId = this.company[0].id;
      console.log("party details", companyId);
      this.emp.company = companyId;
      console.log("data", this.emp);
      let header = this.api.getHeader();

      this.api.createNewSatff(this.emp, header).subscribe(async (response: any) => {
        console.log("response", response);
        if (response.status == 200) {
          this.hide = "show"
          this.show = "hide"
          this.otpFunction()
        }
        if (response.status == 500) {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 2000,
            position: 'middle'
          })
          toast.present();
        }
      });
    }
  }
  back() {
    console.log("dfgfd");
    this.modalCtrl.dismiss();
  }

  otpFunction() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    console.log("company id->", companyId);
    this.emp.company = companyId;
    console.log("data", this.emp);
    let header = this.api.getHeader();
    this.emp.otp = this.emp.otp
    this.api.createNewSatffOTP(this.emp, header).subscribe(async (response: any) => {
      console.log(response);
      if (response.status == 200) {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.STAFF ADDED SUCCESSFULLY'),
          duration: 2000,
          position: 'middle'
        });
        this.data = response.data
        toast.present();
        console.log("pppp", response.data);
        this.modalCtrl.dismiss(response.data)
      }
      if (response.status == 500) {
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 2000,
          position: 'middle'
        })
        toast.present();
      }
    });
  }
  getRoles() {
    let option = this.api.getHeader()
    this.api.getRole({ company_id: this.api.getCompanyId() }, option).subscribe((response: any) => {
      console.log(response, 'role response');
      this.rolesData = response.data
      const indexOfObject = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 7;
      });
      this.rolesData.splice(indexOfObject, 1);
     })
    }   
  }

