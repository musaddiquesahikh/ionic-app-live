import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.page.html',
  styleUrls: ['./payslip.page.scss'],
})
export class PayslipPage implements OnInit {
  empData: any = []
  data: any = {}
  emp1: boolean
  item:any=[]
  downloadUrl: string;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router) { }

  ngOnInit() {
    this.emp1 = false
  }
  Search() {
    this.data.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.monthlyAttendence(this.data, header).subscribe((response: any) => {
      console.log(response);
      this.empData = response.data
      this.item = this.empData
      console.log("empData", this.empData);
      this.emp1 = true
    })

  }
  clear() {
    this.emp1 = false
  }
  download(item: any) {
    console.log("dsfds", item);
    this.data.id = item
    this.data.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    console.log("this.data",this.data);
    
    this.api.downloadPayslip(this.data, header).subscribe((response: any) => {
      console.log("download url",response);
      // window.location.href = response.url
      if (response.status == 200) {
    console.log("if work");
    
        this.downloadUrl='https://api.esarwa.com/api/download_payslip/'+response["url"]+'/';
        console.log("this. downloadUrl: string;",  this.downloadUrl);
        
      }
      })
  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.item = this.empData
console.log("item",this.item);

  }

  getItems(event: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = event.target.value;
     console.log("test", val);

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
  myBackButton() {
    this.modalCtrl.dismiss();
  }
}
