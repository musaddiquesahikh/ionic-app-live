import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from "../api.service";
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-new-business',
  templateUrl: './add-new-business.page.html',
  styleUrls: ['./add-new-business.page.scss'],
})
export class AddNewBusinessPage implements OnInit {
  userImg: any;
  signature: any;
  public imagepre: any = "data:image/png;base64,";
  imageForlogo: any = "../../../assets/icon/images (1).png";
  imageForlogo1: any = "../../../assets/icon/images (2).png";
  result: any;
  form: FormGroup | any
  pan_card_number: any;
  place_of_supply: any = []
  industry_type: any = []
  businessType: any = []
  gst: boolean;
  panc: boolean
  company: any = []

  options: CameraOptions = {
    quality: 75,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  optionsc: CameraOptions = {
    quality: 75,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  testVar: string;


  async openCamera() {
    this.modalCtrl.dismiss();
    const imageData = await this.camera.getPicture(this.optionsc);
    let currentImage = 'data:image/jpeg;base64,' + imageData;
    this.login_form.patchValue({
      'company_logo': imageData
    })
    console.log(currentImage);
    this.testVar = "working";
    console.log("test");
    this.userImg = currentImage;
  }

  async addLogo() {
    this.modalCtrl.dismiss();
    const imageData = await this.camera.getPicture(this.options);
    let currentImage = 'data:image/jpeg;base64,' + imageData;
    this.login_form.patchValue({
      'company_logo': imageData
    })
    console.log(currentImage);
    this.testVar = "working";
    console.log("test");
    this.userImg = currentImage;
  }

  async openCameras() {
    this.modalCtrl.dismiss();
    const imageData = await this.camera.getPicture(this.optionsc);
    let currentImage = 'data:image/jpeg;base64,' + imageData;
    this.login_form.patchValue({
      'signature': imageData
    })
    console.log(currentImage);
    this.testVar = "working";
    console.log("test");
    this.signature = currentImage;
  }

  async addSignature() {
    this.modalCtrl.dismiss();
    const imageData = await this.camera.getPicture(this.options);
    let currentImage = 'data:image/jpeg;base64,' + imageData;
    this.login_form.patchValue({
      'signature': imageData
    })
    console.log(currentImage);
    this.testVar = "working";
    console.log("test");
    this.signature = currentImage;
  }

  login_form: FormGroup;
  checkboxValue: any;

  constructor(fb: FormBuilder, public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    public router: Router, private camera: Camera, private translate: TranslateService, public datepipe: DatePipe) {
    this.login_form = fb.group({
      'email': [null, Validators.compose([Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'business_name': [null, Validators.required],
      'company_phone_no': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'business_type': [null, Validators.required],
      'industry_type': [null, Validators.required],
      'place_supply': [null, Validators.required],
      'city': [null, Validators.required],
      'gst_register': [{ value: '0', disabled: false }, Validators.required],
      'billing_address': [null, Validators.required],
      'pincode': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
      'gst_number': [null, Validators.compose([Validators.pattern("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[A-Za-z-0-9]{1}$")])],
      'pan_card_number': [null, Validators.compose([Validators.required, Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])],
      'start_date': [null, Validators.required],
      'sms_service': [false, Validators.required],
      'company_logo': [null],
      'signature': [null],
      'pay_gateway_service': [false],
      'einvoice_service':[false],
      "ewb_service":[false],
      'terms': [false],
    });
  }
  ngOnInit() {
    this.gst = false;
    this.panc = true
    this.api.receivedState().subscribe((response: any[]) => {
      console.log(response);
      this.place_of_supply = response["data"]
      console.log("state", this.place_of_supply);

    });
    this.api.listIndustryType().subscribe((response: any[]) => {
      console.log("x", response);
      this.industry_type = response["data"]
      console.log("industry_type", this.industry_type);

    });
    this.api.listBusinessType().subscribe((response: any[]) => {
      console.log("l", response);
      this.businessType = response["data"]
      console.log("businessType", this.businessType);

    });
    this.dateChange()
  }
  dateChange() {
    let today_date = Date.now();
    this.login_form.get('start_date').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
    console.log(this.login_form.value.start_date,'date');

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
      var formValues = this.login_form.getRawValue;
    } else {
      this.login_form.controls['terms'].setValue(false);
    }
    console.log("formData", this.login_form.value);
    if (this.login_form.valid) {
      let header = this.api.getHeader();
      this.company = JSON.parse(sessionStorage.getItem("loginData"));
      console.log("cf", this.company.user[0].mobile);
      this.login_form.value.token = this.company.user[0].mobile
      console.log("cvh", this.login_form.value);
      this.api.createNewCompany(this.login_form.value, header).subscribe(async (response: any) => {
        console.log(response);
        if (response.status == 500) {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        } else if (response.status == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant("MESSAGE.COMPANY CREATED SUCCESSFULLY"),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.router.navigateByUrl('/show-company-list')
            .then(() => {
              // window.location.reload();
            });
        }

      })
    }
    else {
      alert(this.translate.instant("MESSAGE.PLEASE ENTER REQUIRED FEILD"))
    }
  }

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
}

