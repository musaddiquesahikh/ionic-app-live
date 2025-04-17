import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-party',
  templateUrl: './edit-party.page.html',
  styleUrls: ['./edit-party.page.scss'],
})
export class EditPartyPage implements OnInit {
  list: any = [];
  itemIn: any = [];
  item: any = []
  modelhh: boolean;
  company: any = {}
  selectedParty: any = {}
  partyType: any = {}
  party: any;
  stateData: any = []
  @Input() partyList;
  isChecked: boolean


  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  constructor(public modalCtrl: ModalController, public router: Router, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.isChecked == true
    console.log("receivedData", this.partyList);
    // if (this.partyList.party_type == "Supplier") {
    //   this.partyList.party_type = 2
    // } else {
    //   this.partyList.party_type = 1
    // }
    if (this.partyList.billing_address == this.partyList.shipping_address) {
      this.isChecked = true
    }
    this.modelhh = true;
    console.log("partyList.place_of_supply", this.partyList.place_of_supply);

    this.stateDataFunction()

  }
  stateDataFunction() {
    this.api.receivedState().subscribe((response: any) => {
      console.log(response);
      this.stateData = response.data
      console.log("sthjg", this.stateData);

      console.log("party here", this.partyList.place_of_supply);

      //this.partyList.party_type=this.partyList.party_type.toString()
      this.partyList.place_of_supply = this.partyList.place_of_supply.toString()
      console.log('got id', typeof (this.partyList.place_of_supply));
      // this.partyList.place_of_supply = this.stateData

    });
  }


  saveParty() {
    this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
    let companyId = this.company.id;
    console.log("party details", companyId);
    this.partyList.party_id = this.partyList.id
    this.partyList.company_id = this.api.getCompanyId()
    this.partyList.place_of_supply = Number(this.partyList.place_of_supply)

    if (this.partyList.party_type == "Supplier") {
      this.partyList.party_type = 2
    } else {
      this.partyList.party_type = 1
    }

    let header = this.api.getHeader();
    this.api.editParty(this.partyList, header).subscribe(async (response: any) => {
      console.log("llll", response);
      let a = response.status
      if (a == 200) {
        this.item = response.data
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.modalCtrl.dismiss(response.data);
      } else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.SOMETHING WENT WRONG'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }

    }, async (error) => {
      console.log("pppp", error);

      const toast = await this.toastController.create({
        message: error,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    });
  }

  dismissmodel() {
    this.modalCtrl.dismiss();
  }
  onAddressSame() {
    if (this.isChecked == true) {
      console.log(this.isChecked);

      this.partyList.billing_address = this.partyList.shipping_address;
    }
    if (this.isChecked == false) {
      this.partyList.billing_address = "";
    }
  }
  gstFunction() {
    this.partyList.pan = this.partyList.gstin;
    this.partyList.pan = this.partyList.pan.substr(2, 10);
  }
}