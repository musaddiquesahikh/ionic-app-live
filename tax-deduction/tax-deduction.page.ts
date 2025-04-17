import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { ExemptionsDetailsPage } from '../exemptions-details/exemptions-details.page';

@Component({
  selector: 'app-tax-deduction',
  templateUrl: './tax-deduction.page.html',
  styleUrls: ['./tax-deduction.page.scss'],
})
export class TaxDeductionPage implements OnInit {
  details: FormGroup
  eightyD_form: FormGroup
  tax1Form: FormGroup
  form1: boolean
  taxDetails: boolean
  item: any = []
  itemData: any = []
  data: any = []
  hRent: boolean
  hLoan: boolean
  eightyDD_form: FormGroup
  eightyE_form: FormGroup
  eightyC: boolean
  eighty_C: boolean
  eighty_CC: boolean
  eighty_DD: boolean
  eighty_E: boolean
  eightyD: boolean
  data1: any = {}
  data2: any = {}
  data3: any = {}
  user: any = {}
  private isDisabled: boolean = false;
  id: any;
  eightyDDData: any = {}

  constructor(public modalCtrl: ModalController, public toastController: ToastController,public formBuilder: FormBuilder, 
    public api: ApiService, public router: Router, private translate:TranslateService) {
    this.details = formBuilder.group({
      'year': [null, Validators.required],
    })
    this.eightyD_form = formBuilder.group({

      'employee': [null, Validators.required],
      'self_or_family_senior': [null, Validators.required],
      'parents_senior': [null, Validators.required],
      'selfF_health_insurance': [{ value: '0', disabled: true }, Validators.required],
      'selfF_preventive_health': [{ value: '0', disabled: true }, Validators.required],
      'selfF_health_insurance_senior': [{ value: '0', disabled: true }, Validators.required],
      'selfF_preventive_health_senior': [{ value: '0', disabled: true }, Validators.required],
      'selfF_medical_senior': [{ value: '0', disabled: true }, Validators.required],
      'parents_health_insurance': [{ value: '0', disabled: true }, Validators.required],
      'parents_preventive_health': [{ value: '0', disabled: true }, Validators.required],
      'parents_health_insurance_senior': [{ value: '0', disabled: true }, Validators.required],
      'parents_preventive_health_senior': [{ value: '0', disabled: true }, Validators.required],
      'parents_medical_senior': [{ value: '0', disabled: true }, Validators.required],
    });
    this.tax1Form = formBuilder.group({
      'by_assessee': [null, Validators.required],
      'by_employer': [null, Validators.required],
      'contri_nps': [null, Validators.required],
    })
    this.eightyDD_form = formBuilder.group({
      'severe_disability': [null, Validators.required],
      'section_80_dd': [null, Validators.required],
    })
    this.eightyE_form = formBuilder.group({
      'section_80_e': [null, Validators.required]
    })
  }

  ngOnInit() {

    this.getDetails()
  }
  getDetails() {
    this.form1 = false
    this.taxDetails = false
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
  }
  yes() {
    // console.log("self_or_family_senior", this.eightyD_form.value.self_or_family_senior);
    if (this.eightyD_form.value.self_or_family_senior == "1") {
      // console.log("if work");
      this.eightyD_form.controls['selfF_health_insurance'].disable();
      this.eightyD_form.get("selfF_health_insurance").setValue("0");
      this.eightyD_form.controls['selfF_preventive_health'].disable();
      this.eightyD_form.get("selfF_preventive_health").setValue("0");
      this.eightyD_form.controls['selfF_health_insurance_senior'].enable();
      this.eightyD_form.controls['selfF_preventive_health_senior'].enable()
      this.eightyD_form.controls['selfF_medical_senior'].enable()
    }
    else {
      this.eightyD_form.controls['selfF_health_insurance'].enable();
      this.eightyD_form.controls['selfF_preventive_health'].enable()
      this.eightyD_form.controls['selfF_health_insurance_senior'].disable();
      this.eightyD_form.controls['selfF_preventive_health_senior'].disable();
      this.eightyD_form.controls['selfF_medical_senior'].disable();
      this.eightyD_form.get("selfF_health_insurance_senior").setValue("0");
      this.eightyD_form.get("selfF_preventive_health_senior").setValue("0");
      this.eightyD_form.get("selfF_medical_senior").setValue("0");
    }
  }

