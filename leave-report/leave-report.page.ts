import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { EmployeeAttendenceModalPage } from '../employee-attendence-modal/employee-attendence-modal.page';
import { EditEmployeePage } from '../edit-employee/edit-employee.page';
import { AddNewEmployeePage } from '../add-new-employee/add-new-employee.page';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.page.html',
  styleUrls: ['./leave-report.page.scss'],
})
export class LeaveReportPage implements OnInit {
  // details: FormGroup
  form1: boolean
  itemData: any = []
  length: any
  item: any = []
  data: any = {}
  admin: any;

  constructor(public modalCtrl: ModalController, public formBuilder: FormBuilder, public api: ApiService,
    public toastController: ToastController, private translate: TranslateService) {
    // this.details = formBuilder.group({
    //   'year': [null, Validators.required],
    // })
  }

  ngOnInit() {
    this.form1 = false
    this.submit()
  }
  submit() {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      this.admin = response.data.role
      console.log("respkkk", response.data.role);
    });

    this.data.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.leaveReport(this.data, header).subscribe(async (response: any) => {
      console.log(response);

      this.itemData = response.data
      this.item = this.itemData
      this.length = response.data.length
      if (this.length == 0) {
        const toast = await this.toastController.create({
          // message: this.translate.instant('message.Successfully removed account')
          message: 'No data Available',
          duration: 3000,
          color: "warning"
        });
        toast.present();
      }
    });

  }

  selectedEmp(item: any) {
    console.log("item", item);

  }

  modalDismiss() {
    this.modalCtrl.dismiss();
  }
  clear() {
    this.form1 = false
  }
  excel() {
    this.data.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.exportLeaveRegister(this.data, header).subscribe((response: any) => {
      console.log("dsafdsdsafas", response);
      window.location.href = response.url
    });
  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.item = this.itemData
    console.log("item", this.item);

  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.item = this.itemData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }

  async openEmployeeModal(employee) {
    if (this.admin == 'Admin') {
      const modal = await this.modalCtrl.create({
        component: AddNewEmployeePage,
        componentProps: {
          billData: employee,
          // open: true
        },
        breakpoints: [0, 0.9, 1],
        initialBreakpoint: 0.9,
        presentingElement: await this.modalCtrl.getTop(),
        backdropDismiss: true
      });
      return await modal.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Do not have permission to edit employee',
        duration: 3000,
        // color: 'warning'
        position: 'middle'
      });
      toast.present();
    }
  }

  async deleteInvoice(employeeId: number) {
    console.log('Employee ID to delete:', employeeId);

    const toast = await this.toastController.create({
      header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE EMPLOYEE?'),
      position: "bottom",
      buttons: [
        {
          text: this.translate.instant('HEADER.YES'),
          role: "done",
          handler: () => {
            const header = this.api.getHeader();
            const company = this.api.getCompanyId();
            const data = { id: employeeId, header };

            console.log('Data to delete:', data);

            this.api.deleteEmployee(data, employeeId).subscribe(
              async (response: any) => {
                console.log('Delete response:', response);

                const successToast = await this.toastController.create({
                  message: response.msg || 'Employee deleted successfully',
                  duration: 2000,
                  position: "middle",
                });
                successToast.present();

                // Refresh or re-fetch the employee list
                this.submit();
              },
              async (error) => {
                console.error('Error deleting employee:', error);

                const errorToast = await this.toastController.create({
                  message: error.error?.msg || 'Failed to delete employee',
                  duration: 2000,
                  position: "middle",
                });
                errorToast.present();
              }
            );
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
