import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ExpenseDetailsPage } from '../expense-details/expense-details.page';
//import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-category-wise-report',
  templateUrl: './category-wise-report.page.html',
  styleUrls: ['./category-wise-report.page.scss'],
})
export class CategoryWiseReportPage implements OnInit {
  items: any = [];
  user: any = {}
  company: any = []
  category_wise_report: any = []

  constructor(public modalCtrl: ModalController, public api: ApiService) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.user =response
    });
  }

  isItemAvailable: Boolean = false;
  initializeItems() {
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = JSON.parse(localStorage.getItem("viewReport"));
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.partyName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  myBackButton() {
    // this.modalCtrl.dismiss();
  }
  CategoryReport() {
    console.log("data", this.user);
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    this.user.company_name = companyId;
    let header = this.api.getHeader();

    this.api.categoryReport(this.user, header).subscribe((response: any[]) => {
      console.log(response);
      this.category_wise_report = response["data"]
      console.log("a", this.category_wise_report);

    });
  }
  async selectCategory(item) {

    let category_id = item.id
    console.log("ljkh", category_id);
    const modal = await this.modalCtrl.create({
      component: ExpenseDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      }

    });

    console.log("selected item", item)
    return await modal.present();

  }
}
