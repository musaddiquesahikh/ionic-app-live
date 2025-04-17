import { EditExpensePage } from './../edit-expense/edit-expense.page';
import { EditBillPage } from './../edit-bill/edit-bill.page';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/api.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, ModalController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
@Component({
  selector: 'app-proforma-register',
  templateUrl: './proforma-register.page.html',
  styleUrls: ['./proforma-register.page.scss'],
})
export class ProformaRegisterPage implements OnInit {
  sales: any[];
  item: any = {}
  // companyId: any;
  proformaData: any = []
  selected_invoice: any = []
  length: any
  pagination: any;
  page_number: number=1;
  e: any={};
  data1: any;
  constructor(public api:ApiService,public translate:TranslateService,private toastController: ToastController,
    public permission:PermissionGuard,private alertCtrl: AlertController,public location:Location,
  private modalCtrl: ModalController) { }
 
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
    this.item.id = this.api.getCompanyId()

    console.log(this.proformaData,this.pagination, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.proformaRegister(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.Pagination
        if (response.status == 200) {

          let t = this.proformaData
          this.proformaData = []
          let p = t.concat(response.data) 
          this.proformaData = [...new Set(p)]
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
    console.log(this.proformaData,"pppaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  submit() {
    console.log("companyId");
    let header = this.api.getHeader();
    let s=''
    this.e.id = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
   
    this.api.proformaRegister(s, this.e,header).subscribe(async (response: any) => {
      console.log( "lenght",response);

      if(response.status == 200){
      this.proformaData = response.data
      this.pagination = response.Pagination
        console.log( "lenght",response);
      this.length = response.data.length
      // this.proformaData
      // this.item.page_number = this.page_number
        if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
    }
    });

  }
  async selected(selected_invoice) {
    console.log("qqq", selected_invoice);
    let a = selected_invoice.type
    if (a == 'Proforma_Invoice') {
      const modal = await this.modalCtrl.create({
        
        component: EditBillPage,
        cssClass: 'my-custom-class',
        componentProps: {
          billData: selected_invoice
        },
        // breakpoints: [0, 0.3, 0.5, 1],
        // initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data: any = {}) => {
          const user = data.data; // Here's your selected user!
          console.log("from address 123 ", user)
          // this.getparty();
          this.submit()
        });
      return await modal.present();
      // console.log("selected party", selected_invoice) 
      // return await modal.present();
    }
    if (a == 'Expense') {
      console.log("in expense");

      let b = selected_invoice.invoice_id

      const modal = await this.modalCtrl.create({
        component: EditExpensePage,
        cssClass: 'my-custom-class',
        componentProps: {
          particularData: b
        },
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.9
      });
      modal.onDidDismiss()
        .then((data) => {
          const user = data.data; // Here's your selected user!
          console.log("from address ", user)
          this.submit()
        });
      return await modal.present();
    }
}
 async deleteInvoice(item){
        console.log(item);
        let a = item.type
        if (a == 'Proforma_Invoice') {
          const toast = await this.toastController.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE INVOICE?'),
            position: 'middle',
            buttons: [
              {

                text: this.translate.instant('HEADER.YES'),
                role: "done",
                handler: () => {
                  // console.log("I loved it clicke");
                  let header = this.api.getHeader();
                  let company = this.api.getCompanyId()
                  let data = { id: item.invoice_id, company: company }
                  console.log();

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
                  },
                    async (error) => {
                      console.log("pppp", error);

                      const toast = await this.toastController.create({
                        message: error,
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
 }
}
