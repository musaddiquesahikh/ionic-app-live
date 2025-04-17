import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { PermissionGuard } from '../guards/permission.guard';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';


@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.page.html',
  styleUrls: ['./edit-expense.page.scss'],
})
export class EditExpensePage implements OnInit {
  particularData
  cashModel: boolean
  bankModel: boolean
  chequeModel: boolean
  company: any = []
  particularExp: any = {}
  data1: any = []
  expenseData: any = []
  category_wise_report: any

  exp: any = {};
  submit: boolean
  bankData: any = [];
  partyGst: any
  party_Gst: any
  payment: any = {};
  cashLedger: any = []
  company_gst: any
  igst: number
  totalamount: number
  total_amount: number
  cgst: number
  sgst: number
  subTotal: number;
  total3: number;
  categoryId: any;
  partyId: null
  cashId: number;
  bank_name: number
  bankList: any = []
  data: any = [
    {
      "amt": 0,
      "desc": "",
      "tax": 0
    }
  ]
  user: any = {}
  expNo: any;
  exdate: any;
  expenseCategory: any = []
  party_List: any = []

  exp1: any = [
    {
      desc: "",
      amt: 0,
      tax: 0
    }]
  party_details: any;
  party_id: any;
  partyGstNo: any;
  constructor(public api: ApiService, public modalCtrl: ModalController, public router: Router,
    public location: Location, public toastController: ToastController, private translate: TranslateService,public permission:PermissionGuard) { }

