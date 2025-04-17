import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';

@Component({
  selector: 'app-view-challan',
  templateUrl: './view-challan.page.html',
  styleUrls: ['./view-challan.page.scss'],
})
export class ViewChallanPage implements OnInit {
  item: any = []
  challanData: any = []
  length: any
  pagination: any;
  page_number: number = 1
  data1: any=[];
  public loading: boolean;
  companyId: any;
  e: any={};

  constructor(public api: ApiService, public modalCtrl: ModalController, public toastController: ToastController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.item = response
    });
  }
  private async generateItems() {
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.page_number++
    this.item.company_id=this.api.getCompanyId()
  
    console.log(this.challanData, "pppaaginatin 1",this.pagination);
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.viewChallan(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.Pagination
        if (response.status == 200) {
         
          let t = this.challanData
          this.challanData = []
          let p = t.concat(response.data)
          this.challanData = [...new Set(p)]
          // this.data1=this.challanData
        }
      });
    } else if (this.pagination.next_page==false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 600,
        position:'middle'

      });
      toast.present();
    }
    console.log(this.challanData, "pppaaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  submit() {
    this.loading=true
    // this.challanData = []
    this.e.company_id= this.api.getCompanyId()
    this.e.end_date=this.item.end_date
    this.e.start_date=this.item.start_date
     let s=''
     let header = this.api.getHeader();
    this.api.viewChallan(s,this.e,header).subscribe(async (response: any) => {
      console.log("lenght", response);
      
      if (response.status == 200) {
        this.challanData = response.data
        this.loading=false
        this.pagination = response.Pagination
        console.log(this.pagination,'log ogf submit', this.challanData );
        this.length = response.data.length
        // this.challanData
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 800,
            position: 'middle'
          });
          toast.present();
        }
      }
    })
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
      // breakpoints: [0, 0.3, 0.5, 1],
      // initialBreakpoint: 0.9
    });
    console.log("selected party", selected_invoice)
    return await modal.present();
  }
  async deleteInvoice(item) {
    console.log(item);
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE CHALLAN ?'),
      position: 'middle',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: () => {
            // console.log("I loved it clicke");
            let header = this.api.getHeader();
            let data = { id: item }
            console.log("this.item", item);
            this.api.deleteInvoice(data, header).subscribe(async (response: any) => {
              console.log(response, 'delete party');
              let a = response.msg
              const toast = await this.toastController.create({
                message: a,
                duration: 2000,
                position: 'middle'
              });
              toast.present();
              this.submit()
            })
          },
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
        },
      ],
    });
    toast.present();
  }
  excel() {
    let companyId = this.api.getCompanyId()
    this.item.company = companyId
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportChallan(this.item, header).subscribe((response: any) => {
      console.log("dsafdsdsafas", response);
      window.location.href = response.url
    });
  }
}

