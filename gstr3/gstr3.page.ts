import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gstr3',
  templateUrl: './gstr3.page.html',
  styleUrls: ['./gstr3.page.scss'],
})
export class GSTR3Page implements OnInit {
  item: any = {
    "company": null,
    "quarter": 0,
    "start": "2022-05",
    "year": null
  }
  length: any
  company: any = []
  // gstr3: any = []
  page_number: number = 0
  pagination1: any;
  s: any = [];
  e: any = {};
  companyId: any;
  pagination: any;
  salesData: any = []
  constructor(private api: ApiService, public toastController: ToastController, private translate: TranslateService) {

  }

  ngOnInit() {
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.page_number++
    console.log(this.salesData, "pppaaginatin 1");
    if(this.item.invoice==0){
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.salesRegister(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.salesData
          this.salesData = []
          let p = t.concat(response.data)
          this.salesData = [...new Set(p)]
          console.log('mmmm', this.item.page_number);
          console.log(this.page_number);
          console.log(this.pagination, "musssaaaa");
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 3000,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.salesData, "pppaaginatin 2");
  }
  if(this.item.invoice==1){
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.purchasRegister(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.salesData
          this.salesData = []
          let p = t.concat(response.data)
          this.salesData = [...new Set(p)]
          console.log('mmmm', this.item.page_number);
          console.log(this.page_number);
          console.log(this.pagination, "musssaaaa");
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 3000,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.salesData, "pppaaginatin 2");
  }
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  submit() {
    this.salesData = []
    // this.company = JSON.parse(sessionStorage.getItem("selectedCompany"));
    this.companyId = this.api.getCompanyId()
    console.log("gf", this.companyId);
    this.item.company = this.companyId
    console.log(this.item.company);

    let header = this.api.getHeader();
    let b = this.item.invoice
    let m = ''
    if (b == 0) {
      this.e.company = this.api.getCompanyId()
      this.e.quarter = this.item.quarter
      this.e.start = this.item.start
      this.e.year = this.item.year
      this.e.invoice = this.item.invoice
      let header = this.api.getHeader();
      this.api.salesRegister(m, this.e,header).subscribe(async (response: any) => {
        console.log('190', response);
        this.salesData = response.data
        console.log(this.salesData, 'datasale');
        this.length = response.data.length

        if (response.status == 200) {
          this.salesData = response.data
          this.pagination = response.pagination_data
          console.log("lenght", response);
          this.length = response.data.length
          console.log("lenght", this.salesData);
          this.item.page_number = this.page_number
          console.log(this.item, "pppaaginatin ");
          this.salesData

          if (this.length == 0) {
            const toast = await this.toastController.create({
              message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
        }
      })
    }
    if (b == 1) {
      // this.e.company = this.api.getCompanyId()
      // this.e.quarter = this.item.quarter
      // this.e.start = this.item.start
      // this.e.invoice = this.item.invoice
      // this.e.year = this.item.year 
      let s=''
      let header = this.api.getHeader();
      this.api.purchasRegister(s, this.item,header).subscribe(async (response: any) => {
        console.log('19', response); 
        this.salesData = response.data
        console.log(this.salesData,'lkjkl');
        this.length = response.data.length

        if (response.status == 200) {
          this.salesData = response.data
          this.pagination = response.pagination_data
          console.log("lenght", response);
          this.length = response.data.length
          console.log("lenght", this.salesData);
          this.item.page_number = this.page_number
          console.log(this.item, "pppaaginatin ");
          this.salesData

        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
      }
      })
    }
  }
  excel() {
    let header = this.api.getHeader();
    this.api.exportGstr3(this.item, header).subscribe((response: any) => {
      console.log('19', response);
      window.location.href = response.url
    })
  }
}  