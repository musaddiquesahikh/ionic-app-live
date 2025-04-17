import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController, ToastController ,} from '@ionic/angular';
import { ApiService } from "../api.service";
import { SubscriptionPage } from '../subscription/subscription.page';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { LanguagePage } from '../language/language.page';

@Component({
  selector: 'app-show-company-list',
  templateUrl: './show-company-list.page.html',
  styleUrls: ['./show-company-list.page.scss'],
})
export class ShowCompanyListPage implements OnInit {

  @ViewChild('segment') segment: any; company: any = {};
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
  steps: introJs.Step[] = []
  intro: introJs.IntroJs;
  private selectSegment: string = 'admin';
  trigger_button1: boolean;
  private navigationEndSubscription: Subscription;
  isItemAvailable: boolean;
  on_tour: boolean;
  card1:boolean=true;

  constructor(public router: Router, private api: ApiService, public http: HttpClient, public toastController: ToastController,
    private modalController: ModalController, public alertController: AlertController, private actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,private translate: TranslateService, private languageService: LanguageService,
    public popoverController:PopoverController) { }
    customButton: HTMLButtonElement;

  ngOnInit() {
   
    let t = JSON.parse(localStorage.getItem("company_tour"))
    console.log(t, "tour keys");
    if (t == null) {
      localStorage.setItem('company_tour', 'true');
      localStorage.setItem('company_list', 'false');
      localStorage.setItem('create_company', 'false');
      localStorage.setItem('reports', 'true');
      localStorage.setItem('create_ledger', 'true');
      localStorage.setItem('alter_ledger', 'true');
      localStorage.setItem('invoice', 'true');
      localStorage.setItem('edit_invoice', 'true');
      localStorage.setItem('dashboard', 'true');
      localStorage.setItem('inv_item', 'true');
      localStorage.setItem('partylist', 'true');
      localStorage.setItem('show_item', 'true');      
      localStorage.setItem('create_party', 'true');
      localStorage.setItem('create_item', 'true');
      localStorage.setItem('save', 'true');
      localStorage.setItem('payin', 'true');
      localStorage.setItem('manage_money', 'true');
      localStorage.setItem('setting', 'true');
      localStorage.setItem('show-staff', 'true');
      localStorage.setItem('create-staff', 'true');
      localStorage.setItem('sales-register', 'true');
      localStorage.setItem('subscription', 'true');
      localStorage.setItem('tabs', 'true');
      localStorage.setItem("trial1", "false");
      localStorage.setItem("trial2", "false");
      localStorage.setItem('punch_out', 'false');
      localStorage.setItem('working_time', 'false');
      localStorage.setItem('punch_in', 'true');
      
    } else if (t == true) {
      let create = JSON.parse(localStorage.getItem('create_company'));
      if(create){
        console.log(create,"prajj create company tourr ..............");
        localStorage.setItem('company_list', 'false');
        setTimeout(() => {
        }, 2000);
      }
    } else {

    }
    this.intro = introJs();
    this.intro.setOptions({
      steps: this.steps,
    });
    this.languages = this.languageService.getLanguage()
    console.log(this.languages, "lng");
    console.log("ngOnit work");
  }

