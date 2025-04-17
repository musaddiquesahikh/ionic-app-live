import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import { InvoiceSettingPage } from '../invoice-setting/invoice-setting.page';

@Component({
  selector: 'app-item-setting',
  templateUrl: './item-setting.page.html',
  styleUrls: ['./item-setting.page.scss'],
})
export class ItemSettingPage implements OnInit {
  itemSettings:FormGroup
  options: any = [];
  @Input() dataitem
  constructor(private fb:FormBuilder,private api:ApiService, private toastController: ToastController,
    private translate:TranslateService,public modalCtrl: ModalController,private navCtrl: NavController
    , public permission: PermissionGuard, public alertCtrl: AlertController) {
    this.itemSettings=this.fb.group({
      disable_item_code:[false],
      disable_service_code:[false],
      company:[this.api.getCompanyId()],
      group: [Validators.required],
    })
   }

  ngOnInit(): void {
    this.fetchItemsetting()
    // this.loadOptions();
  }

  fetchItemsetting(){
    let company=this.api.getCompanyId()
    this.api.post3('get_item_settings/', { "company": company,"type":1}).subscribe((res:any)=>{
      console.log(res);
        this.itemSettings.patchValue(res)
          })
        // this.modalCtrl.dismiss()
  }

  onChange(){
    console.log(this.itemSettings.value);
  }
 
  update(){
    this.api.post3('edit_item_settings/',this.itemSettings.value).subscribe(async (res:any)=>{
      console.log(res,'after submit');
      if(res.status=="success"){
        const toast = await this.toastController.create({
          message: 'Item Setting Updated successfully',
          duration: 2000,
          position: 'middle'
        });
        await toast.present();
        this.fetchItemsetting()
        this.navCtrl.pop();
        }
    }, async (error) => {
      const toast = await this.toastController.create({
        message: 'FAILED',
        duration: 2000,
        position: 'middle'
      });
      await toast.present();    })
  }
  // back() {
  //   this.modalCtrl.dismiss()
  // }
  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options: any) => {
      console.log(options, "opppp");
      if (options.status == 200) {
        this.options = options.data;
        let a=options.data[0].id
        if(this.dataitem==undefined){
        // this.ItemForm.get('group').setValue(1);
        this.itemSettings.controls['group'].setValue(a);
        }
      }
      else {
        this.options = []
      }
    });
  }

  async deleteCategoryGroup(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'items') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete == true) {
          console.log(item);
          const toast = await this.toastController.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE INVOICE?'),
            position: "bottom",
            buttons: [
              {
                text: this.translate.instant('HEADER.YES'),
                role: "done",
                handler: () => {
                  console.log("this.item", item);
                  let header = this.api.getHeader();
                  this.api.deletGroup(item,header).subscribe(async (response: any) => {
                    console.log(response, 'delete ');
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position:"middle"
                    });
                    toast.present();
                    this.loadOptions()
                  },
                    async (error) => {
                      console.log("pppp", error);

                      const toast = await this.toastController.create({
                        message: error,
                        duration: 2000,
                        position:"middle"
                      });
                      toast.present();
                      this.loadOptions()
                    })
                },
              },
              {
                text: this.translate.instant('HEADER.CANCEL'),
                role: "cancel",
              },
            ],
          });
          toast.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          // this.modalCtrl.dismiss();
        }
      }
    }
  }
}
