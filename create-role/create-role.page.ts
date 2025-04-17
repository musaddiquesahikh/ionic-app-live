import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.page.html',
  styleUrls: ['./create-role.page.scss'],
})
export class CreateRolePage implements OnInit {
  toggle:boolean=false
  default_dict:any={
    role_name:"",
    data:[{
      page_name:"sales_voucher",name:"Sales Voucher",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"purchase_voucher",name:"Purchase Voucher",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"expense",name:"Expense",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"inventory",name:"Inventory",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"parties",name:"Parties",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"items",name:"Items",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"manage_money",name:"Manage Money",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"reports",name:"Reports",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    // {
    //   page_name:"company_setting",name:"Company Setting",
    //   actions:{edit:false,view:false,delete:false,create:false}
    // },
    {
      page_name:"voucher",name:"Journal Voucher",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"ledgers",name:"Ledger",
      actions:{edit:false,view:false,delete:false,create:false}
    },
    {
      page_name:"journal voucher",
      action:{edit:false,view:false,delete:false,create:false}
    },
    // {
    //   page_name:"bank",
    //   action:{edit:false,view:false,delete:false,create:false}
    // },
    // {
    //   page_name:"party",
    //   action:{edit:false,view:false,delete:false,create:false}
    // },

  ]
     }


  constructor(public api:ApiService, public toastController:ToastController, public modalCtrl:ModalController,
    public translate:TranslateService) { }

  ngOnInit() {
  }
  createRole(){
    
    let obj={
      page_name:"company_setting",name:"Company Setting",
      actions:{edit:false,view:false,delete:false,create:false}
    }
    this.default_dict.data.push(obj)
    this.default_dict.company= this.api.getCompanyId();
    let header=this.api.getHeader()
    console.log("default_dict",this.default_dict);
    this.api.CreateRole(this.default_dict, header).subscribe(async (response: any) => {
      console.log("CreateRole",response);
      if(response.status == 200){
        const toast = await this.toastController.create({
          message:"Role Created Successfully",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.modalCtrl.dismiss(response.data)
      }else if(response.status == 500){
        const toast = await this.toastController.create({
          message:"Role Already Exists",
          duration: 2000,
          position: 'middle'
        });

        toast.present();
      }
    })
      const indexOfObject = this.default_dict.data.findIndex((object: { name: string; }) => {
        return object.name === 'company_setting';
      });
      
      this.default_dict.data.splice(indexOfObject, 1);
  }
  back() {
    console.log("back function");
    this.modalCtrl.dismiss();
  }
  toggleShow1(){
    console.log(this.toggle,'toggle');
    
    this.toggle=!this.toggle
    if(this.toggle){
    this.default_dict.data.forEach(function (value){
      value.actions.view=true
      value.actions.edit=true
      value.actions.delete=true
      value.actions.create=true
    })
  }else if(!this.toggle){
    this.default_dict.data.forEach(function (value){
      value.actions.view=false
      value.actions.edit=false
      value.actions.delete=false
      value.actions.create=false
    })
  }
  }
}
