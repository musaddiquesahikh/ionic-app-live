import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { TranslateService } from '@ngx-translate/core';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';
@Component({
  selector: 'app-edit-payment-out',
  templateUrl: './edit-payment-out.page.html',
  styleUrls: ['./edit-payment-out.page.scss'],
})
export class EditPaymentOutPage implements OnInit {

  payment: any = {};
  company: any = []
  ledger_name: any
  handover_to: any
  submit: boolean
  payment1: any = [];
  ledgerName: any
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
  received_for: any
  party_name: any
  party_id: any
  data
  data1
  result1: any = []
  result: any = []
  result2: any = []
  paymentD: any = []
  one: boolean = true
  two: boolean = true
  three: boolean = true
  invoiceList: any = []
  same: number;
  invoice_list: any = [];
  invData = []
  n: any
  inv: boolean = false
  balanceHide: boolean;
  checked1: boolean
  total: number = 0;
  cashModel: boolean
  bankModel: boolean
  chequeModel: boolean
  array: any = []

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public location: Location,
    public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {
    console.log("data1", this.data1);
    this.getData()
  }
  getData() {
    // this.api.getDefaultData().subscribe((response: any[]) => {
    //   console.log("zzzzzz", response);
    // })
    console.log("data receive from manage money", this.data);
    this.data.id = this.data.id
    console.log("id", this.data.id);
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.data.company = this.company[0].id
    console.log("comp", this.data.company);
    let header = this.api.getHeader();

    this.api.getParticularPayment(this.data.id, { company: this.data.company }).subscribe((response: any) => {
      console.log("lll", response);
      this.payment = response.data
      console.log("this.payment", this.payment);
      this.payment.payment_for = JSON.parse(this.payment.payment_for)
      this.payment.ledger_under = this.payment.received_for
      console.log("ooooo", response.data.group);

      if (this.payment.group != null) {
        this.payment.received_for = this.payment.group
        console.log("mmmm", this.payment.received_for);
      } else {
        this.payment.received_for = this.payment.received_for
      }

      this.ledgerCategory = JSON.parse(localStorage.getItem("ledgerCategory"));
      this.result = this.ledgerCategory.filter((obj) => {
        return obj.id == this.payment.received_for;
      });
      console.log("uuuuu", this.result);
      this.payment.received_for = this.result[0].received_for
      this.categoryId = this.result[0].id

      this.payment.company = this.api.getCompanyId()
      this.api.getPaidReceived(this.payment, header).subscribe((response: any) => {
        console.log("ledger_under1", response);
        this.payment1 = response.data
        console.log("ledger_underjkkj", this.payment1);
        if (this.payment1.received_for != 'Parties') {
          this.result1 = this.payment1.filter((obj) => {
            return obj.id == this.payment.ledger_name;
          });
          console.log("ddddd", this.result1[0].ledger_name);
          if (this.categoryId != 18) {
            this.payment.ledger_name = this.result1[0].ledger_name
          }
        }
      });

      let companyId = this.api.getCompanyId()
      let m = ''
      this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {

        this.partyList = response.data
        console.log('1', this.partyList);

        this.result2 = this.partyList.filter((obj) => {
          return obj.id == this.payment.party_name
        });
        console.log("kkkk", this.result2);
        if (this.categoryId == 18) {
          this.payment.Party_name1 = this.result2[0].Party_name
        }
        console.log("ledger_under", this.payment.Party_name);

        console.log("companyid", companyId);
        console.log("this.payment.ledger_name", this.payment.ledger_name);


      })
    })
    // this.getledger();
    this.submit = false
    //this.payment.party_name = null
    this.cash()
    this.detailsInCheque()
    this.detailsBankTransfer()
    console.log("ledg", this.categoryId);
    console.log("partylist", this.partyList);
  }
  editPaymentOut() {
    this.handover_to = null
    console.log("pppppp", this.result);
    this.payment.received_for = this.result[0].parent_id
    if (this.payment.received_for.type == "parent") {
      this.payment.group = null
    } else {
      this.payment.group = this.result[0].id
    }

    if (this.payment.payment_type == "1") {
      this.handover_to = this.payment.handover_to
    }
    if (this.payment.received_for == '18') {
      this.ledger_name = null
    } else {
      this.ledger_name = this.result1[0].id
    }
    let companyId = this.api.getCompanyId()
    this.payment.company = companyId;
    let header = this.api.getHeader();

    let party_id: string = null
    console.log(typeof (this.partyId) !== "undefined");
    if (typeof (this.partyId) !== "undefined") {
      party_id = this.partyId
    }
    this.payment.cheque_no = null
    this.payment.reference_no = null
    this.payment.cheque_no = null
    this.payment.cheque_no = null
    this.payment.pk = this.data.id

    this.payment = {
      "pk": this.payment.pk,
      "company": companyId,
      "receipt_no": this.payment.receipt_no,
      "receipt_date": this.payment.receipt_date,
      "amount": this.payment.amount,
      "cheque_no": this.payment.cheque_no,
      "issued_date": this.payment.issued_date,
      "cleared_date": this.payment.cleared_date,
      "notes": this.payment.notes,
      "reference_no": this.payment.reference_no,
      "party_name": this.payment.party_name,
      "received_for": this.payment.received_for,
      "payment_type": this.payment.payment_type,
      "handover_to": this.handover_to,
      "ledger_name": this.ledger_name,
      "bank": this.payment.bank,
      "payment_for": this.payment.payment_for,
      "balance_amt": this.payment.balance_amt,
      "group": this.payment.group
    }
    console.log("payment", this.payment)
    if (this.payment)
      this.api.editPaymentOut(this.payment, header).subscribe(async (response: any) => {
        console.log(response);
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: response.msg,
            duration: 5000,
            position: 'middle'
          });
          toast.present();
          this.modalCtrl.dismiss(response.data)
        } else {
          // alert('Please enter appropriate data')
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.PLEASE ENTER APPROPRIATE DATA'),
            duration: 5000,
            position: 'middle'
          });
          toast.present();
        }
      });
  }

  optionChange(item: any) {
    let companyId = this.api.getCompanyId()
    this.payment.company = companyId
    console.log("this.payment.company", this.payment.company);
    this.categoryId = item
    this.payment.ledger_under = this.categoryId
    console.log("ledger", this.categoryId);
    let header = this.api.getHeader();
    this.payment.company = this.api.getCompanyId()
    this.api.getPaidReceived(this.payment, header).subscribe((response: any) => {
      console.log("ledger_under1", response);
      this.payment1 = response.data
      console.log("ledger_underjkkj", this.payment1);

    });

  }

  selected(item: any) {
    console.log("party", item);
    this.partyId = item.id

  }

  cashDetails() {
    console.log(this.payment);
    this.modalCtrl.dismiss();
  }
  chequeDetails() {
    console.log(this.payment);
    this.modalCtrl.dismiss();
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
  bankTransferDetails() {
    console.log(this.payment);
    this.modalCtrl.dismiss();
  }
  cash() {
    let companyId = this.api.getCompanyId()
    this.payment.company_id = companyId
    let header = this.api.getHeader();
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any[]) => {
      console.log('190', response);
      this.cashLedger = response
      console.log("98", this.cashLedger);

    })
  }
  getbank() {
    let companyId = this.api.getCompanyId()
    // this.payment.company = companyId
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.bankList = response
    })
  }
  select(item: any) {
    console.log("selectcashLedger", item);
    this.handover_to = item

  }
  modaldismiss() {
    this.modalCtrl.dismiss()
  }

  createNewBank() {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('/create-new-bank')
  }
  option(item: any) {
    console.log("selected ledger", item);
    this.ledger_name = item
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
        console.log("from address 123 ", user)
        this.cashLedger.push(user)
      });
    return await modal.present();
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
  parentFunction1(data: any) {
    console.log("hhhhh", data);
    this.cashModel = false
    this.payment.payment_type = data.payment_type
    this.payment.handover_to = data.handover_to
    this.payment.cleared_date = data.cleared_date
    this.payment.bank_name = null
  }

  parentFunction(data: any) {
    console.log("hhhhh", data);
    this.chequeModel = false
    this.payment.payment_type = data.payment_type
    this.payment.cheque_no = data.cheque_no
    this.payment.cleared_date = data.cleared_date
    this.payment.issued_date = data.issued_date
    this.payment.bank_name = data.bank_name
    this.payment.handover_to = null
  }

  parentFunction2(data: any) {
    console.log("hhhhh", data);
    this.bankModel = false
    this.payment.payment_type = data.payment_type
    this.payment.cleared_date = data.cleared_date
    this.payment.bank_name = data.bank_name
    this.payment.reference_no = data.reference_no
    this.payment.handover_to = null
  }

  // dismiss(index) {
  //   this.payment.invoice_list.splice(index, 1);
  //   this.newFun()
  // }

  Function(data: any) {
    console.log("data", data);
    this.payment.payment_for = data
    console.log("this.payment.for", this.payment.payment_for);
    if (this.payment.payment_for[0] === 1) {
      this.one = true
      this.three = false
    } else {
      this.three = true
    }

    if (this.payment.payment_for[0] == 3 || this.payment.payment_for[1] == '3' || this.payment.payment_for[2] == '3') {
      this.three = true
      this.one = false
    } else {
      this.one = true
    }

    if (this.payment.payment_for[0] == '2' || this.payment.payment_for[1] == '2') {
      console.log("1");
      this.two = false
    } else {
      this.two = true
    }
    console.log("00000", this.payment.payment_for);

  }


  onChange(event, p: any) {
    console.log("in onchange data", p, "yyyy", event.target.checked);
    if (event.target.parmeshwar == undefined) {
      event.target.parmeshwar = false
    }

    if (event.target.checked) {
      console.log("checked");

      p.checked1 = true
      this.array.push(p)
      let ff = 0
      this.array.forEach(function (value) {
        ff = Number(value.remaining_amt) + ff;
      })
      this.same = ff
      // if (!event.target.parmeshwar) {
      this.payment.invoice_list = this.array
      // }
      // this.payment.invoice_list=this.array
      let tempBalAmt = this.payment.amount
      this.payment.balance_amt = this.payment.amount
      this.invData = []
      for (let inv of this.payment.invoice_list) {
        if (this.payment.balance_amt > inv.remaining_amt) {
          inv.remaining_amt = inv.remaining_amt
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
          invoice_date: inv.invoice_date,
          invoice_no: inv.invoice_no
        })
      }
    }
    else {
      console.log("unChecked");
      let index = this.array.findIndex((element) => element['id'] == p.id);
      this.array[index].checked1 = false
      this.array.splice(index, 1);
      let ff = 0
      this.array.forEach(function (value) {
        ff = Number(value.remaining_amt) + ff;
      })
      this.same = ff
      // if (!event.target.parmeshwar) {
      this.payment.invoice_list = this.array
      // }
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
          invoice_date: inv.invoice_date,
          invoice_no: inv.invoice_no
        })
      }
    }
  }
  selectAll(checked: boolean) {
    for (let item of this.invoiceList) {
      item.checked1 = checked;
    }
  }

  calculateTotalOldValue(): number {
    this.total = 0;
    for (let item of this.invoiceList) {
      this.total += parseFloat(item.old_value);
    }
    return this.total;
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
  invoice_details() {
    let company_id = this.api.getCompanyId()
    let data = { company_id: company_id, party_id: this.payment.party_name }
    let header = this.api.getHeader();
    console.log("mmmmm", data);
    this.api.getparticularPaymentInInvoice(data, header).subscribe((response: any) => {
      console.log('19000000', response);
      this.invoiceList = response.data
      console.log("invoice", this.invoiceList);

      let list = []
      for (let f of this.invoiceList) {
        if (f.payment_status == 1 || f.payment_status == 2) {
          list.push(f)
        }
        for (let j of this.payment.invoice_list) {
          if ((j.inv_id == f.id) && !list.includes(f)) {
            list.push(f)
          }
        }
      }
      this.invoiceList = list
      console.log("after payment status invoice", this.invoiceList);

      this.invoiceList.forEach(element => {
        element.old_value = element.remaining_amt
      });
      console.log("xxxx", this.invoiceList);
      console.log("xxx111", this.payment.invoice_list);


      let dummyList = []
      for (let i of this.invoiceList) {
        i.checked1 = false
        let data1 = this.payment.invoice_list
        for (let j of this.payment.invoice_list) {
          if (j.inv_id == i.id) {
            i.checked1 = true
            dummyList.push(i)
            i.remaining_amt = j.inv_amt
            i.old_value = j.old_value
            let event = {
              target: {
                checked: true,
                parmeshwar: true
              }
            }

            this.onChange(event, i)
            this.payment.invoice_list = data1
          }
        }
      }
      this.chheck()
    })

  }

}

