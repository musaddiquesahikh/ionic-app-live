import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { IonContent, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.page.html',
  styleUrls: ['./employee-attendance.page.scss'],
})
export class EmployeeAttendancePage implements OnInit {

  employeeList: any[] = []; // Holds the list of employees
  selectedEmployee: string // Holds the selected employee name

  start_date: any;
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDay: number | null = null;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { day: number | null; status: any | null }[] = [];
  attendanceData: { [date: string]: string } = {};
  data: any = {};
  itemData: any = []
  length: any
  item: any = []
  editingDay: number | null = null;
  itemData1: any;
  isItemAvailable: boolean;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  emp_name: any;
  selectedAttendanceUpdates: { date: string; status: string | null }[] = [];
  emp_id: any;
  status: any;
  admin: any;

  constructor(private api: ApiService, private translate: TranslateService,
    private toastController: ToastController) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    this.start_date = `${year}-${month}`;
  }

  ngOnInit() {
    this.submit()
  }

  fetchEmployeeList() {
    this.data.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.leaveReport(this.data, header).subscribe(async (response: any) => {
      console.log(response);
      this.itemData = response.data
      this.item = this.itemData
      this.length = response.data.length
      if (this.length == 0) {
        const toast = await this.toastController.create({
          message: 'No data Available',
          duration: 3000,
          color: "warning"
        });
        toast.present();
      }
    });
  }
  onEmployeeSelect() {
    if (this.selectedEmployee) {
      this.onMonthSelect(this.start_date, '');
    }
  }
  onMonthSelect(selectedMonth: any, employee) {
    this.selectedEmployee = employee.name
    if (!this.selectedEmployee) return;

    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDateObj = new Date(year, month, 0);
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(endDateObj.getDate()).padStart(2, '0')}`;

    this.selectedYear = year;
    this.selectedMonth = month - 1;
    let header = this.api.getHeader();

    let requestData = {
      start_date: startDate,
      end_date: endDate,
      company_id: this.api.getCompanyId(),
    };
    console.log(requestData, 'l');

    this.api.AllempAttendance(requestData, this.selectedEmployee, header).subscribe(async (res: any) => {
      this.attendanceData = res.data[0]?.attendance || {};
      this.generateCalendar();
      this.emp_name = res.data[0].employee_name
      this.emp_id = res.data[0].employee_id
      console.log(this.emp_name, 'person nme');
 
    });
  }

  generateCalendar() {
    this.calendarDays = [];
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ day: null, status: null });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = this.attendanceData[dateKey] || null;
      this.calendarDays.push({ day, status });
    }
  }

  getStatusClass(status: any | null) {

    if (status === 'P' || status === '1') {
      return 'present';
    } else if (status === 'A' || status === '2') {
      return 'absent';
    } else {
      return 'no-status';
    }
  }

  selectDay(day: number | null) {
    if (day) {
      this.selectedDay = day;
    }
  }
  async editAttendance(dayItem: { day: number | null; status: any | null }) {

    if (dayItem.day && this.admin == 'Admin') {
      this.editingDay = dayItem.day; // Enable editing mode
      const toast = await this.toastController.create({
        message: 'Editing mode enabled',
        duration: 3000,
        // color: 'success',
        position: 'middle',
      });
      toast.present();
    }
  }

  updateAttendance(dayItem: { day: number | null; status: string | null }) {

    if (dayItem.day) {
      const dateKey = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(dayItem.day).padStart(2, '0')}`;
      // Update local data
      this.attendanceData[dateKey] = dayItem.status;
      // Add to updates list
      const existingIndex = this.selectedAttendanceUpdates.findIndex((item) => item.date === dateKey);
      if (existingIndex !== -1) {
        this.selectedAttendanceUpdates[existingIndex].status = dayItem.status; // Update existing entry
      } else {
        this.selectedAttendanceUpdates.push({ date: dateKey, status: dayItem.status }); // Add new entry
      }
      // Exit editing mode
      this.editingDay = null;
    }
  }
  submitAttendanceUpdates() {
    if (this.selectedAttendanceUpdates.length === 0) {
      console.log('No updates to submit.');
      return;
    }
    const attendance = this.selectedAttendanceUpdates.reduce((acc, update) => {
      acc[update.date] = parseInt(update.status || "0", 10); // Ensure the status is an integer
      return acc;
    }, {} as { [key: string]: number });
    let payload = [
      {
        employee_id: this.emp_id,
        name: this.emp_name,
        attendance,
      },
    ];
    console.log('Payload:', JSON.stringify(payload));
    let header = this.api.getHeader();
    this.api.updateAttendance(payload, header).subscribe(
      async (res: any) => {
        console.log('Attendance updated successfully:', res);
        const toast = await this.toastController.create({
          message: 'Attendance updated successfully!',
          duration: 3000,
          color: 'success',
          position: 'middle',
        });
        toast.present();
        this.selectedAttendanceUpdates = [];
      },
      async (err: any) => {
        console.error('Error updating attendance:', err);
        const toast = await this.toastController.create({
          message: 'Failed to update attendance. Please try again.',
          duration: 3000,
          color: 'danger',
          position: 'middle',
        });
        toast.present();
      }
    );
  }

  submit() {
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      this.admin = response.data.role
      console.log(this.admin, 'admin status');
    });
    this.data.company = this.api.getCompanyId();
    const header = this.api.getHeader();
    this.api.leaveReport(this.data, header).subscribe(async (response: any) => {
      this.itemData1 = response.data || [];
      this.initializeItems();
      if (this.itemData1.length === 0) {
        const toast = await this.toastController.create({
          message: 'No data Available',
          duration: 3000,
          color: "warning",
        });
        toast.present();
      }
    });
  }
  initializeItems() {
    this.item = [...this.itemData1];
    console.log("Initialized Items:", this.item);
  }
  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() !== '') {
      this.isItemAvailable = true; // Enable filtered view
      this.item = this.itemData1.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase())
      );
    } else {
      this.isItemAvailable = false; // Reset to full list
      this.initializeItems(); // Reload the master data
    }
  }
  async openEmployeeModal(employee) {
    console.log(employee, 'employee');
    this.selectedEmployee = employee.name
  }
  scrollToHalfPage() {
    // @ts-ignore
    const contentHeight = this.ionContent.el.offsetHeight;
    const scrollY = contentHeight / 1;
    this.ionContent.scrollToPoint(0, scrollY, 700);
  }
}
