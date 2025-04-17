import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { DatePipe, Location } from '@angular/common';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { CreateNewLedgerPage } from '../create-new-ledger/create-new-ledger.page';
import { TranslateService } from '@ngx-translate/core';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { PermissionGuard } from '../guards/permission.guard';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';
import { AddNewBankPage } from '../add-new-bank/add-new-bank.page';
import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
@Component({
  selector: 'app-paymentout',
  templateUrl: './paymentout.page.html',
  styleUrls: ['./paymentout.page.scss'],
})
export class PaymentoutPage implements OnInit {
  payment: any = {};
  company: any = []
  ledger_name: any
  handover_to: any
  submit: boolean
  cashModel: boolean
  bankModel: boolean
  chequeModel: boolean
  payment1: any = [];
  bank: any = [];
  ledgerData: any = [];
  ledger: any = {};
  ledgerCategory: any = [];
  ledgerReceived: any;
  selected_option: any;
  datal: any;
  bankData: any = [];
  paid_for: any
  partyList: any = []
  categoryId: any;
  partyId: any
  cashLedger: any = []
  cashId: any;
  bankList: any = []
  receive: any
  received_for: any
  invNo: any
  hide = "hide"
  hideCheque = "hideCheque"
  hideBank = "hideBank"
  payOutForm:FormGroup
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
  t: any

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    public location: Location, public modalController: ModalController, public alertCtrl: AlertController,
    public permission: PermissionGuard,public datepipe: DatePipe, private translate: TranslateService,private formBuilder:FormBuilder, private popoverController: PopoverController) {
      
      this.payOutForm = this.formBuilder.group({
        'receipt_no': [this.invNo, Validators.required],
         'receipt_date':[, Validators.required],
         'received_for': [, Validators.required],
         'select':[''],
         'ledgerCategory':[''],
         'amount': [100,Validators.required],
         'payment_for': ["[]"],
         'inv_amt': [''],
         'handover_to': [],
         'handover_to1': [],
         'cleared_date': [],
         'cheque_no': [null],
        'issued_date':[],
         'bank': [null,],
         'reference_no': [null],
        'notes': [''],
        'payment_type':[],
        'companyId':this.api.getCompanyId(),
        'total':[0]
      });
     }

