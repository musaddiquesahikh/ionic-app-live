import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-cash-ledger',
  templateUrl: './edit-cash-ledger.page.html',
  styleUrls: ['./edit-cash-ledger.page.scss'],
})
export class EditCashLedgerPage implements OnInit {
  data
  company: any = []
  cash: any = {}
  cashData:any=[]

  constructor(public api: ApiService, public modalCtrl: ModalController, public router: Router, public toastController:ToastController) { }

  ngOnInit() {
    this.cash = this.data
  }
  submit() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    console.log("company id", companyId);
    this.cash.company_id = companyId
    this.cash.ledger_id = this.cash.id
    let header = this.api.getHeader();
    console.log("ledger", this.cash);

    this.api.editCashLedger(this.cash, header).subscribe(async (response: any) => {
      console.log("mmmmmmmm",response);
      if(response.status == 200){
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      this.cashData = response.data
       this.modalCtrl.dismiss(response.data);
      // this.router.navigate(['/manage-money'])
    });
  }
  back(){
    this.modalCtrl.dismiss(this.cashData)
  }
}
