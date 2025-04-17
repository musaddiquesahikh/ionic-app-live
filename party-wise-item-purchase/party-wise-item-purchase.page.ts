import { Component, OnInit } from '@angular/core';
import { modalController } from '@ionic/core';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-party-wise-item-purchase',
  templateUrl: './party-wise-item-purchase.page.html',
  styleUrls: ['./party-wise-item-purchase.page.scss'],
})
export class PartyWiseItemPurchasePage implements OnInit {
item
length:any;
company:any=[]
partywiseItemPurchase:any=[]
fileName= 'partyWiseItemPurchase.xlsx';
  item1: any={};
  pagination: any;
  page_number: any = 1;
  Itemdata: any[];
  public loading: boolean;
  e: any = {};
  Searchdata: any[];
  PartyDataS: any = [];
  data: any;

  constructor(public api:ApiService, public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {
    
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item1 = response
    });
    // console.log("received data",this.item);
    // let companyId = this.api.getCompanyId()
    // this.item.company=companyId
    // this.item.party=this.item.party_id;
    // let header = this.api.getHeader();
    // this.api.partywiseItemPurchase(this.item, header).subscribe((response: any) => {
    //   console.log(response);
    // this.partywiseItemPurchase=response.data
    // this.length=this.partywiseItemPurchase.length
    // });
  }

  private async generateItems() {
    let s = ''
    this.item1.company = this.api.getCompanyId()
    console.log(this.page_number, 'loksabha', this.pagination);
    this.item1.page_number = this.pagination.page_number + 1
    this.page_number++

    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.partywiseItemPurch(s, this.item1,header).subscribe(async (response: any) => {
        console.log('lkf211', response, 'll',);
        this.pagination = response.pagination

        // if (response.status == 200) {
        let t = this.Itemdata
        this.Itemdata = []
        let p = t.concat(response.data)
        this.Itemdata = [...new Set(p)]
        // }
      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 3000,
        position: 'middle'

      });
      toast.present();
    }
  }

  submit() {
    this.loading = true
    this.Itemdata = []
    console.log(this.Itemdata, 'submit', this.item1, this.item);
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item1.start_date
    this.e.end_date = this.item1.end_date
    let s = ''
    let header = this.api.getHeader();
    this.api.partywiseItemPurch(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item1, 'lkf', response, this.Itemdata);
      console.log(this.item1, 'lkf11', response.data);
      // if (response.status == 200) {
      this.Itemdata = response.data
      // console.log(this.Itemdata[0].item_name,'arrryyy');
      this.loading = false
      this.pagination = response.pagination
      console.log(this.pagination, 'nayyyo');

      this.length = response.data.length
      this.item1.page_number = this.page_number
      console.log(this.item1, "pppaaginatin ",this.length);
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      // }
    });
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  
  myBackButton(){
    modalController.dismiss()
  }

  export(){
    let header = this.api.getHeader();
       this.api.partywiseItemSales(this.item,'', header).subscribe((response: any) => {
         console.log("api called", response);
         this.partywiseItemPurchase = response.data
       });
     }

     exportexcel(): void
     {
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       XLSX.writeFile(wb, this.fileName);
     }

     getItems(ev: any) {
      let s = ev.target.value;
      this.item1.company = this.api.getCompanyId()
      let header = this.api.getHeader();
      this.api.partywiseItemPurch(s, this.item1,header).subscribe(async (response: any) => {
        if (s && s.trim() === '') {
          this.Itemdata = []
          console.log(this.Itemdata = [], 'sercfg');
        } else {
          console.log(s);
          this.Itemdata = this.Searchdata
          this.PartyDataS = response
          this.Searchdata = this.PartyDataS.data
          this.data = this.PartyDataS.data.item_name
          console.log(this.PartyDataS, 'sercresp');
        }
      });
    }
}
