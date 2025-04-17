import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.page.html',
  styleUrls: ['./attendance-report.page.scss'],
})
export class AttendanceReportPage implements OnInit {
  item: any = {};
  e: any = {};
  end_date: any;
  start_date: any;
  employee_id: any;
  roleres: any;
  role: any;
  selectedDate: number | null = null;
  dateformate: any

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth(); // 0-indexed (0 = January)
  selectedDay: number | null = null;

  // Constants for months and days of the week
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { day: number | null; status: string | null }[] = []; // Holds days of the month with status
  attendanceData: { [date: string]: string } = {

  };
  attendance: any;
  constructor(private translate: TranslateService, public api: ApiService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    this.start_date = `${year}-${month}`;
   }

  ngOnInit() {
   
    this.generateCalendar();
   
    let user = JSON.parse(sessionStorage.getItem('loginData'));
    let data = {
      company_id: this.api.getCompanyId(),
      mobile: user.user[0].mobile,
    }
    this.api.role1(data).subscribe((response: any) => {
      console.log("respkkk", response.data.role);
      this.roleres = response.data.id;
      this.role = response.data.role
      this.onMonthSelect(this.start_date)
    })
     
  }

  onMonthSelect(selectedMonth: any) {
    console.log(selectedMonth, 'selected');
    
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDateObj = new Date(year, month, 0);
    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(endDateObj.getDate()).padStart(2, '0')}`;
  
    this.dateformate = startDate;
    this.selectedYear = year;
    this.selectedMonth = month - 1; 
  
    console.log(this.selectedDate, 'selected', startDate, endDate);
  
    let requestData = {
      start_date: startDate,
      end_date: endDate,
      company_id: this.api.getCompanyId(),
      employee_id: this.roleres
    };
  
    this.api.post3('attendance/employee_attendance/', requestData).subscribe(async (res: any) => {
      console.log(res, 'ninja');
      this.attendance = res.data[0].attendance;
      this.attendanceData = this.attendance;
      console.log(this.attendanceData, 'attendanceData');
      
      this.generateCalendar();
    });
  }
  click() {
    this.dateformate = this.selectedDate
    console.log(this.dateformate, 'pppp');

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
  previousMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar();
  }
  selectDay(day: number | null) {
    if (day) {
      this.selectedDay = day;
      console.log(`Selected date: ${this.selectedYear}-${this.selectedMonth + 1}-${day}`);
    }
  }
  isSelectedDay(day: number | null): boolean {
    return day === this.selectedDay;
  }

}
