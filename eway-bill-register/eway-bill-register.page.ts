import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-eway-bill-register',
  templateUrl: './eway-bill-register.page.html',
  styleUrls: ['./eway-bill-register.page.scss'],
})
export class EwayBillRegisterPage implements OnInit {
  pagination: any;
  page_number: any = 1;
  Itemdata: any[];
  public loading: boolean;
  e: any = {};
  Searchdata: any[];
  PartyDataS: any = [];
  data: any;
  item1: any = {}
  length: any;
  item: any;

  constructor(public api: ApiService, public toastController: ToastController, private translate: TranslateService,private modalController: ModalController) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item1 = response
    });
  }
  dismiss() {
    this.modalController.dismiss()
  }
  private async generateItems() {
    let s = ''
    this.item1.company = this.api.getCompanyId()
    console.log(this.page_number, 'loksabha', this.pagination);
    this.item1.page_number = this.pagination.page_number + 1
    this.page_number++

    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.EwaybillReg(s, this.item1,header).subscribe(async (response: any) => {
        console.log('lkf211', response, 'll',);
        this.pagination = response.pagination_data
        let t = this.Itemdata
        this.Itemdata = []
        let p = t.concat(response.data)
        this.Itemdata = [...new Set(p)]
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
    this.api.EwaybillReg(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item1, 'lkf', response, this.Itemdata);
      console.log(this.item1, 'lkf11', response.data,response.msg);
      const toast = await this.toastController.create({
        message: response.msg,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
      this.Itemdata = response.data
      this.loading = false
      this.pagination = response.pagination_data
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
    });
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  
 getItems(ev: any) {
    let s = ev.target.value;
    this.item1.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.EwaybillReg(s, this.item1,header).subscribe(async (response: any) => {
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
