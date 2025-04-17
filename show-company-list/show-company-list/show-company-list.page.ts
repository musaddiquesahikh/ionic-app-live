import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from "../api.service";
import { SubscriptionPage } from '../subscription/subscription.page';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-show-company-list',
  templateUrl: './show-company-list.page.html',
  styleUrls: ['./show-company-list.page.scss'],
})
export class ShowCompanyListPage implements OnInit {
  @ViewChild('segment') segment: any;  company: any = {};
  subPlan: any = []
  companyCount: any
  listCompany: any = [];
  item: any = [];
  companyList: any = [];
  plan: string;
  days: any;
  active: any
  days1: number;
  plan1: any;
  listLength: boolean
  list: any = 1
  plan2: any;
  subplan1: boolean;
  languages: any = []

  private selectSegment: string = 'admin';

  constructor(public router: Router, private api: ApiService, public http: HttpClient, public toastController: ToastController,
    public modalCtrl: ModalController, public alertController: AlertController, private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController, private translate: TranslateService, private languageService: LanguageService,private popOverCtrl:PopoverController) { }

  ngOnInit() {
    this.languages = this.languageService.getLanguage()
    console.log(this.languages, "lng");
    
    this.getPlanDetails()
    console.log("ngOnit work");

  }
  
  getPlanDetails() {

    // this.api.companyList().subscribe((response: any) => {
    //   console.log('1', response);
    //   if (response.status == 403) {
    //     this.listCompany = [];
    //     sessionStorage.setItem('listCompany', JSON.stringify(this.listCompany));
    //     //console.log("qsad failed", this.listCompany);
    //   } else if (response.status == 200) {
    //     this.listCompany = response["data"];
    //     sessionStorage.setItem('listCompany', JSON.stringify(this.listCompany));
    //   }
    // });
    let company = JSON.parse(sessionStorage.getItem("loginData"))
    console.log("company", company);

    let company_id = company.user[0].mobile
    this.api.getSubscription(company_id).subscribe(async (response: any) => {
      console.log("getSubscription", response);
      if(response.status == 500){
        this.subplan1 = true
      }
      
      if (response.status == 200) {
        this.subPlan = response.data
        if (this.subPlan == 0) {
          console.log("no data");
          this.subplan1 = true
        }
        if (response.data != 0) {
          this.active = response.data[0].active
          console.log("active", this.active);
          if (this.active == true) {
            this.plan1 = response.data[0].plan
            console.log("plan", this.plan1);
            if (this.plan1 == 1) {
              this.plan = this.translate.instant('HEADER.PREMIUM PLAN ACTIVE')
            }
            if (this.plan1 == 2) {
              this.plan = this.translate.instant('MESSAGE.FREEDOM PLAN ACTIVE')
            }
            if (this.plan1 == 4) {
              this.plan = this.translate.instant('MESSAGE.FREEDOM FREE TRIAL ACTIVE')
            }
            if (this.plan1 == 3) {
              this.plan = this.translate.instant('MESSAGE.PREMIUM FREE TRIAL ACTIVE')
            }
            this.days = response.data[0].expire_in_days
            let period = response.data[0].period
            if (period == 1) {
              this.days1 = 30
            }
            if (period == 2) {
              this.days1 = 365
            }
          } else {
            this.plan2 = response.data[0].plan
          }
        }
      }
    });
    let user_data = JSON.parse(sessionStorage.getItem("loginData"))
    let header = this.api.getHeader();
    this.api.getlistcompany(user_data, header).subscribe(async (response: any) => {
      console.log("get company list", response);


      // this.companyCount = 
      if (response.status == 403) {
        this.listCompany = [];
        sessionStorage.setItem('listCompany', JSON.stringify(this.listCompany));
        this.companyList = []
        sessionStorage.setItem('companyList', JSON.stringify(this.companyList));
      } else if (response.status == 200) {
        this.listCompany = response.owner
        console.log("lllll", Object.keys(this.listCompany).length);
        sessionStorage.setItem('listCompany', JSON.stringify(this.listCompany));
        this.companyList = response.staff
        sessionStorage.setItem('companyList', JSON.stringify(this.companyList));
      }
    })
  }


