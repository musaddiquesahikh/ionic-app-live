import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { ApiService } from "../api.service";
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-party',
  templateUrl: './create-new-party.page.html',
  styleUrls: ['./create-new-party.page.scss'],
})
export class CreateNewPartyPage implements OnInit {

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
    payment_type: '',
    has_sez: false

  };
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  @Input() partyList;
  @Input() party
  gstmessage: any;
  defaultSelectQuestion: number;
  currentParty: any;
  place: any;
  mobile_number: number;
  partyForm: FormGroup;
  partA: any = "custom-input1"
  partB: any = "custom-input2"
  item: any;
  detailType: any = 'default';
  matchingStates: number;
  place_of_supply: any;
  value: any;
  t: any;
  isSame: any;
  gst_able: boolean=false;
  areAllControlsValid: boolean=false;
  fetchdisable: boolean=false;

  constructor(public toastController: ToastController, public api: ApiService, public router: Router,
    public navCtrl: NavController, public location: Location, public modalCtrl: ModalController,
    private translate: TranslateService, public alertCtrl: AlertController,
    public permission: PermissionGuard, public formBuilder: FormBuilder) {

    this.partyForm = this.formBuilder.group({
      'party_type': ['1', Validators.required],
      'Party_name': ['', Validators.required],
      'mobile_number': [null, Validators.compose([Validators.maxLength(10), Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
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
      'place_of_supply': [0, Validators.required],
      'credit_period': [0],
      'credit_limit': [0],
      'vehicle_count': [0],
      'has_sez': [false],
      'company_name': [this.api.getCompanyId()],
      'company_id': [this.api.getCompanyId()],
      'id': [],
      'party_id': [],
      'as_on': [],
      'full_customer_code':[],
      'customer_code': [],
      'detailType': ['default'],
    });

  }

  ngOnInit() {
    this.currentParty = this.api.getCompanyDetails();
    this.permission1()
    this.api.receivedState().subscribe((response: any[]) => {
      this.place_of_supply = response["data"]
      this.matchingStates = this.place_of_supply
    });
    console.log(this.partyList, "ppaartyy");
    this.t = JSON.parse(sessionStorage.getItem('currentCompany'))
    console.log(this.t, "plll");

    this.partyForm.get('place_of_supply').setValue(this.t[0].place_supply)
    if (this.partyList) {
      this.partyForm.patchValue(this.partyList)
      this.partyForm.get('party_id').patchValue(this.partyList.id)
      if (this.partyForm.value.shipping_address == this.partyForm.value.billing_address) {
        this.partyForm.get('same_as_billing').patchValue(true)
      }
    }
    if(this.partyList===undefined && this.currentParty.enable_customer_code){
      this.getZCode()
    }
  }
  get p() { return this.partyForm.controls; }
  aset() {
    if (this.currentParty.enable_customer_code) {
      this.partyForm.controls['full_customer_code'].patchValue(this.currentParty.customer_code_prefix + this.partyForm.value.customer_code + this.currentParty.customer_code_suffix)
    } else {
      this.partyForm.value.full_customer_code = null
      this.partyForm.value.customer_code = null
    }
  }
  getZCode(){
    let header = this.api.getHeader();
    this.api.getCode(this.api.getCompanyId(),header).subscribe((res:any)=>{
      console.log(res,'ccode');
      if(this.currentParty.enable_customer_code){
        this.partyForm.controls['customer_code'].patchValue(res.code)
      }else{
        this.partyForm.controls['customer_code'].patchValue(null)
      }
    })
  }
  placeGst() {
    if (this.partyForm.value.gstin) {
      if (this.partyForm.value.gstin.length == 15) {

        let p = this.partyForm.value.gstin.substr(0, 2)
        console.log(p, "pp");

        if (p > 10) {
          this.matchingStates = this.place_of_supply.filter(state => state.state_code.toString() === p);
          console.log(this.place_of_supply, this.matchingStates);
          if (this.matchingStates[0]) {
            this.partyForm.value.place_of_supply = this.matchingStates[0].id
            this.partyF = this.matchingStates[0].id
            this.partyForm.controls["place_of_supply"].patchValue(this.partyF)
          }
        }
        else {
          // this.matchingStates = this.statesData
          this.matchingStates = this.place_of_supply.filter(state => "0" + state.state_code.toString() === p);
          console.log(this.matchingStates);
          if (!this.matchingStates) {
            this.partyF = this.matchingStates[0].id
            this.partyForm.controls["place_of_supply"].patchValue(this.partyF)
          }
        }
      }
    }
    else {
      this.matchingStates = this.place_of_supply
    }
  }
  partyF(partyF: any) {
    throw new Error('Method not implemented.');
  }
  async saveData() {
    if (this.partyList != undefined) {
      if(this.currentParty.enable_customer_code){
        this.partyForm.controls['full_customer_code'].patchValue(this.currentParty.customer_code_prefix + this.partyForm.value.customer_code + this.currentParty.customer_code_suffix)
      }else{
        this.partyForm.value.full_customer_code=null
        this.partyForm.value.customer_code=null
      }
      console.log(this.partyForm.value, 'submit party126');
      console.log(this.partyList, 'submit partyyyyyyyyy');
      this.partyForm.value.party_type = this.partyList.party_type.toString()
      let party = this.partyForm.value
      let options = this.api.getHeader();
      // this.currentParty = JSON.parse(sessionStorage.getItem('currentCompany'));
      if (this.currentParty.sms_service === true) {
        if (party.Party_name && party.mobile_number && party.payment_type && party.place_of_supply) {
          this.partyForm.valid
        }
      }
      else {
        if (party.Party_name && party.payment_type && party.place_of_supply) {
          this.partyForm.valid
        } else {
          this.partyForm.invalid
        }
      }
      if(party.has_other_currency){
        party.currency=party.currency
      //  party.has_other_currency=this.currency_T
      }else{
        party.currency=null
        party.currency_conversion=null
      }
      if (this.partyForm.valid) {
      let header = this.api.getHeader();
      this.api.editParty(this.partyForm.value, header).subscribe(async (response: any) => {
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
          this.modalCtrl.dismiss(this.item);
          this.parentFunction.emit(this.item);
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
    else {
      if (party.Party_name == '') {
        const toast = await this.toastController.create({
          message: this.translate.instant('enter party name'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();      }
      if (party.place_of_supply == null) {
        const toast = await this.toastController.create({
          message: this.translate.instant('please select state'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();      }
      if (this.currentParty.sms_service === true) {
        if (party.mobile_number == '') {
          const toast = await this.toastController.create({
            message: this.translate.instant('please enter mobile number'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();       
         }
      }
    }

    }

    else {
      if(this.currentParty.enable_customer_code){
        this.partyForm.controls['full_customer_code'].patchValue(this.currentParty.customer_code_prefix + this.partyForm.value.customer_code + this.currentParty.customer_code_suffix)
      }else{
        this.partyForm.value.full_customer_code=null
        this.partyForm.value.customer_code=null
      }
      let user = this.partyForm.value
      if (this.currentParty.sms_service === true) {
        if (user.Party_name && user.mobile_number && user.payment_type && user.place_of_supply) {
          this.partyForm.valid
        }
      }
      if(user.has_other_currency){
        user.currency=user.currency
      //  user.has_other_currency=this.currency_T
      }else{
        user.currency=null
        user.currency_conversion=null
      }

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

      if (this.partyForm.valid) {
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
        if (user.Party_name == '') {
          const toast = await this.toastController.create({
            message: this.translate.instant('enter party name'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();        }
        if (user.place_of_supply == null) {
          const toast = await this.toastController.create({
            message: this.translate.instant('select state'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();          }
        if (this.currentParty.sms_service === true) {
          if (user.mobile_number == '') {
            const toast = await this.toastController.create({
              message: this.translate.instant('enter mobile number'),
              duration: 2000,
              position: 'middle'
            });
            toast.present();            
          }
        }
      }
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
  gstFunction(val: any) {
    console.log(val, "ppann");
    this.value = val.target.value.substr(2, 10)
    this.partyForm.get('pan').patchValue(this.value)
  }

  displayValue2: any
  // getValue(val: any) {
  //   console.log(val)
  //   this.displayValue2 = val.substr(2, 10)
  // }
  getValue(val: any) {
    console.log(val, 'value');
    this.displayValue2 = val.slice(2, 12)
    this.p['pan'].patchValue(this.displayValue2)
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
    if (this.partyList == undefined) {
      if (a == 1) {
        this.partA = "custom-input1"
        this.partB = "custom-input2"
      }
      else {
        this.partB = "custom-input1"
        this.partA = "custom-input2"
      }
      this.partyForm.get('party_type').patchValue(a)
    }
    else {
      this.partyForm.get('party_type').patchValue(this.partyList.party_type)
      console.log(a, this.partyForm.value.party_type, "party type");
    }
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  }
  
  isFormValid(){ 
    if(this.party==undefined){   
    this.areAllControlsValid = Object.keys(this.partyForm.controls)
      .filter(controlName => controlName !== 'gstin')  
      .some(controlName => this.partyForm.controls[controlName].touched && this.partyForm.controls[controlName].valid);
    }
    console.log(this.areAllControlsValid,'jjjj');
  }

  checkValue(){
    if(this.party==undefined){
    let isPatternValid = /^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[A-Za-z-0-9]{1}$/
    if(isPatternValid.test(this.partyForm.value.gstin)){
      this.gst_able=true
    }else{
      this.gst_able=false
    }}
  }
  autoFetch(){
    console.log(this.partyForm.value.party_fetch);
      if(this.gst_able && !this.areAllControlsValid && this.party==undefined){
        console.log('working gstin party data');
        let header=this.api.getHeader()
        this.api.getGst(this.partyForm.value.gstin,header).subscribe(async (res:any)=>{
            console.log('data of gst',res);
            if(res.status==200){
              const toast = await this.toastController.create({
            message: this.translate.instant('Party Data Fetch Successfully'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
              this.partyForm.patchValue(res.data)
              this.fetchdisable=true
            }else if(res.status==500){
              this.fetchdisable=false
              const toast = await this.toastController.create({
                message: this.translate.instant('MESSAGE.FAILED'),
                duration: 2000,
                position: 'middle'
              });
              toast.present();

            }
          }, async (error) => {
            const toast = await this.toastController.create({
              message: this.translate.instant('MESSAGE.FAILED'),
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          })
    }
  }
  
}