import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import { EditBillPage } from '../edit-bill/edit-bill.page';

@Component({
  selector: 'app-purchase-order-register',
  templateUrl: './purchase-order-register.page.html',
  styleUrls: ['./purchase-order-register.page.scss'],
})
export class PurchaseOrderRegisterPage implements OnInit {

  purchase: any = [];
  company: any = []
  item: any = {}
  length: any
  purchaseData: any = []
  companyId: any;
  e: any = {};
  pagination: any;
  page_number: number = 0
  Searchdata: any = [];
  PartyDataS: any = [];
  data: any;
  data1: any[];

  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.item = response
    });
  }

  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.page_number++
    console.log(this.purchaseData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.purchrgOrder(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.Pagination
        if (response.status == 200) {
          let t = this.purchaseData
          this.purchaseData = []
          let p = t.concat(response.data)
          this.purchaseData = [...new Set(p)]
          console.log('mmmm', this.item.page_number);
          console.log(this.page_number);
          console.log(this.pagination, "musssaaaa");
          this.data1 = this.purchaseData
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 600,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.purchaseData, this.data1, "pppaaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  submit() {
    this.companyId = this.api.getCompanyId()
    this.item.company_id = this.companyId
    console.log("companyId", this.companyId);
    let header = this.api.getHeader();
    this.e.company_id = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s = ''
    
    this.api.purchrgOrder(s, this.e,header).subscribe(async (response: any) => {
      if (response.status == 200) {
        this.purchaseData = response.data
        this.pagination = response.Pagination
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.purchaseData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        this.purchaseData
        console.log(this.length == 0);
        this.length = response.data.length
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 800,
            color: "warning"
          });
          toast.present();
        }
      }
    });
  }
  async selected(selected_invoice) {
    console.log("pppp", selected_invoice);
    selected_invoice.invoice_id = selected_invoice.id
    const modal = await this.modalCtrl.create({
      component: EditBillPage,
      cssClass: 'my-custom-class',
      componentProps: {
        billData: selected_invoice
      },
    });
    console.log("selected party", selected_invoice)
    return await modal.present();
  }
  
  getSales(ev) {
    let s = ev.target.value;
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    if (s && s.trim() !== '') {
      let header = this.api.getHeader();
      this.api.purchrgOrder(s, this.e,header).subscribe(async (response: any) => {
        this.data1 = response.data
        console.log(s);
        this.purchaseData = this.Searchdata
        this.PartyDataS = response
        this.Searchdata = this.PartyDataS.data
        this.data = this.PartyDataS.data.party_name
        this.data = this.PartyDataS.data.quotation_no
        console.log(this.PartyDataS, 'sercresp');
      });
    } else {
      this.data1
      console.log(this.data1, 'sercfg');
    }
  }

  // excel() {
  //   let companyId = this.api.getCompanyId()
  //   this.item.companyId = companyId
  //   console.log("companyId", companyId);
  //   let header = this.api.getHeader();
  //   this.api.exportPurchaseRegister(this.item, header).subscribe((response: any) => {
  //     console.log(response);
  //     window.location.href = response.url

  //   });
  // }
}
