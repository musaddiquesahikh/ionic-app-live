import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bill-wise-profit',
  templateUrl: './bill-wise-profit.page.html',
  styleUrls: ['./bill-wise-profit.page.scss'],
})
export class BillWiseProfitPage implements OnInit {
  items: any = [];
  bills: any = [];
  user: any = {}
  public loading: boolean;
  length: any
  slideOpts = {
    zoom: {
      maxRatio: 2
    }
  }
  company: any = []
  billwiseProfit: any = []
  pagination: any;
  page_number: number=1;
  e: any={};
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.user = response
    });
  }

  isItemAvailable: Boolean = false;

  initializeItems() {
    this.items = JSON.parse(localStorage.getItem("viewReport"));

  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    console.log("test", val);
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.items.filter((item) => {
        return (item.partyName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  private async generateItems() {
    let s = ''
    this.user.company=this.api.getCompanyId()
    this.user.page_number = this.pagination.page_number + 1
    console.log(this.page_number,'loksabha');    
    this.page_number++
    console.log(this.billwiseProfit, "pppaaginatin 1");
    if (this.pagination.next_page) {
      this.api.billwiseProfit(s, this.user).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll', );
        this.pagination= response.pagination_data

        if (response.status == 200) {
          let t = this.billwiseProfit
          this.billwiseProfit = []
          let p = t.concat(response.data)
          this.billwiseProfit = [...new Set(p)]
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
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  Submit() {
    this.loading=true
    let companyId = this.api.getCompanyId()
    this.user.company = companyId
    console.log("companyId", companyId);
    let s = ''
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.user.start_date
    this.e.end_date = this.user.end_date
    this.api.billwiseProfit(s,this.e).subscribe(async (response: any) => {
      console.log(response);
      this.billwiseProfit = response.data
      console.log(this.billwiseProfit,this.billwiseProfit[0].invoice_date,'billl');
      
      this.loading=false
      this.pagination = response.pagination_data
      this.length = response.data.length
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant("HEADER.NO DATA AVAILABLE"),
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }
  
  excel() {
    let companyId = this.api.getCompanyId()
    this.user.company = companyId
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportBillwiseProfit(this.user, header).subscribe((response: any) => {
      console.log("dsafdsdsafas", response);
      window.location.href = response.url
    });
  }
}
