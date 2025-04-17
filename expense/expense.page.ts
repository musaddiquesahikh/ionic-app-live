import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { PermissionGuard } from '../guards/permission.guard';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { log } from 'console';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {
  exp: any = {};
  // @Input() partyDetails
  cat: any = []
  submit: boolean
  bankData: any = [];
  partyGst: any
  cashModel: boolean
  bankModel: boolean
  chequeModel: boolean
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
  company: any = []
  expenseCategory: any = []
  party_List: any = []
  exp1: any = [
    {
      desc: "",
      amt: 0,
      tax: 0
    }]
  party_details: any;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router,
    public location: Location, public modalController: ModalController, public toastController: ToastController,
    private translate: TranslateService,private permission: PermissionGuard, public alertCtrl:AlertController,private popover:PopoverController) {

  }
  ngOnInit() {
    this.user.is_tax1=false
    this.getdata()
    this.cashModel = false
    this.chequeModel = false
    this.bankModel = false
    const currentDate = new Date().toISOString().substring(0, 10);
    this.user.invoice_date = currentDate
    this.user.payment_date = currentDate
  }
 

  parentFunction9(item: any) {
    console.log("item received from party", item);
  }

  expense() {
    console.log(this.exp1);
    this.calculateAmount()
    console.log(this.total_amount,"total1")    
    this.user =

    {
      "is_tax": this.user.is_tax,
      "is_tax1":false,
      "gst": this.user.gst,
      "party_name": this.user.party_name,
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
      "data": this.exp1,
      "category":this.expenseCategory
    }

    let companyId = this.api.getCompanyId();
    console.log("party details", companyId);
    console.log("all data of expense", this.user);
    this.user.company = companyId
    let header = this.api.getHeader();
    console.log("all over data");
    if (this.user.expense_category && this.user.payment_type && this.user.payment_date) {
      this.submit = true
    } else {
      this.submit = false
      alert(this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'))
    }
    if (this.submit == true) {
      this.user.created_by_user=JSON.parse(localStorage.getItem("loginData")).user[0].mobile
      console.log(this.total_amount,"total3")
      this.api.createNewExpense(this.user, header).subscribe(async (response: any) => {
        console.log('867', response);
        let a = response.status
        if (a == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.EXPENSE CREATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.location.back()
        }
        else {
          alert(this.translate.instant('MESSAGE.SOMETHING WENT WRONG'))

        }
      });
    }
  }

  getdata() {
    this.user.is_tax = 2
    this.submit = false
    this.companyGst()
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

    this.getExpenseCategory()
    this.getSelectedPartyList()
    this.getSelectedCashLedger()
    this.getBankList()
  }

  getExpenseCategory() {
    let header = this.api.getHeader();
    let a = this.api.getCompanyId();
    this.api.getexpenseCategory(a, header).subscribe((response: any) => {
      console.log(response);
      this.expenseCategory = response.data
    });
  }

  getSelectedPartyList() {
    let companyId = this.api.getCompanyId();
    let header = this.api.getHeader();
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {
      console.log('1', response);
      this.party_List = response.data;
      console.log("party_List", this.party_List);
    });
  }

  getSelectedCashLedger() {
    let header = this.api.getHeader();
    this.payment.company_id = this.api.getCompanyId()
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any) => {
      console.log('190', response);
      this.cashLedger = response
      console.log("98", this.cashLedger);
    })
  }

  parentFunction1(data: any) {
    console.log("hhhhh", data);
    this.cashModel = false
    this.user.payment_type = data.payment_type
    this.user.handover_to = data.handover_to
    this.user.cleared_date = data.cleared_date
    this.user.bank_name = null
    console.log(this.total_amount,'tot2');
  }

  parentFunction(data: any) {
    console.log("hhhhh1", data);
    this.chequeModel = false
    this.user.payment_type = data.payment_type
    this.user.cheque_no = data.cheque_no
    this.user.cleared_date = data.cleared_date
    this.user.issued_date = data.issued_date
    this.user.bank_name = data.bank
    this.user.handover_to = null
    console.log(this.total_amount,'tot1');
    
  }

  parentFunction2(data: any) {
    console.log("hhhhh2", data);
    this.bankModel = false
    this.user.payment_type = data.payment_type
    this.user.cleared_date = data.cleared_date
    this.user.bank_name = data.bank
    this.user.reference_no = data.reference_no
    this.user.handover_to = null
    console.log(this.total_amount,'tot3');
  }

  getBankList() {
    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called bank", response);
      let a = response.status
      this.bankList = response
      if (a == 500) {
        this.bankList = []
      }
    })
  }

  total() {
    let ff = 0;
    this.exp1.forEach(function (value) {
      ff = value.amt + ff;
    });
    this.subTotal = ff;
    return ff;
  }

  do($event) {
    console.log($event.target.value);
    this.exp1.amt = $event.target.value
    this.total3 = this.total();
    this.user.totalamount = this.total()
    console.log("toal", this.user.totalamount);
    this.calculateTax()
    this.calculateAmount()
    this.calculateGst()
    this.total_amount = this.user.totalamount
    this.total_amount = this.total3 + this.user.igst + this.user.cgst + this.user.sgst
    console.log("final", this.total_amount);
  }
  async addParty() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'expense') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
    const modal = await this.modalController.create({
      component: CreateNewPartyPage

    });

    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getSelectedPartyList()
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
  addNewExpense() {
    console.log('login Successful', this.user);
    this.modalCtrl.dismiss();
  }

  editExp() {
    console.log(this.user);
    this.expNo = this.user.expNum;
    this.exdate = this.user.date;
    this.modalCtrl.dismiss();
  }

  addNewExpenseCategory() {
    // this.modalCtrl.dismiss();
    let companyId = this.api.getCompanyId();
    this.exp.company = companyId
    let header = this.api.getHeader();
    this.api.createNewExpenseCategory(this.exp, header).subscribe((response: any) => {
      console.log(response,'respo');
      this.cat = response.data
      this.expenseCategory.push(this.cat)
      if(response.status==200){
         this.popover.dismiss()
      }
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

  delete(i: any) {
    this.exp1.splice(i,1)
    this.calculateAmount()
  }
  selected(item: any) {
    console.log("party", item);
    this.partyId = item
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

  cashDetails() {
    this.user.payment_type = 1
    this.user.bank_name = null
    console.log(this.user);
    this.submit = true
    this.modalCtrl.dismiss();
  }

  chequeDetails() {
    this.user.handover_to = null
    this.user.payment_type = 2
    console.log(this.user);
    this.submit = true
  }

  bankTransferDetails() {
    this.user.handover_to = null
    this.user.payment_type = 3
    this.submit = true
    this.modalCtrl.dismiss();
  }
  select(item: any) {
    this.cashId = item
    console.log("selectcashLedger", this.cashId);
  }
  calculateAmount() {
    if (this.user.is_tax == 2) {
      this.user.gst = 0
     
    }
     console.log(this.total_amount,"total2")
    let ff = 0;
    this.exp1.forEach(function (value) {
      ff = value.amt + ff;
    });
    this.totalamount = ff;
    this.companyGst()
    this.calculateTax()
    this.calculateGst()
    console.log('user detail', this.user);
    console.log(this.totalamount);
    return ff;
  }

  calculateTax() {
    if (this.user.gst) {
      this.totalamount = (this.user.gst / 100 * this.subTotal)
    } else {
      this.totalamount = 0
    }
  }
  companyGst() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.company_gst = this.company[0].gst_number
    console.log('company_gst', this.company_gst);
    if (this.company_gst == null) {
      console.log('applied condition');
      this.company_gst = null

    } else {
      console.log('applied else condition');
      this.company_gst = this.company_gst.slice(0, 2)
      console.log("company_gst", this.company_gst);

    }
    console.log(this.total_amount,"total3")
  }

  calculatePartygst(user: any) {
    console.log("user", user);

    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader()
    this.getSelectedPartyList()
    let c = this.party_List.filter((value) => value.id == user.party_name);
    console.log("filter", c)

    this.party_Gst = c[0].gstin
    console.log("partyG", this.party_Gst);

    if (this.party_Gst == null) {
      this.partyGst = c[0].gst_compare
      console.log("this.partyGst", this.partyGst);

    } else {
      this.partyGst = this.party_Gst.slice(0, 2)
    }

    // this.user.get('gst_compare').patchValue(user.gst_compare)
    // let party_Gst = this.user.gst_compare
    // console.log(party_Gst, "partgstt")
    // this.calculateGst()
    // if (party_Gst === null) {
    //   this.partyGst = null
    // } else {
    //   this.partyGst = party_Gst.slice(0, 2)
    // }
  }
  calculateGst() {

    console.log('gstt of company', this.company_gst);
    console.log('gstt of party', this.partyGst);

    if (this.company_gst) {
      if (this.partyGst) {
        if (this.partyGst == this.company_gst) {
          this.user.cgst =  Math.round((this.totalamount / 2) * 100) / 100
          this.user.sgst =  Math.round((this.totalamount / 2) * 100) / 100
          this.user.igst = 0
          console.log("dsaf", this.user.cgst, this.user.sgst,this.subTotal);

        // this.total_amount =  this.subTotal + this.cgst + this.sgst 
        // this.total_amount = Math.round((this.subTotal + this.cgst + this.sgst))
          console.log('middle1', this.total_amount,this.subTotal);

          // }
        } else {
          console.log('middle2', this.total_amount,this.subTotal,);
          this.user.cgst = 0
          this.user.sgst = 0
          this.user.igst =  Math.round((this.totalamount) * 100) / 100
          // this.total_amount = this.subTotal + this.user.igst
          console.log('middle2', this.total_amount,this.subTotal,);
          // console.log("dsaf", this.user.cgst, this.user.sgst,this.subTotal);
        }
      } else {
        this.user.cgst = Math.round((this.totalamount / 2) * 100) / 100
        this.user.sgst = Math.round((this.totalamount / 2) * 100) / 100
        this.user.igst = 0
        console.log('middle5', this.total_amount,this.totalamount,this.subTotal,this.cgst,this.igst,this.sgst,Math.round((this.totalamount / 2) * 100) / 100,
        Math.round((this.totalamount) * 100) / 100);
        
        // this.total_amount =  this.subTotal + this.cgst + this.sgst 
        console.log('middle3', this.total_amount,this.totalamount,this.subTotal,Math.round((this.subTotal + this.cgst + this.sgst) * 100) / 100);
      }
    }
    else {
      console.log(' calling last else', 55);
      this.user.cgst = 0
      this.user.sgst = 0
      this.user.igst = 0
      this.total_amount =Math.round((this.subTotal) * 100) / 100
      console.log('middle4', this.total_amount);
    }
    console.log(this.total_amount,"total4")
  }
  checktax(e) {
    console.log(e.target.checked, "ppp");
    this.user.is_tax1

    if (e.target.checked) {
      this.user.get('is_tax').patchValue(1)
      this.user.get('is_tax1').patchValue(true)

      this.calculateTax()
      this.calculateGst()
    } else {
      this.user.get('gst').patchValue(0);
      this.user.get('is_tax').patchValue(2)
      this.calculateTax()
      this.calculateGst()
    }
    console.log(this.total_amount,"total5")
  }

}