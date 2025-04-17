import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from '../api.service';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { ItemDetailsPage } from '../item-details/item-details.page';
// import { PartyDetailsPage } from '../party-details/party-details.page';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  public loading: boolean = true
  user: any = {};
  selectTabs = 'recent';
  public is_auto;
  items: any = [];

  itemL: any = [];
  listItem: any = {}
  item: any = [];
  b: any

  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  pagination: any;
  itemData: any = [];
  companyId: any;
  page_number: number = 0
  pagination1: any;
  e: any = {};
  company_id: any;
  length: any;
  itemData1: any = [];

  constructor(public modalCtrl: ModalController, public api: ApiService,
    public alertCtrl: AlertController, private permission: PermissionGuard,
    public location: Location, public router: Router, public toastController: ToastController,
    public modalController: ModalController, private translate: TranslateService) { }
  ngOnInit() {
    this.getItem('')
    this.permission1();
  }

  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.listItem, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.listItem.company_id = Number(this.companyId)
    this.listItem.page_number = this.pagination.page_number + 1
    console.log(this.page_number, 'loksabha', this.listItem.page_number);
    this.page_number++
    this.item.page_number = this.listItem.page_number
    console.log(this.itemData, "pppaaginatin 1", this.itemData1);
    if (this.pagination.next_page) {

      this.api.selectedItemList(s, this.listItem).subscribe(async (response: any) => {
        console.log('lkf211', this.listItem, 'll', this.pagination);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.items
          this.items = []
          let p = t.concat(response.data)
          this.items = [...new Set(p)]
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
  getItem(m) {
    this.itemData = []
    let companyId = this.api.getCompanyId();
    console.log(this.pagination, this.itemData, 'writ');
    let header = this.api.getHeader();
        this.api.selectedItemList(m, { "company_id": companyId,header }).subscribe(async (response: any) => {
      if (response.status == 200) {
        this.itemData = response.data
        this.loading = false
        this.pagination = response.pagination_data
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.items);
        console.log(this.listItem, "pppaaginatin ");
        this.items = this.itemData;
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
  searchItem(ev) {
    let companyId = this.api.getCompanyId();
    this.api.selectedItemList(companyId, ev).subscribe((response: any) => {
      console.log(response, 'reespo');
    })
  }
  function_partylist(itemData) {
    this.item = itemData;
    this.parentFunction.emit(this.item);
    this.modalCtrl.dismiss();
  }
  isItemAvailable: Boolean = false;
  initializeItems() {
    this.items = this.itemData;
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);
    this.initializeItems();
    this.getItem(val)
  }
  async presentModal(item) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: item
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getItem('');
      });
    return await modal.present();
  }

  doRefresh($event) {
    this.getItem('')
    $event.target.complete();
  }
  async createNewItem() {
    const modal = await this.modalController.create({
      component: AddNewItemPage,
    });
    modal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getItem('');
      });
    return await modal.present();
  }
  async deleteItem(item) {
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE ITEM?'),
      position: 'bottom',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: () => {
            let header = this.api.getHeader();
            let company = this.api.getCompanyId()
            let data = { id: item, company: company }
            this.api.deleteItem(data, header).subscribe(async (response: any) => {
              if (response.status == 200) {
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 3000,
                  position: 'middle'

                });
                toast.present();
                this.getItem('')
              }
              if (response.status == 403) {
                let a = response.msg
                const toast = await this.toastController.create({
                  message: a,
                  duration: 3500,
                  color: 'warning',
                  position: 'middle'
                });
                toast.present();
              }
            },
              async (error) => {
                console.log("pppp", error);
                const toast = await this.toastController.create({
                  message: error,
                  duration: 3500,
                  color: "danger",
                  position: 'middle'
                });
                toast.present();
              })

          }
        },
        {
          text: this.translate.instant('HEADER.CANCEL'),
          role: "cancel",
          cssClass: 'mm'


        },
      ],
    });
    toast.present();
  }
  async permission1() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'items') {
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
