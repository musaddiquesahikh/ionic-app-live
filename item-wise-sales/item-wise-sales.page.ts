import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';


@Component({
  selector: 'app-item-wise-sales',
  templateUrl: './item-wise-sales.page.html',
  styleUrls: ['./item-wise-sales.page.scss'],
})
export class ItemWiseSalesPage implements OnInit {
  items: any = [];
  itemD: any = [];
  company: any = []
  public loading: boolean;
  length: any
  itemwiseSale: any = []
  item: any={};
  Itemdata: any[];
  pagination: any;
  page_number: number=1;
  e: any={};
  Searchdata: any[];
  PartyDataS: any=[];
  data: any;
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController, private translate:TranslateService,
    private permission: PermissionGuard,public location:Location,public alertCtrl:AlertController) { }

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
    console.log(this.Itemdata, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.itemWiseSales(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll', );
        this.pagination= response.pagination_data

        if (response.status == 200) {
          let t = this.Itemdata
          this.Itemdata = []
          let p = t.concat(response.data)
          this.Itemdata = [...new Set(p)]
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
    this.Itemdata = []
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    let header = this.api.getHeader();
    this.api.itemWiseSales(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      if (response.status == 200) {
        this.Itemdata=response.data
        this.loading=false
        this.pagination = response.pagination_data
        console.log(this.pagination,'nayyyo');
        
        this.length = response.data.length
        this.item.page_number = this.page_number
        // this.Itemdata
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
    this.items = this.itemwiseSale;

  }

  getItems(ev: any) {
    let s=ev.target.value;
    this.item.company=this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.itemWiseSales(s, this.item,header).subscribe(async (response: any) => {
      if (s && s.trim() === '') {
        this.Itemdata=[]
        console.log(this.Itemdata=[],'sercfg');
       }else{
        console.log(s);
        // this.n=this.PartyData
       this.Itemdata=this.Searchdata
      // if(response.status==200){
     this.PartyDataS=response
     this.Searchdata=this.PartyDataS.data
     this.data=this.PartyDataS.data.item_name
       console.log(this.PartyDataS,'sercresp');
       }
    });
  }

  excel() {
    let companyId = this.api.getCompanyId()
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportItemWiseSales(companyId, header).subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url
    });
  }
  async permission1(){
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'manage_money') {
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
