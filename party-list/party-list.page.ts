import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
// import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';
import { PermissionGuard } from '../guards/permission.guard';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { AddNewPartyPage } from '../add-new-party/add-new-party.page';
import { CreateNewPartyPage } from '../create-new-party/create-new-party.page';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.page.html',
  styleUrls: ['./party-list.page.scss'],
})
export class PartyListPage implements OnInit {
  partylist: any = []
  item: any;
  items: any = [];
  modal2: boolean;
  partyList: any = []
  party_type: any = {}
  party: any = [];
  selectpartylist: any;
  isItemAvailable: Boolean = false;
  user: any = {};
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
customButton: HTMLButtonElement;
  pagination: any;
  data1: any;
  page_number: number=1;
  companyId: any;
  length: any;
  listParty: any={};
  role: any;
  public loading: boolean=true;
  submit:boolean=false;
  partyDetails: any = {
    company_name: '',
    Party_name: "",
    mobile_number: "",
    email: "",
    opening_balance: '',
    opening_balance_type: '',
    party_type: 1,
    gstin: null,
    place_of_supply: "",
    billing_address: "",
    shipping_address: "",
    credit_period: '',
    credit_limit: 0,
    city: '',
    contact_person: '',
     pan: "",
    payment_type: ''
  };
  x:any={}
  place_of_supply: number;
  currentParty: any;
  private selectSegment: string = 'admin';
  constructor(public modalCtrl1: ModalController, public api: ApiService, public alertCtrl: AlertController, public permission: PermissionGuard
    , public translate: TranslateService,public toastController: ToastController,public modalCtrl:ModalController,private popoverController: PopoverController) { }

  ngOnInit() {
    this.currentParty = JSON.parse(sessionStorage.getItem('currentCompany'));
    
    this.user.party_type = '1'
    this.user.payment_type = '1'
    this.user.opening_balance = 0
    this.user.credit_period = 0
    this.user.payment_type = "Debit"
    this.user.credit_limit = 0
    this.user.gstin = null
    this.user.place_of_supply = 1

    this.api.receivedState().subscribe((response: any[]) => {
      this.place_of_supply = response["data"]
      console.log("state", this.place_of_supply);
    });
    this.getparty('');
    let s = JSON.parse(localStorage.getItem('create_party'))
    setTimeout(() => {
    if(s){
      // this.introMethod();
    }
  },1600);
}

async saveData(user:any) {
   
  if (user.Party_name) {
    this.submit = true
    console.log("user1",user);
  } else {
    this.submit = false
    console.log("user2",this.submit);
  }
  if (this.submit==true) {
    console.log(this.submit,"submit");
    user.place_of_supply = user.place_of_supply
    this.partyDetails.place_of_supply = user.place_of_supply
  this.partyDetails = this.user;
  console.log(this.partyDetails);
  let companyId = this.api.getCompanyId();
  console.log("party details", companyId);
  this.partyDetails.company_name = companyId;
  this.partyDetails.party_type =user.party_type
  console.log("data", this.partyDetails);
  let header = this.api.getHeader();
  let data1 = JSON.stringify(this.partyDetails)

  this.api.createNewParty(this.partyDetails, header).subscribe(async (response: any) => {
    console.log("sdsfdsffds",response);
    let a=response.status
    if(a == 200)
    {
       const toast = await this.toastController.create({
        message:this.translate.instant('MESSAGE.PARTY CREATED SUCCESSFULLY'),
        duration: 2000,
        position:'middle'
      });
      toast.present();
      this.x =response.data
      //  this.function_partylist(this.item);
      // this.modalCtrl.dismiss()
      this.popoverController.dismiss(user)
      console.log("pppp",this.x);
    }else{
      const toast = await this.toastController.create({
        message: response.message,
        duration: 2000,
       position:'middle'
      });
      toast.present();
    }
   
  });
}
else {
  this.submit=false
  console.log("false");
  if(user.Party_name==undefined){
    const toast = await this.toastController.create({
      message:this.translate.instant('MESSAGE.ENTER PARTY NAME'),
      duration: 5000,
      position:'middle'
    });
    toast.present();
  }
 
  // if(user.mobile_number==undefined){
  //   const toast = await this.toastController.create({
  //     message:this.translate.instant('MESSAGE.ENTER MOBILE NUMBER'),
  //     duration: 5000,
  //     position:'middle'
  //   });
  //   toast.present();
  // }
}
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
    this.loading=false
    if (this.party != undefined) {
      this.item = this.party;
      console.log(this.item[0].party_type,'party type');
      
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

  function_partylist(partyData) {
    this.item = partyData;
    this.parentFunction.emit(this.item);
    // this.modalCtrl1.dismiss();
  }

  initializeItems() {
    this.item = this.party;
  }
  async createParty() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
          const modal = await this.modalCtrl1.create({
            component: CreateNewPartyPage,
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address ", user)
              this.getparty('');
              let party = JSON.parse(localStorage.getItem('partylist'))

              if(party){
              // this.introMethod1();
              localStorage.setItem('create_party','false')

              }
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
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
    console.log(event.detail.value,"segment");
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

  async presentModal(data) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: CreateNewPartyPage,
            cssClass: 'my-custom-class',
            componentProps: {
              partyList: data
            }
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 123 ", user)
              if(Object.keys(user).length === 0) {
              }else{
                this.data1=user
                this.item=user
              }
              // this.getparty();
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
          // this.location.back()
        }
      }
    }
  }

