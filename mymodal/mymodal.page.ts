import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.page.html',
  styleUrls: ['./mymodal.page.scss'],
})
export class MymodalPage implements OnInit {
  options: any = [];
  CategoryName: any;

  constructor(public toastController: ToastController, public api: ApiService, public datePipe:DatePipe,
    public location: Location, public modalCtrl: ModalController, private translate: TranslateService,
    ) { }

  ngOnInit() {
  }
  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options:any) => {
      
      console.log(options,"opppp");
      if(options.status==200){
      this.options = options.data;
      // this.user.group=options.data[0].id
      }
      else{
        this.options=[]
      }
    });
  }

  async addOption() {
    if(this.CategoryName!=undefined && this.CategoryName!=""){
    let data = {
      group_name: this.CategoryName,
      company: this.api.getCompanyId()
    }
    this.api.post3('create_item_groups/',data).subscribe(async (res:any)=>{
      console.log(res,"reponse");
      if(res.status==200){
        this.loadOptions()
        const toast = await this.toastController.create({
          message:res.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.modalCtrl.dismiss()
        this.CategoryName=null
      }
      else{
        const toast = await this.toastController.create({
          message:res.msg,
          duration: 2000,
           position: 'middle'
        });
        toast.present();
        
      }
    })
    console.log(this.CategoryName,"opppp");
     }else{
      const toast = await this.toastController.create({
        message:("Enter Category Name"),
        duration: 2000,
         position: 'middle'
      });
      toast.present();
     }
     
  }
  
}
