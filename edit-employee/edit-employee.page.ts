import { modalController } from '@ionic/core';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.page.html',
  styleUrls: ['./edit-employee.page.scss'],
})
export class EditEmployeePage implements OnInit {
  item
  user: any = {}
  total_val:number
  data: any = []
  state_data: any = []
  salary_structure: FormGroup
  employee_form: FormGroup;
  salStructure: any = []
  id: any
  d: any = []
  emp: any
  salary_form: FormGroup
  salary_form1: boolean
  msg: any
  billData
  subTotal: number
  exp1: any = []
  exp: any = []
  addZ: boolean
  companyData: any={};
  itemm: any={};

  // custom1: boolean;

  constructor(public route: ActivatedRoute, public api: ApiService, fb: FormBuilder,
    public toastController: ToastController, public location: Location,public modalController: ModalController) {
    this.employee_form = fb.group({
      'name': [ ,Validators.required],
      'email': [ ,Validators.compose([Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'mobile': [ ,Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'pan': [ ,Validators.compose([Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")])],
      'van': [],
      'state': [ null,Validators.required],
      'city': [null],
      'gender': [ ,Validators.required],
      'joining_date': [null],
      'id':[null],
      'address':[null],
      'company':[],
      'staff':[],

    });
  }
  ngOnInit() {
    // this.custom = false
    this.getState()
    this.getData()

    // this.salary_form1 = false
  }
  getData() {
    this.id = this.billData.id;
    let header = this.api.getHeader();
    this.api.getEmployee(header, this.id).subscribe((response: any) => {
      // this.data = response.data;
      // this.state = response["data"].place_of_supply;
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
      
      console.log('emplu',this.employee_form.value);
   
     });
   
  }
getState(){
  this.api.receivedState().subscribe((response: any[]) => {
    this.state_data = response["data"];
    console.log(this.state_data);
  });
}

  forUppercase() {
    // console.log(this.employee_form.value.pan.toUpperCase());
    const yourControl = this.employee_form.get('pan');
    yourControl.valueChanges.subscribe(() => {
      yourControl.patchValue(yourControl.value.toUpperCase(), { emitEvent: false });
    });
  }
  async submit() {
    if (this.employee_form.valid) {
      // this.employee_form.value.company_id = this.api.getCompanyId()
      this.employee_form.value.id = this.id
      let header = this.api.getHeader()
      this.api.updateEmployee(this.employee_form.value, header).subscribe(async (response: any) => {
        let a = response.status
        if (a == 200) {
          const toast = await this.toastController.create({
            message: 'Employee Updated Successfully',
            duration: 2000,
            color: "success"
          });
          toast.present();
          // this.location.back()
          this.getData()
        }
      });
    }
    else {
      const toast = await this.toastController.create({
        message: 'Please Enter Required Feild',
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
  }

  dismiss() {
    console.log('ppp');
    this.modalController.dismiss()
  }
 
}


