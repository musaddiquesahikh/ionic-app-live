import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
// import { CreateCashLedgerPage } from '../create-cash-ledger/create-cash-ledger.page';
import { PermissionGuard } from '../guards/permission.guard';
import { AddCashLedgerPage } from '../add-cash-ledger/add-cash-ledger.page';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.page.html',
  styleUrls: ['./cash.page.scss'],
})
export class CashPage implements OnInit {
  payment: any = {}
  cashLedger: any = []
  user: any = {}
  @Input() data: any = [];
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  constructor(public api: ApiService, public modalCtrl: ModalController,public toastController: ToastController,
    private translate: TranslateService,private permission: PermissionGuard, public alertCtrl:AlertController,
    private popoverController: PopoverController) { }

  ngOnInit() {
    console.log("this.data", this.data);
    if (this.data.payment_type == 1) {
      this.user = this.data
    }
    this.getData()
    this.user.payment_type = 1
    const currentDate = new Date().toISOString().substring(0, 10);
    this.user.cleared_date = currentDate
  }
  getData() {
    let header = this.api.getHeader();
    this.payment.company_id = this.api.getCompanyId()
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any) => {
      console.log('190', response);
      if(response.status ==500){
        this.cashLedger=[] 
      console.log("98", this.cashLedger);
      }else{
        this.cashLedger = response
      }
    })
  }
  cashDetails() {
    console.log("senddate click", this.user);
    this.parentFunction.emit(this.user);
  }
  async createCashledger() {
    // this.payment.payment_type = ""
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
    const popoverController = await this.popoverController.create({
      component: AddCashLedgerPage,
      cssClass: 'my-custom-class',
    });

    popoverController.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        console.log("from address 123 ", user)
        if(user != undefined){
        this.cashLedger.push(user)
        }
      });
    return await popoverController.present();
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
}