ngOnInit() {
  this.getledger();
  this.CashModel()
  this.payOutForm.get('payment_type').patchValue(1)
  
    this.ledgerCategory = JSON.parse(localStorage.getItem("ledgerCategory"))
    this.submit = false
    this.payment.party_name = null
    this.cashModel = false
    this.bankModel = false
    this.chequeModel = false
    this.cash()
    this.detailsInCheque()
    this.detailsBankTransfer()
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    
    this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
      console.log("api called22", response);
      this.invNo=response.last_pay_out
      this.payOutForm.get('receipt_no').patchValue(this.invNo)
      console.log(this.invNo,'number');
      
    })

    // this.payOutForm.value.receipt_no = this.invNo
    let today_date = Date.now();
    this.payOutForm.value.receipt_date = today_date
    this.payOutForm.value.cleared_date = today_date
    this.payOutForm.value.issued_date = today_date
    this.dateChange()
    
  }
  dateChange() {
    let today_date = Date.now();

    this.payOutForm.get('receipt_date').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    this.payOutForm.get('cleared_date').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    this.payOutForm.get('issued_date').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    console.log(this.payOutForm.value.receipt_date,this.payOutForm.value.cleared_date,this.payOutForm.value.issued_date,'date');
  }

  getledger() {
    this.api.getReceivedFor().subscribe((response: any) => {
      console.log(response);
      //this.ledgerCategory = response["Data"]
      console.log("ledgerCategory", this.ledgerCategory);
      localStorage.setItem('ledgerCategory', JSON.stringify(response.Data));
    });
  }

  async createPaymenOut() {
    this.handover_to = null
    if (this.payOutForm.value.payment_type == "1") {
      this.handover_to = this.payOutForm.value.handover_to
      this.payOutForm.value.bank = null;
    }
    console.log("this.payment.received_for", this.payOutForm.value.received_for);

    if (this.payOutForm.value.received_for.id == '18') {
      this.ledger_name = null
      console.log("this.ledger_name ", this.ledger_name);

    }

    if (this.payOutForm.value.receipt_no && this.payOutForm.value.receipt_date && this.payOutForm.value.amount && this.payOutForm.value.received_for) {
      this.submit = true
    } else {
      this.submit = false
      // alert('Please enter required field')
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
    if (this.submit == true) {
      let companyId = this.api.getCompanyId()
      this.payment.company = companyId;
      let header = this.api.getHeader();

      let party_id: string = null
      console.log(typeof (this.partyId) !== "undefined");
      if (typeof (this.partyId) !== "undefined") {
        party_id = this.partyId
      }
      this.payOutForm.value.received_for = this.categoryId
      this.payOutForm.value.cheque_no = null
      this.payOutForm.value.reference_no = null
      this.payOutForm.value.cheque_no = null
      this.payOutForm.value.cheque_no = null

      this.payment = {
        "company": companyId,
        "receipt_no": this.payOutForm.value.receipt_no,
        "receipt_date": this.payOutForm.value.receipt_date,
        "amount": this.payOutForm.value.amount,
        "cheque_no": this.payOutForm.value.cheque_no,
        "issued_date": this.payOutForm.value.issued_date,
        "cleared_date": this.payOutForm.value.cleared_date,
        "notes": this.payOutForm.value.notes,
        "reference_no": this.payOutForm.value.reference_no,
        "party_name": party_id,
        "received_for": this.payOutForm.value.received_for,
        "payment_type": this.payOutForm.value.payment_type,
        "handover_to": this.handover_to,
        "ledger_name": this.ledger_name,
        "bank": this.payOutForm.value.bank,
        "payment_for": this.payOutForm.value.payment_for,
        "balance_amt": this.payment.balance_amt,
        "group": this.payment.group
      }
      if (this.payment.received_for == 18) {
        this.payment.invoice_list = this.invData
        console.log("PaymentData", this.payment);
      } else {
        this.payment.invoice_list = null
        this.payment.balance_amt = 0
      }
      console.log("payment", this.payment)
      if (this.payment)
        this.api.createPaymentOut(this.payment, header).subscribe(async (response: any) => {
          // this.api.post3("paymentout_against_invoice/", this.payOutForm.value).subscribe(async (response: any) => {
          console.log(response);
          let a = response.status
          if (a == 200) {
            // alert(response["msg"])
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.PAYMENT OUT CREATED SUCCESSFULLY'),
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.modalCtrl.dismiss(response.data)
          } else {
            
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.PLEASE ENTER APPROPRIATE DATA'),
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          }
        });
    }

  }
  async createCashledger(ev:any) {
    // this.payment.payment_type = ""
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popover = await this.popoverController.create({
            component: AddCashLedgerPage,
            event: ev,
            translucent: true,
            
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              if (user != undefined) {
                this.cashLedger.push(user)
              }
            });
            
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.popoverController.dismiss();
        }
        
      }
    }
  }

  optionChange(item: any) {
    if (item.type == "parent") {
      item.group = null
      this.payment.group = null
      this.categoryId = item.id
    } else {
      item.group = item.id
      this.payment.group = item.id
      this.categoryId = item.parent_id
    }
    // this.categoryId = item.id
    this.receive = item.received_for
    this.received_for = item.received_for
    console.log("ledg", this.categoryId);

    let companyId = this.api.getCompanyId()
    this.payment.company = companyId
    console.log("this.payment.company", this.payment.company);
    this.payment.ledger_under = this.categoryId
    console.log("ledger", this.categoryId);
    let header = this.api.getHeader();
    this.api.getPaidReceived(this.payment, header).subscribe((response: any) => {
      console.log(response,'for pay34');
      this.payment1 = response["data"]

    });
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {   
    console.log(response,'data for partylist');
      if(response.status!=500){
        this.partyList = response.data
      }else{
      this.partyList = []

      }
      console.log('1', this.partyList);
    })
  }

  selected(item: any) {
    console.log("party", item);
    this.partyId = item.id

  }

  addBankAccount() {
    console.log(this.payment);
    this.modalCtrl.dismiss();
  }
  // detailsInCheque() {
  //   console.log("bankdata", this.bankData);
  //   this.getbank();

  // }
  // detailsBankTransfer() {
  //   console.log("bankdata", this.bankData);
  //   this.getbank();
  // }

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
    let companyId = this.api.getCompanyId()
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
  modaldismiss() {
    this.modalCtrl.dismiss();
  }
  async createNewParty() {
    // this.payment.received_for = ""
    // this.router.navigateByUrl('/create-new-party')
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalController.create({
            component: CreateNewPartyPage,

          });

          modal.onDidDismiss()
            .then((data) => {
              const user = data.data; // Here's your selected user!
              console.log("from address ", user)
              if (user != undefined) {
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
  async createNewLedger() {
    // this.payment.received_for = ""
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalCtrl.create({
            component: CreateNewLedgerPage,
            cssClass: 'my-custom-class',
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              // this.getAlterledger();
              if (user != undefined) {
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
  async createNewBank(ev:any) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popover = await this.popoverController.create({
            component: AddNewBankPage,
            event: ev,
            translucent: false,
            
          });
          // const modal = await this.modalController.create({
          //   component: CreateNewBankPage,
          // });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 909", user)
              if (user != undefined) {
                this.bankList.push(user)
              }
            });
          return await popover.present();
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

  modalCtrldismiss() {
    this.modalCtrl.dismiss()
  }

  // CashModel() {
  //   this.hide = "show"
  //   this.hideCheque = "hideCheque"
  //   this.hideBank = "hideBank"
  // }

  // ChequeModel() {
  //   this.hide = "hide"
  //   this.hideCheque = "showCheque"
  //   this.hideBank = "hideBank"
  // }

  // BankTransferModel() {
  //   this.hide = "hide"
  //   this.hideCheque = "hideCheque"
  //   this.hideBank = "showBank"
  // }
  // cashDetails() {
  //   console.log(this.payment);
  //   this.payment.bank_name = null
  //   this.payOutForm.value.payment_type = 1
  //   this.hide = "hide"
  // }
  // chequeDetails() {
  //   console.log(this.payment);
  //   this.payOutForm.value.handover_to = null
  //   this.payOutForm.value.payment_type = 2
  //   this.hideCheque = "hideCheque"
  // }
  // bankTransferDetails() {
  //   console.log(this.payment);
  //   this.payOutForm.value.payment_type = 3
  //   this.payOutForm.value.handover_to = null
  //   this.hideBank = "hideBank"
  // }
  back(){
    this.modalCtrl.dismiss()
  }

  CashModel() {
    if(this.payOutForm.value.payment_type == 1){
    this.hide = "show"
    this.hideCheque = "hideCheque"
    this.hideBank = "hideBank"
    if (this.cashLedger.length != 0) {
      this.payOutForm.value.handover_to = this.cashLedger[0].id
      console.log(this.payOutForm.value.handover_to, "modelllll");
    }

  }
  else if(this.payOutForm.value.payment_type == 2){
    this.hide = "hide"
    this.hideCheque = "showCheque"
    this.hideBank = "hideBank"
  }
  else if(this.payOutForm.value.payment_type == 3){
    this.hide = "hide"
    this.hideCheque = "hideCheque"
    this.hideBank = "showBank"
  }
  }

  async cashDetails() {
    if (this.payOutForm.value.handover_to) {
      if (this.payOutForm.value.handover_to !=null) {
        this.submit = true
        this.payment.bank_name != null
        this.payOutForm.value.payment_type = 1
        this.hide = "hide"
      }
       
    } 
    else {
      this.submit = false
      console.log("zzzz", this.payment);
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
         position: 'middle'
      });
      toast.present();
    }
   
  }
  async  chequeDetails() {
    if (this.payOutForm.value.cheque_no && this.payOutForm.value.issued_date && this.payOutForm.value.cleared_date&&this.payOutForm.value.bank) 
    {
      if (this.payOutForm.value.cheque_no !=null) {
        this.submit = true
    this.payOutForm.value.handover_to = null
    this.payOutForm.value.payment_type = 2
    this.hideCheque = "hideCheque"
      }
       else if(this.payOutForm.value.bank =null) {
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
         position: 'middle'
      });
      toast.present();
    }
    
  }
  async bankTransferDetails() {
    if (this.payOutForm.value.reference_no&&this.payOutForm.value.bank) {
      if (this.payOutForm.value.reference_no !=null) {
        this.submit = true
        this.payOutForm.value.payment_type = 3
        this.payOutForm.value.handover_to = null
        this.hideBank = "hideBank"
      }
       if(this.payOutForm.value.bank =null){
        this.submit = false
       }
    } 
    else {
      this.submit = false
      console.log("zzzz", this.payment);
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
         position: 'middle'
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

  Function(data: any) {
    console.log("data", data);
    this.payOutForm.value.payment_for = data
    console.log("this.payment.for", this.payOutForm.value.payment_for);
    if (this.payOutForm.value.payment_for[0] === 1) {
      this.three = false
    } else {
      this.three = true
    }

    if (this.payOutForm.value.payment_for[0] === 3 || this.payOutForm.value.payment_for[1] == '3' || this.payOutForm.value.payment_for[2] == '3') {
      this.one = false
    } else {
      this.one = true
    }

    if (this.payOutForm.value.payment_for[0] == '2' || this.payOutForm.value.payment_for[1] == '2') {
      console.log("1");
      this.two = true
       console.log(this.payOutForm.value.total,'totalllll',this.payOutForm.value.amount);
      this.payOutForm.get('total').patchValue(this.payOutForm.value.amount)
     

    } else {
      this.two = false
    }
    console.log("00000", this.payOutForm.value.payment_for);

  }

  onChange(data) {
    console.log("gggg", data);

    if (this.invoice_list.includes(data)) {
      this.invoice_list = this.invoice_list.filter((value) => value != data);
      console.log("12", this.invoice_list)
      this.payment.invoice_list = this.invoice_list
      let tempBalAmt = this.payOutForm.value.amount
      this.payment.balance_amt = this.payOutForm.value.amount
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
      let tempBalAmt = this.payOutForm.value.amount
      this.payment.balance_amt = this.payOutForm.value.amount
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
  selectAll(checked: boolean) {
    for (let item of this.invoice) {
      item.checked1 = checked;
    }
  }

  calculateTotalOldValue(): number {
    this.payOutForm.value.total = 0;
    for (let item of this.invoice) {
      this.payOutForm.value.total += parseFloat(item.old_value);
      
    }
    return this.payOutForm.value.total;
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
    this.payment.balance_amt = this.payOutForm.value.amount - tt
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
          element.jk=element.remaining_amt
          // element.deductedAmount = 0
          element.a = element.remaining_amt
          element.checked=false
        });
      })
    }
  }

}
