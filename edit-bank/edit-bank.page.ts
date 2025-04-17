import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.page.html',
  styleUrls: ['./edit-bank.page.scss'],
})
export class EditBankPage implements OnInit {
  payment: any = {}
  company: any = {}
  data 
  data1: any=[]
  bankDetails: any = {}
  bankData:any=[]
  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController:ToastController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.bankDetails = this.data
    console.log("details");

    // let id = this.bankDetails.id
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    console.log("company", this.company);

    let companyId = this.company[0].id;
    console.log("companyid", companyId);

    let header = this.api.getHeader();
    this.bankDetails.company_id = companyId;
    this.bankDetails.bank_id = this.bankDetails.id
    console.log("companyid1", this.bankDetails);


    this.api.getSelectedBank(this.bankDetails, header).subscribe((response: any[]) => {
      console.log('1', response);
      this.data1 = response;
      console.log("data", this.data1);
    });

  }
  editBankAccount() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    console.log("company", this.company);

    let companyId = this.company[0].id;
    console.log("companyid", companyId);

    let header = this.api.getHeader();
    this.data1.company_id = companyId;
    this.data1.bank_id = this.bankDetails.id,

      console.log("this -> ", this.data1);

    this.api.editBank(this.data1, header).subscribe(async (response: any) => {
      console.log("edit bank response",response);
      if(response.status == 200){
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.bankData = response.data
      }
       this.modalCtrl.dismiss(response.data)
    });
  }

  back(){
    this.modalCtrl.dismiss(this.bankData)
  }
}
