import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { PermissionGuard } from '../guards/permission.guard';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { EditItemPage } from '../edit-item/edit-item.page';


@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.page.html',
  styleUrls: ['./show-item.page.scss'],
})
export class ShowItemPage implements OnInit {
  public loading:boolean=true;
  item: any = [];
  items: any = []

  itemData: any = []
  listItem: any = {}
  itemlist: any = []
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  customButton: HTMLButtonElement;
  pagination: any;
  length: any;
  page_number: number=1;
  companyId: any;
  itemData1: any;
  data1: any;
  data
  itemDetails: any = [];
  id: any;
  
  constructor(public modalCtrl: ModalController, public router: Router, public api: ApiService,
    public alertCtrl: AlertController, public permission: PermissionGuard, public location: Location,
    private translate: TranslateService, public toastController: ToastController) {
  }
  ngOnInit() {
    // this.itemDetails.conversionrate = this.data.conversionrate
    // this.itemDetails = this.data
    // console.log("details1", this.itemDetails);
    // this.id = this.itemDetails.id
    this.getItem('')
    let item = JSON.parse(localStorage.getItem('create_item'))
    if (item) {
      setTimeout(() => {
          this.introMethod();
      },2000);
    }
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
    console.log(this.itemData,"pppaaginatin 1",this.itemData1);
    if (this.pagination.next_page) {

      this.api.selectedItemList(s, this.listItem).subscribe(async (response: any) => {
        console.log('lkf211', this.listItem, 'll', this.pagination);
        this.pagination = response.pagination_data
        if (response.status == 200) {
          let t = this.items
          this.items =[]
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
    this.api.selectedItemList(m, { "company_id": companyId }).subscribe(async (response: any) => {
      if (response.status == 200) {
        this.itemData= response.data
        this.loading=false
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
  async createNewItem() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'items') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalCtrl.create({
            component: AddNewItemPage,
            breakpoints: [0, 0.3, 0.5, 1],
            initialBreakpoint: 1
      
          });
          modal.onDidDismiss()
          .then((data:any={}) => {
            const user = data.data; // Here's your selected user!
              console.log("from address ", user)
              this.getItem('');
              let i = JSON.parse(localStorage.getItem('show_item'))
             if (i) {
              localStorage.setItem('create_item','false')

              setTimeout(() => {
                this.introMethod1();

              }, 2000);
             }
      
            });
            this.modalCtrl.dismiss();

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
  showItem( data) {
    if (data.isSelected) {
      this.item.push(data);
    } else {
      const index = this.item.indexOf(data);
      if (index > -1) {
        this.item.splice(index, 1);
      }
    }
    console.log(this.item);
  }
  sendData() {
    console.log("send data click", this.item);
    this.parentFunction.emit(this.item);
    // this.modalCtrl.dismiss();
  }
  isItemAvailable: Boolean = false;
  initializeItems() {
    this.items = this.itemData
  }
  searchItem(ev) {
    let companyId = this.api.getCompanyId();
    this.api.selectedItemList(companyId, ev).subscribe((response: any) => {
      console.log(response, 'reespo');
    })
  }
  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);
    this.initializeItems();
    this.getItem(val)
  }

  onClick(event: any) {
    const input = document.getElementById('quantity');
    input.focus();
  }
  introMethod(){
    let intro = introJs();
    this.customButton = document.createElement('button');
    this.customButton.innerText = 'SELECT ITEM';
    this.customButton.setAttribute('class', 'introCustomButton btn btn-primary');
    this.customButton.addEventListener('click', () => {
      intro.exit();
      this.introMethod1();
    });
    intro.oncomplete(function () {
      intro.exit();
      console.log("On COmplete");
      document.getElementById('create').click()
      localStorage.setItem('create_item','false')

    });
    intro.onexit(function(){
      localStorage.setItem('create_item','false')

    })
    intro.setOptions({
      steps: [
        {
          element: '#create',
          intro: 'Click on create item for adding new item if you want to use existing items so click on select item',
          position: 'top',

          buttons: [
            {
              text: 'Next',
              className: 'introjs-button',
              action: () => {
                intro.click();
              }
            },
            {
              text: 'Select',
              className: 'introjs-button',
              action: () => {
                intro.customButtonAction();
              }
            }
          ]
        }
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
      doneLabel: '<ion-button size="small">Create Item</ion-button>',
    })
    intro.onafterchange(() => {
      const tooltip = document.querySelector('.introjs-tooltipbuttons');
      if (tooltip && !tooltip.contains(this.customButton)) {
        tooltip.appendChild(this.customButton);
      }
    });
    intro.start();
    }
    introMethod1(){
      let intro = introJs();
      intro.oncomplete(function () {
        console.log("On COmplete");
        document.getElementById('select').click()
        localStorage.setItem('show_item','false')

      });
      intro.onexit(function(){
        localStorage.setItem('show_item','false')
  
      })
      intro.setOptions({
        steps: [
          {
            element: '#select',
            intro: 'Select item to add in invoice.',
            position: 'top'
          },
          {
            element: '#ok',
            intro: 'Click here for selected item to add in invoice.',
            position: 'bottom',
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
        doneLabel: '<ion-button size="small">Add</ion-button>',
      }).start();
      }
      async deleteItem(item) {
        const toast = await this.toastController.create({
          header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE ITEM?'),
          position:'bottom',
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
                      position:'middle'

                    });
                    toast.present();
                    this.getItem('')
                    this.modalCtrl.dismiss()
                  }
                  if (response.status == 403) {
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 3500,
                      color: 'warning',
                      position:'middle'
                    });
                    toast.present();
                    this.modalCtrl.dismiss()
                  }
                },
                  async (error) => {
                    console.log("pppp", error);
                    const toast = await this.toastController.create({
                      message: error,
                      duration: 3500,
                      color: "danger",
                      position:'middle'
                    });
                    toast.present();
                    this.modalCtrl.dismiss()
                  })
    
              }
            },
            {
              text: this.translate.instant('HEADER.CANCEL'),
              role: "cancel",
    
            },
          ],
        });
        toast.present();
      }

      // async presentModal(data) {
      //   for (let hh of this.permission.roles.data.permissions) {
      //     console.log("asd");
      //     if (hh.page_name == 'items') {
      //       console.log("asd123", hh.actions.edit,hh.actions.view);
      //       if (hh.actions.edit && hh.actions.view) {
      //         const modal = await this.modalCtrl.create({
      //           component: EditItemPage,
      //           cssClass: 'my-custom-class',
      //           componentProps: {
      //             dataitem: this.data1
      //           }
      //         });
      //         modal.onDidDismiss()
      //           .then((data: any = {}) => {
      //             const user = data.data; // Here's your selected user!
      //             console.log("from address 1", user)
      //             if (Object.keys(user).length === 0) {
      //             } else {
      //               this.itemDetails = user
      //               this.data1 = user
      //             }
      //           });
      //         // console.log("selected party", this.data1)
      //         return await modal.present();
      //       }
      //       else {
      //         let alert = await this.alertCtrl.create({
      //           header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
      //           message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
      //           buttons: ['OK']
      //         });
      //         alert.present();
      //         this.location.back()
      //       }
      //     }
      //   }
      // }
}