  ngOnInit() {
    this.getExpenseData()
    this.cashModel = false
    this.chequeModel = false
    this.bankModel = false
  }
  getExpenseData() {
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.particularExp.company = companyId
    this.particularExp.id = this.particularData
    console.log("this.particularExp.id", this.particularExp.id);

    this.api.particularExpenseData(this.particularExp, header).subscribe((response: any) => {
      this.particularExp = response.data
      this.user = response.data
      console.log("this.user", this.user);


      this.exp1 = this.particularExp.data
      this.data1 = this.particularExp.data
      this.calculatePartygst(this.user)
    })
    this.getSelectedCashLedger()
    this.submit = false
    this.user.igst = 0
    this.user.cgst = 0
    this.user.sgst = 0
    this.bank_name = 0
    this.user.gst = 0

    this.user.party_name = null
    this.user.invoice_no = null
    this.user.invoice_date = null

    this.total3 = this.total();
    this.expNo = 1;
    this.exdate = Date.now();
    let a = this.api.getCompanyId()

    this.api.getexpenseCategory(a, header).subscribe((response: any) => {
      this.expenseCategory = response.data
    });
    this.selectedPartyList()

  }
  selectedPartyList() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {
      this.party_List = response.data;
      console.log("this.party_List", this.party_List);

    })

  }

  getSelectedCashLedger() {
    let header = this.api.getHeader();
    this.payment.company_id = this.api.getCompanyId()
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any[]) => {
      this.cashLedger = response
    })
    this.getBankList()
  }
  getBankList() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.api.bankList(companyId, header).subscribe((response: any) => {
      let a = response.status
      this.bankList = response
      if (a == 500) {
        this.bankList = []
      }

    })
  }
  async expense() {
    this.bank_name = 0
    this.user.party_name = this.particularExp.party_name
    this.calculateAmount()
    this.user = this.particularExp
    this.user.expenseCategory = Number('this.user.expense_category')
    this.party_id = this.user.party_name
    this.user =
    {
      "id": this.particularData,
      "is_tax": this.user.is_tax,
      "gst": this.user.gst,
      "party_name": this.party_id,
      "invoice_no": this.user.invoice_no,
      "invoice_date": this.user.invoice_date,
      "payment_date": this.user.payment_date,
      "expense_category": this.user.expense_category,
      "igst": this.user.igst,
      "cgst": this.user.cgst,
      "sgst": this.user.sgst,
      "cleared_date": this.user.cleared_date,
      "cheque_no": this.user.cheque_no,
      "issued_date": this.user.issued_date,
      "payment_type": this.user.payment_type,
      "handover_to": this.user.handover_to,
      "total_amount": this.total_amount,
      "bank_name": this.user.bank_name,
      "reference_no": this.user.reference_no,
      "data": this.exp1

    }

    let companyId = this.company.id;
    this.user.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    if (this.user.expense_category && this.user.payment_type && this.user.payment_date) {
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
      this.api.editExpense(this.user, header).subscribe(async (response: any) => {
        console.log("response from edit expence", response);

        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.EXPENSE UPDATE SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          // this.expenseData = response.data
          console.log("send data", response.data);
          this.modalCtrl.dismiss(response.data);
        }
        else {
          // alert('please enter required feild')
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      });
    }
  }

  total() {
    let ff = 0;
    this.exp1.forEach(function (value) {
      ff = value.amt + ff;
    });
    this.subTotal = ff;
    return ff;
  }

  do() {
    this.total3 = this.total();
    this.user.totalamount = this.total3
    this.calculateTax()
    this.calculateAmount()
    this.total_amount = this.user.totalamount
    this.total_amount = this.total3 + this.user.igst + this.user.cgst + this.user.sgst
  }

  async addParty() {
    const modal = await this.modalCtrl.create({
      component: AddNewPartyPage,

    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        this.selectedPartyList()
      });

    return await modal.present();
  }

  addNewExpense() {
    this.modalCtrl.dismiss();
  }
  editExp() {
    this.expNo = this.user.expNum;
    this.exdate = this.user.date;
    this.modalCtrl.dismiss();

  }
  CashModel() {
    this.cashModel = true
    this.chequeModel = false
    this.bankModel = false
  }

  ChequeModel() {
    this.chequeModel = true
    this.cashModel = false
    this.bankModel = false
  }

  BankTransferModel() {
    this.bankModel = true
    this.cashModel = false
    this.chequeModel = false
  }

  addNewExpenseCategory() {
    this.modalCtrl.dismiss();
    this.company = JSON.parse(sessionStorage.getItem("selectedCompany"));
    let companyId = this.company.id;
    this.exp.company = companyId
    let header = this.api.getHeader();
    this.exp.company =
      this.api.createNewExpenseCategory(this.exp, header).subscribe((response: any[]) => {
      });
  }


  ClickNewRow() {
    let data = {
      desc: "",
      amt: 0,
      tax: 0
    }
    this.exp1.push(data);
  }

  selected(item: any) {
    this.partyId = item
  }

  cashDetails() {
    this.user.payment_type = 1
    this.user.bank_name = null
    this.submit = true
    this.modalCtrl.dismiss();
    // }
  }

  chequeDetails() {
    this.user.handover_to = null
    this.user.payment_type = 2
    this.submit = true
  }
  bankTransferDetails() {
    this.user.handover_to = null
    this.user.payment_type = 3
    this.submit = true
    this.modalCtrl.dismiss();
  }

  cheque() {
    this.getBankList()
  }

  async createNewBank() {
    const modal = await this.modalCtrl.create({
      component: CreateNewBankPage,

    });

    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        this.bankList.push(user)
      });

    return await modal.present();
  }

  getbank() {
    let companyId = this.company.id;
    this.payment.company = companyId
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      this.bankList = response
    })
  }
  select(item: any) {

    this.cashId = item
  }

  calculateAmount() {
    if (this.user.is_tax == 2) {
      this.user.gst = 0
    }

    let ff = 0;
    this.exp1.forEach(function (value) {
      ff = value.amt + ff;
    });
    this.totalamount = ff;

    this.companyGst()

    this.calculateTax()
    this.calculateGst()
    return ff;
  }

  calculateTax() {
    if (this.user.gst) {
      this.totalamount = (this.user.gst / 100 * this.totalamount)
    } else {
      this.totalamount = 0
    }
  }

  companyGst() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.company_gst = this.company[0].gst_number
    if (this.company_gst == null) {
      this.company_gst = null
    } else {
      this.company_gst = this.company_gst.slice(0, 2)
    }
  }

  calculatePartygst(user: any) {
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader()
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {
      this.party_List = response.data;
      console.log("this.user.party_name", this.user.party_name);
      console.log("party_list", this.party_List);
      if (this.user.party_name != null) {
        this.partyGstNo = this.party_List.filter((value) => value.id === this.user.party_name);
        console.log(" this.partyGstNo", this.partyGstNo);
        if (this.party_Gst == null) {
          this.partyGst = this.partyGstNo[0].gst_compare
        } else {
          this.partyGst = this.party_Gst.slice(0, 2)
        }
      }
    })

  }

  calculateGst() {
    if (this.company_gst) {
      if (this.partyGst) {
        if (this.partyGst == this.company_gst) {
          this.user.cgst = this.totalamount / 2
          this.user.sgst = this.totalamount / 2
          this.user.igst = 0
          this.total_amount = this.subTotal + this.user.cgst + this.user.sgst
        } else {
          this.user.cgst = 0
          this.user.sgst = 0
          this.user.igst = this.totalamount
          this.total_amount = this.subTotal + this.user.igst
        }
      } else {
        this.user.cgst = this.totalamount / 2
        this.user.sgst = this.totalamount / 2
        this.user.igst = 0
        this.total_amount = this.subTotal + this.user.cgst + this.user.sgst
      }
    }
    else {
      this.user.cgst = 0
      this.user.sgst = 0
      this.user.igst = 0
      this.total_amount = this.subTotal
    }
  }

  async createCashledger() {
    this.payment.payment_type = ""
    const modal = await this.modalCtrl.create({
      component: AddCashLedgerPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        this.getExpenseData()
      });
    return await modal.present();
  }
  async modelDismiss() {
    await this.modalCtrl.dismiss(this.particularExp);

  }
  parentFunction1(data: any) {
    console.log("hhhhh", data);
    this.cashModel = false
    this.user.payment_type = data.payment_type
    this.user.handover_to = data.handover_to
    this.user.cleared_date = data.cleared_date
    this.user.bank_name = null
  }

  parentFunction(data: any) {
    console.log("hhhhh", data);
    this.chequeModel = false
    this.user.payment_type = data.payment_type
    this.user.cheque_no = data.cheque_no
    this.user.cleared_date = data.cleared_date
    this.user.issued_date = data.issued_date
    this.user.bank_name = data.bank_name
    this.user.handover_to = null
  }

  parentFunction2(data: any) {
    console.log("hhhhh", data);
    this.bankModel = false
    this.user.payment_type = data.payment_type
    this.user.cleared_date = data.cleared_date
    this.user.bank_name = data.bank_name
    this.user.reference_no = data.reference_no
    this.user.handover_to = null
  }

}
