import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-journal-voucher',
  templateUrl: './edit-journal-voucher.page.html',
  styleUrls: ['./edit-journal-voucher.page.scss'],
})
export class EditJournalVoucherPage implements OnInit {

  Journal: any = {}
  result: any
  submit: boolean = false;
  ledger_List: any = []
  JVLedger: any = []
  constructor(public api: ApiService, public toastController: ToastController, public location: Location,
    private alert: AlertController, private platform: Platform, public modalCtrl: ModalController, private translate: TranslateService) {
  }
  data
  voucherlist = [];
  //ledgerData:any=[]
  ledgerData: any = [
    {
      voucher_type: "1",
      ledger_name: 0,
      amount: 0,
      ledger_type: ""
    },
    {
      voucher_type: "2",
      ledger_name: 0,
      amount: 0,
      ledger_type: ""
    }
  ];
  ngOnInit() {
    this.getData()
    this.Journal.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.getJVLedger(this.Journal, header).subscribe((response: any) => {
      localStorage.setItem('JVLedger', JSON.stringify(response.data))
    });
  }
  getData() {
    console.log("data", this.data);
    this.submit = false;

    this.Journal.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.Journal.voucher_no = this.data.voucher_no
    this.api.getJournalVoucher(this.Journal, header).subscribe(async (response: any) => {
      console.log(response);
      this.Journal = response.data
      this.ledgerData = this.Journal.data

      this.JVLedger = JSON.parse(localStorage.getItem("JVLedger"))

      for (let row of this.ledgerData) {

        if (row.ledger) {
          row.ledger_name = row.ledger
          row.ledger_type = "ledgers"
          // row.ledger = 
        } else if (row.party) {
          row.ledger_name = row.party
          row.ledger_type = "party"
        } else if (row.cash) {
          row.ledger_name = row.cash
          row.ledger_type = "cash"
        }
        console.log(this.JVLedger, "jvledger");

        let result = this.JVLedger.filter((obj) => {
          return obj.id == row.ledger_name;
        });
        console.log("result", result)
        row.ledger = result[0].name
      }
      console.log("this.ledgerData", this.ledgerData);
      this.Journal.company_id = this.api.getCompanyId()
      this.api.getJVLedger(this.Journal, header).subscribe((response: any) => {
        console.log(response);
        this.JVLedger = response.data

        console.log("JVL", this.ledger_List);

        for (let data of this.ledgerData) {
          this.result = this.JVLedger.filter((obj) => {
            return obj.id == data.ledger_name;
          });
          console.log("uuuuu", this.result[0].name);
          this.ledgerData.ledger = this.result[0].name
        }

      });
    })
  }

  ClickNewRow() {
    let data = {
      voucher_type: "",
      ledger_name: "",
      amount: 0

    }
    this.ledgerData.push(data);
  }
  async addvoucher() {
    let companyId = this.api.getCompanyId()
    console.log("party details", companyId);
    let header = this.api.getHeader();

    //console.log("ledger_list", this.ledger_list);

    this.Journal =
    {
      "voucher_no": this.data.voucher_no,
      "voucher_date": this.Journal.voucher_date,
      "data": this.ledgerData,
      "narration": this.Journal.narration,
      "company": companyId
    }

    console.log("data", this.Journal);

    console.log("updated data", this.Journal);

    const forDebit = this.ledgerData.filter(data => data.voucher_type === '1').reduce((forDebit, current) => forDebit + current.amount, 0)
    console.log("debit=", forDebit);

    const forCredit = this.ledgerData.filter(data => data.voucher_type === '2').reduce((forCredit, current) => forCredit + current.amount, 0)
    console.log("credit=", forCredit);

    if (this.Journal.voucher_no && this.Journal.voucher_date && this.Journal.data && this.Journal.company) {
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
      if (forDebit == forCredit) {

        this.api.editJournalVoucher(this.Journal, header).subscribe(async (response: any) => {
          console.log("oooooo", response);
          if (response.status == 200) {
            // let msg = response.msg
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.VOUCHER UPDATED SUCCESSFULLY'),
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.modalCtrl.dismiss(response.status)
          }

        });
      }
      else {

        const toast = await this.toastController.create({
          // message: this.translate.instant('message.Successfully removed account')
          message: 'overall credit amount should be same as overall debit amount',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
  }
  selectedJv(lc: any, i: number) {
    console.log("ddd", lc, i);
    this.ledgerData[i].ledger = lc.name
    this.ledgerData[i].ledger_type = lc.type
    this.ledgerData[i].ledger_name = lc.id

    this.voucherlist[i] = false;


  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.ledger_List = this.JVLedger
    // console.log("item",this.ledger_List);
  }
  getVoucher(val: any, i: number) {
    this.voucherlist[i] = true;
    console.log("functionCalling voucher", val, "of", i);

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    // const val = l.target.value;
    //console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.ledger_List = this.ledger_List.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }

  }

}

