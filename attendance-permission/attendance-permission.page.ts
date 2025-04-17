import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-attendance-permission',
  templateUrl: './attendance-permission.page.html',
  styleUrls: ['./attendance-permission.page.scss'],
})
export class AttendancePermissionPage implements OnInit {
  staffData: any=[];
  data: any={}
  itemData: any=[];
  matchedStaff:any=[]
  constructor(public api: ApiService, private popoverController: PopoverController,
    private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
   
    this.getStaffPermissions()
  }
  // getStaffList() {
  //   let companyId = this.api.getCompanyId()
  //   console.log("party details", companyId);
  //   let header = this.api.getHeader();

  //   this.api.staffList(companyId, header).subscribe((response: any) => {
  //     console.log("api called", response);
  //     this.staffData = response
  //     console.log("staffData", this.staffData);

  //   });
  // }

  // async getStaffPermissions() {
   
  //   this.data.company = this.api.getCompanyId();
  //   let header = this.api.getHeader();
  //   this.api.getAllPermissionR(this.data, header).subscribe(async (response: any) => {
  //       if (response.status === 200) {
  //         this.itemData = response.data.map((staff: any) => ({
  //           ...staff,
            
  //           attendance_permission: staff.attendance_permission,
  //           staff:staff.staff

  //         }));
          
  //       }
  //       console.log(this.itemData,'permisssio');
  //       const permissionResponse = this.itemData
  //       const staffResponse= this.staffData
  //        this.matchedStaff = permissionResponse.map(permission => {
  //         const staff = staffResponse.find(staff => staff.id === permission.staff);
  //         if (staff) {
  //             return {
  //                 ...permission,
  //                 staffDetails: staff // Include full staff details
  //             };
  //         }
  //         return permission;
  //     });
  //     console.log(this.matchedStaff);
  //     },
  //   );
    
  //   console.log(this.itemData);

  // }
  // getStaffList() {

  //   const companyId = this.api.getCompanyId();
  //   const header = this.api.getHeader();

  //   this.api.staffList(companyId, header).subscribe((response: any) => {
  //     this.staffData = response.map((staff: any) => ({
  //       ...staff,
  //       permission: staff.attendance_permission || false, // Default permission state
  //     }));
  //     console.log("staffData", this.staffData);
  //   });
  // }

  getStaffPermissions() {
    const companyId = this.api.getCompanyId();
    const header = this.api.getHeader();
  
    // Step 1: Fetch the staff list
    this.api.staffList(companyId, header).subscribe({
      next: (staffResponse: any) => {
        // Process staff data
        this.staffData = staffResponse.map((staff: any) => ({
          ...staff,
          permission: staff.attendance_permission || false, // Default permission state
        }));
        console.log('Staff Data:', this.staffData);
  
        // Step 2: Fetch permissions after staff data
        this.api.getAllPermissionR({ company: companyId }, header).subscribe({
          next: (permissionsResponse: any) => {
            if (permissionsResponse.status === 200) {
              // Process permissions data
              this.itemData = permissionsResponse.data.map((permission: any) => ({
                ...permission,
                attendance_permission: permission.attendance_permission,
                staff: permission.staff,
              }));
              console.log('Permissions Data:', this.itemData);
  
              // Step 3: Merge permissions and staff data
              this.matchedStaff = this.itemData.map((permission: any) => {
                const staff = this.staffData.find((staff: any) => staff.id === permission.staff);
                if (staff) {
                  return {
                    ...permission,
                    staffDetails: staff, // Include full staff details
                  };
                }
                return permission; // Return permission data even if no staff matches
              });
  
              console.log('Matched Staff:', this.matchedStaff,this.matchedStaff.staffDetails);
            }
          },
          error: (err) => {
            console.error('Error fetching permissions:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching staff list:', err);
      },
    });
  }
  
  // Handle toggle changes
  onToggleChange(staff: any) {
    staff.attendance_permission = staff.permission; // Sync permission with toggle state
  }

  // Submit permissions for all staff
  async submitPermissions(staff) {
    // const alert = await this.alertController.create({
    //   header: 'Confirm Submission',
    //   message: 'Are you sure you want to submit the permissions?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //     },
    //     {
    //       text: 'Yes, Submit',
    //       handler: async () => {
            let payload = {
              company: this.api.getCompanyId(),
              staff: staff.staff,
              attendance_permission: staff.attendance_permission,
            };

            const header = this.api.getHeader();
            this.api.createStaffPermission(payload, header).subscribe(async (response: any) => {
              this.staffData = response.map((staff: any) => ({
                ...staff,
                permission: staff.attendance_permission || false, // Default permission state
              }));
              console.log("staffData", this.staffData);
              // if (response.status == 200) {
                const toast = await this.toastController.create({
                  message: 'permissions updated successfully !',
                  duration: 3000,
                  position: 'top',
                });
                toast.present();
              // }
            });

            //         this.api.createStaffPermission(payload).subscribe(
            //           async (response: any) => {
            //             console.log("Permissions updated successfully", response);

            //             const toast = await this.toastController.create({
            //               message: 'Permissions successfully updated!',
            //               duration: 3000,
            //               position: 'top',
            //             });
            //             toast.present();
            //           },
            //           async (error: any) => {
            //             const toast = await this.toastController.create({
            //               message: 'Failed to update permissions!',
            //               duration: 3000,
            //               color: 'danger',
            //               position: 'top',
            //             });
            //             toast.present();
            //           }
            //         );
    //       },
    //     },
    //   ],
    // });

    // await alert.present();
  }



  // async submitPermissions() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Submission',
  //     message: 'Are you sure you want to submit the permissions?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Yes, Submit',
  //         handler: async () => {
  //           const grantedPermissions = this.staffData.filter(staff => staff.permission);
  //           this.popoverController.dismiss(grantedPermissions); // Pass data back to parent
  //           const toast = await this.toastController.create({
  //             message: 'Permissions successfully updated!',
  //             duration: 3000,
  //             position: 'top',
  //           });
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
