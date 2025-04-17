import { modalController } from '@ionic/core';
import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

@Component({
  selector: 'app-invoice-setting',
  templateUrl: './invoice-setting.page.html',
  styleUrls: ['./invoice-setting.page.scss'],
})
export class InvoiceSettingPage implements OnInit {
  @Output() invoiceSFunction: EventEmitter<any> = new EventEmitter();
  sett: any = {
    extra_fields: [],
    has_suffix: false,
    last_inv_no: 0,
    dual_currency: false,
    enable_value_addition: false,
    name_against_signature: false,
    custom_text_for_signature: null,
    show_discount_rs: false,
    show_value_add_rs: false
  }
  extraF: any = [];
  formValue: boolean = false;
  prefix12: boolean = false;
  has_suffix: boolean
  fiscalyears: string[];
  presub: any = {
    data: [
      {
        duration: "",
        label: "",
        has_prefix: true,
        prefix: ""
      }
    ],
    apply: false
  }
  has_fixed_terms_and_conditions: boolean = false;
  terms_and_conditions: any = '';

  constructor(public api: ApiService, public toastController: ToastController, public router: Router, private location: Location,
    public modal: ModalController, private translate: TranslateService, private permission: PermissionGuard,
    private alertCtrl: AlertController, private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.removeInnerHtml()
    this.show();
    // this.invPrefix();
    this.activatePreSub()
  }
  getInnerHTML(val) {
    console.log('clicked');
    return val.replace(/(<([^>]+)>)/ig, '');
  }

  removeInnerHtml() {
    // Use a regular expression to remove HTML tags
    console.log('clicked');

    this.terms_and_conditions = this.terms_and_conditions.replace(/<\/?[^>]+(>|$)/ig, "");
  }
  dismis() {
    modalController.dismiss()
  }
  show() {
    console.log("showcomponent");
    console.log(this.sett.prefix, this.sett.has_suffix, "checked");

    let company = this.api.getCompanyId()
    this.api.post3('get_invoice_settings/', { "company": company, "type": 1 }).subscribe((response: any) => {
      this.sett = response
      console.log(response, 'setting');
      console.log(JSON.parse(response.extra_fields), 'after parse');
      this.extraF = JSON.parse(response.extra_fields)
      console.log(this.extraF.length, 'after parse');
      if (response.financial_data != null && response.annual_reset == true) {
        this.presub.data = JSON.parse(response.financial_data)
      }
      if (this.sett.has_suffix == true) {
        this.sett.has_suffix = true
      }

      this.prefix12 = false

      if (this.sett.is_sequence == true) {
        this.prefix12 = true
      }
      if (this.extraF.length != 0) {
        this.formValue = true
      }
      if (this.sett.po_number == false) {
        this.sett.po_number = true
      } else {
        this.sett.po_number = true
      }
      if (this.sett.eway_number == false) {
        this.sett.eway_number = false
      } else {
        this.sett.eway_number = true
      }
      if (this.sett.vehicle_number == false) {
        this.sett.vehicle_number = false
      } else {
        this.sett.vehicle_number = true
      }
      if (this.sett.has_fixed_terms_and_conditions == false) {
        this.sett.has_fixed_terms_and_conditions = false
      } else {
        this.sett.has_fixed_terms_and_conditions = true
      }
    })


  }
  invPrefix() {
    console.log(this.prefix12);
    //  this.prefix12=!this.prefix12
    if (this.prefix12 == false) {
      this.sett.prefix = null;
    }
  }
  toggleShow1() {
    console.log(this.sett.has_suffix);

    if (this.sett.has_suffix == false) {
      this.sett.suffix = ""
    }
  }
  ClickNewRow() {
    let sett = {
      extra_fields: ""
    }
    this.extraF.push(sett)
    this.formValue = true
  }
  toggleShow3() {
    this.sett.annual_reset = !this.sett.annual_reset
    if (this.sett.annual_reset) {
      this.activatePreSub()
    }
  }
  toggleShow4() {
    this.sett.has_custom_series = !this.sett.has_custom_series
    if (this.sett.has_custom_series) {
      // this.activatePreSub()
    }

  }
  deleteRow1(i: number) {
    this.extraF.splice(i, 1)
  }
  Submit(sett: any) {
    console.log(sett, "sett");

    sett.extra_fields = this.extraF
    // this.invoiceSFunction.emit(sett);

  }
  addExtraFeild() {
    this.sett.extra_fields = this.extraF

    let company = this.api.getCompanyId()
    if (this.prefix12 == true) {

      this.sett.is_sequence = true
    } else {
      this.sett.is_sequence = false
    }
    let financial_data = null
    if (this.sett.annual_reset) {
      financial_data = this.activatePreSub();
    }
    this.api.post3('invoice_settings/',
      {
        "company": company, "type": 1,
        po_number: this.sett.po_number,
        eway_number: this.sett.eway_number,
        vehicle_number: this.sett.vehicle_number,
        prefix: this.sett.prefix,
        suffix: this.sett.suffix,
        has_suffix: this.sett.has_suffix,
        annual_reset: this.sett.annual_reset,
        extra_fields: this.sett.extra_fields,
        is_sequence: this.sett.is_sequence,
        id: this.sett.id,
        auto_interest_calculation: this.sett.auto_interest_calculation,
        has_custom_series: this.sett.has_custom_series,
        has_fixed_terms_and_conditions: this.sett.has_fixed_terms_and_conditions,
        name_against_signature: this.sett.name_against_signature,
        terms_and_conditions: this.sett.terms_and_conditions,
        custom_text_for_signature: this.sett.custom_text_for_signature,
        interest_pa: this.sett.interest_pa,
        gst_on_interest: this.sett.gst_on_interest,
        dual_currency: this.sett.dual_currency,
        last_inv_no: this.sett.last_inv_no,
        enable_value_addition: this.sett.enable_value_addition,
        show_discount_rs: this.sett.show_discount_rs,
        show_value_add_rs: this.sett.show_value_add_rs,
        financial_data: financial_data,
        has_upi:this.sett.has_upi,
        upi_id:this.sett.upi_id,
        has_free_qty:this.sett.has_free_qty,
        
      }).subscribe(async (response: any) => {
        console.log('response setting', response);
        if (response.status == "success") {
          const toast = await this.toastController.create({
            message: "Invoice setting updated successfully",
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      })
    modalController.dismiss();
  }

  getFinancialYears(): string[] {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const startMonth = 4;
    let currentFinancialYear: string;
    if (currentMonth >= startMonth) {
      currentFinancialYear = `${currentYear}-${currentYear + 1}`;
    } else {
      currentFinancialYear = `${currentYear - 1}-${currentYear}`;
    }
    const previousFinancialYear = `${currentYear - 1}-${currentYear}`;
    const nextFinancialYear = `${currentYear + 1}-${currentYear + 2}`;
    return [currentFinancialYear, previousFinancialYear, nextFinancialYear];
  }

  activatePreSub() {

    const [currentYear, previousYear, nextYear] = this.getFinancialYears();
    this.fiscalyears = [currentYear, previousYear, nextYear];
    console.log(this.fiscalyears, "anuual restet financial data");
    let i = 0
    this.presub.data.forEach(element => {
      element.label = [currentYear, previousYear, nextYear][i]
      i++
      console.log(element);
    });
    return this.presub.data;
  }

  addFiscalYear() {
    let g = {
      duration: "",
      label: "",
      has_prefix: true,
      prefix: ""
    }
    this.presub.data.push(g);
  }

  removeRow(h) {
    this.presub.data.splice(h, 1);
  }
}
