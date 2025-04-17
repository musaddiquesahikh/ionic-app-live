import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PartyWiseItemPurchasePage } from '../party-wise-item-purchase/party-wise-item-purchase.page';

@Component({
  selector: 'app-party-wise-purchase',
  templateUrl: './party-wise-purchase.page.html',
  styleUrls: ['./party-wise-purchase.page.scss'],
})
export class PartyWisePurchasePage implements OnInit {
  items: any = [];
  partyD: any = [];
  company: any = []
  length:any
  partywisePurchase: any = []
  PartyData: any[];
  item: any={};
  e:any={};
  public loading: boolean;
  page_number: number = 0
  pagination: any;
  companyId: any;
  pagination1: any;
  PartyDataS: any=[];
  filteredData: any=[];
  data: any;
  Searchdata: any=[];
  n: any[];
  constructor(public modalCtrl: ModalController, public api: ApiService,public toastController:ToastController,
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
    this.page_number++
    console.log(this.PartyData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.partyWisepurch(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll',  this.pagination1);
        this.pagination= response.pag_data

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
    this.partyD = JSON.parse(localStorage.getItem("viewReport"));
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    this.companyId = this.company[0].id;
    console.log("companyId", this.companyId);
    this.PartyData = []
    this.companyId = this.api.getCompanyId()
    this.item.company = this.companyId
    console.log("companyId", this.companyId);
    console.log(this.item,this.e, 'submit kk');
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    let header = this.api.getHeader();
    this.api.partyWisepurch(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      if (response.status == 200) {
        console.log(response,'lmlmk');
        this.PartyData=response.data
        this.loading=false
        this.pagination = response.pag_data
        console.log(this.pagination,'nayyyo',this.n);
        
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
  // isItemAvailable: Boolean = false;

  // initializeItems() {
  //   this.PartyData = JSON.parse(localStorage.getItem("account"));

  // }   partyWisepurchsearch 

  getItems(ev) {
    let s=ev.target.value;
    let header = this.api.getHeader();
    this.api.partyWisepurch(s, this.item,header).subscribe(async (response: any) => {
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
    // // this.initializeItems();
    // const val = ev.target.value;
    // console.log("test", val);
    // if (val && val.trim() !== '') {
    //   // this.isItemAvailable = true;
    //   this.PartyData = this.PartyData.filter((item) => {
    //     return (item.party_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // } else {
    //   this.submit()
    //   // this.isItemAvailable = false;
    // }
  
//   getItems(ev:string){
// if(ev){
//   this.filteredData=this.PartyDataS.filter((item) =>
//   item.data.toLowerCase().includes(ev.toLowerCase())
//   )}else{
//     this.filteredData=[];
//     }
//   }
  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: PartyWiseItemPurchasePage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item
      }

    });
    console.log("selected party", item)
    return await modal.present();

  }
  excel() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company[0].id;
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportPartywisePurchase(this.company[0].id, header).subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url
    });
  }
}

