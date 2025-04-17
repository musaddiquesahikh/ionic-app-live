import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { EditItemPage } from '../edit-item/edit-item.page';
import { PermissionGuard } from '../guards/permission.guard';
import { Tab3Page } from '../tab3/tab3.page';
import { CreateNewItemPage } from '../create-new-item/create-new-item.page';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  itemDetails: any = [];
  private selectSegment: string = 'itemTimeline';
  user: any = [];
  date: any;
  data1: any
  itemList: any
  data
  id: any
  Unit: any;
  result: any;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    public permission: PermissionGuard, public location: Location, public translate: TranslateService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.itemDetails.conversionrate = this.data.conversionrate
    this.itemDetails = this.data
    console.log("details1", this.itemDetails);
    this.id = this.itemDetails.id
    this.date = new Date().toISOString();
    let header = this.api.getHeader();
    this.api.getSelectedItem(this.id, header).subscribe((response: any) => {
      console.log('got response from ', response);
      this.data1 = response.data;
      this.api.receivedUnit(header).subscribe((response: any) => {
        console.log(response);
        this.Unit = response.data

        this.result = this.Unit.filter((obj) => {
          return obj.id == this.data1.unit
        });
      });
    });
  }
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
  }

  async closeModal() {
    this.modalCtrl.dismiss(this.data1)
  }

  async presentModal() {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'items') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {
          const modal = await this.modalCtrl.create({
            component: EditItemPage,
            cssClass: 'my-custom-class',
            componentProps: {
              dataitem: this.data1
            }
          });
          modal.onDidDismiss()
            .then((data: any = {}) => {
              const user = data.data; // Here's your selected user!
              console.log("from address 1", user)
              if (Object.keys(user).length === 0) {
              } else {
                this.itemDetails = user
                this.data1 = user
              }
            });
          // console.log("selected party", this.data1)
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
        }
      }
    }
  }
}
