import { TimerService } from './../timer.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from "../api.service";
import { EditCompanyPage } from '../edit-company/edit-company.page';
import { PaymentOutPage } from '../payment-out/payment-out.page';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { TourPage } from '../tour/tour.page';
import { LanguagePage } from '../language/language.page';
import { Chart } from 'chart.js/auto';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';
import { EditPaymentInPage } from '../edit-payment-in/edit-payment-in.page';
import { EditPaymentOutPage } from '../edit-payment-out/edit-payment-out.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  trigger_button: boolean
  trigger_button1: boolean
  data: any = [];
  item: any = [];
  payment: any;
  item1: any
  public loading: boolean = true
  jou: boolean;
  listCompany: any = [];
  companyList: any = []
  latestCompany1: any = [];
  latestCompany: any
  cash_balance: any;
  bank_balance: any;
  recent_transcation: any = [];
  companyId: any;
  canDismiss: any;
  currentCompanyId: any;
  role: any;
  languages: any = []
  selected: any = ''
  weeklysales: any;
  currentCompany: any = [];
  isModalOpen: any;
  contentId: any;
  filteredItems: boolean;
  items: any
  cash: any = []
  company: any
  b: any
  msg: any
  bankid: any
  company_name: any
  @ViewChild('myCanvas')
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  chart: any;
  themeToggle = false;
  showMoreTab: boolean = false;
  show: 5;
  show1: number = 5;
  staff: any;
  date: any;
  clock_in: any;
  clock_out: any;
  showPunchOut: boolean = false;
  timer: any;                     // Reference for the interval timer
  elapsedTime: string = '00:00:00';  // To display formatted elapsed time
  seconds: number = 0;
  roleres: any;
  localStorage: any
  local1: any;
  local2: any;
  local3: any;
  apiTime: any;
  attendance: any;
  permissionnew: any={};

  constructor(public modalCtrl: ModalController, private router: Router, public api: ApiService,
    public navCtrl: NavController, public toastController: ToastController, public alertCtrl: AlertController,
    private languageService: LanguageService, private translate: TranslateService,
    public permission: PermissionGuard, public location: Location, public popoverController: PopoverController) {

  }
  ngOnInit() {
    this.showPunchOut = false
    console.log(this.showPunchOut, 'show');

    this.dashboadOnload();

    // this.permission1()
    this.getdashboarddata()
    this.show = 5
    this.show1 = 5
    let t = JSON.parse(localStorage.getItem("dashboard"))
    if (t) {
      setTimeout(() => {
        this.introMethod();
      }, 1000);
    }
    this.languages = this.languageService.getLanguage()
    this.selected = this.languageService.selected

    this.trigger_button = false;
    this.getBank();

  }

  ngAfterViewInit() {

    let ctx: any = document.getElementById('lineChart') as HTMLElement;
    var data = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],//y-axis
      datasets: [
        {
          label: '',
          data: [10, 50, 25, 70, 40, 10, 20],//x-axis
          backgroundColor: '#014796',
          borderColor: '#d0e6ff',
          fill: false,
          lineTension: 0,
          radius: 3,
        }
      ],
    };
    var options = {
      responsive: true,
      title: {
        display: false
      },
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 16,
        },
      },
    };
    let company = this.api.getCompanyId()
    let options1 = this.api.getHeader()
    this.api.getWeeklySales(company, options1).subscribe((response: any) => {
      this.weeklysales = response
      console.log("response from weekly sales", response);
      let v = 0;
      for (let i of data.labels) {
        data.labels[v] = this.weeklysales.data[v].weekday;
        data.datasets[0].data[v] = this.weeklysales.data[v].total_day_sales
        v++;
      }
      var chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
      // chart.destroy();
    })
  }
  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On Complete");
      document.getElementById('step3').click();
      localStorage.setItem('dashboard', 'false');
    });
    intro.onexit(function () {
      localStorage.setItem('dashboard', 'false');

    })
    intro.setOptions({
      steps: [
        {
          element: '#step3',
          intro: 'Create sales invoice.',
        },
      ],
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement: true,
      scrollTo: "element",
      scrollPadding: 30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Create</ion-button>',
    });
    intro.start();
  }
  click() {
    this.router.navigate(['/create-new-item'])
  }
  dashboadOnload() {
    let company = this.api.getCompanyId()
    let options = this.api.getHeader()
    this.languages = this.languageService.getLanguage()
    this.selected = this.languageService.selected
    this.trigger_button = false
    this.api.getWeeklySales(company, options).subscribe((response: any) => {
      this.weeklysales = response
      console.log("response from weekly sales", response);
    })
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let r = { "mobile_no": user.user[0].mobile, "company": this.api.getCompanyId() }
    this.api.role(r).subscribe((response: any) => {
     
      console.log("respkkk", response.data.role,this.permissionnew);
      this.role = response.data.role
    })
    // let w = { "mobile": user.user[0].mobile, "company": this.api.getCompanyId() }
    // let company_id = this.api.getCompanyId()
    this.fortimer()

    this.jou = false;
    if (sessionStorage["loginData"] == null) {
      console.log("Please Login");
      this.router.navigate(['/login'])
    } else {
      console.log("else work");
      this.listCompany = JSON.parse(sessionStorage.getItem("listCompany"))
      this.companyList = JSON.parse(sessionStorage.getItem("companyList"))
      this.companyId = this.api.getCompanyId();
      this.latestCompany1 = JSON.parse(sessionStorage.getItem("currentCompany"))
      console.log("current", this.latestCompany1[0].business_name);
      this.latestCompany = this.latestCompany1[0].business_name;
      this.currentCompanyId = this.latestCompany1[0].id
      this.getdashboarddata();
      this.api.getReceivedFor().subscribe((response: any) => {
        localStorage.setItem('ledgerCategory', JSON.stringify(response.Data));

      });
      let a = JSON.parse(sessionStorage.getItem("currentCompany"))
      let company_Id = a[0].id
      console.log("this.currentCompanyId", company_Id);
      this.api.getSubscription1(company_Id).subscribe(async (response: any) => {
        console.log("getSubscription123", response);
      })
    }

  }
  fortimer() {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      this.permissionnew=response
      this.roleres = response.data.id;
      this.attendance = response.data.attendance;
      console.log("respkkk", response.data.role,this.permissionnew);
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; 
      let data1 = {
        "staff": this.roleres,
        "date": formattedDate,
        // "id": this.api.getCompanyId()
      };
      console.log(this.roleres, 'lin number');
      this.role = response.data.role

      let header = this.api.getHeader();
      if(this.attendance){
      this.api.timer(data1, header).subscribe((response: any) => {
        console.log(response, 'atendance');
        if (response.data != null) {
          this.showPunchOut = false
          this.apiTime = response.data
          this.startTimer(this.apiTime)
        } else {
          this.showPunchOut = true
          this.apiTime = null
          console.log('no data found');
        }
        console.log(this.apiTime, 'apitimee');

      });
    }
    });
  }
  journal() {
    this.jou = true;
  }
  saveItem() { }
  modelDismiss() {
    this.modalCtrl.dismiss();
  }
  appLogout() {
    this.modalCtrl.dismiss();
    sessionStorage.removeItem("loginData");
    sessionStorage.removeItem("listCompany");
    sessionStorage.removeItem("companyList");
    sessionStorage.removeItem("currentCompany");
    localStorage.removeItem("loginData");
    localStorage.removeItem("listCompany");
    localStorage.removeItem("companyList");
    localStorage.removeItem("currentCompany");
    this.router.navigate(['/login']).then(() => {
    });
    this.trigger_button = false
  }

  getdashboarddata() {
    let company = this.api.getCompanyId();
    this.api.post3("CashBank_Data/", { company: company }).subscribe((response: any) => {
      this.bank_balance = response.data.bank_balance
      this.loading = false
      this.cash_balance = response.data.cash_balance
    }, async (error) => {
      const toast = await this.toastController.create({
        message: error,
        duration: 5000,
        position: 'middle'
      });
      toast.present();

    });
    this.api.post3("Recent_Transaction/", { company: company }).subscribe((response: any) => {
      this.recent_transcation = response.recent_transactions
      console.log(this.recent_transcation,'123451234');
      
    }, async (error) => {
      const toast = await this.toastController.create({
        message: error,
        duration: 5000,
        position: 'middle'
      });
      toast.present();
    });

  }
  putCurrent(data) {
    let dd = JSON.stringify([data])
    sessionStorage.setItem("currentCompany", dd);
  }
  modal() {
    console.log("button");
    this.trigger_button = true
  }
  selectCompany(data) {
    this.item = [data];
    sessionStorage.setItem('currentCompany', JSON.stringify(this.item))
    this.navCtrl.navigateRoot('empty')
    this.trigger_button = false
    this.modalCtrl.dismiss()
  }
  ionViewWillEnter() {
    this.dashboadOnload();
    console.log("page called");
  }
  dismissmodal(ev) {
    this.modalCtrl.dismiss();
    this.trigger_button = false
    this.canDismiss = ev.detail.select;
  }
  async editCompany(item) {
    console.log(item);

    const modal = await this.modalCtrl.create({
      component: EditCompanyPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item
      }
    });
    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.dashboadOnload();
      });
    return await modal.present();
  }
  doRefresh($event) {
    this.getdashboarddata();
    $event.target.complete();
  }
  async paymentIn() {
    this.dashboadOnload();
    if (this.role == "salesman") {
      let alert = await this.alertCtrl.create({
        header: 'Unauthorized',
        message: 'You are not authorized to visit that page!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.router.navigateByUrl('/payment-in-out')
    }
  }

  async paymentOut() {
    if (this.role == "salesman") {
      let alert = await this.alertCtrl.create({
        header: 'Unauthorized',
        message: 'You are not authorized to visit that page!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: PaymentOutPage,
        cssClass: 'my-custom-class',
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data;
          console.log("from address 989 ", user)
          this.dashboadOnload();
        });
      return await modal.present()
    }
  }

  select(lng) {
    console.log("ppppp", lng);
    this.languageService.setLanguage(lng)
    this.modalCtrl.dismiss()
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TourPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  async modal1(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  getBank() {
    console.log("emited to withdrow");
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("pppp", response);
      if (response.status == 500) {
        this.b = this.translate.instant('HEADER.NO DATA AVAILABLE')
      } else {
        this.payment = response
        console.log("item dsfgdsg", this.payment);
      }
    });
    let data = {
      "company_id": companyId
    }
    this.api.cashLedgerList(data, header).subscribe((response: any) => {
      console.log("qqqqqqq", response);
      if (response.status == 500) {
        this.msg = this.translate.instant('HEADER.NO DATA AVAILABLE')
      } else {
        this.cash = response;
        console.log("item", this.cash);
      }
    });
  }

  showMore() {
    this.showMoreTab = true;
  }
  showLess1() {
    this.showMoreTab = false;
  }
  async paymentInTransaction(item) {
    console.log(item, 'payin');
    console.log("paymentin");
    const modal = await this.modalCtrl.create({
      component: EditPaymentInPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item,
      },
      breakpoints: [0, 0.3, 0.5, 1],
      // initialBreakpoint: 0.9
    });
    console.log("selected item", item)
    return await modal.present();
  }

  async paymentOutTransaction(item) {
    console.log("inside pay out");
   
    const modal = await this.modalCtrl.create({
      component: EditPaymentOutPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      },
      breakpoints: [0, 0.3, 0.5, 1],
      // initialBreakpoint: 0.9
    });
    console.log("selected item", item)
    return await modal.present();
  }
  async expenseTransaction(item) {
    console.log(item);
    let a = item.id
    const modal = await this.modalCtrl.create({
      component: EditExpensePage,
      cssClass: 'my-custom-class',
      componentProps: {
        particularData: a,
      },
      breakpoints: [0, 0.3, 0.5, 0.8],
      // initialBreakpoint: 0.9
    });
    console.log("selected item", item)
    return await modal.present();
  }

  getLength() {
    this.show = (this.recent_transcation).length
  }
  showLess() {
    this.show = 5
  }

  getLength2() {
    this.show1 = (this.cash).length
  }
  showLess2() {
    this.show1 = 5
  }
  async Transaction(item) {

    console.log("ffff", item, item.type);
    if (item.type == "Payment In") {
      this.paymentInTransaction(item)
      // location.back('/tab1')
    }

    if (item.type == "Payment Out") {
      this.paymentOutTransaction(item)
    }
    if (item.type == "Expense") {
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'expense') {
          console.log("asd123", hh.actions.create,hh.actions.edit);
          if (hh.actions.edit == true) {
            this.expenseTransaction(item)
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }
     
    }

    if (item.type == "Sale") {
      item.invoice_id = item.id
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'sales_voucher') {
          console.log("asd123", hh.actions.create,hh.actions.edit);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({
              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: item
              },
              breakpoints: [1, 1, 1, 1],
      
            });
            console.log("selected party", item)
            return await modal.present();
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }
        
      // const modal = await this.modalCtrl.create({
      //   component: EditBillPage,
      //   cssClass: 'my-custom-class',
      //   componentProps: {
      //     billData: item
      //   },
      //   breakpoints: [1, 1, 1, 1],

      // });
      // console.log("selected party", item)
      // return await modal.present();
    }

    if (item.type == "Purchase") {
      item.invoice_id = item.id
      // const modal = await this.modalCtrl.create({
      //   component: EditBillPage,
      //   cssClass: 'my-custom-class',
      //   componentProps: {
      //     billData: item
      //   },
      //   breakpoints: [0, 0.3, 0.5, 1],
      //   // initialBreakpoint: 0.9
      // });
      // console.log("selected party", item)
      // return await modal.present();
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'purchase_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({
              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: item
              },
              breakpoints: [1, 1, 1, 1],
      
            });
            console.log("selected party", item)
            return await modal.present();
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }
    }
    if (item.type == "Purchase Return") {
      item.invoice_id = item.id
      // const modal = await this.modalCtrl.create({
      //   component: EditBillPage,
      //   cssClass: 'my-custom-class',
      //   componentProps: {
      //     billData: item
      //   },
      //   breakpoints: [0, 0.3, 0.5, 1],
      //   // initialBreakpoint: 0.9
      // });
      // console.log("selected party", item)
      // return await modal.present();
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'purchase_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({
              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: item
              },
              breakpoints: [1, 1, 1, 1],
      
            });
            console.log("selected party", item)
            return await modal.present();
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }
    }
    if (item.type == "Sale Return") {
      item.invoice_id = item.id
      // const modal = await this.modalCtrl.create({
      //   component: EditBillPage,
      //   cssClass: 'my-custom-class',
      //   componentProps: {
      //     billData: item
      //   },
      //   breakpoints: [0, 0.3, 0.5, 1],
      //   // initialBreakpoint: 0.9
      // });
      // console.log("selected party", item)
      // return await modal.present();
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'sales_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({
              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: item
              },
              breakpoints: [1, 1, 1, 1],
      
            });
            console.log("selected party", item)
            return await modal.present();
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }
    }
    if (item.type == "Purchase Order") {
      item.invoice_id = item.id
      // const modal = await this.modalCtrl.create({
      //   component: EditBillPage,
      //   cssClass: 'my-custom-class',
      //   componentProps: {
      //     billData: item
      //   },
      //   breakpoints: [0, 0.3, 0.5, 1],
      //   // initialBreakpoint: 0.9
      // });
      // console.log("selected party", item)
      // return await modal.present();
      for (let hh of this.permissionnew.data.permissions) {
        console.log("asd");
  
        if (hh.page_name == 'purchase_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({
              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: item
              },
              breakpoints: [1, 1, 1, 1],
      
            });
            console.log("selected party", item)
            return await modal.present();
          } else {
            let alert = await this.alertCtrl.create({
              header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
              message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
              buttons: ['OK']
          
            });
            alert.present();
          }
          }
          
        }

    }
  }

  refreshDashBoard() {
    window.location.reload()
    console.log("func calling refresh");
  }
  onClick() {
    console.log('cheak inn');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD" format
    let data = [{
      "staff": this.roleres,
      "date": formattedDate,
      "status": 1,
      "company": this.api.getCompanyId(),
    }]
    let header = this.api.getHeader();
    if (!this.showPunchOut) {

      this.api.attendance(data, header).subscribe((response: any) => {
        console.log(response, 'atendance if');
        this.showPunchOut = !this.showPunchOut;
      });
      this.fortimer()
      this.startTimer(this.apiTime);
    }else {
      this.api.attendance(data, header).subscribe(async (response: any) => { 
        console.log(response, 'atendance else');

        if(response.status!=500){
          console.log('status !500');
        this.showPunchOut = !this.showPunchOut;
        this.fortimer()
        this.startTimer(this.apiTime);
        const toast = await this.toastController.create({
          message: "punch in recorded",
          duration: 5000,
          position: 'middle'
        });
        toast.present();
       }else{
        const toast = await this.toastController.create({
          message: " You are already punched out ",
          duration: 5000,
          position: 'middle'
        });
        toast.present();
       }
      });
      // this.stopTimer();
    }
  }
  // onClick1() {

  //   const today = new Date();
  //   const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD" format

  //   let data = [{
  //     "staff": this.roleres,
  //     "date": "2024-11-09",
  //     // "clock_in": "10:00:00",
  //     // "clock_out": "10:00:00",
  //     "status": 1,
  //   }]
  //   let header = this.api.getHeader();
  //   if (!this.showPunchOut) {

  //     this.api.attendance(data, header).subscribe((response: any) => {
  //       console.log(response, 'atendance');
  //       this.showPunchOut = !this.showPunchOut;
  //     });
  //     this.startTimer(this.apiTime);
  //   } else {
  //     this.api.attendance(data, header).subscribe((response: any) => {
  //       console.log(response, 'atendance');
  //       this.showPunchOut = !this.showPunchOut;

  //     });
  //     this.stopTimer();
  //   }
  // }
  async onClick1() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD" format
    const timeString = today.toTimeString().split(' ')[0]; // "HH:MM:SS" format

    // Show confirmation alert each time the button is clicked
    const alert = await this.alertCtrl.create({
      header: 'Confirm Punch-out',
      message: 'Are you sure you want to punch out?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Action canceled');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // Proceed based on punch-in or punch-out
            let data =
            {
              "emp_id": this.roleres,
              "date": formattedDate,
            }

            let header = this.api.getHeader();

            if (!this.showPunchOut) {
              // Punch-in logic
              // data[0].clock_in = timeString;

              this.api.punchOut(data, header).subscribe(async (response: any) => {
                console.log(response, 'attendance punch out');
                this.showPunchOut = true; // Set up for punch-out next time
                // this.startTimer(this.apiTime); // Start timer after punch-in
                const toast = await this.toastController.create({
                  message: response.data,
                  duration: 3000,
                  position: 'middle'
                });
                toast.present();
              });
            } else {
              // Punch-out logic
              // data[0].clock_out = timeString;

              // this.api.attendance(data, header).subscribe((response: any) => {
              console.log('attendance else punch out');
              //   this.showPunchOut = false; // Set up for punch-in next time
              //   this.stopTimer(); // Stop timer after punch-out
              // });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = this.pad(now.getHours());
    const minutes = this.pad(now.getMinutes());
    const seconds = this.pad(now.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
  startTimer(apiTime: string) {
    apiTime = this.apiTime
    if (!apiTime) {
      console.error("API time is undefined. Setting default start time as 00:00:00.");
      apiTime = "00:00:00";  // Fallback to start from 00:00:00 if apiTime is undefined
    }

    // Convert the API time (e.g., "14:49:13") to seconds
    const [apiHours, apiMinutes, apiSeconds] = apiTime.split(':').map(Number);
    const apiTimeInSeconds = (apiHours * 3600) + (apiMinutes * 60) + apiSeconds;
    console.log(apiTime.split(':').map(Number), 'llll', apiHours, apiMinutes, apiSeconds)

    // Get current time in seconds since the start of the day
    const now = new Date();
    const currentTimeInSeconds = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();

    // Calculate elapsed seconds as difference between current time and API time
    this.seconds = currentTimeInSeconds - apiTimeInSeconds;
    console.log(this.seconds, 'popo');

    if (this.seconds < 0) {
      this.seconds = 0; // Ensure positive start time if current time is earlier than API time
    }
    // this.seconds = 0;  // Reset timer
    this.timer = setInterval(() => {
      this.seconds++;
      this.elapsedTime = this.formatTime(this.seconds);
    }, 1000);
    // localStorage.setItem('timer',JSON.stringify(this.elapsedTime));
  }

  stopTimer() {
    clearInterval(this.timer);  // Stop timer
  }
  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  // async onPunchIn() {
  //   await this.timerService.punchIn();
  // }

  // async onPunchOut() {
  //   await this.timerService.punchOut();
  // }

  //   get time() {
  //     // const elapsed = this.timerService.timeElapsed / 1000; // Convert ms to seconds
  //     // const hours = Math.floor(elapsed / 3600);
  //     // const minutes = Math.floor((elapsed % 3600) / 60);
  //     // const seconds = Math.floor(elapsed % 60);
  //     // return `${hours}:${minutes}:${seconds}`;
  // }

  //  async permission1() {

  //   for (let hh of this.permissionnew.data.permissions) {
  //     console.log("asd");

  //     if (hh.page_name == 'sales_voucher' || hh.page_name == 'purchase_voucher') {
  //       console.log("asd123", hh.actions.create);
  //       if (hh.actions.edit == true) {
  //       } else {
  //         let alert = await this.alertCtrl.create({
  //           header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
  //           message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
  //           buttons: ['OK']
        
        
  //         });
  //         console.log('else log');
  //         alert.present();
  //       }
  //       }

  //     }

  //   }
  
}


