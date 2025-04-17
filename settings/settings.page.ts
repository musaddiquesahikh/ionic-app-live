import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ApiService } from '../api.service';
import { EditCompanyPage } from '../edit-company/edit-company.page';
import { TranslateService } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { Location } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentCompany: any;
  item1: any = {}
  userImg: any;
  item: any = []
  bankList: any = []
  companyData: any;
  paymentOption: Boolean = false
  already: Boolean = true;
  paymentForm: FormGroup;
  segmentShow: any = 'pg'
  paymentOption1: boolean = false;
  already1: boolean = true;
  paymentFormPos: FormGroup;
  companyData1: any;
  signature: string;
  company_logo: any;
  imagedata: any = {}
  on_tour: boolean;
  // segmentShow:any='pg'


  constructor(public modalCtrl: ModalController, public api: ApiService, private fb: FormBuilder, public router: Router,
    private camera: Camera, private translate: TranslateService,public alertCtrl: AlertController,public permission: PermissionGuard, 
    private location:Location) {
    this.paymentForm = fb.group({
      "merchant_id_pg": [null, Validators.required],
      "merchant_key_pg": [null, Validators.required],
      "payment_mode_pg": [3, Validators.required],
      "website_pg": ["DEFAULT", Validators.required],
      "industry_type_pg": [null, Validators.required],
      "channel_id_web_pg": ["WEB", Validators.required],
      "channel_id_wap_pg": ["WAP", Validators.required],
      "company": [null, Validators.required]
    })
    this.paymentFormPos = fb.group({
      "merchant_id_pg": [null, Validators.required],
      "merchant_key_pg": [null, Validators.required],
      "payment_mode_pg": [2, Validators.required],
      "website_pg": ["DEFAULT", Validators.required],
      "transaction_id_pg": [null, Validators.required],
      "industry_type_pg": [null, Validators.required],
      "channel_id_web_pg": ["WEB", Validators.required],
      "channel_id_wap_pg": ["WAP", Validators.required],
      "company": [null, Validators.required]
    })
  }

  ngOnInit() {
    let t = JSON.parse(localStorage.getItem('setting'))
    setTimeout(() => {
      if(t){
        this.introMethod();
      }
    }, 1000);
    this.getCompany()
    this.getLogo()

  }
  getLogo() {
    this.currentCompany = JSON.parse(sessionStorage.getItem("currentCompany"))
    console.log("wwwwww", this.currentCompany);

    if (this.currentCompany[0].company_logo == null) {
      this.currentCompany[0].company_logo = "https://api.esarwa.com/media/default-logo.png";
    } else {
      this.currentCompany[0].company_logo = this.currentCompany[0].company_logo
      console.log("fffff", this.currentCompany[0].company_logo);

    }
    if (this.currentCompany[0].signature == null) {
      this.currentCompany[0].signature = "https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Michael-Jordan-personal-autograph.png";
    } else {
      this.currentCompany[0].signature = this.currentCompany[0].signature
    }
  }

  getCompany() {
    let cId = this.api.getCompanyId()
    // this.companyData=
    this.api.getCompanyData(cId).subscribe(async (response: any[]) => {
      console.log("qqqq", response["company data"]);
      this.imagedata = response["company data"]
      // console.log("imagedta",this.imagedata.company_logo );

      if (Object.keys(response["company data"].gateway).length === 0) {
        this.paymentOption = true
        this.already = false
        // console.log(response["company data"].gateway);

        // this.companyData=
      } else {
        this.companyData = response["company data"].gateway
        this.already = true
        this.paymentOption = false

        console.log(response["company data"].gateway);
      }
      if (Object.keys(response["company data"].pos).length === 0) {
        this.paymentOption1 = true
        this.already1 = false
        // console.log(response["company data"].pos);

        // this.companyData=
      } else {
        this.companyData1 = response["company data"].pos
        this.already1 = true
        this.paymentOption1 = false

        console.log(response["company data"].pos);
      }


    });
    console.log(this.companyData);
    this.getbank()

  }
  getbank() {
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.bankList(companyId, header).subscribe((response: any) => {
      console.log("getBank", response);
      if (response.status != 500) {
        this.bankList = response
      }
    })
  }
  // openPayment(){

  // }

  submitForm() {
    let cid = this.api.getCompanyId();
    this.paymentForm.patchValue({
      "company": cid
    })

    console.log("formData", this.paymentForm.value);
    if (this.paymentForm.valid) {

      console.log("after submit", this.paymentForm.value);
      this.api.submitPayment(this.paymentForm.value).subscribe((response: any) => {
        console.log("after asubmit", response);
        if (response.status == 200) {
          alert(response.msg)
          this.modalCtrl.dismiss();
        }

      })

    }
    else {
      alert(this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'))

    }

  }

  submitFormPos() {
    let cid = this.api.getCompanyId();
    this.paymentFormPos.patchValue({
      "company": cid
    })

    console.log("formData", this.paymentFormPos.value);
    if (this.paymentFormPos.valid) {

      console.log("after submit", this.paymentFormPos.value);
      this.api.submitPayment(this.paymentFormPos.value).subscribe((response: any) => {
        console.log("after asubmit", response);
        if (response.status == 200) {
          alert(response.msg)
          this.modalCtrl.dismiss();
        }

      })

    }
    else {
      alert(this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'))
    }

  }

  async editCompany(item) {
    const modal = await this.modalCtrl.create({
      component: EditCompanyPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: item
      }

    });
    // this.parentFunction.emit(this.item);
    console.log("selected company", item)
    return await modal.present();
  }
  selectBank() {
    this.getbank()
  }

  segmentChanged(event) {
    this.segmentShow = event.target.value
    console.log(event.target.value)
  }


  addBank() {
    this.router.navigateByUrl('create-new-bank')

  }

  options: CameraOptions = {
    quality: 75,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  optionsc: CameraOptions = {
    quality: 40,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  testVar: string;

  // async openCamera() {
  //   this.modalCtrl.dismiss();
  //   const imageData = await this.camera.getPicture(this.optionsc);
  //   let currentImage = imageData;
  //   this.currentCompany[0].company_logo = currentImage
  //   this.company_logo = currentImage
  //   let comp_id = this.api.getCompanyId()
  //   let compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
  //   let data = { company_id: comp_id, company_logo: this.company_logo, business_name: compdata[0].business_name }
  //   this.api.edit_logo(data).subscribe((response: any) => {
  //     console.log("bbbb", response)
  //     this.currentCompany[0].company_logo = response.data.company_logo
  //     sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
  //     this.currentCompany[0] = response.data
  //   })
  // }

  async openCamera() {
    try {
        this.modalCtrl.dismiss();
        
        const imageData = await this.camera.getPicture(this.optionsc);
        if (!imageData) {
            console.warn("No image data captured.");
            return;
        }

        this.currentCompany[0].company_logo = imageData;
        this.company_logo = imageData;

        const comp_id = this.api.getCompanyId();
        const compdata = this.currentCompany[0];
        const data = { 
            company_id: comp_id, 
            company_logo: this.company_logo, 
            business_name: compdata.business_name 
        };

        // Add loading feedback here
        this.api.edit_logo(data).subscribe(
            (response: any) => {
                console.log("Logo update response:", response);
                this.currentCompany[0].company_logo = response.data.company_logo;
                sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
                this.currentCompany[0] = response.data;
                // Remove loading feedback here
            },
            (error) => {
                console.error("Error updating logo:", error);
                // Handle error feedback here
            }
        );
    } catch (error) {
        console.error("Error opening camera:", error);
        // Handle error feedback here
    }
}

  // async addLogo() {
  //   this.modalCtrl.dismiss();
  //   const imageData = await this.camera.getPicture(this.options);
  //   this.company_logo = imageData
  //   this.currentCompany[0].company_logo = this.company_logo
  //   let comp_id = this.api.getCompanyId()
  //   let compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
  //   let data = { company_id: comp_id, company_logo: this.company_logo, business_name: compdata[0].business_name }
  //   this.api.edit_logo(data).subscribe((response: any) => {
  //     console.log("bbbb", response)
  //     this.currentCompany[0].company_logo = response.data.company_logo
  //     sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
  //     this.currentCompany[0] = response.data
  //   })

  // }

  async addLogo() {
    try {
        this.modalCtrl.dismiss();

        // Select image from gallery
        const imageData = await this.camera.getPicture(this.options);
        if (!imageData) {
            console.warn("No image data selected.");
            return;
        }

        this.company_logo = imageData;
        this.currentCompany[0].company_logo = this.company_logo;

        // Prepare data
        const comp_id = this.api.getCompanyId();
        const compdata = sessionStorage.getItem("currentCompany");
        if (!compdata) {
            console.error("No company data found in session storage.");
            return;
        }
        const parsedData = JSON.parse(compdata);
        const data = {
            company_id: comp_id,
            company_logo: this.company_logo,
            business_name: parsedData[0].business_name
        };

        // API call
        this.api.edit_logo(data).subscribe(
            (response: any) => {
                console.log("Logo upload response:", response);
                if (response && response.data) {
                    this.currentCompany[0].company_logo = response.data.company_logo;
                    sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
                } else {
                    console.warn("Unexpected API response:", response);
                }
            },
            (error) => {
                console.error("Error uploading logo:", error);
            }
        );
    } catch (error) {
        console.error("Error selecting image:", error);
    }
}


  // async openCameras() {
  //   this.modalCtrl.dismiss();
  //   const imageData = await this.camera.getPicture(this.optionsc);
  //   let currentImage = imageData;
  //   this.signature = currentImage;
  //   this.currentCompany[0].signature = currentImage
  //   let comp_id = this.api.getCompanyId()
  //   let compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
  //   let data = { company_id: comp_id, signature: this.signature, business_name: compdata[0].business_name }
  //   this.api.edit_signature(data).subscribe((response: any) => {
  //     console.log("dddd", response)
  //     this.currentCompany[0].signature = response.data.signature
  //     sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
  //     this.currentCompany[0] = response.data
  //   })
  // }

  async openCameras() {
    try {
        this.modalCtrl.dismiss();

        // Capture the image
        const imageData = await this.camera.getPicture(this.optionsc);
        if (!imageData) {
            console.warn("No image data captured.");
            return;
        }

        // Update signature locally
        this.signature = imageData;
        this.currentCompany[0].signature = this.signature;

        // Prepare API data
        const comp_id = this.api.getCompanyId();
        const compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
        if (!compdata) {
            console.error("No company data found in session storage.");
            return;
        }

        const data = {
            company_id: comp_id,
            signature: this.signature,
            business_name: compdata[0].business_name
        };

        // Call API to upload signature
        this.api.edit_signature(data).subscribe(
            (response: any) => {
                console.log("Signature upload response:", response);
                if (response && response.data) {
                    this.currentCompany[0].signature = response.data.signature;
                    sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
                } else {
                    console.warn("Unexpected API response:", response);
                }
            },
            (error) => {
                console.error("Error uploading signature:", error);
            }
        );
    } catch (error) {
        console.error("Error capturing image:", error);
    }
}
  // async addSignature() {
  //   this.modalCtrl.dismiss();
  //   const imageData = await this.camera.getPicture(this.options);
  //   this.signature = imageData;
  //   this.currentCompany[0].signature = this.signature
  //   let comp_id = this.api.getCompanyId()
  //   let compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
  //   let data = { company_id: comp_id, signature: this.signature, business_name: compdata[0].business_name }
  //   this.api.edit_signature(data).subscribe((response: any) => {
  //     console.log("bbbb", response)
  //     this.currentCompany[0].signature = response.data.signature
  //     sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
  //     this.currentCompany[0] = response.data
  //   })
  // }

  async addSignature() {
    try {
        this.modalCtrl.dismiss();

        // Select image from gallery
        const imageData = await this.camera.getPicture(this.options);
        if (!imageData) {
            console.warn("No image data selected.");
            return;
        }
        // Update signature locally
        this.signature = imageData;
        if (!this.currentCompany || !this.currentCompany[0]) {
            console.error("No company data available.");
            return;
        }
        this.currentCompany[0].signature = this.signature;

        // Prepare API data
        const comp_id = this.api.getCompanyId();
        const compdata = JSON.parse(sessionStorage.getItem("currentCompany"));
        if (!compdata || compdata.length === 0) {
            console.error("No company data found in session storage.");
            return;
        }

        const data = {
            company_id: comp_id,
            signature: this.signature,
            business_name: compdata[0].business_name
        };

        // Log API payload
        console.log("API Payload:", data);

        // Call API to upload the signature
        this.api.edit_signature(data).subscribe(
            (response: any) => {
                console.log("Signature upload response:", response);
                if (response && response.data) {
                    this.currentCompany[0].signature = response.data.signature;
                    sessionStorage.setItem("currentCompany", JSON.stringify(this.currentCompany));
                } else {
                    console.warn("Unexpected API response:", response);
                }
            },
            (error) => {
                console.error("Error uploading signature:", error);
            }
        );
    } catch (error) {
        console.error("Error selecting or uploading signature:", error);
    }
}

  // async permission1() {

  //   for (let hh of this.permission.roles.data.permissions) {
  //     console.log("asd");

  //     if (hh.page_name == 'sales_voucher' || hh.page_name == 'purchase_voucher') {
  //       console.log("asd123", hh.actions.create);
  //       if (hh.actions.edit == true) {
  //       } else {
  //         let alert = await this.alertCtrl.create({
  //           header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
  //           message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
  //           buttons: ['OK']
        
  //         });
  //       }
  //         alert.present();
  //         //  this.location.back()
  //         // this.modal.dismiss()
  //  }
  //     }
  //   }
  // }
  introMethod(){

    let intro = introJs();

    intro.oncomplete(function () {
      console.log("On COmplete");
      localStorage.setItem("setting" ,"false");

    });
    intro.onexit(function (){
   localStorage.setItem("setting" ,"false");
   console.log("false setting tour on exit");
   
    });
    intro.setOptions({
      steps: [
        {
          element: '#logo',
          intro: 'Click here to add company logo.',
        },
        {
          element: '#details',
          intro: 'click here to change/edit company details.',
        },
        {
          element: '#temp',
          intro: 'Click here to select invoice templates.',
        },  
        {
          element: '#payment',
          intro: 'Click here to change invoice settings.',
        },  
        {
          element: '#qr',
          intro: 'Click here to manage staff details.',
        },
        {
          element: '#sign',
          intro: 'Click here to add your signature.',
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
          doneLabel: '<ion-button size="small">Done</ion-button>',
    }).start();
    }

}
