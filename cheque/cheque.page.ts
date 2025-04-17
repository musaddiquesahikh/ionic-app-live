import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.page.html',
  styleUrls: ['./cheque.page.scss'],
})
export class ChequePage implements OnInit {
  bankList: any = []
  user: any = []
  @Input() data: any = []
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  constructor(public api: ApiService, public modalController: ModalController,public toastController: ToastController,
    private translate: TranslateService,private permission: PermissionGuard, public alertCtrl:AlertController,private popoverController: PopoverController) { }

  ngOnInit() {
    console.log("this.data", this.data);
    this.getData()
    this.user.payment_type = 2
    const currentDate = new Date().toISOString().substring(0, 10);
    this.user.cleared_date = currentDate
    this.user.issued_date = currentDate
  }
  getData() {

    let header = this.api.getHeader();
    let companyId = this.api.getCompanyId()
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("api called bank", response);
      if(response.status == 500){
        this.bankList = []
      }else{
        this.bankList = response
      }
      if (this.data.payment_type == 2) {
        this.user = this.data
      }
    })
  }
  
  chequeDetails() {
    console.log("senddate click", this.user);
    this.parentFunction.emit(this.user);
  }
  async createNewBank() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'expense') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const popoverController = await this.popoverController.create({
      component: CreateNewBankPage,

    });

    popoverController.onDidDismiss()
      .then((data: any = {}) => {
        const user = data.data; // Here's your selected user!
        console.log("from address 909", user)
        if(user != undefined)
        {
           this.bankList.push(user)
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
    this.modalController.dismiss();
  }
}
}
}
}
