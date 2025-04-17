import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-item-wise-purchase',
  templateUrl: './item-wise-purchase.page.html',
  styleUrls: ['./item-wise-purchase.page.scss'],
})
export class ItemWisePurchasePage implements OnInit {
  items: any = [];
  itemD: any = [];
  company: any = []
  public loading: boolean;
  length: any
  itemwiseSale: any = []
  item: any={};
  itemwisePurchaase: any[];
  pagination: any;
  page_number: number=1;
  e: any={};
  Searchdata: any[];
  PartyDataS: any=[];
  data: any;
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController, private translate:TranslateService,
    private permission: PermissionGuard,public alertCtrl:AlertController) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item = response
    });
  }
  private async generateItems() {
    let s = ''
    this.item.company=this.api.getCompanyId()
    this.item.page_number = this.pagination.page_number + 1
    console.log(this.page_number,'loksabha');    
    this.page_number++
    console.log(this.itemwisePurchaase, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.itemWisePurchase(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll', );
        this.pagination= response.pagination_data

        if (response.status == 200) {
          let t = this.itemwisePurchaase
          this.itemwisePurchaase = []
          let p = t.concat(response.data)
          this.itemwisePurchaase = [...new Set(p)]
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
  submit() {
    this.loading=true
    this.itemwisePurchaase = []
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    let header = this.api.getHeader();
    this.api.itemWisePurchase(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      if (response.status == 200) {
        this.itemwisePurchaase=response.data
        this.loading=false
        this.pagination = response.pagination_data
        console.log(this.pagination,'nayyyo');
        
        this.length = response.data.length
        this.item.page_number = this.page_number
        // this.itemwisePurchaase
        console.log(this.item, "pppaaginatin ");
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      }
    });

  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.items = this.itemwisePurchaase

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.itemwisePurchaase = this.itemwisePurchaase.filter((item) => {
        return (item.itemName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  excel() {
    let companyId = this.api.getCompanyId()
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportItemWisePurchase(companyId, header).subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url
    });
  }
}
