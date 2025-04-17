import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-permission-report',
  templateUrl: './permission-report.page.html',
  styleUrls: ['./permission-report.page.scss'],
})
export class PermissionReportPage implements OnInit {
  itemData: any[] = [];
  staffData: any;
  staffList: any = {};
  data: any={};

  constructor(private modalController: ModalController,private alertController: AlertController,
    public api:ApiService,public toastController:ToastController,public popoverController: PopoverController) { }

  ngOnInit() {
    this.getStaffPermissions()

  }
 
  async getStaffPermissions() {
   
    this.data.company = this.api.getCompanyId();
    let header = this.api.getHeader();
  
    this.api.getAllPermissionR(this.data, header).subscribe(async (response: any) => {
        if (response.status === 200) {
          this.itemData = response.data.map((staff: any) => ({
            ...staff,
            attendance_permission: staff.attendance_permission,
            staff:staff.staff
          }));
        }
      },);
    console.log(this.itemData);
  }
  
  // Update permission when toggle changes
  async updatePermission(staff: any) {
    // Show confirmation alert
    // const alert = await this.alertController.create({
    //   header: 'Confirm Update',
    //   message: `Are you sure you want to ${staff.attendance_permission ? 'enable' : 'disable'} attendance permission for ${staff.staffName}?`,
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         staff.attendance_permission = !staff.attendance_permission;
    //         this.alertController.dismiss();
    //       },
    //     },
    //     {
    //       text: 'Confirm',
    //       handler: () => {
            // Proceed with API call if confirmed

            let payload = {
              id: staff.id,
              attendance_permission: staff.attendance_permission,
              staff:staff.staff
            };
            let header = this.api.getHeader();
            this.api.updateStaffPermission(payload, header).subscribe(
              async (res: any) => {
                if (res.status === 200) {

                  const toast = await this.toastController.create({
                    message: 'Permission updated successfully!',
                    duration: 3000,
                    color: 'success',
                  });
                  toast.present();
                }
              },
              async (error) => {
                staff.attendance_permission = !staff.attendance_permission;
  
                const toast = await this.toastController.create({
                  message: 'Failed to update permission. Please try again.',
                  duration: 3000,
                  color: 'danger',
                });
                toast.present();
              }
            );
  //         },
  //       },
  //     ],
  //   });
  
  //   await alert.present();
  }
}
