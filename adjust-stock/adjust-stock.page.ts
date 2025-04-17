import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-adjust-stock',
  templateUrl: './adjust-stock.page.html',
  styleUrls: ['./adjust-stock.page.scss'],
})
export class AdjustStockPage implements OnInit {
  itemData: any;
  items: any;
  dataSource: any = []
  currentDate: Date;
  myPastDate: Date;
  modalRef: any;
  adjustObject: any = {
    added_qty: 0
  }
  adjust: any = {};

  selectedValue: any = "add_stock";
  finalstock:number;
  Role: any;
  data1: any;
  itemDetails: any = [];
  result: any;
  userData: any = [];
  multiple_rates: boolean;
  message: string;
  isModalOpen: boolean;
  stock1: string;
  on_tour: boolean;

  constructor(public modalCtrl1: ModalController, public api: ApiService, public alertCtrl: AlertController, public permission:PermissionGuard
    , public translate: TranslateService,public location:Location, public datepipe: DatePipe, private toastController: ToastController,
  ) { }
  ngOnInit() {
  
  }
  closeModal(){
    // this.m_data.dismiss()
    this.modalCtrl1.dismiss();
  }
  adjustStock(data) {
    this.adjustObject.item = this.adjust.id;
    this.adjustObject.company = this.api.getCompanyId();
    if (this.selectedValue == "add_stock") {
      this.adjustObject.add_or_remove = 1;
    } else if (this.selectedValue == "reduce_stock") {
      this.adjustObject.add_or_remove = 0;
    }

    this.adjustObject.adjusted_quantity = data.added_qty
    let today_date = Date.now();
    this.adjustObject.adjustment_date = today_date
    this.adjustObject.adjustment_date = this.datepipe.transform(today_date, 'yyyy-MM-dd')
    this.adjustObject.remark = data.remark
    console.log(this.adjustObject, this.adjust)

    let object = {
      "item": 16,
      "company": 32,
      "add_or_remove": 1,
      "adjusted_quantity": 20,
      "adjustment_date": "2022-09-03",
      "remark": "testing addition of stocks"
    }
    this.api.post3('adjust_stock/', this.adjustObject).subscribe(async (response: any) => {
      //response
      console.log(response);
      if (response.status == 200) {
        console.log("current stock", response.item_obj_stock);
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.STOCK ADJUSTED'),
          duration: 5000,
          position: 'middle'
        });
        toast.present();
       this.modalCtrl1.dismiss()

      } else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.FAILED'),
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      }

    })
  }
  handleChange() {
    console.log('Selected value:', this.selectedValue);

    if (this.selectedValue === "add_stock") {
      console.log(this.finalstock, "add");

      this.finalstock =Number(this.adjust.opening_stock_report + this.adjustObject.added_qty)
      console.log(this.finalstock, "add1");

    } else if (this.selectedValue === "reduce_stock") {
      console.log(this.finalstock, "reduce");

      this.finalstock = Number(this.adjust.opening_stock_report - this.adjustObject.added_qty)
      console.log(this.finalstock, "reduce1");

    }
    else{
      this.finalstock = Number(this.adjust.opening_stock_report - this.adjustObject.added_qty)

    }

  }
 
}
