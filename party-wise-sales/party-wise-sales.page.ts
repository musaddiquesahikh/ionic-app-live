import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PartyWiseItemSalesPage } from '../party-wise-item-sales/party-wise-item-sales.page';

@Component({
  selector: 'app-party-wise-sales',
  templateUrl: './party-wise-sales.page.html',
  styleUrls: ['./party-wise-sales.page.scss'],
})
export class PartyWiseSalesPage implements OnInit {
  items: any = [];
  partyD: any = [];
  partywiseSales: any = []
  company: any = []
  length: any
  item: any={
    // start_date: null,
    // end_date:null
  }
  e:any={}
  pagination: any;
  PartyData: any=[]
  companyId: any;
  page_number: number = 0
  pagination1: any;
  Searchdata: any=[];
  PartyDataS: any=[];
  data: any;
  public loading: boolean;
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate:TranslateService) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item = response
    });
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    console.log(this.page_number,'loksabha');    
    this.page_number++
    console.log(this.PartyData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.partyWiseSale(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll',  this.pagination1);
        this.pagination= response.pagedata

        if (response.status == 200) {
          let t = this.PartyData
          this.PartyData = []
          let p = t.concat(response.data)
          this.PartyData = [...new Set(p)]
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
    this.PartyData = []
    let companyId = this.api.getCompanyId()
    this.item.company = companyId
    console.log("companyId", companyId);
    console.log(this.item,this.e, 'submit kk');
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    let header = this.api.getHeader();
    this.api.partyWiseSale(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      if (response.status == 200) {
        console.log(response);
        this.PartyData=response.data
        this.loading=false
        this.pagination = response.pagedata
        console.log(this.pagination,'nayyyo');
        
        // this.partywiseSales = response.data
        this.length = response.data.length
        this.item.page_number = this.page_number
        this.PartyData
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
    this.items = this.PartyData

  }

  getItems(ev: any) {
    let s=ev.target.value;
    let header = this.api.getHeader();
    this.api.partyWiseSale(s, this.item,header).subscribe(async (response: any) => {
      if (s && s.trim() === '') {
        this.PartyData=[]
        console.log(this.PartyData=[],'sercfg');
       }else{
        console.log(s);
        // this.n=this.PartyData
       this.PartyData=this.Searchdata
      // if(response.status==200){
     this.PartyDataS=response
     this.Searchdata=this.PartyDataS.data
     this.data=this.PartyDataS.data.party_name
       console.log(this.PartyDataS,'sercresp');
       }
    });
  }
  myBackButton() {
    this.modalCtrl.dismiss();
  }
  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: PartyWiseItemSalesPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item
      }

    });
    console.log("selected party", item)
    return await modal.present();

  }
  excel() {
    let companyId = this.api.getCompanyId()
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportPartywiseSales(companyId, header).subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url
    });
  }
}
