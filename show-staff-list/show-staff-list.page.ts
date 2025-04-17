import { EditRolePage } from './../edit-role/edit-role.page';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { CreateRolePage } from '../create-role/create-role.page';
import { CreateStaffPage } from '../create-staff/create-staff.page';
import { EditStaffPage } from '../edit-staff/edit-staff.page';
import { SubscriptionPage } from '../subscription/subscription.page';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';

@Component({
  selector: 'app-show-staff-list',
  templateUrl: './show-staff-list.page.html',
  styleUrls: ['./show-staff-list.page.scss'],
})
export class ShowStaffListPage implements OnInit {
  item: any = [];
  itemL: any = [indexedDB];
  modelhh: boolean;
  company: any = []
  staffData: any = []
  list: any = 1
  subcribe: any
  count: any
  @Input() itemIn;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  on_tour: boolean;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard, public alertCtrl: AlertController, public location: Location,
  ) { }

  ngOnInit() {
    let i = JSON.parse(localStorage.getItem('show-staff'))
    setTimeout(() => {
      if(i){
        this.introMethod();
      }
    }, 2000);
    this.getStaffList()
    this.getPlanDetails()
  }
  getPlanDetails() {
    let company = JSON.parse(sessionStorage.getItem("loginData"))
    console.log("company", company);

    let company_id = company.user[0].mobile
    this.api.getSubscription(company_id).subscribe(async (response: any) => {
      console.log("getSubscription", response);
      this.subcribe = response.data
    });
    let companyId = this.api.getCompanyId()
    this.api.getCountStaff(companyId).subscribe(async (response: any) => {
      console.log("get count staff", response.data.staff_count);
      this.count = this.staffData.length
    });
    let a = JSON.parse(sessionStorage.getItem("currentCompany"))
    let company_Id = a[0].id
    console.log("this.currentCompanyId", company_Id);

    this.api.getSubscription1(company_Id).subscribe(async (response: any) => {
      console.log("getSubscription123", response);
    })
  }
  getStaffList() {
    let companyId = this.api.getCompanyId()
    console.log("party details", companyId);
    let header = this.api.getHeader();

    this.api.staffList(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.staffData = response
      console.log("staffData", this.staffData);

    });
  }

  async showItem(data) {

    this.item = data;
    console.log("selected data", this.item);
    // if (this.item) {
    const modal = await this.modalCtrl.create({
      component: EditStaffPage,
      cssClass: 'my-custom-class',
      componentProps: {
        staffList: this.item
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data;
        console.log("from address ", user)
      });

    return await modal.present();
  }
  modelreturn() {
    this.modelhh = false;
    this.modalCtrl.dismiss()

  }
  async createStaffModal() {
    console.log("this.subcribe[0].plan", this.subcribe[0].plan);

    if (this.subcribe[0].plan == 1) {

      if (this.count < 5) {
        console.log("mmmm", Object.keys(this.staffData).length);

        const modal = await this.modalCtrl.create({
          component: CreateStaffPage,

        });

        modal.onDidDismiss()
          .then((data: any = {}) => {
            const user = data.data;
            console.log("from address ", user)
            this.getStaffList()
          });

        return await modal.present();
      } else {
        console.log("Your Plan will be create only Five User. Please Upgrade your plan");
        const toast = await this.toastController.create({
          header: this.translate.instant('MESSAGE.YOUR PLAN WILL BE CREATE ONLY FIVE USER.PLEASE UPGRADE YOUR PLAN'),
          position: 'middle',
          buttons: [
            {
              text: this.translate.instant('MESSAGE.UPGRADE PLAN'),
              role: "done",
              handler: async () => {

                const modal = await this.modalCtrl.create({
                  component: SubscriptionPage,
                  cssClass: 'my-custom-class',
                  componentProps: {
                    data: this.list
                  }

                });
                modal.onDidDismiss()
                  .then((data) => {
                    const user = data.data;
                    console.log("from address ", user)
                  });

                return await modal.present();
              },
            },
            {
              text: this.translate.instant('HEADER.CANCEL'),
              role: "cancel",
            },
          ],
        });
        toast.present();

      }
    }
    if (this.subcribe[0].plan == 3) {

      if (this.count < 5) {
        console.log("mmmm", Object.keys(this.staffData).length);
        const modal = await this.modalCtrl.create({
          component: CreateStaffPage,

        });

        modal.onDidDismiss()
          .then((data: any = {}) => {
            const user = data.data;
            console.log("from address ", user)
            this.getStaffList()
          });

        return await modal.present();

      } else {
        const toast = await this.toastController.create({

          header: this.translate.instant('MESSAGE.YOUR PLAN WILL BE CREATE ONLY FIVE USER.PLEASE UPGRADE YOUR PLAN'),
          position: 'middle',
          buttons: [
            {
              text: this.translate.instant('HEADER.YES'),
              role: "cancel",
            },
          ],
        });
        toast.present();
      }
    }
    if (this.subcribe[0].plan == 2 || this.subcribe[0].plan == 4) {
      if (this.count <= 25) {
        console.log("mmmm", Object.keys(this.staffData).length);
        const modal = await this.modalCtrl.create({
          component: CreateStaffPage,

        });

        modal.onDidDismiss()
          .then((data: any = {}) => {
            const user = data.data;
            console.log("from address ", user)
            this.getStaffList()
          });

        return await modal.present();

      } else {
        const toast = await this.toastController.create({
          header: this.translate.instant('MESSAGE.YOUR PLAN WILL BE CREATE ONLY TWENTY FIVE USER TO CONTINUE THE SERVICE BUY PLAN'),
          position: 'middle',
          buttons: [
            {
              text: this.translate.instant('HEADER.YES'),
              role: "cancel",
            },
          ],
        });
        toast.present();
      }
    }
  }
  async deleteStaff(item) {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE STAFF'),
      position: 'middle',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: () => {

            let header = this.api.getHeader();
            let company_id = this.api.getCompanyId()
            let data = { id: item, company_id: company_id }
            console.log("this.item", item);
            this.api.deleteStaff(data, header).subscribe(async (response: any) => {
              console.log(response, 'delete staff');
              let a = response.msg
              const toast = await this.toastController.create({
                message: a,
                duration: 1000,
                position: 'middle'
              });
              toast.present();
              this.getStaffList()
              this.getPlanDetails()
            })
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
        },
      ],
    });
    toast.present();
  }
  async createRole() {
    const modal = await this.modalCtrl.create({
      component: CreateRolePage,

    });

    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data;
        console.log("from address ", user)
        this.getStaffList()
      });

    return await modal.present();

  }
  async editRole() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'company_setting') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: EditRolePage,
          });

          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data;
              console.log("from address ", user)
              this.getStaffList()
            });

          return await modal.present();

        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
        }
      }
    }
  }
  introMethod(){
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('staff').click()
      localStorage.setItem('show-staff','false')

    });
    intro.onexit(function(){
      localStorage.setItem('show-staff','false')

    })
    intro.setOptions({
      steps: [
        {
          element: '#role',
          intro: 'click here to create new role.',
        },
        {
          element: '#edit',
          intro: 'click here to edit a role.',
        },
        {
          element: '#staff',
          intro: 'click here to create a new staff/user.',
        },
      ],
      
      disableInteraction: false ,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc:true,
      scrollToElement:true,
      scrollTo:"element",
      scrollPadding:30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Create Staff</ion-button>',
    }).start();
    }

}

