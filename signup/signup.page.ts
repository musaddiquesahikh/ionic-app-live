import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertServiceService } from '../alert-service.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: any = { mobileno: '' };
  data: any;
  status: string = "";
  dataReturnFromService: any;
  order_id: string = "";
  constructor(public http: HttpClient, private router: Router, public apiService: ApiService, public alertController: AlertController, private platform: Platform,
    public loadingController: LoadingController, public alertService: AlertServiceService, private translate: TranslateService) { }

  ngOnInit() {
  }
  submitData() {
    if (this.user['mobileno'] && this.user['mobileno'].length == 10) {
      if (navigator.onLine) {

        // this.router.navigate(['/otp']);
        this.presentLoading();
        this.data = {
          "mobile_number": this.user['mobileno'],
          "version_id": this.apiService.app_version
        }

        this.apiService.postData(this.data, "mobile_otp").subscribe((dataReturnFromService) => {

          this.status = dataReturnFromService["status"];
          if (dataReturnFromService["status"] == "1" || dataReturnFromService["status"] == "0" || dataReturnFromService["status"] == "2") {
            this.dataReturnFromService = dataReturnFromService;
            localStorage.setItem("mobileno", this.user['mobileno']);
            this.loadingController.dismiss();

            this.presentAlert(dataReturnFromService["message"], 'success');
          } else {
            this.loadingController.dismiss();
            this.presentAlert(dataReturnFromService["message"] ? dataReturnFromService["message"] : "Something went wrong!Please try again.", 'error');

          }

        }, error => {
          // console.log(error);
          this.loadingController.dismiss();
          if (error.status == '401') {
            this.status = error.error.status;
            this.presentAlert(error.error.message, 'success');
          } else {
            this.presentAlert("Something went wrong!Please try again.", 'error');
          }


        })
      } else {
        this.alertService.alertShow('Please check your Internet Connection!!',
          [
            {
              text: 'OK',
              handler: () => {
              }
            }
          ]);
      }
    } else {
      this.presentAlert("Invalid mobile number", 'error');

    }

  }
  async presentAlert(message, type) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      // subHeader: 'Subtitle',
      message: message,
      // buttons: ['OK']
      buttons: [
        {
          text: 'OK',
          // text:this.translate.instant('HEADER.YES')

          handler: () => {
            localStorage.setItem("mobileno", this.user['mobileno']);
            if (type == 'success') {
              if (this.status == '0') {//0 for existing
                // this.router.navigate(['/otp']);
                this.router.navigate(['/signin']);
              } else if (this.status == '1' || this.status == '2') { //1 for new user
                localStorage.setItem("tokenID", this.dataReturnFromService["token_id"]);
                this.router.navigate(['/otp']);
                // var user = localStorage.getItem("userInfo");
                // if(user && user.length > 1){
                //   this.router.navigate(['/signin']);
                // }else{
                //   if(localStorage.getItem("tokenID") && localStorage.getItem("tokenID").length > 0){
                //     this.router.navigate(['/register']);
                //   }else{
                //     localStorage.setItem("tokenID",this.dataReturnFromService["token_id"]);
                //     this.router.navigate(['/otp']);
                //   }

                // }

              }
              // else if(this.status == '2'){
              //   this.router.navigate(['/otp']);
              // }

            }


          }
        }
      ]
    });

    await alert.present();
  }

  async exitAlertConfirm(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      // subHeader: 'Subtitle',
      message: message,
      buttons: [{
        text: 'Stay',
        // text:this.translate.instant('HEADER.YES')
        role: 'cancel',
        handler: () => {

        }
      }, {
        text: 'Exit',
        // text:this.translate.instant('HEADER.YES')
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'custom-loader',
      spinner: "lines",
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }


}
