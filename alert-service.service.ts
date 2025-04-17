import { Injectable } from '@angular/core';
import { AlertController ,ToastController,LoadingController,ActionSheetController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  btn_type:string;
  loading:any;
  // actionSheet:any;
  constructor(public alertController: AlertController,private toastCtrl: ToastController,public loadingController: LoadingController,
    public actionsheetCtrl:ActionSheetController, private translate:TranslateService) { }

   async alertShow(message: string,buttons) {
    const alert = await this.alertController.create({
      message: message,
      buttons
    });
    await alert.present();
  }

  async presentAlertConfirm(header: string, massage: string) {
    const alert = await this.alertController.create({
      cssClass: 'alertCustomCss',
      header,
      
      buttons: [
        {
          text: 'No',
          // text:this.translate.instant('HEADER.YES')
          role: 'cancel',
          cssClass: 'cancel-btn',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          // text:this.translate.instant('HEADER.YES')
          cssClass: 'ok-btn',
          handler: () => {
          }
        }
      ]
    });
  }
  dismisssLoader(){
    this.loading.dismiss();
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
    cssClass: 'custom-loader',
    spinner:"lines",
    // duration: 2000
  });
  await this.loading.present();
const { role, data } = await this.loading.onDidDismiss();
  }

async presentToast(message) {
  const toast = await this.toastCtrl.create({
    message: message,
    position: 'bottom',
    duration: 2000
  });
  toast.present();
}
}