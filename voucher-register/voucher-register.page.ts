import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import { EditJournalVoucherPage } from '../edit-journal-voucher/edit-journal-voucher.page';

@Component({
  selector: 'app-voucher-register',
  templateUrl: './voucher-register.page.html',
  styleUrls: ['./voucher-register.page.scss'],
})
export class VoucherRegisterPage implements OnInit {
  item: any = {}
  expenseData: any = [];
  length: any;
  pagination: any;
  page_number: number = 0
  companyId: any;
  data1: any;
  pagination1: any;
  e: any = {};

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
    console.log("companyId122", this.companyId, this.item, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    // this.item.party_id = this.expenseData[0].party_id
    // this.item.party_name = this.expenseData[0].party_name
    this.page_number++
    console.log(this.expenseData, "pppaaginatin 1", this.expenseData.party_id);
    if (this.pagination.next_page) {
      this.api.voucherRegister(s, this.item).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination
        if (response.status == 200) {
          let t = this.expenseData
          this.expenseData = []
          let p = t.concat(response.data)
          this.expenseData = [...new Set(p)]
          this.data1 = this.expenseData
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
    console.log(this.expenseData, this.data1, "pppaaginatin 2");
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  submit() {
    this.item.company = this.api.getCompanyId()
    console.log("companyId");
    let s = ''
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    this.api.voucherRegister(s, this.e).subscribe(async (response: any) => {
      console.log(response, 'ii');

      if (response.status == 200) {
        this.expenseData = response.data
        this.pagination = response.pagination
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.expenseData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        this.expenseData
        this.expenseData = response.data
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
  async selected(item) {
    console.log("pppp", item);
    item.invoice_id = item.id
    const modal = await this.modalCtrl.create({
      component: EditJournalVoucherPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      },
    });
    console.log("selected party", item)
    return await modal.present();
  }
}
