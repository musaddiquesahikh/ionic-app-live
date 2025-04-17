import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-ledger',
  templateUrl: './edit-ledger.page.html',
  styleUrls: ['./edit-ledger.page.scss'],
})
export class EditLedgerPage implements OnInit {
  company: any
  ledger: any = []
  ledgerCategory: any = [];
  selectedData: any;
  data
  constructor(public api: ApiService, public modalCtrl: ModalController, public router: Router, public toastController:ToastController) { }

  ngOnInit() {
    console.log("ietm received", this.data);
    this.ledger = this.data
    let company =  this.api.getCompanyId()
    this.api.createLedgerCategory(company).subscribe((response: any[]) => {
      console.log(response);
      this.ledgerCategory = response["Data"];
      this.ledger.selected_value = this.ledgerCategory
      let c = this.ledgerCategory.filter((value) => value.id == this.ledger.ledger_under);
      console.log("filter", c)
      this.ledger.selected_value = c
    });

  }
  optionChange(valueee: any) {
    console.log("o", valueee);
    this.selectedData = valueee.data;
    console.log(this.selectedData);
    let a = valueee.pay_type
    console.log("p", a);
    if (a == true) {
      this.ledger.payment_type = "Debit"
    } else {
      this.ledger.payment_type = "Credit"
    }
  }

  editLedger() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    console.log("company id", companyId);
    this.ledger.company_id = companyId
    this.ledger.ledger_id = this.ledger.id
    let header = this.api.getHeader();
    console.log("ledger", this.ledger);

    this.api.editLedger(this.ledger, header).subscribe(async (response: any) => {
      console.log(response);
      if (response.status == 200) {
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      this.modalCtrl.dismiss();
    });
  }
}