  ngOnDestroy() {
    if (this.navigationEndSubscription) {
      this.navigationEndSubscription.unsubscribe();
    }
  }
  ionViewWillEnter() {
    this.getPlanDetails();
  }
  getPlanDetails() {

    let company = JSON.parse(sessionStorage.getItem("loginData"))
    console.log("company", company);
    let company_id = company.user[0].mobile
    this.api.getSubscription(company_id).subscribe(async (response: any) => {
      console.log("getSubscription", response);
      if (response.status == 500) {
        let t = JSON.parse(localStorage.getItem('company_tour'));
        if (t == true) {
          setTimeout(() => {
            this.introMethod();
          }, 2000);
        }
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
            this.plan2 = false
            this.subplan1 = false
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
            if (period == 3) {
              this.days1 = 14
            }
            let create = JSON.parse(localStorage.getItem('create_company'));
            if(create){
              console.log(create,"prajj create company tourr ..............");
              setTimeout(() => {
              }, 4000);
            }
          } else {
            this.plan2 = response.data[0].plan
            console.log(this.plan2);
          }
        }
      }
    });
    let user_data = JSON.parse(sessionStorage.getItem("loginData"))
    let header = this.api.getHeader();
    this.api.getlistcompany(user_data, header).subscribe(async (response: any) => {
      console.log("get company list", response);
      if (response.status == 403) {
        localStorage.setItem('create_company', 'true');
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
        let select = JSON.parse(localStorage.getItem('company_list'));
        if(select){
          localStorage.setItem('create_company', 'false');
        setTimeout(() => {
        }, 2500);
      }
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
         position: 'middle'
      });
      toast.present();
    }
  }
  logout() {
    sessionStorage.removeItem("loginData");
    sessionStorage.removeItem("listCompany");
    sessionStorage.removeItem("companyList");
    sessionStorage.removeItem("currentCompany");
    localStorage.removeItem("loginData");
    localStorage.removeItem("listCompany");
    localStorage.removeItem("companyList");
    localStorage.removeItem("currentCompany");
    
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
                const modal = await this.modalController.create({
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
    const modal = await this.modalController.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data;
        console.log("from address ", user)
        this.getPlanDetails()
      });
    return await modal.present();
  }
  async buyPlan() {
    const modal = await this.modalController.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; 
        console.log("from address ", user)
        this.getPlanDetails()
      });
    return await modal.present();
  }
  async buy() {
    const modal = await this.modalController.create({
      component: SubscriptionPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data;
        console.log("from address ", user)
      });
    return await modal.present();
  }
  async deleteUser(item) {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DEACTIVATE THIS ACCOUNT ?'),
      position: 'middle',
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
                   position: 'middle'
                });
                toast.present();
              }
            })
            this.modalController.dismiss()
            sessionStorage.removeItem("loginData");
            this.router.navigate(['/login'])
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          handler: async () => {
            this.modalController.dismiss()
          }
        },
      ],
    });
    toast.present();
  }

  async canDismiss() {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT ?'),
      position: 'middle',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: async () => {
            let company = JSON.parse(sessionStorage.getItem("loginData"))
            console.log("company", company);
            let company_id = company.user[0].mobile
            console.log("this", company_id);
            this.api.deleteAccount(company_id).subscribe(async (response: any) => {
              if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.ACCOUNT SUCCESSFULLY DELETED'),
                  duration: 2000,
                   position: 'middle'
                });
                toast.present();
              }
              if (response.status == 500) {
                const toast = await this.toastController.create({
                  message: response.data,
                  duration: 2000,
                   position: 'middle'
                });
                toast.present();
              }
            })
            this.modalController.dismiss()
            sessionStorage.removeItem("loginData");
            this.router.navigate(['/login'])
          },
        },   
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          handler: async () => {
            this.modalController.dismiss()
          }
        },
      ],
    });
    toast.present();
  }
  
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
    console.log(event.detail.value,"segment");
  }
  ngAfterViewInit() {
    this.segment.value = 'admin';

  }
  onSegmentChange(event) {
    console.log(event.detail.value);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePage,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover'
    });
    return await popover.present();
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log("eve", val, this.item.business_name)
    if (val && val.trim() !== '') {
      this.listCompany = this.listCompany.filter((item) => {
        return (item.business_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    if (val && val.trim() !== '') {
      this.companyList = this.companyList.filter((item) => {
        return (item.business_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.getPlanDetails();
    }
  }
 
  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On complete");
      document.getElementById('new').click()
      localStorage.setItem('create_company', 'true');
      localStorage.setItem('company_tour', 'false');
    });
    intro.onexit(function () {
      localStorage.setItem('company_tour', 'false');
      localStorage.setItem('create_company', 'true');
    });
    intro.setOptions({
      steps: [
        {
          element: '#new',
          intro: 'You are a new user click here to buy a new plan.',
        },
      ],
      disableInteraction: false,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement:true,
      scrollTo:"element",
      scrollPadding:30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Click Here</ion-button>',
    }).start();
  }
    introMethod3() {
      let Intro = introJs();
      Intro.oncomplete(() => {
        console.log("On Complete in customButtonAction");
        localStorage.setItem('create_company', 'false');
        localStorage.setItem('company_tour', 'false');
      });
  
      Intro.onexit(() => {
        localStorage.setItem('company_list', 'false');
      });
  
      Intro.setOptions({
        steps: [
          {
            element: '#select',
            intro: 'After creating a company, it will show here. Click here to select your company.',
          },
        ],
        showButtons: false, 
        exitOnOverlayClick: false,
        exitOnEsc: false,
      });
  
      Intro.start();
    }
    introForBuy() {
      let intro = introJs();
      intro.oncomplete(function () {
        console.log("On COmplete");
        document.getElementById('buynow').click()
      });
      intro.onexit(function () {
      });
      intro.setOptions({
        steps: [
          {
            element: '#buynow',
            intro: 'Click Here To Buy A Plan',
          },
  
        ],
        disableInteraction: false,
        showStepNumbers: false,
        showBullets: false,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        scrollToElement:true,
        scrollTo:"element",
        scrollPadding:30,
        nextLabel: '<ion-button size="small">next</ion-button>',
        prevLabel: '<ion-button size="small">Back</ion-button>',
        doneLabel: '<ion-button size="small">Buy A Plan</ion-button>',
      }).start();
      localStorage.setItem('subscription', 'true');
    }
    clickCompany(){
        localStorage.setItem('company_tour', 'true');
        localStorage.setItem('company_list', 'true');
        localStorage.setItem('subscription', 'true');
    }
    dissmiss(){
      this.popoverController.dismiss();
     }
  }
    
  
