import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-party-wise-bill',
  templateUrl: './party-wise-bill.page.html',
  styleUrls: ['./party-wise-bill.page.scss'],
})
export class PartyWiseBillPage implements OnInit {
  party_id: any;
  partyList: any=[];
  pagination: any;
  page_number: any = 1;
  Itemdata: any[];
  public loading: boolean;
  e: any = {};
  Searchdata: any[];
  PartyDataS: any = [];
  data: any;
  item1: any={};
  item: any;
  length: any;
  createdPartyData: any;
  event: any;
  summary: any;
  constructor(public api: ApiService, public toastController: ToastController, private translate: TranslateService,private modalController: ModalController) { }

  ngOnInit() {
    
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item1 = response
    });

    this.getparty() 
  }
  dismiss() {
    this.modalController.dismiss()
  }
 
   getparty() {
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    let m=''
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe((response: any) => {
      console.log("dsf", response);
      if(response.status!=500){
        this.partyList = response.data
        this.createdPartyData = this.partyList
        this.party_id=this.createdPartyData.id
        console.log(this.createdPartyData,'if!500');
        
      }else{
      this.partyList = []
      }
      console.log('1', this.partyList);
    })
  }
    partySelect(a){
    console.log(a,"partyselect");
    this.party_id=a
    console.log(a,"partyselect");
   }
  private async generateItems() {
    let s = ''
    this.item1.company_id = this.api.getCompanyId()
    console.log(this.page_number, 'loksabha', this.pagination);
    this.item1.page_number = this.pagination.page_number + 1
    this.page_number++

    if (this.pagination.next_page) {
        this.api.post3("search_partyW_bill/"+this.party_id+ "/s="+ s+"/", this.item1).subscribe((response: any) => {
        
        this.pagination = response.pagination_data
        console.log('lkf211', response, 'll',this.pagination);
        let t = this.PartyDataS
        this.PartyDataS = []
        let p = t.concat(response.data)
        this.PartyDataS = [...new Set(p)]
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

  async submit() {
    this.loading = true
    this.Itemdata = []
    console.log(this.Itemdata, 'submit', this.item1, this.item);
    this.e.company_id = this.api.getCompanyId()
    this.e.start_date = this.item1.start_date
    this.e.end_date = this.item1.end_date
    let s = ''
    if(this.party_id){
      this.api.post3("search_partyW_bill/"+this.party_id+ "/s="+ s+"/", this.e).subscribe(async (response: any) => {
      console.log(this.item1, 'lkf', response, this.Itemdata);
      console.log(this.item1, 'lkf11', response.data);
      if (response.status == "success") {
        this.PartyDataS = response.data
      this.Itemdata = response.data
      this.summary=response.summary
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
      }
    });
  }
  else{

    const toast = await this.toastController.create({
      message: this.translate.instant('select party'),
      duration: 2000,
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
  search(ev:any){
    this.event=ev.target.value;
    console.log(this.event,'searchh');
    this.PartyDataS
  }
  
  getItems(ev: any) {
    let s = ev.target.value;
    this.item1.company_id = this.api.getCompanyId()
      this.api.post3("search_partyW_bill/"+this.party_id+ "/s="+ this.event+"/", this.item1).subscribe(async (response: any) => {
        this.PartyDataS = response.data
      if (s && s.trim() === '') {
        this.Itemdata = []
        console.log(this.Itemdata = [], 'sercfg');
      } else {
        console.log(s);
        this.PartyDataS = response.data
        this.PartyDataS[0]
        console.log(this.PartyDataS, 'sercresp');
      }
    });
  }
}
