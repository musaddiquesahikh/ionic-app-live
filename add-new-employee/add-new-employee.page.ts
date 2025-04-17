import { modalController } from '@ionic/core';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.page.html',
  styleUrls: ['./add-new-employee.page.scss'],
})
export class AddNewEmployeePage implements OnInit {
  employee_form: FormGroup;
  emp: any
  salary_form: FormGroup
  msg: any
  state: any = []
  subTotal: any
  exp1: any = []

  private selectSegment: string = 'personal';
  custom: boolean;
  billData: any;
  customActionSheetOptions: any;

  constructor(public toastController: ToastController, public modalCtrl: ModalController, public api: ApiService,
    fb: FormBuilder, public router: Router, public location: Location) {
    this.employee_form = fb.group({
      'name': [null, Validators.required],
      'email': [null, Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'mobile': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'pan': [null, Validators.compose([Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])],
      // 'van': [null],
      'state': [null, Validators.required],
      // 'address': [null, Validators.required],
      'city': [null],
      // 'pincode': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{6}")])],
      // 'department': [null, Validators.required],
      // 'designation': [null, Validators.required],
      'gender': [null, Validators.required],
      // 'leaves_allowed': [null, Validators.required],
      'joining_date': [null],
      // 'terms': [false],
      'id': [],
      'company': [this.api.getCompanyId()]
    });
  }
  async ngOnInit() {
    this.custom = false
    this.getData()

    if (this.billData) {
      console.log('running');
      this.getData1()
    }
  }

  getData() {
    this.api.receivedState().subscribe((response: any[]) => {
      this.state = response["data"]
    });
  }
  forUppercase() {
    const yourControl = this.employee_form.get('pan');
    yourControl.valueChanges.subscribe(() => {
      yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
    });
  }

  async Submit() {

    this.markFormTouched(this.employee_form);
    if (this.employee_form.valid) {
      console.log('log ');
      if (this.billData) {
        console.log('log if');
        
        let header = this.api.getHeader()
        this.api.updateEmployee(this.employee_form.value, header).subscribe(async (response: any) => {
          let a = response.status
          if (a == 200) {
            const toast = await this.toastController.create({
              message: 'Employee Updated Successfully',
              duration: 2000,
              position:'middle',
              // color: "success"
            });
            toast.present();
            modalController.dismiss()
            this.getData()
          }
        });
      } else {
        console.log('log else');
        this.employee_form.value.leaves_allowed = Number(this.employee_form.value.leaves_allowed)
        this.employee_form.value.company = this.api.getCompanyId()
        let header = this.api.getHeader()
        this.api.addNewEmployee(this.employee_form.value, header).subscribe(async (response: any) => {
          this.emp = response.data.id
          localStorage.setItem('emp', JSON.parse(this.emp))
          let a = response.status
          if (a == 200) {
            const toast = await this.toastController.create({
              message: 'Employee Created Successfully',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            // this.selectSegment = 'salary'
            this.employee_form.reset()
          }

        });
      }
    }
    else {
      // alert("Please Enter Required Feild");
      const toast = await this.toastController.create({
        message: "Please Enter Required Feild",
        duration: 2000,
        position: 'middle'
      });
      toast.present();
      // this.employee_form.reset()
    }
  }
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  }
 
  getData1() {
    let header = this.api.getHeader();
    this.api.getEmployee(header, this.billData.id).subscribe((response: any) => {
      this.employee_form.patchValue({
        name: response.data.name,
        email: response.data.email,
        mobile: response.data.mobile,
        pan: response.data.pan,
        van: response.data.van,
        state: response.data.state,
        city: response.data.city,
        gender: response.data.gender,
        joining_date: response.data.joining_date,
        id: response.data.id,
        address: response.data.address,
        company: response.data.company,
        staff: response.data.staff
      });
      console.log('emplu', this.employee_form.value);

    });

  }
}