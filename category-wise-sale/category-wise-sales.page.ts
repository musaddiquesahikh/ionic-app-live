import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-category-wise-sales',
  templateUrl: './category-wise-sales.page.html',
  styleUrls: ['./category-wise-sales.page.scss'],
})
export class CategoryWiseSalesPage implements OnInit {

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
  summary: any={
    "total_category": '',
    "total_selling_items": '',
    "total_inv_bills": '',
    "total_selling_amount": ''
};
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
    console.log(this.Itemdata, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.categorySales(s, this.item,header).subscribe(async (response: any) => {
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
    this.api.categorySales(s, this.e,header).subscribe(async (response: any) => {
      console.log(this.item, 'lkf', response);
      // if (response.status == 200) {
        this.Itemdata=response.data  
        this.summary=response.summary   
        console.log(this.summary,'summ',this.Itemdata);
           
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
      // }
    });

  }
  
  getItems(ev: any) {
    let s=ev.target.value;
    this.item.company=this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.categorySales(s, this.item,header).subscribe(async (response: any) => {
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

}
