import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from "../api.service";
import { CreateNewBankPage } from '../create-new-bank/create-new-bank.page';
import { CreateNewLedgerPageRoutingModule } from '../create-new-ledger/create-new-ledger-routing.module';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.page.html',
  styleUrls: ['./edit-company.page.scss'],
})
export class EditCompanyPage implements OnInit {
  // userImg: any;
  // public imagepre: any = "data:image/png;base64,";
  // imageForlogo: any = "../../../assets/icon/images (1).png";
  // imageForlogo1: any = "../../../assets/icon/images (2).png";
  result: any;
  gateway: any = {}
  gateway1: boolean = false
  gateway2: boolean = false
  pos1: boolean = false
  pos2: boolean = false
  pos: any = {}
  pay_gateway_service: boolean
  einvoice_service: boolean
  ewb_service:boolean
  e_invoice: boolean
  e_way:boolean
  einvoice: boolean
  eway_billdata:boolean
  einvoiceData: any = {}
  bankList: any = []
  form: FormGroup | any
  pan_card_number: any;
  place_of_supply: any = []
  industry_type: any = []
  businessType: any = []
  gst: boolean;
  panc: boolean
  company: any = []
  login_form: FormGroup;
  checkboxValue: any;
  item: any
  paymentModeData: any
  b: any
  paymentForm: FormGroup;
  posForm: FormGroup;
  eInvoiceForm: FormGroup
  eWayBillForm: FormGroup;

  id: any
  itemm: any={};
  disabled = "disabled";
  ewayData: any={};
  companyData: any={};
  eway_bill: any={};
  //panc:boolean=true;