  // introMethod() {
  //   let intro = introJs();
  //   this.customButton = document.createElement('button');
  //   this.customButton.innerText = 'SELECT PARTY';
  //   this.customButton.setAttribute('class', 'introCustomButton btn btn-primary');
  //   this.customButton.addEventListener('click', () => {
  //     intro.exit();
  //     this.introMethod1();
  //   });
  //   intro.oncomplete(function () {
  //     intro.exit();
  //     console.log("On COmplete");
  //     document.getElementById('step11').click()
  //     localStorage.setItem('create_party','false')
  //     localStorage.setItem('partylist','true')
  //   });
  //   intro.onexit(function(){
  //     localStorage.setItem('create_party','false')

  //   })
  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: '#step11',
  //         intro: 'Click on create party for add new party if you want to use exist party so click on select party',

  //         buttons: [
  //           {
  //             text: 'Next',
  //             className: 'introjs-button',
  //             action: () => {
  //               intro.click();
  //             }
  //           },
  //           {
  //             text: 'Select',
  //             className: 'introjs-button',
  //             action: () => {
  //               // this.customButton.click();
  //               intro.customButtonAction();
  //               // document.getElementById('freeTrile').click();

  //             }
  //           }
  //         ]
  //       }

  //     ],

  //     disableInteraction: false,
  //     showStepNumbers: false,
  //     showBullets: false,
  //     exitOnOverlayClick: true,
  //     exitOnEsc: true,
  //     nextLabel: '<ion-button size="small">next</ion-button>',
  //     prevLabel: '<ion-button size="small">Back</ion-button>',
  //     doneLabel: '<ion-button size="small">Create Party</ion-button>',
  //   })
  //   intro.onafterchange(() => {
  //     const tooltip = document.querySelector('.introjs-tooltipbuttons');
  //     if (tooltip && !tooltip.contains(this.customButton)) {
  //       tooltip.appendChild(this.customButton);
  //     }
  //   });
  //  intro.start();
  // }

  // introMethod1() {
  //   let intro = introJs();
  //   intro.oncomplete(function () {
  //     console.log("On COmplete");
  //     document.getElementById('select-party').click()
  //     localStorage.setItem('partylist','false')


  //   });
  //   intro.onexit(function(){
  //     localStorage.setItem('partylist','false')

  //   })
  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: '#select-party',
  //         intro: 'Your created party will shown here,click to select Party.',
  //       }

  //     ],

  //     disableInteraction: false,
  //     showStepNumbers: false,
  //     showBullets: false,
  //     exitOnOverlayClick: true,
  //     exitOnEsc: true,
  //      scrollToElement:true,
  //     scrollTo:"element",
  //     scrollPadding:30,
  //     nextLabel: '<ion-button size="small">next</ion-button>',
  //         prevLabel: '<ion-button size="small">Back</ion-button>',
  //         doneLabel: '<ion-button size="small">Select</ion-button>',
  //   }).start();
  // }

 

}
