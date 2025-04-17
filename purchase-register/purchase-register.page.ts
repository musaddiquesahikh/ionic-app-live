import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditBillPage } from '../edit-bill/edit-bill.page';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//import { File } from '@awesome-cordova-plugins/file';
//,private transfer: FileTransfer, private file: File
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-purchase-register',
  templateUrl: './purchase-register.page.html',
  styleUrls: ['./purchase-register.page.scss'],
})
export class PurchaseRegisterPage implements OnInit {
  purchase: any = [];
  company: any = []
  item: any = {}
  length: any
  purchaseData: any = []
  companyId: any;
  e: any={};
  pagination: any;
  page_number: number = 0
  Searchdata: any=[];
  PartyDataS: any=[];
  data: any;
  public loading: boolean;
  data1: any[];
  showAlertCheckbox: boolean = true;
  summary: any;
  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard, public location: Location, public alertCtrl: AlertController) {

    const storedPreference = localStorage.getItem('showAlertPreference');
    if (storedPreference === 'false') {
      this.showAlertCheckbox = false;
    }
     }
  //trfileTransfer: FileTransferObject = this.transfer.create();
  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.item = response
    });
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId,this.item);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.page_number++
    console.log(this.purchaseData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      let header = this.api.getHeader();
      this.api.purchrg(s, this.item,header).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.purchaseData
          this.purchaseData = []
          let p = t.concat(response.data)
          this.purchaseData = [...new Set(p)]
          console.log('mmmm', this.item.page_number);
          console.log(this.page_number);
          console.log(this.pagination, "musssaaaa");
          this.data1=this.purchaseData
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
    console.log(this.purchaseData,this.data1, "pppaaginatin 2");
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  submit() {
    this.loading=true
    this.companyId = this.api.getCompanyId()
    this.item.company = this.companyId
    console.log("companyId", this.companyId);
    let header = this.api.getHeader();
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let s=''
   
    this.api.purchrg(s,this.e,header).subscribe(async (response: any) => {
      if (response.status == 200) {
        this.purchaseData = response.data
        this.summary=response.summary
        this.loading=false
        this.pagination = response.pagination_data
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.purchaseData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        this.purchaseData
      // this.purchaseData = response.data
      console.log(this.length==0);
      this.length = response.data.length
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 800,
          position:'middle'
        });
        toast.present();
      }
    }
    });
  }
  async selected(selected_invoice) {
    console.log("qqq", selected_invoice);
    let a = selected_invoice.type
    if (a == 'Purchase_Invoice') {
      for (let hh of this.permission.roles.data.permissions) {
        console.log("asd");

        if (hh.page_name == 'purchase_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({

              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: selected_invoice,
                open:true
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
          else {
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
    if (a == 'Purchase_Return') {
      for (let hh of this.permission.roles.data.permissions) {
        console.log("asd");

        if (hh.page_name == 'purchase_voucher') {
          console.log("asd123", hh.actions.create);
          if (hh.actions.edit == true) {
            const modal = await this.modalCtrl.create({

              component: EditBillPage,
              cssClass: 'my-custom-class',
              componentProps: {
                billData: selected_invoice,
                open:true
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
          else {
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
  excel() {
    let companyId = this.api.getCompanyId()
    this.item.companyId = companyId
    console.log("companyId", companyId);
    let header = this.api.getHeader();
    this.api.exportPurchaseRegister(this.item, header).subscribe((response: any) => {
      console.log(response);
      window.location.href = response.url
    
    });
  }
  
  async deleteInvoice(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'purchase_voucher') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.delete == true) {
          let a = item.type
          console.log(item,'ploo',item.type);
          if (a == 'Purchase_Invoice') {
            const toast = await this.toastController.create({
              header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE INVOICE?'),
              position: "bottom",
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
                        position:'middle'
                      });
                      toast.present();
                      this.submit()
                    },
                      async (error) => {
                        console.log("pppp", error);

                        const toast = await this.toastController.create({
                          message: error,
                          duration: 2000,
                          color: "danger"
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
          if (a == 'Expense') {
            const toast = await this.toastController.create({
              header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE EXPENSE?'),
              position: "bottom",
              buttons: [
                {
                  text: this.translate.instant('HEADER.YES'),
                  role: "done",
                  handler: () => {
                    // console.log("I loved it clicke");
                    let header = this.api.getHeader();
                    let company = this.api.getCompanyId()
                    let data = { id: item, company: company }
                    console.log("this.item", data);
                    this.api.deleteExpense(data, header).subscribe(async (response: any) => {
                      // console.log(response, 'delete party');
                      let a = response.msg
                      const toast = await this.toastController.create({
                        message: a,
                        duration: 2000,
                        position:'middle'
                      });
                      toast.present();
                      this.submit()
                    },
                      async (error) => {
                        console.log("pppp", error);

                        const toast = await this.toastController.create({
                          message: error,
                          duration: 2000,
                          color: "danger"
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
        else {
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
  getSales(ev){
    let s=ev.target.value;
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    let header = this.api.getHeader();
    this.api.purchrg(s, this.e,header).subscribe(async (response: any) => {
      if (s && s.trim() !== '') {
        console.log(s);
        // this.n=this.purchaseData
       this.purchaseData=this.Searchdata
      // if(response.status==200){
     this.PartyDataS=response
     this.Searchdata=this.PartyDataS.data
     this.data=this.PartyDataS.data.party_name
       console.log(this.PartyDataS,'sercresp');

       }else{
   
        this.data1[0]
        console.log(this.data1[0],'sercfg');
       }
    });
  }
  async showAlert() {
    if (!this.showAlertCheckbox) {
      return;
    }

    if (this.loading) {
      localStorage.setItem('showAlertPreference','true');
      const alert = await this.alertCtrl.create({
        header: 'For delete invoice ',
        message: `
      <img  src="../../assets/icon/Delete_invoice.jpeg" >
      `,
        cssClass: 'custom-alert',
        buttons: [
         
          {
            text: 'OK',
            role: 'done',
            handler: () => {
              localStorage.setItem('showAlertPreference','false');
              this.showAlertCheckbox = false;
              
            }
          }
        ]

      });

      await alert.present();
    }
  }
  async handleCheckboxChange() {
    localStorage.setItem('showAlertPreference', this.showAlertCheckbox.toString());
  }
}


