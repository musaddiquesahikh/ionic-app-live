import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-new-ledger',
  templateUrl: './create-new-ledger.page.html',
  styleUrls: ['./create-new-ledger.page.scss'],
})
export class CreateNewLedgerPage implements OnInit {
  
  @Output() ledgerAFunction: EventEmitter<any> = new EventEmitter();

  ledger: any = {
    "company_id": 0,
    "ledger_name": "",
    "ledger_under": 0,
    "opening_balance": 0.0,
    "payment_type": 1,
    "as_on_date": '',
    "current_balance": 0.0
  };

  submit: boolean
  ledgerCategory: any = [];
  b = this.ledger.selected_value
  selectedData: any;
  company: any = []
  data: any = []
  on_tour: boolean;
  ledgerForm: FormGroup;
 

  constructor(public modalCtrl: ModalController, public api: ApiService, public navCtrl: NavController,
    public toastController: ToastController, private translate: TranslateService,
    private popoverController: PopoverController,private fb: FormBuilder) {
      this.ledgerForm = fb.group({
        'ledger_name': ['', Validators.required],
        'ledger_under': ['', Validators.required],
        'opening_balance': [0, Validators.required],
        'payment_type': [1, Validators.required],
        'as_on_date': ['', Validators.required],
        'group': [null],
        'company': [this.api.getCompanyId()]
      });
     }

  ngOnInit() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.getledger();
    this.submit = false
    this.ledgerForm.value.opening_balance = 0;
    const currentDate = new Date().toISOString().substring(0, 10);
    this.ledgerForm.get('as_on_date').patchValue(currentDate)  
  }

  getledger() {
    let company = this.api.getCompanyId()
    this.api.createLedgerCategory(company).subscribe((response: any[]) => {
      console.log("sadfdsaf", response);
      this.ledgerCategory = response["Data"]
      console.log("a", this.ledgerCategory)
      let t = JSON.parse(localStorage.getItem('create_ledger'))
      setTimeout(() => {
        if(t){
          this.introMethod();
        }
      }, 900);
    });
  }

  async createLedger() {
    let led = this.ledgerForm.value
    console.log(this.ledgerForm.value);
    led.company_id=this.ledgerForm.value.company
    
    let l=this.ledgerForm.value.ledger_under
    console.log(this.ledgerCategory.id,'under',this.ledgerCategory[0].id);
    led.ledger_under=this.ledgerCategory[0].id
    if (this.ledgerForm.valid) {
      this.api.post3("create_ledger/", led).subscribe(async (response: any) => {
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message:response.msg,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          // this.ledgerAFunction.emit(response.data)
          this.ledgerForm.reset();
          this.popoverController.dismiss(response.data)
        } else {
          const toast = await this.toastController.create({
            message:response.msg,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      }, async (error) => {
        const toast = await this.toastController.create({
          message:error,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      });
    }
    else {
      if (!led.ledger_name) {
        const toast = await this.toastController.create({
          message:this.translate.instant("HEADER.LEDGER NAME REQUIRED"),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else if (!led.opening_balance || led.opening_balance === 0 || led.opening_balance < 0) {
        const toast = await this.toastController.create({
          message:'Please Enter Valid Opening Balance',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else if (!led.payment_type) {
        const toast = await this.toastController.create({
          message:this.translate.instant("MESSAGE.SELECT PAYMENT TYPE"),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else if (!led.ledger_under) {
        const toast = await this.toastController.create({
          message:this.translate.instant("MESSAGE.SELECT LEDGER"),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else if (!led.as_on_date) {
        const toast = await this.toastController.create({
          message:this.translate.instant("MESSAGE.PLEASE ENTER THE DATE"),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
  }

  // async createLedger() {
  //   console.log(this.ledger);
  //   if (this.ledgerForm.value.ledger_under.type == "parent") {
  //     this.ledgerForm.value.group = null
  //   } else {
  //     this.ledgerForm.value.group = this.ledgerForm.value.ledger_under.id
  //   }

  //   if (this.ledgerForm.value.ledger_name && this.ledgerForm.value.payment_type && this.ledgerForm.value.as_on_date) {
  //     this.submit = true
  //   } else {
  //     this.markFormTouched(this.ledgerForm);
  //     this.submit = false
  //     const toast = await this.toastController.create({
  //       message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
  //       duration: 2000,
  //       position: 'middle'
  //     });
  //     toast.present();
  //   }
  //   if (this.submit == true) {

  //     let companyId = this.company[0].id;
  //     this.ledgerForm.value.company_id = companyId;
  //     let header = this.api.getHeader();
  //     this.ledgerForm.value.ledger_under = this.ledgerForm.value.ledger_under.id
  //     this.api.createNewLedger(this.ledgerForm.value, header).subscribe(async (response: any) => {
  //       console.log(response,'response of ledger');

  //       if (response.status == 200) {
  //         const toast = await this.toastController.create({
  //           message:response.msg,
  //           duration: 2000,
  //           position: 'middle'
  //         });
  //         toast.present();
  //         this.data = response.data
  //         this.popoverController.dismiss(response.data)

  //       }
  //       if (response.status == 500) {
  //         const toast = await this.toastController.create({
  //           message:response.msg,
  //           duration: 2000,
  //           position: 'middle'
  //         });
  //         toast.present();
  //       }

  //     });
  //   }
  // }

  categoryChange(ledger_under: any) {
    console.log(ledger_under);
    let a = ledger_under.pay_type
    console.log("ppppaq", a);
    if (a == true) {
      this.ledgerForm.value.payment_type = "Debit"
    } else {
      this.ledgerForm.value.payment_type = "Credit"
    }
  }

  introMethod(){
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      // document.getElementById('sub').click()
      localStorage.setItem('create_ledger','false')

    });
    intro.onexit(function(){
      localStorage.setItem('create_ledger','false')

    })
    intro.setOptions({
      steps: [
        {
          element: '#ledgerName',
          intro: 'Enter Ledger Name.',
        },
        {
          element: '#under',
          intro: 'select payment under name.',
        },  
        {
          element: '#balance',
          intro: 'Enter opening balance.',
        },
        {
          element: '#Ptype',
          intro: 'select payment type.',
        },
        {
          element: '#ledgerdate',
          intro: 'select date.',
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
      doneLabel: '<ion-button size="small">Submit</ion-button>',
    }).start();
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
