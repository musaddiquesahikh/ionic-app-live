import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EditExpensePage } from '../edit-expense/edit-expense.page';
import { PermissionGuard } from '../guards/permission.guard';


@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {
  user: any = {}
  company: any = []
  data
  category_wise_report: any = []
  constructor(public api: ApiService, public modalCtrl: ModalController,
  private permission: PermissionGuard,public location:Location,public alertCtrl:AlertController, public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {
    console.log("a", this.data);
    this.api.defaultDate().subscribe((response: any[]) => {
      console.log(response);
      this.user = response
    });

  }
  CategoryReport() {
    let companyId = this.api.getCompanyId()
    console.log("company", companyId);
    let header = this.api.getHeader();
    this.user.company_id = companyId
    this.user.category_id = this.data.id
    this.api.expenseCategoryReport(this.user, header).subscribe((response: any) => {
      console.log("datajhkj", response);
      this.category_wise_report = response.data
    })
  }
  async editExpense(item) {
    console.log("sd", item);
    let a = item.id
    console.log("dgfdg", a);
      for (let hh of this.permission.roles.data.permissions) {
        console.log("asd");
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
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.CategoryReport()
      });
    console.log("selected item", a)
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
  async deleteExpense(item) {
    console.log(item);
    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE EXPENSE?'),
      position: 'middle',
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: () => {
            // console.log("I loved it clicke");
            let header = this.api.getHeader();
            let company = this.api.getCompanyId()
            let data = { id: item, company: company }
            console.log("this.item", data);
            this.api.deleteExpense(data, header).subscribe(async (response: any) => {
              console.log(response, 'delete party');
              let a = response.msg
              const toast = await this.toastController.create({
                message: a,
                duration: 2000,
                position: 'middle'
              });
              toast.present();
              this.CategoryReport()
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
}