  constructor(fb: FormBuilder, public api: ApiService, public toastController: ToastController, public router: Router,
    public modalCtrl: ModalController, private translate: TranslateService,private permission:PermissionGuard,public alertCtrl: AlertController) {
    this.login_form = fb.group({
      'id': 0,
      'email': [null, Validators.compose([Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'business_name': [null, Validators.required],
      'company_phone_no': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'business_type': [null, Validators.required],
      'industry_type': [null, Validators.required],
      'place_supply': [null, Validators.required],
      'city': [null, Validators.required],
      'gst_register': [{ value: '1', disabled: false }, Validators.required],
      'billing_address': [null, Validators.required],
      'pincode': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
      'gst_number': [null, Validators.compose([Validators.pattern("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[A-Za-z-0-9]{1}$")])],
      'pan_card_number': [null, Validators.compose([Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])],
      'start_date': [null, Validators.required],
      'sms_service': [null, Validators.required],
      'einvoice_service': [null, Validators.required],
      'ewb_service': [null, Validators.required],
      "pay_gateway_service": [null, Validators.required],
      'terms': [false],
      'customer_code_type1':[false],
      'customer_code_type':[false],
      'enable_customer_code':[false],
      'customer_code_has_prefix':[false],
      'customer_code_has_suffix':[false],
      'customer_code_prefix':[],
      'customer_code_suffix':[]
    });

    this.paymentForm = fb.group({
      "merchant_id_pg": [null, Validators.required],
      "merchant_key_pg": [null, Validators.required],
      "payment_mode_pg": [3, Validators.required],
      "website_pg": ["DEFAULT", Validators.required],
      "industry_type_pg": [null, Validators.required],
      "channel_id_web_pg": ["WEB", Validators.required],
      "channel_id_wap_pg": ["WAP", Validators.required],
      "bank": [null, Validators.required],
    })
    this.posForm = fb.group({
      "merchant_id_pg": [null, Validators.required],
      "merchant_key_pg": [null, Validators.required],
      "payment_mode_pg": [2, Validators.required],
      "website_pg": ["DEFAULT", Validators.required],
      "industry_type_pg": [null, Validators.required],
      "channel_id_web_pg": ["WEB", Validators.required],
      "channel_id_wap_pg": ["WAP", Validators.required],
      "transaction_id_pg": ['', Validators.required],
      "bank": [null, Validators.required],
    })
    this.eInvoiceForm = fb.group({
      "company_id": [this.api.getCompanyId(), Validators.required],
      "username": [null, Validators.required],
      "password": [null, Validators.required],
    })
    this.eWayBillForm = fb.group({
      "company_id": [this.api.getCompanyId(), Validators.required],
      "username": [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }


  // // openCamera() {
  //   this.modalCtrl.dismiss();
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Img = 'data:image/jpeg;base64,' + imageData;
  //     console.log(base64Img);
  //     this.testVar = "working";
  //     //console.log("image",imageData);
  //     console.log("test");

  //     this.userImg = base64Img;
  //   })
  // }

  //   //  async addLogo() {

  //   //   const imageData = await this.camera.getPicture(this.options);
  //   //     let currentImage = 'data:image/jpeg;base64,' + imageData;
  //   //     console.log(currentImage);
  //   //     this.testVar = "working";
  //   //     //console.log("image",imageData);
  //   //     console.log("test");
  //   //  this.userImg = currentImage;
  // // }

  // login_form: FormGroup;
  // checkboxValue: any;

  ngOnInit() {
    //this.parentfunction(this.item)
    this.getParticularCompany()
    this.pos2 = false
    this.gateway2 = false
    this.gateway1 = false
    this.e_invoice = false
    this.e_way=false
    this.getbank()
  }
  getbank() {
    let companyId = this.item["id"]
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("bankList 909", response);
      if(response.status!=500){
        this.bankList = response
      }
      else
      {
        this.bankList=[]
      }
    })
  }
  getParticularCompany() {
    let header = this.api.getHeader();
    console.log("received company", this.item["id"]);
    this.api.selectedCompanyList(this.item["id"], header).subscribe((response: any[]) => {
      console.log("company data recieved", response["company data"]);
      response["company data"].state = response["company data"].place_supply
      this.login_form.patchValue(
        response["company data"]
      );
      console.log(" this.gateway12", this.gateway1);
      this.gateway = response["company data"].gateway
      console.log("lllll", this.gateway);
      this.pos = response["company data"].pos
      console.log("lllll", this.pos);

      if (response["company data"].pay_gateway_service == true) {
        if (Object.keys(response["company data"].pos).length == 0) {
          this.pos1 = false
          this.pos2 = true
        } else {
          this.pos1 = true
          this.pos2 = false
          console.log(" this.gateway1", this.gateway1);
        }
        if (Object.keys(response["company data"].gateway).length == 0) {
          this.gateway1 = false
          this.gateway2 = true
        }
        else {
          this.gateway1 = true
          this.gateway2 = false
          console.log(" this.gateway1", this.gateway1);
        }
      } else {
        this.pos1 = false
        this.pos2 = false
        this.gateway1 = false
        this.gateway2 = false
      }
      this.companyData = response["company data"]
      this.itemm.ewb_service= this.companyData.ewb_service
      this.itemm.start_date = this.companyData.start_date;
      this.itemm.business_name = this.companyData.business_name
      this.itemm.email = this.companyData.email
      this.itemm.company_phone_no = this.companyData.company_phone_no
      this.itemm.business_type = this.companyData.business_type
      this.itemm.industry_type = this.companyData.industry_type
      this.itemm.billing_address = this.companyData.billing_address
      this.itemm.city = this.companyData.city
      this.itemm.place_of_supply = this.companyData.place_supply
      this.itemm.pincode = this.companyData.pincode
      this.itemm.gst_number = this.companyData.gst_number
      this.itemm.pan_card_number = this.companyData.pan_card_number
      this.itemm.sms_service = this.companyData.sms_service
      this.itemm.pay_gateway_service = this.companyData.pay_gateway_service
      this.itemm.einvoice_service = this.companyData.einvoice_service
      this.itemm.ewb_service= this.companyData.ewb_service
      this.itemm.gst_service=this.companyData.gst_service
      this.itemm.same_ewb_einv_creds=this.companyData.same_ewb_einv_creds;

      this.einvoiceData = response["company data"].einvoice
      this.eway_bill = response["company data"].eway_bill
      console.log("einvoiceData", this.einvoiceData)

      if (this.login_form.value.einvoice_service == true) {
        if (Object.keys(response["company data"].einvoice).length == 0) {
          this.einvoice = false
          this.e_invoice = true
          console.log(" this.e_invoice", this.e_invoice);
        } else {
          this.einvoice = true
          this.e_invoice = false
          console.log(" this.einvoice1", this.einvoiceData);
        }
      }
      else {
        this.e_invoice = false
        this.einvoice = false
      }

      if (this.login_form.value.ewb_service == true) {
        if (Object.keys(response["company data"].eway_bill).length == 0) {
          this.eway_billdata = false
          this.e_way = true
        } else {
          this.eway_billdata = true
          this.e_way = false
          console.log(" this.eway_bill", this.eway_billdata);

        }
      }
      else {
        this.e_way = false
        this.eway_billdata = false
      }
      console.log("this.login_form.value.pay_gateway_service", response["company data"].pay_gateway_service);
    })

    //this.api.post()
    // this.company = this.item
    // console.log("onInit", this.company); 

    this.gst = true;
    this.panc = true
    this.api.receivedState().subscribe((response: any[]) => {
      console.log(response);
      this.place_of_supply = response["data"]
      console.log("state", this.place_of_supply);
      //   let a = this.company.place_supply
      //  console.log("a", a);

      this.b = this.place_of_supply;
      this.company.place_supply = this.place_of_supply;
      //   this.company.industry_type = this.industry_type
      //   this.company.businessType = this.businessType
      //   console.log("comTy", this.company.businessType);

      //   this.id = this.company.id
      //   console.log("b", this.b);


      //   let c = this.b.filter((value) => this.b.id > a);

      //   console.log("filter", c)
      //   if (this.company.gst_number == null) {
      //     this.company.gst_register = 0
      //   } else {
      //     this.company.gst_register = 1
      //   }
    });

    // if (this.company.sms_service == false) {
    //   this.company.sms_service = "0"
    // } else {
    //   this.company.sms_service = "1"
    // }


    // if (this.company.pay_gateway_service == false) {
    //   this.company.pay_gateway_service = "0"
    // } else {
    //   this.company.pay_gateway_service = "1"
    // }


    this.api.listIndustryType().subscribe((response: any[]) => {
      console.log("x", response);
      this.industry_type = response["data"]
      console.log("state", this.industry_type);

    });
    this.api.listBusinessType().subscribe((response: any[]) => {
      console.log("l", response);
      this.businessType = response["data"]
      console.log("state", this.businessType);

    });
    this.api.paymentMode().subscribe((response: any[]) => {
      console.log(response);
      this.paymentModeData = response["data"]
      console.log("paymentModeData", this.paymentModeData);
    })
  }

  gstn() {
    this.gst = true
    this.panc = true
  }

  pan() {
    this.gst = false
    this.panc = true
  }
  forUppercase() {
    console.log(this.login_form.value.pan_card_number.toUpperCase());
    const yourControl = this.login_form.get('pan_card_number');
    yourControl.valueChanges.subscribe(() => {
      yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
    });

  }
  submitForm() {

    this.markFormTouched(this.login_form);
    if (this.login_form.valid) {
      // You will get form value if your form is valid
      var formValues = this.login_form.getRawValue;

    } else {
      this.login_form.controls['terms'].setValue(false);
    }
    console.log("formData", this.login_form.value);
    if (this.login_form.valid) {
      let header = this.api.getHeader();
      this.company = JSON.parse(sessionStorage.getItem("loginData"));
      console.log("cf", this.company.user[0].mobile);
      this.login_form.value.company_logo = null
      this.login_form.value.signature = null
      this.login_form.value.token = this.company.user[0].mobile
      console.log("cvh", this.login_form.value);

      this.api.editCompany(this.login_form.value, header).subscribe(async (response: any) => {
        console.log("dfg", response);
        if (response.status == 500) {
          alert(response.message);
        } else if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.COMPANY UPDATED SUCCESSFULLY'),
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.getParticularCompany()
        }
      })
    }

  };

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  gstFunction() {
    this.pan_card_number = this.login_form.value.gst_number;
    this.result = this.pan_card_number.substr(2, 10);
  }

  paymentGatewaySubmit() {

    this.markFormTouched(this.paymentForm);
    if (this.paymentForm.valid) {
      var formValues = this.paymentForm.getRawValue;
    }
    this.paymentForm.value.company = this.item["id"]
    if (this.paymentForm.valid) {
      console.log("plp", this.paymentForm.value);
      let header = this.api.getHeader();
      this.api.paymentGateway(this.paymentForm.value, header).subscribe(async (response: any) => {
        console.log("lolo", response);
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: response["msg"],
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.getParticularCompany()
        }

      })

    }
  }
  POSsubmit() {
    this.markFormTouched(this.posForm);
    if (this.posForm.valid) {
      var formValues = this.posForm.getRawValue;

    }
    this.posForm.value.company = this.item["id"]
    if (this.posForm.valid) {
      console.log("formData123", this.posForm.value);
      let header = this.api.getHeader();
      this.api.paymentGateway(this.posForm.value, header).subscribe(async (response: any) => {
        console.log("lolo", response);
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: response["msg"],
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.getParticularCompany()
        }
      })
    }

  }

  submitEinvoice() {
    this.markFormTouched(this.eInvoiceForm);
    if (this.eInvoiceForm.valid) {
      var formValues = this.eInvoiceForm.getRawValue;
    }
    this.eInvoiceForm.value.company = this.item["id"]
    if (this.eInvoiceForm.valid) {
      console.log("ppppp", this.eInvoiceForm.value);
      let header = this.api.getHeader();
      this.api.eInvoice(this.eInvoiceForm.value, header).subscribe(async (response: any) => {
        console.log("lolololo", response);
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.E-INVOICE DETAILS SAVED SUCCESSFULLY'),
            duration: 3000,
            position: 'middle'

          });
          toast.present();
          this.getParticularCompany()
        }
      })
    }
  }
  submitEway() {
    console.log(this.eway_billdata,this.eWayBillForm.valid, "eway bill submit");
    console.log(" this.eway_bill", this.companyData);

    this.markFormTouched(this.eWayBillForm);
    if (this.eWayBillForm.valid) {
      var formValues = this.eWayBillForm.getRawValue;
    }
    this.eWayBillForm.value.company = this.item["id"]
    if (this.eWayBillForm.valid) {
      console.log("ppppp", this.eWayBillForm.value);
      let header = this.api.getHeader();
      this.api.post1('save_ewb_creds/', this.eWayBillForm.value).subscribe(async (response: any) => {
        console.log("lolololo", response);
        if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.E-WAY DETAILS SAVED SUCCESSFULLY'),
            duration: 3000,
            position: 'middle'

          });
          toast.present();
          this.getParticularCompany()
        }
      })
    }
  }
  verifyEinvoice() {
    let data = this.eInvoiceForm.value;
    data.gst = this.itemm.gst_number;
    this.api.verifyASP_Creds(data).subscribe(async (response: any) => {

      if (response.status === 200) {
        this.disabled = "";
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.CREDENTIALS VERIFIED..!'),
          duration: 5000,
          position: 'middle'

        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.INVALID CREDENTIALS..!'),
          duration: 5000,
          position: 'middle'

        });
        toast.present();
      }
    }
    );
  }
  verifyEwaybill() {
    let data = this.eWayBillForm.value;
    data.gst = this.itemm.gst_number;
    this.api.verifyASP_Creds(data).subscribe(async (response: any) => {

      if (response.status === 200) {
        this.disabled = "";
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.CREDENTIALS VERIFIED..!'),
          duration: 5000,
          position: 'middle'

        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.INVALID CREDENTIALS..!'),
          duration: 5000,
          position: 'middle'

        });
        toast.present();
      }
    }
    );
  }
  async createNewBank() {
    // this.router.navigate(['/create-new-bank'])  
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'manage_money') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
          const modal = await this.modalCtrl.create({
            component: CreateNewBankPage,
            cssClass: 'my-custom-class',
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 009 ", user)
              this.getbank()
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
          this.modalCtrl.dismiss()
        }
      }
    }
  }
  back(){
    this.modalCtrl.dismiss()
  }
  submitForm1() {

    this.markFormTouched(this.login_form);
    if (this.login_form.valid) {
      // You will get form value if your form is valid
      var formValues = this.login_form.getRawValue;

    } else {
      this.login_form.controls['terms'].setValue(false);
    }
    console.log("formData", this.login_form.value);
    if (this.login_form.valid) {
      let header = this.api.getHeader();
      this.company = JSON.parse(sessionStorage.getItem("loginData"));
      console.log("cf", this.company.user[0].mobile);
      this.login_form.value.company_logo = null
      this.login_form.value.signature = null
      this.login_form.value.token = this.company.user[0].mobile
      console.log("cvh", this.login_form.value);

      this.api.editCompany(this.login_form.value, header).subscribe(async (response: any) => {
        console.log("dfg", response);
        if (response.status == 500) {
          alert(response.message);
          //this.getParticularCompany()
        } 
        else {
          this.getParticularCompany()
        }
      })
    }
  }
  displayCode(){
    if(!this.login_form.value.enable_customer_code){
      this.login_form.value.customer_code_type1='false'
      this.login_form.get('customer_code_type').setValue(false)
      this.login_form.get('customer_code_has_prefix').setValue(false)
      this.login_form.get('customer_code_has_suffix').setValue(false)
      this.login_form.get('customer_code_prefix').setValue(null)
      this.login_form.get('customer_code_suffix').setValue(null)
    }
  }
  codeCheck(){
    if(this.login_form.value.customer_code_type1='false'){
      this.login_form.value.customer_code_type=false
      
    }
  }
  codeCheck1(){
    if(this.login_form.value.customer_code_type1='true'){
      this.login_form.value.customer_code_type=true
    }
  }
  toggleShow1(){
    console.log(this.login_form.value.customer_code_has_suffix);
    this.login_form.value.customer_code_has_suffix=!this.login_form.value.customer_code_has_suffix
    if(!this.login_form.value.customer_code_has_suffix){
      this.login_form.get('customer_code_suffix').setValue(null)
  
    }
    console.log(this.login_form.value.customer_code_has_suffix);
  }
  toggleShow(){
    this.login_form.value.customer_code_prefix=!this.login_form.value.customer_code_prefix
    if(!this.login_form.value.customer_code_has_prefix){
      this.login_form.get('customer_code_prefix').setValue(null)
    }
  }
}
