import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';



@Component({
  selector: 'app-salary-register',
  templateUrl: './salary-register.page.html',
  styleUrls: ['./salary-register.page.scss'],
})

export class SalaryRegisterPage implements OnInit {
  empData: any = []
  data: any = {}
  user: any = []
  salD: boolean
  item:any
  private selectSegment: string = '1';
  length: any

  constructor(public modalCtrl: ModalController, public api: ApiService,private permission: PermissionGuard,
    public location:Location,public alertCtrl:AlertController,public translate:TranslateService) { }
  ngOnInit() {
    this.salD = false
    this.user.accept = "1"
    this.permission1();
  }
  myBackButton() {
    this.modalCtrl.dismiss();
  }
  submit() {
    this.data.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.summarySalary(this.data, header).subscribe((response: any) => {
      // console.log(response);
      this.empData = response.data
      this.item = this.empData
      // console.log("empData", this.empData);
      this.salD = true
    })
  }
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectSegment = event.target.value;
    if (this.selectSegment == "1") {
      this.data.company_id = this.api.getCompanyId()
      this.data.start = this.data.start
      let header = this.api.getHeader();
      this.api.summarySalary(this.data, header).subscribe((response: any) => {
        //  console.log("kkk", response);
        this.empData = response.data
        this.item = this.empData
      })
    }
    else {
      this.data.company_id = this.api.getCompanyId()
      this.data.start = this.data.start
      let header = this.api.getHeader();
      this.api.detailsSalary(this.data, header).subscribe((response: any) => {
      //  console.log("hhh", response);
        this.empData = response.data
        this.item = this.empData
        this.length = response.data.length
      })
    }
  }
  clear(){
    this.salD = false
  }
  excel(){
    this.data.company = this.api.getCompanyId()
    this.data.month = this.data.start
    let header = this.api.getHeader();
    this.api.exportToExceSalary(this.data, header).subscribe((response: any) => {
      // console.log("mmmm", response);
      window.location.href = response.url
    })
  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.item = this.empData
console.log("item",this.item);

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.item = this.empData.filter((item) => {
        return (item.employee_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  getItems1(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set val to the value of the searchbar
    const val = ev.target.value;
    // console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.item = this.empData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  async permission1(){
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'sales_voucher') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.view == true) {
        } else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
        }
      }
    }
  }
}
