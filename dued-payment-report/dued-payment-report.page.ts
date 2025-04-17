import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dued-payment-report',
  templateUrl: './dued-payment-report.page.html',
  styleUrls: ['./dued-payment-report.page.scss'],
})
export class DuedPaymentReportPage implements OnInit {
  item1: any = {}
  length: any
  pagination: any;
  page_number: any = 1;
  Itemdata: any[];
  public loading: boolean;
  e: any = {};
  Searchdata: any[];
  PartyDataS: any = [];
  data: any;
  item: any;
  constructor(public api: ApiService, public toastController: ToastController, private translate: TranslateService,private modalController: ModalController) { }

  ngOnInit() {

    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response, 'ppp');
      this.item1 = response
    });
  }

  submit() {
    this.loading = true
    this.Itemdata = []
    console.log(this.Itemdata, 'submit', this.item1, this.item);
    let c_id=this.api.getCompanyId()
      this.api.post3("late_payment_register/" + c_id + "/", this.item1).subscribe(async (response: any) => {
      console.log(this.item1, 'lkf', response, this.Itemdata);
      console.log(this.item1, 'lkf11', response.data);
      this.Itemdata = response.data
      this.loading = false
      this.pagination = response.pagination
      console.log(this.pagination, 'nayyyo');

      this.length = response.data.length
      console.log(this.item1, "pppaaginatin ",this.length);
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }

  dismiss() {
    this.modalController.dismiss()
  }
}
