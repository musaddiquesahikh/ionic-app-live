import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-gstr2',
  templateUrl: './gstr2.page.html',
  styleUrls: ['./gstr2.page.scss'],
})
export class GSTR2Page implements OnInit {
  item: any = {
    "company": null,
    "quarter": 0,
    "start": "2022-05",
    "year": null
  }
  gstr2: any = []
  company: any = []
  length: any

  constructor(private api: ApiService, public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {


  }
  submit() {
    let companyId = this.api.getCompanyId()
    this.item.company = companyId
    let header = this.api.getHeader();
    this.api.gstr2(this.item, header).subscribe(async (response: any) => {
      console.log('190', response);

      this.gstr2 = response.data
      console.log(this.gstr2);
      this.length = response.data.length
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }

    })
  }
  excel() {
    let companyId = this.api.getCompanyId()
    this.item.company = companyId
    console.log(this.item);
    let header = this.api.getHeader();
    this.api.exportGstr2(this.item, header).subscribe((response: any) => {
      console.log('190', response);
      window.location.href = response.url
    })
  }
}
