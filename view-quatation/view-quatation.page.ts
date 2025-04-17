import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-view-quatation',
  templateUrl: './view-quatation.page.html',
  styleUrls: ['./view-quatation.page.scss'],
})
export class ViewQuatationPage implements OnInit {
  item: any = []
  quaData: any = []
  length: any
  pagination: any;
  page_number: number=1
  companyId: any;
  data1: any;
  public loading: boolean;
  e: any={};

  constructor(public api: ApiService, public modalCtrl: ModalController, public toastController: ToastController,
    private translate:TranslateService,private permission: PermissionGuard,public location:Location,public alertCtrl:AlertController) { }

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
    console.log(this.quaData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.viewQuatation(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.Pagination
        if (response.status == 200) {
          let t = this.quaData
          this.quaData = []
          let p = t.concat(response.data)
          this.quaData = [...new Set(p)]
          this.data1=this.quaData
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 600,
        position:'middle'

      });
      toast.present();
    }
    console.log(this.quaData,this.data1, "pppaaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  submit() {
     this.loading=true
    this.e.company_id= this.api.getCompanyId()
    this.e.end_date=this.item.end_date
    this.e.start_date=this.item.start_date
    let s=''
    let header = this.api.getHeader();
    this.api.viewQuatation(s,this.e,header).subscribe(async (response: any) => {
      console.log("lenght", response);
     
      if (response.status == 200) {
        this.quaData = response.data
        this.loading=false
        this.pagination = response.Pagination
        this.length = response.data.length
        // this.item.page_number = this.page_number
        this.quaData
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 800,
            color: "warning"
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
          // header:this.translate.instant('HEADER.YES')
      header: `Are you sure you want to Delete the Quatation?`,
      position: 'middle',
      buttons: [
        {
          text: "Yes",
          // text:this.translate.instant('HEADER.YES')
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
          text: "Cancel",
          // text:this.translate.instant('HEADER.YES')
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
    this.api.exportQuatation(this.item, header).subscribe((response: any) => {
      console.log("dsafdsdsafas", response);
      window.location.href = response.url
    });
  }
  async permission1(){
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.view);
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
