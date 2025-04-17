import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.page.html',
  styleUrls: ['./edit-role.page.scss'],
})
export class EditRolePage implements OnInit {
  updateInfo(){

  }
  rolesData: any;
  showCard: Boolean = false
  default_dict: any = {
    role_name: "",
    data: [{
      page_name: "sales_voucher", name: "Sales Voucher",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "purchase_voucher", name: "Purchase Voucher",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "expense", name: "Expense",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "inventory", name: "Inventory",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "parties", name: "Parties",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "items", name: "Items",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "manage_money", name: "Manage Money",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "reports", name: "Reports",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    // {
    //   page_name: "company_setting", name: "Company Setting",
    //   actions: { edit: false, view: false, delete: false, create: false }
    // },
    {
      page_name: "voucher", name: "Journal Voucher",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    {
      page_name: "ledgers", name: "Ledger",
      actions: { edit: false, view: false, delete: false, create: false }
    },
    ]
  }
  @Input() staffList: any;
  result: any;
  showData :any= [];

  constructor(private permission: PermissionGuard, public alertCtrl: AlertController, public api: ApiService,
    public router: Router, public modalCtrl: ModalController, private toastController: ToastController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getRoles();

  }
  getRoles() {
    let option = this.api.getHeader()
    this.api.getRole({ company_id: this.api.getCompanyId() }, option).subscribe((response: any) => {
      console.log(response, 'role response');
      this.rolesData = response.data
      const indexOfObject = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 9;
      });
      this.rolesData.splice(indexOfObject, 1);
      const indexOfObject3 = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 7;
      });
      this.rolesData.splice(indexOfObject3, 1);
      const indexOfObject1 = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 8;
      });
      this.rolesData.splice(indexOfObject1, 1);
      const indexOfObject2 = this.rolesData.findIndex((object: { id: any; }) => {
        return object.id === 6;
      });
      this.rolesData.splice(indexOfObject2, 1);
      
      console.log(this.rolesData);

    })

  }
  back() {
    console.log("back function");
    this.modalCtrl.dismiss();
  }
  roleInfo(a: any) {
      let option = this.api.getHeader()
    this.api.roleInfo({ "id": a }, option).subscribe((response: any) => {
      console.log(response, "result");
      this.showData = response.data
      // const indexOfObject4 = this.showData.data.findIndex((object: { name: any; }) => {
      //   return object.name === 'company_setting';
      // });
      // this.showData.data.splice(indexOfObject4, 1);
      if (response.status == 200) {
        this.showCard = true
        console.log(this.showData.data, 'roleInfo')
      }
      else {
        this.showData = [];
      }
      
    })
  }
  submit() {
    let obj = {
      page_name: "company_setting", name: "Company Setting",
      actions: { edit: false, view: false, delete: false, create: false }
    }
    this.default_dict.data.push(obj)
    this.default_dict.company = this.api.getCompanyId();
    let option = this.api.getHeader()
    this.api.updateInfo(this.showData, option).subscribe(async (response: any) => {
      console.log(response, "updaterole");
      if (response.status == 200) {
        const toast = await this.toastController.create({
          message: "Role updated Successfully",
          duration: 2000,
          position: 'middle'
        })
        toast.present();
        this.modalCtrl.dismiss(response.data)
      } else if (response.status == 500) {
        console.log(this.showData, 'show data');
        const toast = await this.toastController.create({
          message: "Role Already Exists",
          duration: 2000,
          position: 'middle'
        })
        toast.present();
      }
    })
  }
}