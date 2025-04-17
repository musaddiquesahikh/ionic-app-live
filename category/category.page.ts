import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  CategoryName: any;
  options: any = [];
  user={
    group:''
  }
  oppp: any;
  constructor( public api: ApiService,public toastController: ToastController,private popoverController: PopoverController
    , private translate: TranslateService) { 
      this.loadOptions()
    }

  ngOnInit() {
  }
  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options:any) => {
      
      console.log(options,"opppp");
      if(options.status==200){
      this.options = options.data;
      this.user.group=options.data[0].id
      this.options.push(this.oppp)
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
       this.oppp=res.data.group_name
      if(res.status==200){
        this.loadOptions()
        const toast = await this.toastController.create({
          message:res.msg,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.popoverController.dismiss()
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
