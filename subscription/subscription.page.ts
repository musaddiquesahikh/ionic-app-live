import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ModalController, PopoverController, ToastController, IonModal, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PaymentPage } from '../payment/payment.page';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../language.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Location } from '@angular/common';
import { CoupenPage } from '../coupen/coupen.page';
declare var RazorpayCheckout: any;
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  public items: any = [];
  payDetails: any = {}
  data
  pDetails: any = {}
  subscription: any = []
  public selectSegment: string = 'premium';
  response;
  razorpayResponse;
  showModal = false;
  voucher_id: any = null
  applied: boolean = false
  discountgot: boolean = false
  duration: Boolean = true;
  durationValue: any = "yearly";
  voucher_code: any
  freeTrailPlan: any = [{
    id: 5,
    duration: "monthly",
    period: 1,
    price: 1,
    plan: 3,
    days: 30
  },
  {
    id: 6,
    duration: "monthly",
    period: 1,
    price: 1,
    plan: 4,
    days: 30
  },
  {
    id: 7,
    duration: "14 Days",
    period: 3,
    price: 1,
    plan: 3,
    days: 14
  },
  {
    id: 8,
    duration: "14 Days",
    period: 3,
    price: 1,
    plan: 4,
    days: 14
  }]
  defaultPricing: any = [
    {
      id: 2,
      duration: "yearly",
      period: 2,
      price: 2221,
      plan: 1,
      days: 365
    },
    {
      id: 4,
      duration: "yearly",
      period: 2,
      price: 3840,
      plan: 2,
      days: 365
    }
  ]
  defaultPricing1: any = [
    {
      id: 2,
      duration: "yearly",
      period: 2,
      price: 1619,
      plan: 2,
      days: 365
    },
    {
      id: 4,
      duration: "yearly",
      period: 2,
      price: 3840,
      plan: 2,
      days: 365
    },
    {
      id: 4,
      duration: "yearly",
      period: 2,
      price: 3565,
      plan: 2,
      days: 365
    }
  ]

  amountpricing: any = [
    {
      id: 2,
      duration: "yearly",
      period: 2,
      price: 2221,
      plan: 1,
      days: 365
    },
    {
      id: 1,
      duration: "monthly",
      period: 1,
      price: 275,
      plan: 1,
      days: 30
    },
    {
      id: 4,
      duration: "yearly",
      period: 2,
      price: 3840,
      plan: 2,
      days: 365
    },
    {
      id: 3,
      duration: "monthly",
      period: 1,
      price: 450,
      plan: 2,
      days: 30
    }
  ]
  amountpricing1: any = [
    {
      id: 2,
      duration: "yearly",
      period: 2,
      price: 1619,
      plan: 2,
      days: 365
    },
    {
      id: 1,
      duration: "monthly",
      period: 1,
      price: 175,
      plan: 2,
      days: 30
    },
    {
      id: 4,
      duration: "yearly",
      period: 2,
      price: 3840,
      plan: 3,
      days: 365
    },
    {
      id: 3,
      duration: "monthly",
      period: 1,
      price: 450,
      plan: 3,
      days: 30
    }
  ]

  receivedDiscount: number;
  subPlan: any;
  orderId: any = {};
  plan1: any;
  plan: boolean;
  plan2: any;
  details: boolean = false
  languages: any = []
  selected: any = ''
  premium: any = 'premium'
  freedom: any = 'freedom'
  coupen_code: any
  booleanData: boolean = false;
  oldData: any;
  trigger_button1: boolean;
  dis: boolean = false;
  activation: boolean = true;
  steps: introJs.Step[] = []
  intro: introJs.IntroJs;
  customButton: HTMLButtonElement;
  show:boolean=true;
  @ViewChild(IonModal) modal: IonModal;