  no() {
    // console.log("self_or_family_senior", this.eightyD_form.value.parents_senior);
    if (this.eightyD_form.value.parents_senior == "1") {
      // console.log("if work");
      this.eightyD_form.controls['parents_health_insurance'].disable();
      this.eightyD_form.controls['parents_preventive_health'].disable();
      this.eightyD_form.controls['parents_health_insurance_senior'].enable();
      this.eightyD_form.get("parents_health_insurance").setValue("0");
      this.eightyD_form.get("parents_preventive_health").setValue("0");
      this.eightyD_form.controls['parents_preventive_health_senior'].enable()
      this.eightyD_form.controls['parents_medical_senior'].enable()
    }
    else {
      this.eightyD_form.controls['parents_health_insurance'].enable();
      this.eightyD_form.controls['parents_preventive_health'].enable()
      this.eightyD_form.controls['parents_health_insurance_senior'].disable();
      this.eightyD_form.controls['parents_preventive_health_senior'].disable();
      this.eightyD_form.controls['parents_medical_senior'].disable();
      this.eightyD_form.get("parents_health_insurance_senior").setValue("0");
      this.eightyD_form.get("parents_preventive_health_senior").setValue("0");
      this.eightyD_form.get("parents_medical_senior").setValue("0");
    }

  }

  submit() {
    this.details.value.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.taxDeduction(this.details.value, header).subscribe((response: any) => {
      // console.log("tax1", response);
      this.form1 = true
      this.hRent = false
      this.hLoan = false
      this.itemData = response.data
      this.item = this.itemData
      console.log("itemData",this.itemData);
      
    })
  }
  selectedEmp(item: any) {
    this.id = item.id
    // console.log("item", item);
    this.taxDetails = true
    this.form1 = false
    this.hRent = false
    this.hLoan = false
    this.details.value.company = this.api.getCompanyId()
    this.details.value.id = item.id
    let header = this.api.getHeader();
    this.api.taxDeduction1(this.details.value, header).subscribe((response: any) => {
      // console.log("dfsgfdsgd", response.data);
      this.data = response.data
    })
    this.data1.employee_id = item.id
    //  let header = this.api.getHeader();
    this.api.getEightyC(this.data1, header).subscribe((response: any) => {
      this.item = response.data
      // console.log("getEightyC", response);
    })
  }
  clear() {
    this.form1 = false
    this.taxDetails = false
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
  }

