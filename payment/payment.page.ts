import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  formData: FormGroup 
  constructor(public fb: FormBuilder, public modal:ModalController) { }

  ngOnInit() {
    this.formData = this.fb.group({
      'billing_name': ['', Validators.required],
      'gst_number': ['', Validators.compose([ Validators.pattern("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[A-Za-z]{1}[A-Za-z-0-9]{1}$")])],
      'billing_address': ['',],
    })
  }
  paymentDetails(){
    
    this.markFormTouched(this.formData);
    if (this.formData.valid) {
      console.log(this.formData.value);
      var formValues = this.formData.getRawValue;
      // this.parentFunction.emit(this.formData.value);
      this.modal.dismiss(this.formData.value)
    
    }
    
  }
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };
  back(){
    this.modal.dismiss()
  }
}
