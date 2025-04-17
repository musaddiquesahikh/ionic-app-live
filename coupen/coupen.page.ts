import { LoginPage } from './../login/login.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupen',
  templateUrl: './coupen.page.html',
  styleUrls: ['./coupen.page.scss'],
})
export class CoupenPage implements OnInit {
  coupen_code:any
  trigger_button1: boolean;
  voucher_id: any;
  oldData: string; 
  code:any
  constructor(public modalControl:ModalController,private api:ApiService,private toastController:ToastController
    ,private translate:TranslateService,public router: Router) { }

  ngOnInit() {
    
  }
  async modal1(t:any) {
    if (t != undefined && t != '') {
      this.api.getVoucher(t).subscribe(async (response: any) => {
        console.log(response, "respoce from");
        if (response.status == 200) {
           this.modalControl.dismiss(response.data.id,'high')
        } else if (response.status == 500) {
          const toast = await this.toastController.create({
            message: this.translate.instant(response.data),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.router.navigateByUrl('/show-company-list')
            .then(() => {
              window.location.reload();
            });
        }
        
      });
    }
    else {
      const toast = await this.toastController.create({
        message: this.translate.instant("MESSAGE.ENTER VOUCHER CODE"),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }
  SkipTo() {
    
      let confirmmsg = this.translate.instant("MESSAGE.SURE FREE TRIAL ?")
      if (confirm(confirmmsg)) {
        this.modalControl.dismiss('high')
      }
       
      }
    }

