import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  constructor(private alertController: AlertController) {}
  ngOnInit() {
   
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Video Alert',
      message: `
        <video width="100%" controls>
          <source src="path_to_your_video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

}
