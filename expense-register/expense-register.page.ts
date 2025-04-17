import { Component, OnInit } from '@angular/core';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { ModalController, ToastController, AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-expense-register',
  templateUrl: './expense-register.page.html',
  styleUrls: ['./expense-register.page.scss'],
})
export class ExpenseRegisterPage implements OnInit {
  item: any = {}
  expenseData: any = [];
  length: any;
  pagination: any;
  page_number: number = 0
  companyId: any;
  data1: any;
  pagination1: any;
  e: any = {};

  constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
    private translate: TranslateService, private permission: PermissionGuard,
    public alertCtrl: AlertController) { }

  ngOnInit() {
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.item = response
    });
    console.log(this.permission,'log');
    
  }
  private async generateItems() {
    this.companyId = this.api.getCompanyId()
    console.log("companyId122", this.companyId, this.item, this.pagination);
    let header = this.api.getHeader();
    let s = ''
    this.item.page_number = this.pagination.page_number + 1
    this.item.party_id = this.expenseData[0].party_id
    this.item.party_name = this.expenseData[0].party_name
    this.page_number++
    console.log(this.expenseData, "pppaaginatin 1", this.expenseData[0].party_id);
    if (this.pagination.next_page) {
      this.api.expenseRegister(s, this.item).subscribe(async (response: any) => {
        console.log('lkf211', response);
        this.pagination = response.pagination
        if (response.status == 200) {
          let t = this.expenseData
          this.expenseData = []
          let p = t.concat(response.data)
          this.expenseData = [...new Set(p)]
          this.data1 = this.expenseData
        }

      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 600,
        position: 'middle'

      });
      toast.present();
    }
    console.log(this.expenseData, this.data1, "pppaaginatin 2");
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  submit() {
    this.item.company = this.api.getCompanyId()
    console.log("companyId",this.permission.roles);
    let s = ''
    this.e.company = this.api.getCompanyId()
    this.e.start_date = this.item.start_date
    this.e.end_date = this.item.end_date
    this.e.staff_id = this.permission.roles.data.id
    this.api.expenseRegister(s, this.e).subscribe(async (response: any) => {
      console.log(response, 'ii');

      if (response.status == 200) {
        this.expenseData = response.data
        this.pagination = response.pagination
        console.log("lenght", response);
        this.length = response.data.length
        console.log("lenght", this.expenseData);
        this.item.page_number = this.page_number
        console.log(this.item, "pppaaginatin ");
        this.expenseData
        this.expenseData = response.data
        console.log(this.length == 0);
        this.length = response.data.length
        if (this.length == 0) {
          const toast = await this.toastController.create({
            message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
            duration: 800,
            position:'middle'
          });
          toast.present();
        }
      }

    });
  }

  async selected(item) {
    console.log("sd", item);
    let a = item.expense_id
    for (let hh of this.permission.roles.data.permissions) {
      if (hh.page_name == 'expense') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit == true) {
          const modal = await this.modalCtrl.create({
            component: EditExpensePage,
            cssClass: 'my-custom-class',
            componentProps: {
              particularData: a
            },
            breakpoints: [0, 0.3, 0.5, 1],
            initialBreakpoint: 0.9
          });
          modal.onDidDismiss()
            .then((data) => {
              const user = data.data; 
              this.submit()
            });
          return await modal.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
        }
      }
    }
  }

  async deleteExpense(e){
    for (let aa of this.permission.roles.data.permissions) {
      if (aa.page_name == 'expense') {
        if (aa.actions.delete) {
          let confirmmsg = this.translate.instant("MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE EXPENSE?")
          if (confirm(confirmmsg)) {
            let company = this.api.getCompanyId()
            console.log(e,'id');
            
            this.api.post3('delete_expense/', { id: e.expense_id,company:company }).subscribe(async (response: any) => {
              if (response.status == 200) {
                
                const toast = await this.toastController.create({
                  message: response.msg,
                  duration: 3000,
                  position:'middle'
                });
                toast.present();
                this.submit()
              } else {
               
                const toast = await this.toastController.create({
                  message:response.msg,
                  duration: 3000,
                  position:'middle'
                });
                toast.present();
                this.submit()
              }
            }, async (error) => {
              const toast = await this.toastController.create({
                message: error,
                duration: 3000,
                position:'middle'
              });
              toast.present();
              this.submit()
            })
  
          } 
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
        }
      }
    }
  }

}
