import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { DatePipe, Location } from '@angular/common';
import { CreateNewLedgerPage } from '../create-new-ledger/create-new-ledger.page';
import { TranslateService } from '@ngx-translate/core';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { PermissionGuard } from '../guards/permission.guard';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';
import { AddNewBankPage } from '../add-new-bank/add-new-bank.page';

@Component({
  selector: 'app-payment-out',
  templateUrl: './payment-out.page.html',
  styleUrls: ['./payment-out.page.scss'],
})
export class PaymentOutPage implements OnInit {
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

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    public location: Location, public modalController: ModalController, public alertCtrl: AlertController,
    public permission: PermissionGuard,
    public datepipe: DatePipe, private translate: TranslateService,private formBuilder:FormBuilder) { 

      this.payOutForm = this.formBuilder.group({
        'receipt_no': ['', Validators.required],
      });
    }

  ngOnInit() {
    this.getledger();
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
      console.log("api called", response);
      this.invNo = response.last_pay_out
      this.payment.receipt_no = this.invNo
    })
    this.payment.receipt_no = this.invNo
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
      //this.ledgerCategory = response["Data"]
      console.log("ledgerCategory", this.ledgerCategory);
      localStorage.setItem('ledgerCategory', JSON.stringify(response.Data));
    });
  }
  async createPaymenOut() {
    this.handover_to = null
    if (this.payment.payment_type == "1") {
      this.handover_to = this.payment.handover_to
      this.payment.bank = null;
    }
    console.log("this.payment.received_for", this.payment.received_for);

    if (this.payment.received_for.id == '18') {
      this.ledger_name = null
      console.log("this.ledger_name ", this.ledger_name);

    }

    if (this.payment.receipt_no && this.payment.receipt_date && this.payment.amount && this.payment.received_for) {
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
      this.payment.received_for = this.categoryId
      this.payment.cheque_no = null
      this.payment.reference_no = null
      this.payment.cheque_no = null
      this.payment.cheque_no = null
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
        "received_for": this.payment.received_for,
        "payment_type": this.payment.payment_type,
        "handover_to": this.handover_to,
        "ledger_name": this.ledger_name,
        "bank": this.payment.bank,
        "group": this.payment.group
      }
      console.log("payment", this.payment)
      if (this.payment)
        this.api.createPaymentOut(this.payment, header).subscribe(async (response: any) => {
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

            // window.location.reload();
            // this.location.back()
          } else {
            // alert('Please enter appropriate data')
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
  async createCashledger() {
    // this.payment.payment_type = ""
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalCtrl.create({
            component: AddCashLedgerPage,
            cssClass: 'my-custom-class',
          });

          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              if (user != undefined) {
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
            component: AddNewPartyPage,

          });

          modal.onDidDismiss()
            .then((data) => {
              const user = data.data; // Here's your selected user!
              console.log("from address ", user)
              if (user != "") {
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
              if (user != "") {
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
  async createNewBank() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalController.create({
            component: AddNewBankPage,
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 909", user)
              if (user != "") {
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

  modalCtrldismiss() {
    this.modalCtrl.dismiss()
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
  cashDetails() {
    console.log(this.payment);
    this.payment.bank_name = null
    this.payment.payment_type = 1
    this.hide = "hide"
  }
  chequeDetails() {
    console.log(this.payment);
    this.payment.handover_to = null
    this.payment.payment_type = 2
    this.hideCheque = "hideCheque"
  }
  bankTransferDetails() {
    console.log(this.payment);
    this.payment.payment_type = 3
    this.payment.handover_to = null
    this.hideBank = "hideBank"
  }
  back(){
    this.modalCtrl.dismiss()
  }

}

