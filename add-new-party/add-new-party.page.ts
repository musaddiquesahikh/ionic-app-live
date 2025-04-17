
import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { ApiService } from "../api.service";
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-party',
  templateUrl: './add-new-party.page.html',
  styleUrls: ['./add-new-party.page.scss'],
})
export class AddNewPartyPage implements OnInit {
  data: any = {};
  submit: boolean = false;
  public isChecked = true;
  x: any = {}
  pan: any
  createpartypush: any = {}
  result: any;
  createParty: any = {};
  partyDetails: any = {
    company_name: '',
    Party_name: "",
    mobile_number: "",
    email: "",
    opening_balance: '',
    opening_balance_type: '',
    party_type: '',
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
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  gstmessage: any;
  defaultSelectQuestion: number;
  currentParty: any;
  place: any;
  place_of_supply: number;
  mobile_number: number;
  partyForm: FormGroup;
  partA: any = "custom-input1"
  partB: any = "custom-input2"
  constructor(public toastController: ToastController, public api: ApiService, public router: Router,
    public navCtrl: NavController, public location: Location, public modalCtrl: ModalController,
    private translate: TranslateService, public alertCtrl: AlertController,
    public permission: PermissionGuard, public formBuilder: FormBuilder) {

    this.partyForm = this.formBuilder.group({
      'party_type': ['1', Validators.required],
      'Party_name': ['', Validators.required],
      'mobile_number': [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'email': [null, Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'opening_balance': [0, Validators.required],
      'gstin': [null, Validators.compose([Validators.pattern("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[A-Za-z-0-9]{1}$")])],
      'pan': [null, Validators.compose([Validators.maxLength(10), Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])],
      'billing_address': ['', [Validators.maxLength(100)]],
      'shipping_address': ['', [Validators.maxLength(100)]],
      'same_as_billing': [false],
      'pincode': ['', [Validators.maxLength(6), Validators.pattern(/^[1-9][0-9]{5}$/)]],
      'city': [''],
      'payment_type': ['Debit'],
      'place_of_supply': [null, Validators.required],
      'credit_period': [0],
      'credit_limit': [0],
      'vehicle_count': [0],
      'company_name': this.api.getCompanyId()

    });

  }

  ngOnInit() {
    this.currentParty = JSON.parse(sessionStorage.getItem('currentCompany'));
    let user = this.partyForm.value
    this.permission1()

    this.api.receivedState().subscribe((response: any[]) => {
      this.place_of_supply = response["data"]
      console.log("state", this.place_of_supply);

    });

  }
  async saveData() {
    let user = this.partyForm.value
    if (user.gstin != null) {
      console.log((user.gstin.length), 'submit party');
      if (user.gstin.length != 15) {
        this.submit = false
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE. ENTER VALID GST NO'),
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      }
      if (user.gstin.length == 0) {
        user.gstin = null
        this.submit = true
      }
    }
    else {
      user.gstin = null
    }

    if (user.Party_name && user.mobile_number && user.payment_type && user.place_of_supply) {
      this.submit = true
      console.log("user1", this.partyForm.value);

    } else {
      this.submit = false
      console.log("user2", this.submit);

    }

    if (this.submit == true) {
      console.log(this.submit, "submit");

      this.partyDetails = this.partyForm.value;
      user.place_of_supply = user.place_of_supply

      this.partyDetails.place_of_supply = user.place_of_supply
      // user.state_code = user.place_of_supply.state_code
      console.log(this.partyDetails);


      // this.createParty = JSON.parse(sessionStorage.getItem("selectedCompany"));
      let companyId = this.api.getCompanyId();
      console.log("party details", companyId);
      this.partyDetails.company_name = companyId;

      console.log("data", this.partyDetails);
      let header = this.api.getHeader();
      let data1 = JSON.stringify(this.partyDetails)

      this.api.createNewParty(this.partyDetails, header).subscribe(async (response: any) => {
        console.log("sdsfdsffds", response);
        let a = response.status
        if (a == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.PARTY CREATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.x = response.data
          this.modalCtrl.dismiss()
          console.log("pppp", this.x);
          //  this.location.back()
        } else {

          const toast = await this.toastController.create({
            message: response.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      });
    }
    else {
      this.markFormTouched(this.partyForm);
      this.submit = false
      console.log("false");
    }
  }
  modalDismiss() {
    modalController.dismiss();
  }

  onAddressSame(val: any) {
    if (this.partyForm.value.same_as_billing) {
      this.partyForm.value.shipping_address = val;
      this.partyForm.controls['shipping_address'].patchValue(this.partyForm.value.billing_address)
    } else {
      this.partyForm.controls['shipping_address'].patchValue(null)
    }

  }
  gstFunction() {
    // this.pan = this.user.gstin;
    // if(this.pan != undefined){
    //     this.user.pan = this.pan.substr(2, 10);
    // }

  }

  displayValue2: any
  getValue(val: any) {
    console.log(val)

    this.displayValue2 = val.substr(2, 10)

  }
  back() {
    this.modalCtrl.dismiss(this.x)
  }
  async permission1() {

    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'parties') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create) {
        } else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
          // modalController.dismiss()
        }
      }
    }
  }
  partyType(a) {
    if (a == 1) {
      this.partA = "custom-input1"
      this.partB = "custom-input2"
    }
    else {
      this.partB = "custom-input1"
      this.partA = "custom-input2"
    }
    this.partyForm.get('party_type').patchValue(a)
    console.log(a, this.partyForm.value.party_type, "party type");

  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
}
