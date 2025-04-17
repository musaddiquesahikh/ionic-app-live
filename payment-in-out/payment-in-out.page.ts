import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
import { CreateNewLedgerPage } from '../create-new-ledger/create-new-ledger.page';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';

@Component({
  selector: 'app-payment-in-out',
  templateUrl: './payment-in-out.page.html',
  styleUrls: ['./payment-in-out.page.scss'],

})
export class PaymentInOutPage implements OnInit {
  item: any = []
  payment: any = {};
  hide = "hide"
  hideCheque = "hideCheque"
  hideBank = "hideBank"
  n: any
  submit: boolean
  cashModel: boolean = false
  bankModel: boolean = false
  chequeModel: boolean = false
  company: any = {}
  payment1: any = [];
  bank: any = [];
  ledgerData: any = [];
  receive: any
  ledger: any = {};
  ledger_name: any = null
  ledgerCategory:[];
  ledgerReceived: any;
  selected_option: any;
  datal: any;
  bankData: any = [];
  received_for: any
  partyList: any = []
  party_List: any = []
  categoryId: any;
  partyId: null
  handover_to: any
  cashLedger: any = []
  cashId: any;
  bankList: any = []
  invNo: any
  three: boolean = true;
  one: boolean = true;
  two: boolean = false;
  inv: boolean = false
  invData: any = []
  invoice: any = []
  same: number;
  invoice_list: any = [];
  result: any = [];
  selectedsArray: any = [];
  balanceHide: boolean = false
  // alertCtrl: any;
    t:any
  payInForm: FormGroup;
  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, 
    public toastController: ToastController,public location: Location,private permission: PermissionGuard,
     public datepipe: DatePipe, private translate: TranslateService,public alertCtrl:AlertController,private formBuilder:FormBuilder) 
    {
      this.payInForm = this.formBuilder.group({
        'receipt_no': ['', Validators.required],
         'receipt_date': [,Validators.required],
         'received_for': [''],
         'select':[''],
         'ledgerCategory':[''],
         'amount': [null,Validators.required],
         'payment_for': [''],
         'inv_amt': [''],
         'handover_to': ['',Validators.required],
         'cleared_date': ['',Validators.required],
         'cheque_no': ['',Validators.required],
        'issued_date':['',Validators.required],
         'bank': ['',Validators.required],
         'reference_no': ['',Validators.required],
        'notes': [''],
        'payment_type':[1]
      });
     }

  ngOnInit() {
     this.t = JSON.parse(localStorage.getItem('payin'))
    if(this.t){
    setTimeout(() => {
      this.introMethod();
    }, 500);
  }
    this.getledger();
    this.getparty()
    // this.payment.receipt_date = Date.now()
    let today_date = Date.now();
    this.payment.receipt_date = today_date
    this.payment.cleared_date = today_date
    this.payment.issued_date = today_date
    this.dateChange()
  }
  dateChange() {
    this.payment.receipt_date = this.datepipe.transform(this.payment.receipt_date, 'yyyy-MM-dd')
    this.payment.cleared_date = this.datepipe.transform(this.payment.cleared_date, 'yyyy-MM-dd')
    this.payment.issued_date = this.datepipe.transform(this.payment.issued_date, 'yyyy-MM-dd')
  }

  getledger() {
    this.api.getReceivedFor().subscribe((response: any) => {
      console.log(response);
      localStorage.setItem('ledgerCategory', JSON.stringify(response.Data));
      console.log("ledgerCategory", response.Data);
    });
    this.ledgerCategory = JSON.parse(localStorage.getItem("ledgerCategory"))
    this.submit = false
    this.payment.party_name = null
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    console.log("company", this.company);

    this.cash()
    this.detailsInCheque()
    this.detailsBankTransfer()
    let companyId = this.company[0].id
    let header = this.api.getHeader();
    this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.invNo = response.last_pay_in
      this.payment.receipt_no = this.invNo
    })
  }

  async createPaymentIn() {

    console.log("inv", this.invData);
    console.log("invData is null", typeof (this.invData));

    this.handover_to = null
    if (this.payment.payment_type == "1") {
      this.handover_to = this.payment.handover_to
      this.payment.bank = null;
    }

    if (this.payment.received_for == '18') {
      this.handover_to = null

    }

    console.log("this.pay", this.payment);

    if (this.payment.receipt_no && this.payment.receipt_date && this.payment.amount) {
      if (this.payment.balance_amt >= 0) {
        this.submit = true
      }
      else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.ENTER CORRECT BALANCE AMOUNT'),
          duration: 2000,
          position:'middle'
        })
        toast.present();
      }

      console.log("qqq", this.payment);

    } else {
      this.submit = false
      console.log("zzzz", this.payment);
      // alert('Please enter required field')
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
    if (this.submit == true) {

      let companyId = this.company[0].id;
      this.payment.company = companyId;
      let header = this.api.getHeader();

      let party_id: string = null
      let cashId: string = null
      console.log(typeof (this.partyId) !== "undefined");

      if (typeof (this.partyId) !== "undefined") {
        party_id = this.partyId
      }
      console.log("tina", this.received_for);

      this.payment = {
        "company": companyId,
        "receipt_no": this.payment.receipt_no,
        "receipt_date": this.payment.receipt_date,
        "amount": this.payment.amount,
        "cheque_no": this.payment.cheque_no,
        "issued_date": this.payment.issued_date,
        "cleared_date": this.payment.cleared_date,
        "notes": this.payment.notes,
        "reference_no": this.payment.reference_no,
        "party_name": party_id,
        "received_for": this.received_for,
        "payment_type": this.payment.payment_type,
        "handover_to": this.handover_to,
        "ledger_name": this.ledger_name,
        "bank": this.payment.bank,
        "group": this.payment.group,
        //  "invoice_list": this.invData,
        "payment_for": this.payment.payment_for,
        "balance_amt": this.payment.balance_amt

      }
      if (this.payment.received_for == 18) {
        this.payment.invoice_list = this.invData
        // this.payment.balance_amt = this.payment.balance_amt

        console.log("PaymentData", this.payment);
      } else {
        this.payment.invoice_list = null
        this.payment.balance_amt = 0
      }


      if (this.payment)

        this.api.createPaymentInDemo(this.payment, header).subscribe(async (response: any) => {
          console.log("create payment in response", response);
          let a = response.status
          if (response.status == 200) {
            // alert(response.msg)
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.PAYMENT IN CREATED SUCCESSFULLY'),
              duration: 2000,
              color: "success"
            });
            toast.present();
            this.modalCtrl.dismiss(response.data)
            //  this.location.back()
          } else {
            // alert('Please enter appropriate data')
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.PLEASE ENTER APPROPRIATE DATA'),
              duration: 2000,
              color: "warning"
            });
            toast.present();
          }

        });
    }
  }

  optionChange(item: any) {
    console.log("item", item);

    if (item.type == "parent") {
      item.group = null
      this.payment.group = null
      this.categoryId = item.id
    } else {
      item.group = item.id
      this.payment.group = item.id
      this.categoryId = item.parent_id
    }

    this.receive = item.received_for

    this.received_for = this.categoryId
    console.log("ledg", this.categoryId);

    console.log("this.payment.company", this.payment.company);
    this.payment.ledger_under = this.categoryId
    console.log("ledger", this.categoryId);
    let header = this.api.getHeader();
    
    this.api.getPaidReceived(this.payment, header).subscribe((response: any[]) => {
      console.log("received for 2 list", response);
      this.payment1 = response["data"]
      // let payn = JSON.parse(localStorage.getItem('payin'))
      if(this.t){ 
      this.introMethod1();
      }
    });
  }

  checkReceivedfor(id) {
    if (id == 18) {
      this.getparty()
    }
  }

  CashModel() {
    this.hide = "show"
    this.hideCheque = "hideCheque"
    this.hideBank = "hideBank"
  }

  ChequeModel() {
    this.hide = "hide"
    this.hideCheque = "showCheque"
    this.hideBank = "hideBank"
  }

  BankTransferModel() {
    this.hide = "hide"
    this.hideCheque = "hideCheque"
    this.hideBank = "showBank"
  }

  async createCashledger() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
    // this.payment.payment_type = ""
    const modal = await this.modalCtrl.create({
      component: AddCashLedgerPage,
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss()
    .then((data: any = {}) => {
      const user = data.data; // Here's your selected user!
      console.log("from address 123 ", user)
      if(user != '' ){
      this.cashLedger.push(user)
      }
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
  this.modalCtrl.dismiss();
}
}
}
}

  getparty() {
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {
      console.log("dsf", response);
      if(response.status!=500){
        this.partyList = response.data
      }else{
      this.partyList = []

      }
      console.log('1', this.partyList);
    })
  }

  // selected(item: any) {
  //   console.log("party", item);
  //   this.partyId = item
  // }

  async cashDetails() {
    if (this.payment.handover_to) {
      if (this.payment.handover_to !=null) {
        this.submit = true
        this.payment.bank_name != null
        this.payment.payment_type = 1
        this.hide = "hide"
      }
       
    } 
    else {
      this.submit = false
      console.log("zzzz", this.payment);
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
   
  }
  async  chequeDetails() {
    if (this.payment.cheque_no && this.payment.issued_date && this.payment.cleared_date&&this.payment.bank) 
    {
      if (this.payment.cheque_no !=null) {
        this.submit = true
    this.payment.handover_to = null
    this.payment.payment_type = 2
    this.hideCheque = "hideCheque"
      }
       else if(this.payment.bank =null) {
        this.submit = false
      }
    } 
    else {
      this.submit = false
      console.log("zzzz", this.payment);
      // alert('Please enter required field')
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
    
  }
  async bankTransferDetails() {
    if (this.payment.reference_no&&this.payment.bank) {
      if (this.payment.reference_no !=null) {
        this.submit = true
        this.payment.payment_type = 3
        this.payment.handover_to = null
        this.hideBank = "hideBank"
      }
       if(this.payment.bank =null){
        this.submit = false
       }
    } 
    else {
      this.submit = false
      console.log("zzzz", this.payment);
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
   }

  detailsInCheque() {
    console.log("bankdata", this.bankData);
    this.getbank();
  }

  detailsBankTransfer() {
    console.log("bankdata", this.bankData);
    this.getbank();
  }

  cash() {
    let companyId = this.api.getCompanyId()
    this.payment.company_id = companyId
    let header = this.api.getHeader();
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any) => {
      console.log('190', response);
      if(response.status!=500){
        this.cashLedger = response

      }else{
      this.cashLedger = response}
      console.log("98", this.cashLedger);

    })
  }
  getbank() {
    let companyId = this.company[0].id;
    this.payment.company = companyId
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      if(response.status!=500){
        this.bankList = response
      }
      else{
        this.bankList=[]
      }
    })
  }
  select(item: any) {
    console.log("selectcashLedger", item);

    this.handover_to = item

  }
  modalCtrldismiss() {
    this.modalCtrl.dismiss()
  }
  async createNewParty() {
    // this.payment.received_for = ""
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
    const modal = await this.modalCtrl.create({
      component: AddNewPartyPage,

    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getparty();
        if(user != "" ){
        this.partyList.push(user)
        }
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
    this.modalCtrl.dismiss();
  }
}
}
}

  async createNewBank() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
    const modal = await this.modalCtrl.create({
      component: CreateNewBankPage,

    });

    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        console.log("from address 909", user)
        if(user != "" ){
        this.bankList.push(user)
        }
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
    this.modalCtrl.dismiss();
  }
}
}
}

  option(item: any) {
    console.log("selected ledger", item);
    this.ledger_name = item
  }

  Function(data: any) {
    console.log("data", data);
    this.payment.payment_for = data
    console.log("this.payment.for", this.payment.payment_for);
    if (this.payment.payment_for[0] === 1) {
      this.three = false
    } else {
      this.three = true
    }

    if (this.payment.payment_for[0] === 3 || this.payment.payment_for[1] == '3' || this.payment.payment_for[2] == '3') {
      this.one = false
    } else {
      this.one = true
    }

    if (this.payment.payment_for[0] == '2' || this.payment.payment_for[1] == '2') {
      console.log("1");
      this.two = true


    } else {
      this.two = false
    }
    console.log("00000", this.payment.payment_for);

  }

  async createNewLedger() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
    // this.payment.received_for = ""
    const modal = await this.modalCtrl.create({
      component: CreateNewLedgerPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        console.log("from address 123 ", user)
        if(user != "" ){
        this.payment1.push(user)
        }
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
    this.modalCtrl.dismiss();
  }
}
}
}


  onChange(data) {
    console.log("gggg", data);

    if (this.invoice_list.includes(data)) {
      this.invoice_list = this.invoice_list.filter((value) => value != data);
      console.log("12", this.invoice_list)
      this.payment.invoice_list = this.invoice_list
      let tempBalAmt = this.payment.amount
      this.payment.balance_amt = this.payment.amount
      this.invData = []
      for (let inv of this.payment.invoice_list) {
        if (this.payment.balance_amt > inv.remaining_amt) {
          this.payment.balance_amt = tempBalAmt - inv.remaining_amt
          tempBalAmt = tempBalAmt - inv.remaining_amt
        } else {
          inv.remaining_amt = tempBalAmt
          this.payment.balance_amt = tempBalAmt - inv.remaining_amt
          tempBalAmt = tempBalAmt - inv.remaining_amt
        }
        this.invData.push({
          inv_id: inv.id,
          inv_amt: inv.remaining_amt,
          old_value: inv.old_value,
          invoice_no: inv.invoice_no,
          invoice_date: inv.invoice_date
        })
      }
    } else {
      this.invoice_list.push(data)
      console.log("11", this.invoice_list)
      this.payment.invoice_list = this.invoice_list
      let tempBalAmt = this.payment.amount
      this.payment.balance_amt = this.payment.amount
      this.invData = []

      for (let inv of this.payment.invoice_list) {
        if (this.payment.balance_amt > inv.remaining_amt) {
          this.payment.balance_amt = tempBalAmt - inv.remaining_amt
          tempBalAmt = tempBalAmt - inv.remaining_amt
        } else {
          inv.remaining_amt = tempBalAmt
          this.payment.balance_amt = tempBalAmt - inv.remaining_amt
          tempBalAmt = tempBalAmt - inv.remaining_amt
        }
        this.invData.push({
          inv_id: inv.id,
          inv_amt: inv.remaining_amt,
          old_value: inv.old_value,
          invoice_no: inv.invoice_no,
          invoice_date: inv.invoice_date
        })

      }
    }
  }


  chheck() {
    console.log("invData", this.invData);

    for (let inv of this.invData) {
      if (inv.inv_amt > inv.old_value) {
        inv.inv_amt = inv.old_value
      }

    }
    let tt = 0
    this.invData.forEach(function (value) {
      tt = Number(value.inv_amt) + tt
    })
    this.same = tt
    this.payment.balance_amt = this.payment.amount - tt
    if (this.payment.balance_amt! < 0) {
      this.balanceHide = true
    } else {
      this.balanceHide = false
    }
  }
  invoiceData(id: any) {
    this.payment.invoice_list = []
    console.log("id", id);
    let company_id = this.api.getCompanyId()
    let data = { company_id: company_id, party_id: id }
    let header = this.api.getHeader();
    this.invoice = []
    this.api.getparticularPartyInvoice(data, header).subscribe((response: any) => {
      console.log('190', response);
      this.invoice = response.data
      this.invoice.forEach(element => {
        element.old_amt = element.remaining_amt
      })
      let ff = []
      this.invoice.forEach(val => {
        if (val.payment_status == 1 || val.payment_status == 2) {
          ff.push(val)
        }
      })
      this.invoice = ff


    })
  }
  invoice_Details(id: any) {

    if (id != undefined) {
      this.partyId = id
      let header = this.api.getHeader();
      let company_id = this.api.getCompanyId()
      let data = { company_id: company_id, party_id: id }
      this.api.getparticularPartyInvoice(data, header).subscribe((res: any) => {
        console.log("res", res);
        this.invoice = res.data
        this.invoice.forEach(element => {
          element.old_value = element.remaining_amt

        });
      })
    }
  }
  back(){
    // this.modalCtrl.dismiss()
  }
  introMethod(){
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('received').click()
      localStorage.setItem("payin" ,"true");

    });
    intro.onexit(function(){
      localStorage.setItem("payin" ,"false");
    })
    intro.setOptions({
      steps: [
        {
          element: '#no',
          intro: 'Enter receipt number.',
        },
        {
          element: '#date',
          intro: 'Select receipt date.',
        },
        {
          element: '#received',
          intro: 'Select payment received for.',
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
        doneLabel: '<ion-button size="small">Done</ion-button>',
    }).start();
    }
    introMethod1(){
      let intro = introJs();
      intro.oncomplete(function () {
        console.log("On COmplete");
        localStorage.setItem('payin','false')

      });
      intro.onexit(function(){
        localStorage.setItem('payin','false')

      })
      intro.setOptions({
        steps: [
          {
            element: '#new',
            intro: 'Click here to create new ledger.',
          },
          {
            element: '#amt',
            intro: 'Enter amount you received.',
          },
          {
            element: '#paytype',
            intro: 'Select payment type.',
          },
          {
            element: '#done',
            intro: 'After filling all the requirements, click here to submit.',
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
      })
      intro.start();
      }

}