license_key: any;
presentingElement: any;
  constructor(public modalController: ModalController, public api: ApiService, private cd: ChangeDetectorRef,
    private toastController: ToastController, public modalCtrl: ModalController, public router: Router, private translate: TranslateService,
    private popOverCtrl: PopoverController, private languageService: LanguageService, private navCtrl: NavController, private location: Location) {
  }

  ngOnInit() {
    
    let i = JSON.parse(localStorage.getItem('subscription'))

    setTimeout(() => {
      if (i) {
        this.introMethod();
      }
    }, 1000);
 
    this.intro = introJs();
    this.intro.setOptions({
    steps: this.steps,
    });
    this.languages = this.languageService.getLanguage()
    this.selected = this.languageService.selected
    this.applied = false
    this.orderId = 0
    this.getDetails()

    console.log("this.data", this.data,this.defaultPricing );
    if (this.data) {
      this.getDetails()
      this.planNow()
    }
  }
 
  RAZORPAY_OPTIONS = {
    "key": "rzp_live_MMV8nIWA4hfGnc",
    "amount": '',
    "name": "Esarwa",
    "order_id": "",
    "description": "Subcription Fees",
    "image": "https://esarwa-accounting.web.app/assets/images/logo-light.png",
    "prefill": {
      "name": "",
      "email": "test@test.com",
      "contact": "",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };
  getDetails() {
    
    let company = JSON.parse(sessionStorage.getItem("loginData"))
    let company_id = company.user[0].mobile
    console.log("company-id", company_id);

    this.api.getSubscription(company_id).subscribe(async (response: any) => {
      console.log("getSubscription", response);
      if (response.status == 200) {
        this.subscription = response.data
        console.log("Subscription", this.subscription);
        this.subPlan = response.data[0].plan
        this.plan1 = response.data[0].freedom_trial
        this.plan2 = response.data[0].premium_trial

        if (this.plan1 == false || this.plan2 == false) {
          console.log("if work");
          this.plan = true

        } else {
          this.plan = false
          console.log("else work");
        }
      }
      this.planNow()
      console.log("aaaa", this.subPlan);
    })

  }

  public proceed() {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    this.RAZORPAY_OPTIONS['prefill']["contact"] = user.user[0].mobile;
    this.RAZORPAY_OPTIONS['prefill']["email"] = user.user[0].email;

    console.log("this.RAZORPAY_OPTIONS", this.RAZORPAY_OPTIONS);

    var cancelCallback = function (error) {
      alert("Payment Unsuccessul");
    }
    RazorpayCheckout.on('payment.success', this.razorPaySuccessHandler.bind(this))
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(this.RAZORPAY_OPTIONS)
  }

  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
    setTimeout(() => {
      if(event.target.value==this.freedom){
      // this.introMethod2();
    }
    }, 500);
  }
  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }
  public razorPaySuccessHandler(response) {
    console.log(response, "payresponse");
    console.log("data of paydetails", this.payDetails);

    let formdata = this.getFormData(response)
    console.log("formdata ", formdata);
    console.log("payDetails", this.payDetails);
    for (let i in this.pDetails) {
      console.log(i, this.pDetails[i], "key")
      formdata.append(i, this.pDetails[i])
    }
    this.api.verifySignature(formdata).subscribe(async (response: any) => {
      console.log("after verify hit", response);

      if (response.status == 200) {

        const toast = await this.toastController.create({
          message: "PAYMENT SUCCESSFULL",
          duration: 5000,
         position: 'middle'
        });
        toast.present();
        this.modalCtrl.dismiss(response)
      }
    })

    this.razorpayResponse = `Razorpay Response`;
    this.showModal = true;
    this.cd.detectChanges()
  }

  getPricing() {
    this.api.getPricing().subscribe((response: any) => {
      console.log("getPricing response", response);

    })
  }


  async payNow(plan: any, free: boolean) {
    console.log(plan);

    let company = JSON.parse(sessionStorage.getItem("loginData"))
    console.log("company", company);

    let company_id = company.user[0].mobile
    console.log("company_id", company_id);

    let data = {
      "data": {
        "amount": plan.price,
        "currency": "INR",
        "receipt": "order_rcptid-11", //*order_company_id
        "notes": { "shipping_address": "Online|web|software" },
        "payment_capture": "0"
      },
      "user": company_id, //!number
      "plan": plan.plan,
      "period": plan.period,
      "voucher": this.voucher_id
    }
    console.log(data, "when modal close");

    if (this.data == 1) {
      console.log("upgrade");

      console.log("paySubcriptionData", data);
      console.log("subPlan", this.subPlan);

      if (this.subPlan == 3 || this.subPlan == 1) {
        this.api.UpgradeSubcription(data).subscribe((response: any) => {
          console.log("paySubcription66", response);
          this.orderId = response.data
          this.RAZORPAY_OPTIONS.order_id = response.data.order_id
          this.RAZORPAY_OPTIONS.amount = response.data.amount
          console.log("order_id", this.orderId);

          if (response.status == 200) {
            this.proceed()
          }
        })
      }
    }

    if (this.data !== 1) {
      console.log("test condition 1");

      this.api.paySubcription(data).subscribe((response: any) => {
        console.log("paySubcription", response);
        if (response.status == 200) {
          this.RAZORPAY_OPTIONS.order_id = response["data"].order_id
          this.RAZORPAY_OPTIONS.amount = response["data"].amount
          console.log("this.RAZORPAY_OPTIONS.order_id", this.RAZORPAY_OPTIONS.order_id);
          console.log("this.RAZORPAY_OPTIONS.amount", this.RAZORPAY_OPTIONS.amount);

          console.log("free in status 200", free);

          if (free == false) {
            console.log("in free=false");

            this.proceed()
          } else {
            let hh = response["data"].order_id
            console.log("create trail responce", response);
            console.log("jkhkjh", hh);

            this.api.trailSubscription({ razorpay_order_id: hh }).subscribe(async (res: any) => {
              console.log("trailresponse", res);
              if (res.status == 200) {
                const toast = await this.toastController.create({
                  message: this.translate.instant('Free Trial Plan Activated'),
                  duration: 5000,
                position: 'middle'
                });
                toast.present();
                this.modalCtrl.dismiss(res.code)

              } else if (res.status == 500) {
                console.log("500 working");
                const toast = await this.toastController.create({
                  message: res.msg,
                  duration: 5000,
                position: 'middle'
                });
                toast.present();
                this.modalCtrl.dismiss(res.code)
              }
            });
          }
        }

      });

    }
  }

  changeDuration() {
    this.duration = !this.duration;
  }

  planNow() {
    if (this.subPlan == 1) {
      this.amountpricing1
      let filteredDetails1 = this.amountpricing1.filter(
        book => book.duration == this.durationValue);
      console.log("ppp1", filteredDetails1);
      this.defaultPricing1 = filteredDetails1
    }
    else {
      this.amountpricing
      let filteredDetails = this.amountpricing.filter(
        book => book.duration == this.durationValue);
      console.log("ppp", filteredDetails);
      this.defaultPricing = filteredDetails
      if (this.duration == true) {

      }
    }
  }

  getDiscount(d) {

    this.api.getVoucher(d).subscribe((response: any) => {
      if (response.status == 200) {
        console.log(response.data.discount);
        this.voucher_id = response.data.id;

        let dicount = Number(response.data.discount);
        this.receivedDiscount = dicount
        let data = this.defaultPricing

        data[0].price = data[0].price - (data[0].price * dicount / 100);
        data[1].price = data[1].price - (data[1].price * dicount / 100);

        data[0].price = Math.round(data[0].price);
        data[1].price = Math.round(data[1].price);

        this.defaultPricing = data
        this.applied = true
        this.discountgot = false
      }
      else {
        this.discountgot = true
        this.applied = false
      }
    })
  }
  async openModel(plan: any, free: boolean) {
    console.log("plan", plan, "free", free);
    console.log("click");
    const modal = await this.modalController.create({
      component: PaymentPage,

      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.5
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address jj", user)
        this.pDetails = user
        console.log("user", this.pDetails);

        this.payNow(plan, free)
      });

    return await modal.present();
  }
  
  async next(p: any, free: boolean) {
    this.booleanData = free
    const modal = await this.modalController.create({

      component: CoupenPage,
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.5
    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data // Here's your selected user!
        console.log("from address jj", user)
        // this.payNow(this.oldData,true)
        console.log(this.voucher_id, "voucher id skip");
        if (user.role == 'high') {
          if (user.data !== undefined) {
            this.voucher_id = user.data
            if (p == 'premium') {
              this.payNow(this.freeTrailPlan[0], this.booleanData)
            } else if (p == 'freedom') {
              this.payNow(this.freeTrailPlan[1], this.booleanData)
            }
          }
        } else if (user.role == undefined) {
          this.voucher_id = null
          if (p == 'premium') {
            this.payNow(this.freeTrailPlan[2], this.booleanData)
          } else if (p == 'freedom') {
            this.payNow(this.freeTrailPlan[3], this.booleanData)
          }
        }
      });

    return await modal.present();
  }


  disabled(t: any) {
    console.log(typeof (t).length, t.length, 'act');
    if (t != "" && t.length === 36) {
      console.log('if');
      this.dis = true
    } else {
      this.dis = false
      console.log('else');
    }
  }
  activateAccount(key: any) {
    console.log(key, "key submitted");
    if (key != '') {
      let user = JSON.parse(sessionStorage.getItem('loginData'));
      console.log(user.user[0].mobile, "user mobile number");
      let data = {
        "user": user.user[0].mobile,
        "code": key
      }
      this.api.post2("apply_code/", data).subscribe(async (res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.modalCtrl.dismiss()
          this.activation = false;
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ACCOUNT SUCCESSFULLY ACTIVATED'),
            duration: 5000,
           position: 'middle'
          });
          toast.present();
        } else if (res.status == 500) {
          const toast = await this.toastController.create({
            message: res.msg,
            duration: 5000,
            position: 'middle'
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.SOMETHING WENT WRONG'),
            duration: 5000,
            position: 'middle'
          });
          toast.present();
        }
      })
    }
  }

  closeModal() {
    this.modalController.dismiss()
  }

  introMethod() {
    let intro = introJs();
   
    intro.oncomplete(function () {
      console.log("On COmplete");
      localStorage.setItem("subscription", "false");
    });
    intro.onexit(function () {
      localStorage.setItem("subscription", "false");
    
    })
    intro.setOptions({
      steps: [
        {
          element: '#duration',
          intro: 'Choose the duration of plan.',
        },
       
        {
          element: '#coup',
          intro: 'If you have any coupon code, Paste here and apply.',
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
      doneLabel: '<ion-button size="small">next</ion-button>',
      
    })
    intro.start();
  }
  introMethod1() {
  
    let intro = introJs();
    this.customButton = document.createElement('button');
    this.customButton.innerText = 'FREEDOM';
    this.customButton.setAttribute('class', 'md button button-small button-solid ion-activatable ion-focusable hydrated btn btn-primary introjs-nextbutton button-native');
    this.customButton.addEventListener('click', () => {
      intro.exit();
      this.introMethod5();
    });
    intro.oncomplete(function () {
      intro.exit();
      document.getElementById('freeTrile').click();
    });
    intro.onexit(function () {
     
    })
    intro.setOptions({
      buttonClass:'btn btn-primary',
      steps: [
        {
          element: '#choose1',
          intro: 'Choose the plan you want to buy.',
          buttons: [
            {
              text: 'Next',
              className: 'introjs-button',
              action: () => {
                intro.click();
              }
            },
            {
              text: 'Select',
              className: 'introjs-button',
              action: () => {
                intro.customButtonAction();
                document.getElementById('freeTrile').click();
              }
            }
          ]
        },
        {
          element: '#freeTrile',
          intro: 'Click here .'
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
      nextLabel: '<ion-button size="small">PREMIUM</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Done</ion-button>',
    })
    intro.onafterchange(() => {
      const tooltip = document.querySelector('.introjs-tooltipbuttons');
      if (tooltip && !tooltip.contains(this.customButton)) {
        tooltip.appendChild(this.customButton);
      }
    });
    intro.start();
  }
  introMethod5() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On Complete in introMethod5");
      document.getElementById('step3').click();
    });
   
    intro.onexit(() => {
      
    });
    intro.setOptions({
      buttonClass:'btn btn-primary',
      steps: [
        {
          element:'#step3',
          intro: 'Freedom Plan ',
        },

      ],
      showButtons: true,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Next</ion-button>',
    });
    intro.start();
  }

  introMethod2() {
    let intro = introJs();
    intro.oncomplete(function () {
      document.getElementById('step4').click();
      localStorage.setItem('trial2', 'false');
    });
    intro.onexit(() => {
      localStorage.setItem('trial2', 'false');
    });
    intro.setOptions({
     
      steps: [
        {
          element:'#step4',
          intro: 'Buy Now',
          position:'top',
        },
      ],
      showButtons: true,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Next</ion-button>',
    });
    intro.start();
  }

}


