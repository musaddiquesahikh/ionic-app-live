import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent, ModalController, PopoverController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from '../api.service';
import { AttendancePermissionPage } from '../attendance-permission/attendance-permission.page';
import { PermissionReportPage } from '../permission-report/permission-report.page';

@Component({
  selector: 'app-employee-attendence-modal',
  templateUrl: './employee-attendence-modal.page.html',
  styleUrls: ['./employee-attendence-modal.page.scss'],
})
export class EmployeeAttendenceModalPage implements OnInit {
  // employees = [
  //   { id: 1, name: 'Musaddique', status: '' },
  //   { id: 2, name: 'Prajakta', status: '' },
  //   { id: 3, name: 'Aaquib', status: '' },
  //   { id: 4, name: 'Nimesh', status: '' },
  // ];
  selectedEmployee: any = null;
  today: string = '';
  selectedDate: string = '';
  status: string = '';
  displayDate: string = '';
  selectAll: boolean = true;
  itemData: any;
  item: any;
  length: any;
  permissionnew: any = {};
  roleres: any;
  attendance: any;
  role: any;
  itemData1: any[] = []; // Original employee data
  filteredEmployees: any[] = []; // Filtered employee list
  searchTerm: string = ''; // Bound to search input

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  admin: any;
  data: any = {};
  permission: any;
  constructor(private modalController: ModalController, private alertController: AlertController,
    public api: ApiService, public toastController: ToastController, public popoverController: PopoverController) { }
  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.today = moment().format('YYYY-MM-DD');
    this.selectedDate = this.today;
    this.displayDate = moment(this.today).format('dddd, MMMM DD, YYYY');
    this.submit()

    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      this.permissionnew = response
      this.roleres = response.data.id;
      this.attendance = response.data.attendance;
      this.admin = response.data.role
      console.log("respkkk", response.data.role, this.permissionnew);

      this.role = response.data.role
      let header = this.api.getHeader();
      this.api.getstaffPermission(this.roleres, header).subscribe(async (response: any) => {
        this.permission = response.data.attendance_permission
        console.log(response, this.permission);

      })
    });

  }
  submit() {
    this.data.company = this.api.getCompanyId();
    let header = this.api.getHeader();

    this.api.leaveReport(this.data, header).subscribe(async (response: any) => {
      console.log(response);
      this.itemData = response.data.map(employee => ({
        ...employee,
        status: 'Present',          // Set default status to 'Present'
        attendanceMarked: true      // Set attendance as marked by default
      }));
      this.filteredEmployees = this.itemData;
      this.length = response.data.length;

      if (this.length === 0) {
        const toast = await this.toastController.create({
          message: 'No data Available',
          duration: 3000,
          color: 'warning'
        });
        toast.present();
      }
    });
  }
  filterEmployees() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.itemData.filter(employee =>
      employee.name.toLowerCase().includes(term)
    );
  }
  async onDateChange(event: any) {
    const newDate = event.detail.value;
    if (newDate !== this.today) {
      this.selectedDate = this.today;
    } else {
      this.selectedDate = newDate;
    }
  }

  markAttendance(employee: any, status: string) {
    employee.status = status;
    employee.attendanceMarked = true; // Set flag to disable name
  }

  toggleSelectAll(event: any) {
    this.selectAll = event.detail.checked;
    this.itemData.forEach(employee => {
      employee.status = this.selectAll ? 'Present' : '';
    });
  }
  async saveAttendance() {
    const alert = await this.alertController.create({
      header: 'Confirm Attendance',
      message: 'Are you sure you want to save the attendance?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: async () => {
            const header = this.api.getHeader();
            const roleRes = this.roleres;
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            // Filter and map attendance data
            const attendanceData = this.itemData
              .filter(employee => employee.status === 'Present' || employee.status === 'Absent')
              .map(employee => {
                const data = {
                  employee: employee.id,
                  status: employee.status === 'Present' ? 1 : 2,
                  staff_employee: null,
                  staff: null,
                  date: formattedDate,
                  company: this.api.getCompanyId(),
                };

                if (data.employee != null) {
                  data.staff_employee = roleRes;
                  data.staff = null;
                } else {
                  data.staff_employee = null;
                  data.staff = roleRes;
                }

                return data;
              });

            console.log('Constructed Attendance Data:', attendanceData);

            try {
              const response: any = await this.api.attendance(attendanceData, header).toPromise();
              console.log('API Response:', response);

              if (response.status !== 500) {
                const toast = await this.toastController.create({
                  message: 'Attendance recorded successfully',
                  duration: 5000,
                  position: 'middle',
                });
                await toast.present();
              } else {
                const toast = await this.toastController.create({
                  message: 'Attendance already recorded or an error occurred',
                  duration: 5000,
                  position: 'middle',
                });
                await toast.present();
              }
            } catch (error) {
              console.error('Error saving attendance:', error);
              const toast = await this.toastController.create({
                message: 'Failed to record attendance. Please try again.',
                duration: 5000,
                position: 'middle',
              });
              await toast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  scrollToHalfPage() {
    // @ts-ignore
    const contentHeight = this.ionContent.el.offsetHeight;
    const scrollY = contentHeight / 1;
    this.ionContent.scrollToPoint(0, scrollY, 700);
  }
  async Permisson() {
    const popover = await this.popoverController.create({
      component: AttendancePermissionPage,
      cssClass: 'custom-popover',
    });

    popover.onDidDismiss().then((result) => {
      const grantedPermissions = result.data || [];
      console.log('Granted Permissions:', grantedPermissions);
    });
    await popover.present();

  }
  async UpdatePermisson() {
    const popover = await this.popoverController.create({
      component: PermissionReportPage,
      cssClass: 'custom-popover',
    });
    popover.onDidDismiss().then((result) => {
      const grantedPermissions = result.data || [];
      console.log('Granted Permissions:', grantedPermissions);
    });
    await popover.present();
  }
}

