import { Component, OnInit, EventEmitter, Output, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { PartyDetailsPage } from '../party-details/party-details.page';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

@Injectable({
  providedIn: 'root'
})
export class Tab2Page {
  party: any=[];
  item: any;
  role: any;
  items: any = [];
  modal2: boolean;
  modelhh: boolean;
  public segment: string = 'transaction';
  partyList: any = {}
  listParty: any = {}
  partyType: any
  a: any = 9;
  b: any
  @Input() itemIn;
  languages: any = []
  selected: any = ''
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  pagination: any;
  length: any;
  companyId: any;
  page_number: number = 0

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    public modalController: ModalController, public alertCtrl: AlertController, private translate: TranslateService, public permission: PermissionGuard
    , public location: Location) { }

  ngOnInit() {
    this.getparty('');
    console.log("tab2");
  }

  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.listParty, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.listParty.company_id = Number(this.companyId)
    this.listParty.page_number = this.pagination.page_number + 1
    console.log(this.page_number, 'loksabha', this.listParty.page_number);
    this.page_number++
    this.item.page_number = this.listParty.page_number
    console.log(this.party,"pppaaginatin 1");
    if (this.pagination.next_page) {

      this.api.selectedPartyList(s, this.listParty).subscribe(async (response: any) => {
        console.log('lkf211', this.listParty, 'll', this.pagination);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.item
          this.item =[]
          let p = t.concat(response.data)
          this.item = [...new Set(p)]
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
  
  getparty(m) {
    this.party=[]
    let companyId = this.api.getCompanyId();
    this.api.selectedPartyList(m, { "company_id": companyId }).subscribe(async (response: any) => {
      if (response.status == 200) {
      sessionStorage.setItem('listParty', JSON.stringify(response));
      this.party = response.data;
      if (this.party != undefined) {
        this.item = this.party;
        this.pagination = response.pagination_data
        this.length = response.data.length
      }
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
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let r = { "mobile_no": user.user[0].mobile, "company": this.api.getCompanyId() }
    this.api.role(r).subscribe((response: any) => {
      console.log("respkkk", response.data.role);
      this.role = response.data.role
    })
  }

  isItemAvailable: Boolean = false;
  initializeItems() {
    this.item = this.party
  }
  searchItem(ev) {
    let companyId = this.api.getCompanyId();
    this.api.selectedPartyList(companyId, ev).subscribe((response: any) => {
      console.log(response, 'reespo');
    })
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);
    this.initializeItems();
    this.getparty(val)
  }
  modelDismiss() {
    this.modalCtrl.dismiss();
  }
  segmentChanged(event: any) {
    this.segment = event.target.value;
  }
  showParty(data) {
    this.modelhh = true;
    this.item = data;
  }
  dismissmodel() {
    this.modelhh = false;
    this.modalCtrl.dismiss();
  }
  async presentModal(item) {
    console.log(this.permission.roles.permissions,'dddaaa',this.permission.roles);
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.view);
        if (hh.actions.view) {
          const modal = await this.modalCtrl.create({
            component: PartyDetailsPage,
            cssClass: 'my-custom-class',
            componentProps: {
              item: item
            }
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              this.getparty('');
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
        }
      }
    }
  }
  doRefresh($event) {
    this.getparty('')
    $event.target.complete();
  }
  async createParty() {

    for (let hh of this.permission.roles.data.permissions) {
      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
          const modal = await this.modalController.create({
            component: CreateNewPartyPage,
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address ", user)
              this.getparty('');
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
  deleteParty(payID: any) {
    console.log(payID,this.permission.Role.permissions, 'permissiondata');
    for (let cc of this.permission.roles.data.permissions) {
      if (cc.page_name === 'parties') {
        if (cc.actions.delete) {
          let confirmmsg = this.translate.instant("MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE PAYMENT?")
          if (confirm(confirmmsg)) {
            let company = this.api.getCompanyId();
            this.api.post3('delete_party/', { id: payID ,company:company}).subscribe(async (response: any) => {
              if (response.status === 200) {
                const toast = await this.toastController.create({
                  message: response.msg,
                  duration: 4000,
                  position: "middle"
                });
                toast.present();
                // this.submit()
                 this.getparty('')
              }
              else {
                const toast = await this.toastController.create({
                  message: response.msg,
                  duration: 4000,
                  position: "middle"
                });
                toast.present();
              }
            }, async (error) => {
              const toast = await this.toastController.create({
                message: error,
                duration: 4000,
                position: "middle"
              });
              toast.present();
            })
          }
        }
      }
    }
  }

}
