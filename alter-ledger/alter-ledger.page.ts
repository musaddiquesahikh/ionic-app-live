import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { CreateGroupPage } from '../create-group/create-group.page';
import { CreateNewLedgerPage } from '../create-new-ledger/create-new-ledger.page';
import { EditLedgerPage } from '../edit-ledger/edit-ledger.page';
import { PermissionGuard } from '../guards/permission.guard';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';


@Component({
  selector: 'app-alter-ledger',
  templateUrl: './alter-ledger.page.html',
  styleUrls: ['./alter-ledger.page.scss'],
})
export class AlterLedgerPage implements OnInit {
  ledgerData: any = [];
  items: any = [];
  company: any = []
  item: any = {}
  on_tour: boolean;
  constructor(public api: ApiService, public modalCtrl: ModalController,
    private permission: PermissionGuard, public alertCtrl: AlertController, public location: Location,
    public router: Router, public toastController: ToastController,private popoverController: PopoverController
    , private translate: TranslateService) { }

  ngOnInit() {
    this.getAlterledger();
    let t = JSON.parse(localStorage.getItem('alter_ledger'))
    setTimeout(() => {
      if(t){
        this.introMethod();
      }
    }, 1000);
  }
  getAlterledger() {
    let companyId = this.api.getCompanyId()
    console.log("party details", companyId);
    let header = this.api.getHeader();
    this.api.ledgerList(companyId, header).subscribe((response: any) => {
      console.log("api called", response);
      this.ledgerData = response.data;
      this.items = this.ledgerData
    });
  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.items = this.ledgerData
    // this.party =this.item
    console.log("item", this.item);

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.items = this.ledgerData.filter((item) => {
        return (item.ledger_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }


  async selectedLedger(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'ledgers') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditLedgerPage,
            cssClass: 'my-custom-class',
            componentProps: {
              data: item
            }
          });
          console.log("selected item", item)
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
  async createLedger() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'ledgers') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
          // this.router.navigateByUrl('/create-new-ledger')
          const popover = await this.popoverController.create({
            component: CreateNewLedgerPage,
            cssClass: 'my-custom-class',
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              this.getAlterledger();
            });
          return await popover.present();
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
  doRefresh($event) {
    this.getAlterledger()
    $event.target.complete();
  }
  async deleteLedger(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'ledgers') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete == true) {
          console.log("ppp", item);
          const toast = await this.toastController.create({
            // header:this.translate.instant('HEADER.message'),
            header: `Are you sure you want to Delete the Ledger?`,
            position: 'middle',
            buttons: [
              {
                // text: this.translate.instant('HEADER.message'),
                text: "YES",
                role: "done",
                handler: () => {
                  // console.log("I loved it clicke");
                  let header = this.api.getHeader();
                  let company = this.api.getCompanyId()
                  let data = { id: item, company: company }
                  console.log("this.item", item);
                  this.api.deleteLedger(data, header).subscribe(async (response: any) => {
                    console.log(response, 'delete party');
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position: 'middle'
                    });
                    toast.present();
                    this.getAlterledger();
                  })
                },
              },
              {
                // text: this.translate.instant('HEADER.message'),
                text: "Cancel",
                role: "cancel",
              },
            ],
          });
          toast.present();
          // this.getAlterledger();
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
  async createGroup() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'ledgers') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
          const popover = await this.popoverController.create({
            component: CreateGroupPage,
            cssClass: 'my-custom-class',
          });
          popover.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              this.getAlterledger();
            });
          return await popover.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();

        }
      }
    }
  }
  introMethod(){
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('ledger').click()
      localStorage.setItem('alter_ledger', 'false');
    });
    intro.onexit(function(){
      localStorage.setItem('alter_ledger','false')

    })
    intro.setOptions({
      steps: [
        {
          element: '#ledger',
          intro: 'create new ledger.',
        },
        
     
      ],
      
      disableInteraction: false ,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc:true,
      scrollToElement:true,
      scrollTo:"element",
      scrollPadding:30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Create</ion-button>',
    })
    intro.start();
    }
    back() {
      this.popoverController.dismiss()
    }
}