  addHomeLoan() {
    this.hLoan = true
    this.hRent = false
  }
  addHomeRent() {
    this.hRent = true
    this.hLoan = false
  }
  close() {
    modalController.dismiss()
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
  }
  section80C() {
    this.eightyC = true
    if (this.eightyC == true) {
      this.details.value.company = this.api.getCompanyId()
      let header = this.api.getHeader();
      this.api.getEightyC(this.data1, header).subscribe((response: any) => {
        this.item = response.data
        // console.log("getEightyC", response);
      })
    }
    this.hRent = false
    this.hLoan = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
    this.details.value.company = this.api.getCompanyId()
    let header = this.api.getHeader();
    this.api.getEightyC(this.data1, header).subscribe((response: any) => {
      this.item = response.data
      // console.log("getEightyC", response);
    })

  }
  add80C() {
    this.eighty_C = true
    // this.section80C()
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
  }
  eightyCC() {
    this.tax1Form.patchValue(
      this.data
    );
    this.eighty_CC = true
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_DD = false
    this.eighty_E = false
    this.eightyD = false
  }
  eighty_CD() {
    this.eighty_DD = true
    // console.log();

    if (this.data.severe_disability == true) {
      this.eightyDDData.severe_disability = "1"
      this.eightyDDData.section_80_dd = this.data.section_80_dd
    } else {
      this.eightyDDData.severe_disability = "0"
      this.eightyDDData.section_80_dd = this.data.section_80_dd
    }
    this.eightyDD_form.patchValue(
      this.eightyDDData
    );
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_E = false
    this.eightyD = false
  }
  eightyE() {
    this.eighty_E = true
    this.eightyE_form.patchValue(
      this.data
    );
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eightyD = false
  }
  eighty_D() {
    this.eightyD = true

    this.eightyDDData = this.data
    if (this.data.self_or_family_senior == true) {
      this.eightyDDData.self_or_family_senior = "1"
    } else {
      this.eightyDDData.self_or_family_senior = "0"
    }

    if (this.data.parents_senior == true) {
      this.eightyDDData.parents_senior = "1"
    } else {
      this.eightyDDData.parents_senior = "0"
    }
    this.eightyD_form.patchValue(
      this.eightyDDData
    );
    this.yes()
    this.no()
    this.hRent = false
    this.hLoan = false
    this.eightyC = false
    this.eighty_C = false
    this.eighty_CC = false
    this.eighty_DD = false
    this.eighty_E = false
  }
  homeRent() {
    this.data1.employee = this.data.id
    this.data1.monthly_rent = this.data.monthly_rent
    this.data1.landlord_name = this.data.landlord_name
    this.data1.landlord_address = this.data.landlord_address
    this.data1.landlord_pan = this.data.landlord_pan
    // console.log("datahhhh", this.data1);
    let header = this.api.getHeader();
    this.api.homeRent(this.data1, header).subscribe(async (response: any) => {
      // console.log("wqewqewq", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80c added successfully",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.selectedEmp(this.details.value)
        this.hRent = false
      }

    })
  }
  homeLoan() {
    this.data3.employee = this.data.id
    this.data3.annual_interest_paid = this.data.annual_interest_final
    this.data3.benefit_under_eighty_ee = this.data.benefit_under_eighty_ee
    this.data3.name_of_lender = this.data.name_of_lender
    this.data3.pan_of_lender = this.data.pan_of_lender
    this.data3.address_of_lender = this.data.address_of_lender
    // console.log("datahhhh", this.data3);
    let header = this.api.getHeader();
    this.api.homeLoan(this.data3, header).subscribe(async (response: any) => {
      // console.log("wqewqewq", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Interest on Home Loan created successfully",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.selectedEmp(this.details.value)
        this.modalCtrl.dismiss()
        this.hLoan = false
      }

    })
  }
  save80C() {

    this.data1.employee = this.data.id
    // console.log("80C", this.data1);
    let header = this.api.getHeader();
    this.api.eightyC(this.data1, header).subscribe(async (response: any) => {
      // console.log("80C response", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80C created successfully",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        this.section80C()
        this.selectedEmp(this.details.value)
        this.modalCtrl.dismiss()
        this.eightyC = false
      }
    })
  }
  save80E() {
    this.eightyE_form.value.employee = this.data.id
    // console.log("80ze", this.data1);
    let header = this.api.getHeader();
    this.api.eightyE(this.eightyE_form.value, header).subscribe(async (response: any) => {
      // console.log("80D response", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80E added successfully",
          duration: 2000,
          position: 'middle'
        });
        this.selectedEmp(this.details.value)
        toast.present();
        this.eighty_E = false
        this.modalCtrl.dismiss()
      }
    })
  }
  save80DD() {
    this.eightyDD_form.value.employee = this.data.id
    // console.log("80ze", this.data1);
    let header = this.api.getHeader();
    this.api.eightyDD(this.eightyDD_form.value, header).subscribe(async (response: any) => {
      // console.log("80D response", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80DD added successfully",
          duration: 2000,
          position: 'middle'
        });
        this.selectedEmp(this.details.value)
        toast.present();
        this.modalCtrl.dismiss()
        this.eighty_DD = false
      }
    })
  }
  save80CCD1() {
    this.tax1Form.value.employee = this.data.id
    let header = this.api.getHeader();
    // console.log("this.data", this.data1);
    this.api.eightyCCD1(this.tax1Form.value, header).subscribe(async (response: any) => {
      // console.log("80D response", response);
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80ccd1b added successfully",
          duration: 2000,
          position: 'middle'
        });
        this.selectedEmp(this.details.value)
        toast.present();
        this.eighty_CC = false
      }
    })

  }
  async exemption() {
    let item = this.data.id
    this.user.id = this.data.id
    this.user.year = this.details.value.year
    const modal = await this.modalCtrl.create({
      component: ExemptionsDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: this.user
      }

    });

    // console.log("selected item", this.data)
    return await modal.present();

  }
  isItemAvailable: Boolean = false;

  initializeItems() {
    this.item = this.itemData
console.log("item",this.item);

  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // console.log("test", val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.item = this.itemData.filter((item) => {
        return (item.employee.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.isItemAvailable = false;
    }
  }
  switchRegime() {
    if (this.data.regime == "New") {
      this.data.regime = "Old"

    } else {
      this.data.regime = "New"
    }

  }
  updateRegime() {
    this.data2.company = this.api.getCompanyId()
    this.data2.tax = this.data.regime
    this.data2.old_std_deduction = 50000
    this.data2.old_taxable_income = this.data.taxable_income
    this.data2.year = this.details.value.year
    this.data2.id = this.data.id
    // console.log("update regime", this.data2);
    let header = this.api.getHeader();
    this.api.updateRegime(this.data2, header).subscribe(async (response: any) => {
      // console.log("updateRegime response", response);
      let a = response.status
      if (a == 200) {
        alert("Thank you for confirmation !!! Your changes have been saved successfully.")
      }
    })
  }
  save80D() {
    // console.log("sdsa", this.eightyD_form.getRawValue());
    this.eightyD_form.patchValue({
      employee: this.data.id
    })

    let header = this.api.getHeader();
    this.api.eightyDform(this.eightyD_form.getRawValue(), header).subscribe(async (response: any) => {
      // console.log("this.eightyD_form.value response", response)
      let a = response.status
      if (a == 200) {
        const toast = await this.toastController.create({
          message: "Section 80D added successfully",
          duration: 2000,
          position: 'middle'
        });
        this.selectedEmp(this.details.value)
        toast.present();
        this.eightyD = false
      }
    })

  }
}