  async showCompany(isSelected, data) {
    this.item = [data];
    console.log("received", this.item);
    console.log("this.item.module_type", this.item[0].module_type);

    if (this.item[0].module_type == 1) {
      sessionStorage.setItem('currentCompany', JSON.stringify(this.item));

      sessionStorage.setItem('currentCompany', JSON.stringify(this.item))
      this.navCtrl.navigateRoot('empty')
    } else {
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.THIS FEATURES IS NOT AVAILABLE IN MOBILE VERSION'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }

  }
  logout() {
    
    sessionStorage.removeItem("loginData");
    sessionStorage.removeItem("listCompany");
    sessionStorage.removeItem("companyList");
    sessionStorage.removeItem("currentCompany");
    this.router.navigate(['/login'])
  }
  async appCreateNewCompany() {
    console.log("this.plan1", this.plan1);

    if (this.plan1 == 1) {
      let a = Object.keys(this.listCompany).length
      if (a < 3) {
        console.log("mmmm", Object.keys(this.listCompany).length);
        this.router.navigate(['/add-new-business'])
      } else {

        const alert = await this.alertController.create({
          header: this.translate.instant('MESSAGE.ALERT'),
          message: this.translate.instant("MESSAGE.YOUR PLAN WILL BE CREATE ONLY THREE BUSINESS.PLEASE UPGRADE YOUR PLAN"),
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
                    const user = data.data; // Here's your selected user!
                    console.log("from address ", user)

                  });
                // console.log("selected item", this.item)
                return await modal.present();
              },
            },
            {

              text: this.translate.instant('HEADER.CANCEL'),
              role: "cancel",
            },
          ],
        });
        alert.present();

      }
    }
    if (this.plan1 == 3) {
      let a = Object.keys(this.listCompany).length
      if (a < 3) {
        console.log("mmmm", Object.keys(this.listCompany).length);
        this.router.navigate(['/add-new-business'])
      } else {
        const alert = await this.alertController.create({
          header: this.translate.instant('MESSAGE.ALERT'),
          message: this.translate.instant('MESSAGE.YOUR PLAN WILL BE CREATE ONLY THREE BUSINESS.PLEASE UPGRADE YOUR PLAN'),

          buttons: [
            {
              text: this.translate.instant('HEADER.YES'),
              role: "cancel",
            },
          ],
        });
        alert.present();
      }

    }
    if (this.plan1 == 4 || this.plan1 == 2) {
      this.router.navigate(['/add-new-business'])
    }

  }
  async pricing() {
    // this.router.navigate(['/subscription'])
    const modal = await this.modalCtrl.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',
      // componentProps: {
      //   data: this.list
      // }

    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getPlanDetails()
      });
    // console.log("selected item", this.item)
    return await modal.present();
  }
  async buyPlan() {
    const modal = await this.modalCtrl.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',


    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getPlanDetails()
      });
    // console.log("selected item", this.item)
    return await modal.present();
  }
  async buy() {
    const modal = await this.modalCtrl.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',


    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)

      });
    // console.log("selected item", this.item)
    return await modal.present();

  }
  async deleteUser(item) {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DEACTIVATE THIS ACCOUNT ?'),
      position: "bottom",
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "confirm",
          handler: async () => {
            let company = JSON.parse(sessionStorage.getItem("loginData"))
            console.log("company", company);
            let company_id = company.user[0].mobile
            console.log("this.item", company_id);
            this.api.deactiveAccount(company_id).subscribe(async (response: any) => {
              console.log("response", response);

              if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.ACCOUNT SUCCESSFULLY DEACTIVATED'),
                  duration: 2000,
                  color: "warning"
                });
                toast.present();
              }
            })
            this.modalCtrl.dismiss()
            sessionStorage.removeItem("loginData");
            this.router.navigate(['/login'])
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          handler: async () => {
            this.modalCtrl.dismiss()
          }
        },
      ],

    });
    toast.present();

  }

  async canDismiss() {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT ?'),
      position: "bottom",
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: async () => {
            let company = JSON.parse(sessionStorage.getItem("loginData"))
            console.log("company", company);
            let company_id = company.user[0].mobile
            console.log("this.item", company_id);
            this.api.deleteAccount(company_id).subscribe(async (response: any) => {
              if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.ACCOUNT SUCCESSFULLY DELETED'),
                  duration: 2000,
                  color: "warning"
                });
                toast.present();
              }
            })
            this.modalCtrl.dismiss()
            sessionStorage.removeItem("loginData");
            this.router.navigate(['/login'])
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          handler: async () => {
            this.modalCtrl.dismiss()
          }
        },
      ],
    });
    toast.present();
  }
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
    console.log(event.detail.value);
    ;
    

  }
  ngAfterViewInit() {
    this.segment.value = 'admin';
  }

  onSegmentChange(event) {
    console.log(event.detail.value);
  }
  select(lng) {
    console.log("ppppp", lng);
    this.languageService.setLanguage(lng)
    this.popOverCtrl.dismiss()
  }
}
