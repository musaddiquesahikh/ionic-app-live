import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {
  user: any = {};
  subTotal: any
  empData: any = [];
  empData1: any = []
  private selectSegment: string = '1';

  empAtt: any = [{
    "id": 0,
    "total_days": 0,
    "absent_days": 0,
    "working_days": 0
  }];
  monthYear: string;
  abc2: boolean = true;
  confirm1: boolean
  details: FormGroup
  empDetails: FormGroup
  empd: boolean
  attDetails: FormGroup
  attd: boolean
  data: any = []
  salDetails: FormGroup
  salD: boolean


  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router,
    public formBuilder: FormBuilder) {
    this.details = formBuilder.group({
      'start': [null, Validators.required],
    })
    this.attDetails = formBuilder.group({
      'start': [null, Validators.required],
      'company_id': [null, Validators.required],
      "rows": [{
        "id": 0,
        "total_days": 0,
        "absent_days": [0],
        "working_days": 0
      }]
    })
  }

  ngOnInit() {
    this.empd = false
    this.attd = false
    this.salD = false
    this.user.accept = "1"
    this.attDetails.value.rows.absent_days = '0'
  }

  submit() {
    this.details.value.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.employeeDetails(this.details.value, header).subscribe((response: any) => {
      this.attd = false
      this.empd = true
      this.salD = false
      this.empData = response.data
    })
  }

  editEmp(item: any) {
    const param: NavigationExtras = {
      queryParams: { item: item }
    }
    this.router.navigate(['/edit-employee'], param)
  }

  addNewEmployee() {
    this.router.navigate(['/add-new-employee'])
  }

  confirm() {
    this.details.value.company_id = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.attendenceDetails(this.details.value, header).subscribe((response: any) => {
      this.empd = false
      this.attd = true
      this.salD = false
      this.data = response.data
      this.empAtt = response.data
    })
  }

  Attendence() {
    this.attDetails.value.start = this.details.value.start
    let header = this.api.getHeader();
    for (let i = 0; i < this.data.length; i++) {
      this.empAtt.id = this.data[i].employee_id
      this.empAtt.total_days = this.data[i].total_days
      this.empAtt.absent_days = this.empAtt[i].absent
      this.empAtt.working_days = this.empAtt[i].working_days
    }
    console.log("this.details.value.start", this.details.value.start);
    this.attDetails.patchValue({
      start: this.details.value.start,
      company_id: this.api.getCompanyId(),
      rows: this.empAtt,
    })

    for (let i = 0; i < this.data.length; i++) {
      this.empAtt[i].absent_days = this.empAtt[i].absent
    }
    this.api.createAttendence(this.attDetails.getRawValue(), header).subscribe((response: any) => {
      this.empd = false
      this.attd = false
      this.salD = true
    })
    this.attDetails.value.company_id = this.api.getCompanyId()
    this.attDetails.value.start = this.details.value.start
    this.api.showSalarySummary(this.attDetails.value, header).subscribe((response: any) => {
      this.empData = response.data
    })
  }

  total() {
    let ff = 0;
    this.empAtt.forEach(function (value) {
      ff = value.total_days - value.absent;
      value.working_days = ff
      value.absent_days = value.absent
    });
    this.subTotal = ff;
    return ff;
  }

  closeFile() {
    this.salD = false
  }

  clear() {
    this.attd = false
    this.empd = false
    this.salD = false
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectSegment = event.target.value;
    if (this.selectSegment == "1") {
      this.attDetails.value.company_id = this.api.getCompanyId()
      this.attDetails.value.start = this.details.value.start
      let header = this.api.getHeader();
      this.api.showSalarySummary(this.attDetails.value, header).subscribe((response: any) => {
        this.empData = response.data
        console.log("bbb", this.empData);
      })
    }
    else {
      this.attDetails.value.company_id = this.api.getCompanyId()
      this.attDetails.value.start = this.details.value.start
      let header = this.api.getHeader();
      this.api.showSalaryDetails(this.attDetails.value, header).subscribe((response: any) => {
        this.empData = response.data
        console.log("aaa", this.empData);

      })
    }
  }
  end() {
    this.attd = false
    this.empd = true
  }
  end1() {
    this.empd = false
  }
  end2() {
    this.salD = false
    this.attd = true
  }
}

