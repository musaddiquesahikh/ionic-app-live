import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { log } from 'console';

@Component({
  selector: 'app-journal-vouchers',
  templateUrl: './journal-vouchers.page.html',
  styleUrls: ['./journal-vouchers.page.scss'],
})

export class JournalVouchersPage implements OnInit {
  items: any = [];
  lData: any = {};
  invNo: any
  route: any
  company: any = []
  ledgerList: any = []
  ledger: any = []
  JVLedger: any = []
  ledger_List: any = []
  myControl = new FormControl();
  JVLedger_name: any
  ledger_list: any = {}
  submit: boolean = false;
  Journal = {
    voucher_no: 0,
    voucher_date: '',
    data: [],
    company: '',
    narration: ""
  }
  voucherlist = [];
  ledgerData: any= [
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

  constructor(public popoverController: PopoverController, public modalCtrl: ModalController, public api: ApiService,
    public toastController: ToastController, public location: Location, private translate: TranslateService,
    private permission: PermissionGuard, public alertCtrl: AlertController) { }

  ngOnInit() {
    console.log("permission", this.permission);
    const currentDate = new Date().toISOString().substring(0, 10);
    this.Journal.voucher_date = currentDate

    let companyId = this.api.getCompanyId()
    this.lData.company_id = companyId
    let header = this.api.getHeader();
    this.api.getJVLedger(this.lData, header).subscribe((response: any) => {
      console.log(response);
      this.JVLedger = response.data
      console.log("JVL", this.JVLedger);
    });
    this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.invNo = response.last_voucher,
        this.Journal.voucher_no = this.invNo
    })
  }

  async addvoucher() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'voucher') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
        let companyId = this.api.getCompanyId()
        console.log("party details", companyId);
        let header = this.api.getHeader();

        console.log("ledger_list", this.ledger_list);

        this.Journal =
        {
          "voucher_no": this.Journal.voucher_no,
          "voucher_date": this.Journal.voucher_date,
          "data": this.ledgerData,
          "narration": this.Journal.narration,
          "company": companyId
        };
      
        console.log("data", this.Journal);
        console.log(this.ledgerData);
        
        console.log("updated data", this.Journal);

        const forDebit = this.ledgerData.filter(data => data.voucher_type === '1').reduce((forDebit, current) => forDebit + current.amount, 0)
        console.log("debit=", forDebit);

        const forCredit = this.ledgerData.filter(data => data.voucher_type === '2').reduce((forCredit, current) => forCredit + current.amount, 0)
        console.log("credit=", forCredit);

        if (this.Journal.voucher_no && this.Journal.voucher_date && this.Journal.data[1].ledger_name && this.Journal.company) {
          this.submit = true
          console.log(this.submit);
          
        } else {
          this.submit = false
          console.log("journal");
          
          alert(this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'))
        }


        if (this.submit == true) {
          if (forDebit == forCredit) {
            console.log("this.Journal", this.Journal);
            this.api.createJournalVoucher(this.Journal, header).subscribe(async (response: any) => {
              console.log(response);
              if (response.status == 303) {
                let msg = response.msg
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.VOUCHER ALREADY EXISTS'),
                  duration: 2000,
                  color: "warning"
                });
                toast.present();
              }
             else if (response.status == 200) {
                let msg = response.msg
                const toast = await this.toastController.create({
                  message: this.translate.instant('MESSAGE.VOUCHER CREATED SUCCESSFULLY'),
                  duration: 2000,
                  position:'middle'
                });
                toast.present();
                this.location.back();
              }
            });
          }
          else {
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.OVERALL CREDIT AMOUNT SHOULD BE SAME AS OVERALL DEBIT AMOUNT'),
              duration: 2000,
              color: "warning"
            });
            toast.present();
          }
        }
      }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          // this.location.back()
        }
      }
    }
  }
  ClickNewRow() {
    let data = {
      voucher_type: "",
      ledger_name: "",
      amount: 0

    }
    this.ledgerData.push(data);
  }

  dismis(i: number) {
    this.ledgerData.splice(i, 1);
  }
  selected(item: any) {
    console.log("party", item);
    this.ledger_list = item

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

    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.ledger_List = this.ledger_List.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }

  }
  selectedJv(lc: any, i: number) {
    console.log("ddd", lc, i);
    this.ledgerData[i].ledger = lc.name
    this.ledgerData[i].ledger_type = lc.type
    this.ledgerData[i].ledger_name = lc.id
    this.voucherlist[i] = false;
  }
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
      message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
      buttons: ['OK']
    });
    alert.present();
  }
}


