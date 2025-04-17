import { Location, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSearchbar, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryPage } from '../category/category.page';
import { log } from 'console';
import { MultipleICPage } from '../multiple-ic/multiple-ic.page';
import { InvoiceSettingPage } from '../invoice-setting/invoice-setting.page';
import { ItemSettingPage } from '../item-setting/item-setting.page';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.page.html',
  styleUrls: ['./add-new-item.page.scss'],
})
export class AddNewItemPage implements OnInit {

  filteredOptions: any = [];
  selectedOption: any;
  searchTerm: string = '';
  // options: any = [];
  conversionRate: boolean = false
  submit: boolean = false;
  companyId: any
  x: any = {}
  company: any = []
  place_of_supply: any = []
  isChecked: boolean = false; // Initialize as unchecked
  showRow: boolean = false;
  pan: any
  result: any;
  Unit: any = []
  alternative_unit: any = []
  gstrate: any = []
  cessData: any = []
  user = {
    optionss: [],
    group: '',
    item_type: 1,
    item_name: "",
    category: "",
    item_code: "",
    item_description: null,
    unit: null,
    alternative_unit: null,
    opening_stock: 1,
    conversion_value: 1,
    as_of_date: "2022-05-13",
    sales_prices: 0,
    sales_types: 2,
    purchase_prices: 0,
    purchase_types: 2,
    hsn_code: "",
    Gst_tax_rate: 2,
    cess_tax_rate: 2,
    low_stock: 0,
    rate: '',
    discount: 0,
    sales_tax: '',
    other_unit: null,
    multiple: [],
    multiple_rates: false,
    square_calculation: false,
  }

  multiple: any = [{
    from_rate: 0,
    to_rate: 0,
    tax: ""

  }]
  toggleWid: boolean = false
  otherUnit: boolean = false;
  myDate: Date = new Date();
  // formattedDate: string;
  form: FormGroup;
  currentParty: any;
  showGst: boolean = false;
  // CategoryName: any;
  rows: any[];
  isDropdownVisible: boolean = false;
  sdata: boolean = false;
  slectedGst: any;
  ItemForm: FormGroup
  CategoryForm: FormGroup
  CategoryName: any;
  options: any = [];
  oppp: any;
  itemSettings: FormGroup
  @Input() dataitem
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  item: any;
  partA: any = "custom-input1"
  partB: any = "custom-input2"
  addoption: boolean;
  exp1: any = [{
    SrNo: "",
    Qyt: ""
  }];
  itemcode_value: boolean = false;
  servicecode_value: boolean = false;
  id: any;
  jd: any;

  constructor(public toastController: ToastController, public api: ApiService, public router: Router, public datePipe: DatePipe,
    public navCtrl: NavController, public location: Location, public modalCtrl: ModalController, private translate: TranslateService,
    public alertCtrl: AlertController, public permission: PermissionGuard, private http: HttpClient, private popoverController: PopoverController,
    private formBuilder: FormBuilder, public datepipe: DatePipe, private fb: FormBuilder) {
    // this.formattedDate = this.datePipe.transform(this.myDate, 'MM/yy');
    this.ItemForm = this.formBuilder.group({
      'item_name': ['', Validators.required],
      'item_code': [Validators.required],
      'item_type': [1],
      'item_description': [''],
      'group': [1, Validators.required],
      'unit': [],
      'opening_stock': [0, Validators.required],
      'other_unit': [null, Validators.required],
      'alternative_unit': [null],
      'conversion_value': [null, Validators.required],
      'as_of_date': ['', Validators.required],
      'from_rate': [0, Validators.required],
      'to_rate': [0, Validators.required],
      'tax': ['', Validators.required],
      'sales_prices': [0, Validators.required],
      'sales_types': [2],
      'purchase_prices': [0, Validators.required],
      'purchase_types': [2],
      'square_calculation': [false],
      'hsn_code': [null],
      'Gst_tax_rate': [],
      'cess_tax_rate': [],
      'companyId': [this.api.getCompanyId()],
      'company_name': [this.api.getCompanyId()],
      'item_id': [],
      'as_on': [],
      'conversionrate': [false]
      // 'group_name':['', [Validators.required, this.noWhitespaceValidator]]

    });

    this.CategoryForm = this.formBuilder.group({
      'group_name': ['', [Validators.required, this.noWhitespaceValidator]]
    });

    this.itemSettings = this.fb.group({
      disable_item_code: [false],
      disable_service_code: [false],
      company: [this.api.getCompanyId()],
      group: [Validators.required],
    })
  }

  ngOnInit() {
    this.fetchItemsetting()
    this.fetchItemsetting1()
    this.loadOptions();
    if (this.dataitem == undefined) {
      this.getItemCode();
    }

    this.user.multiple = this.multiple
    this.companyId = this.api.getCompanyId()
    this.getUnit()

    this.cessData = this.getGSTrate()
    this.getGSTrate()
    this.permission1()
    this.gstCalculation();
    this.getItemName()
    this.dateChange();


    if (this.dataitem != undefined) {
      console.log(this.dataitem, 'data item');
      this.ItemForm.patchValue(this.dataitem)
      this.ItemForm.get('item_id').patchValue(this.dataitem.id)
      this.ItemForm.get('item_type').disable()
      this.ItemForm.get('Gst_tax_rate').patchValue(this.dataitem.Gst_tax_rate)
      this.ItemForm.get('cess_tax_rate').patchValue(this.dataitem.cess_tax_rate)
      this.ItemForm.get('alternative_unit').patchValue(this.dataitem.alternative_unit)
      this.ItemForm.get('other_unit').patchValue(this.dataitem.other_unit)
      this.ItemForm.get('conversion_value').patchValue(this.dataitem.conversion_value)
      this.ItemForm.get('conversionrate').patchValue(this.dataitem.conversionrate)
      if (this.ItemForm.value.conversion_value != null) {
        this.ItemForm.value.conversionrate == true
      }
      console.log(this.ItemForm.value.conversion_value, this.ItemForm.value.alternative_unit, this.ItemForm.value.conversionrate, 'oninit');

    }

  }
  dateChange() {
    let today_date = Date.now();
    this.ItemForm.get('as_of_date').patchValue(this.datepipe.transform(today_date, 'yyyy-MM-dd'))
  }
  getItemName() {
    this.api.post3('get_item_name/', { "company_id": this.api.getCompanyId() }).subscribe((res: any) => {
      console.log(res, 'any');
      if (res.status == 200) {
        this.jd = res.data
      } else {
        this.jd = []
      }
    })
  }
  getItemCode() {
    let c_id = this.api.getCompanyId();
    console.log('itemcode', c_id);
    let header = this.api.getHeader();
    this.api.getItemCode(c_id,header).subscribe((ic: any) => {
      console.log(ic, 'itemcode');
      this.ItemForm.get('item_code').patchValue(ic.item_code);
    })
  }
  gstCalculation() {
    this.currentParty = JSON.parse(sessionStorage.getItem('currentCompany'));
    if (this.currentParty.gst_number === null || this.currentParty.gst_number === "") {
      this.showGst = false
    } else if (this.currentParty.gst_number !== null || this.currentParty.gst_number !== "") {
      this.showGst = true
    }
  }
  async submitData() {
    let header = this.api.getHeader();
    if (this.dataitem != undefined) {

      this.api.editItem(this.ItemForm.value, header).subscribe(async (response: any) => {
        console.log("lplplp", response);
        let a = response.status
        this.item = response.data
        if (a == 200) {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          let data = response.data
          // this.modalCtrl.dismiss(data);
          this.parentFunction.emit(data)
        }
        if (a == 303) {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
        else {
          const toast = await this.toastController.create({
            message: response.message,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          // this.modalCtrl.dismiss();
        }

      }, async (error) => {
        console.log("pppp", error);

        const toast = await this.toastController.create({
          message: error,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      });
    }
    else {
      // console.log('inside if', user.multiple[0].from_rate);
      let user = this.ItemForm.value
      console.log("user details", user);
      if (this.ItemForm.value.item_type == 1) {
        if (this.ItemForm.value.item_type && this.ItemForm.value.item_name && this.ItemForm.value.item_code) {

          if (!this.ItemForm.value.conversionrate) {
            user.conversion_value = null
            user.alternative_unit = null
            this.submit = true
          } else {
            this.submit = true
          }
        } else {
          this.markFormTouched(this.ItemForm);
          console.log('indide else');

          this.submit = false
        }
        if (user.multiple_rates == true) {
          if (this.user.multiple[0].user.from_rate && this.user.multiple[0].user.to_rate) {
            this.submit = true
          }
          else {
            this.markFormTouched(this.ItemForm);
            console.log("else", this.user.multiple, this.submit);
            this.submit = false
          }
        }
        else {
          this.submit = true

        }

      }
      if (this.ItemForm.value.item_type == 2) {
        if (this.ItemForm.value.item_type && this.ItemForm.value.item_name) {
          this.submit = true
          user.conversion_value = null
          user.conversionRate = null
        } else {
          this.markFormTouched(this.ItemForm);
          this.submit = false
        }
      }
      if (this.ItemForm.value.unit !== null) {
        if (this.ItemForm.value.unit == 30) {
          if (this.ItemForm.value.other_unit != null && this.ItemForm.value.other_unit != '') {
            this.ItemForm.value.other_unit == this.ItemForm.value.other_unit
            this.submit = true
          }
          else {
            console.log("submi");
            const toast = await this.toastController.create({
              message: 'Add other unit',
              duration: 2000,
              position: 'middle'
            });
            await toast.present();
            this.submit = false
          }
        }
      } else {
        user.other_unit == null
      }
      if (this.submit) {
        console.log("SUBMIT", this.submit, user);
        this.user.multiple = this.multiple
        user.company_name = this.companyId

        this.api.createNewItem(user, header).subscribe(async (response: any) => {
          console.log(response, "createitemResponse");
          let a = response.status
          if (a == 200) {
            // alert("Item Created Successfully'");
            const toast = await this.toastController.create({
              message: response.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.x = response.data
            // this.modalCtrl.dismiss(this.x)
            this.ItemForm.patchValue({

              'item_name': '',
              'item_code': this.getItemCode(),
              'item_type': 1,
              'item_description': '',
              'group': 1,
              'unit': 45,
              'opening_stock': 0,
              'other_unit': null,
              'alternative_unit': '',
              'conversion_value': '',
              // 'as_of_date':'',
              'from_rate': 0,
              'to_rate': 0,
              'tax': '',
              'sales_prices': 0,
              'sales_types': 2,
              'purchase_prices': 0,
              'purchase_types': 2,
              'square_calculation': false,
              'hsn_code': '',
              'Gst_tax_rate': 2,
              'cess_tax_rate': 2,

            });
          }
          if (a == 303) {
            const toast = await this.toastController.create({
              message: response.msg,
              duration: 2000,
              position: 'middle'
            }
            );
            toast.present();
          }

          if (a == 500 && response.code == 3) {
            const toast = await this.toastController.create({
              message: 'Pleas Enter Sales/Purchase Price',
              duration: 2000,
              position: 'middle'
            }
            );
            toast.present();
          }
          if (a == 500) {
            const toast = await this.toastController.create({
              message: response.msg,
              duration: 2000,
              position: 'middle'
            }
            );
            toast.present();
          }
        })
      }
      else {
        this.markFormTouched(this.ItemForm);
        // alert("Please Enter Required Feild'");
        if (this.ItemForm.value.unit == 30) {
          const toast = await this.toastController.create({
            message: 'Add other unit',
            duration: 2000,
            position: 'middle'
          });
          await toast.present();
        }
        else {
          this.markFormTouched(this.ItemForm);
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      }
    }
  }

  getUnit() {
    let header = this.api.getHeader();
    this.api.receivedUnit(header).subscribe((response: any) => {
      console.log(response);
      this.Unit = response.data
      this.ItemForm.get('unit').patchValue(45);
    });
  }
  segmentChanged(event: any) {
    this.user.item_type = Number(event.target.value)
    console.log(this.user.item_type);
  }

  getGSTrate() {
    let header = this.api.getHeader();
    console.log("header", header);
    const activeIds = [2, 10, 11, 12]
    this.api.receivedGST(header).subscribe((response: any[]) => {
      console.log(response);
      this.gstrate = response
      if (this.dataitem == undefined) {
        this.ItemForm.get('Gst_tax_rate').patchValue(this.gstrate[1].id)
      }
      this.cessData = response.filter(d => {
        return activeIds.includes(d.id);
      })
      if (this.dataitem == undefined) {
        this.ItemForm.get('cess_tax_rate').patchValue(this.cessData[0].id)
      }
    });
  }
  back() {
    this.modalCtrl.dismiss()
  }
  async permission1() {

    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");

      if (hh.page_name == 'items') {
        console.log("asd123", hh.actions.create);
        if (hh.actions.create == true) {
        } else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back()
        }
      }
    }
  }
  back1() {
    this.modalCtrl.dismiss()
  }

  conversion() {
    // this.ItemForm.value.conversionrate = !this.ItemForm.value.conversionrate
    console.log(this.ItemForm.value.conversionrate, 'conv');
    if (!this.ItemForm.value.conversionrate) {
      this.ItemForm.value.conversionrate = null
      this.ItemForm.value.conversionrate = null
    }
  }

  other(event: any) {
    const selectedOption = event.target.value;
    console.log(selectedOption);
    if (selectedOption == 30) {
      this.ItemForm.get('conversionrate').patchValue(false)
      console.log(this.ItemForm.value.conversionrate, 'after other unit');
      this.user.conversion_value = null
      this.user.alternative_unit = null
      this.otherUnit = true

      console.log(selectedOption);
    }
    else {
      this.otherUnit = false
    }
  }

  // loadOptions() {
  //   this.api.getItemCategory().subscribe((options: any) => {
  //     console.log(options, "opppp");
  //     if (options.status == 200) {
  //       this.options = options.data;
  //       let a=options.data[0].id
  //       if(this.dataitem==undefined){
  //       // this.ItemForm.get('group').setValue(1);
  //       this.ItemForm.controls['group'].setValue(a);
  //       }
  //     }
  //     else {
  //       this.options = []
  //     }
  //   });
  // }
  // async addOption(ev: any) {
  //   const popover = await this.popoverController.create({
  //     component: CategoryPage,
  //     event: ev,
  //     translucent: false
  //   });
  //   return await popover.present();
  // }
  noWhitespaceValidator(control) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  async addOption() {
    if (this.CategoryForm.value.group_name != undefined && this.CategoryForm.value.group_name != "") {
      let data = {
        group_name: this.CategoryForm.value.group_name,
        company: this.api.getCompanyId()
      }
      if (this.CategoryForm.valid) {
        this.api.post3('create_item_groups/', data).subscribe(async (res: any) => {
          console.log(res, "reponse", res.status);

          if (res.status == 500) {
            const toast = await this.toastController.create({
              message: res.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.CategoryForm.value.group_name = null
            this.CategoryForm.reset();
          }

          if (res.status == 200) {
            this.loadOptions()
            const toast = await this.toastController.create({
              message: res.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            this.CategoryForm.value.group_name = null
            this.popoverController.dismiss()
            this.CategoryForm.reset();
          }

          else {
            console.log(' else part');
            const toast = await this.toastController.create({
              message: res.msg,
              duration: 2000,
              position: 'middle'
            });
            toast.present();

          }
        })
      } else {
        const toast = await this.toastController.create({
          message: ("Pleas Enter Valid Category Name"),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      console.log(this.CategoryForm.value.group_name, "opppp");
    } else {
      const toast = await this.toastController.create({
        message: ("Enter Category Name"),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }

  addrow() {
    this.addoption = true
    let data = {
      SrNo: "",
      Qyt: ""
    }
    this.exp1.push(data);
  }
  deleteRow1(i: number) {
    this.exp1.splice(i, 1);

  }
  toggleRow() {
    let data = {
      from_rate: '',
      to_rate: '',
      tax: ""
    }
    this.multiple.push(data)
  }
  deleteRange(index) {
    this.multiple.splice(index, 1);
  }
  deleteRow(id: number) {
    this.rows = this.rows.filter(row => row.id !== id);
  }
  checked() {
    console.log(this.isChecked, "loool");
    this.isChecked = !this.isChecked
    if (this.isChecked) {
      this.user.multiple_rates = true
    }
    else {
      this.user.multiple_rates = false
    }
  }

  filterOptions() {

    this.api.HsnData(this.ItemForm.value.hsn_code).subscribe((response: any) => {
      console.log(response, "hsnsearch", this.ItemForm.value.hsn_code);
      if (response.status == 200) {
        let data1 = response.msg.map(item => {
          let iValue = item.i;
          if (typeof iValue === 'string') {
            if (iValue.includes('%')) {
              iValue = Number(iValue.replace('%', ''));
            }
          } else {
            iValue = Number(iValue);
          }
          return {
            id: item.id,
            d: item.d,
            s: item.s,
            c: item.c,
            i: iValue,
            hsn: item.hsn.toString()
          }
        });

        this.filteredOptions = data1
        if (this.filteredOptions.length > 0) {
          this.sdata = true
        } else {
          this.sdata = false
        }

      }
      else {
        this.filteredOptions = [];
        this.sdata = false
      }
    });
    console.log(this.ItemForm.value.hsn_code, 'hsncose ');

  }
  partyType(a) {
    if (this.dataitem == undefined) {
      if (a == 1) {
        this.partA = "custom-input1"
        this.partB = "custom-input2"

      }
      else {
        this.partB = "custom-input1"
        this.partA = "custom-input2"
      }
      this.ItemForm.get('item_type').setValue(a)
      console.log(a, this.ItemForm.value.item_type, "type");
    }
  }
  selectOption(option: any) {
    this.sdata = false
    let p = this.gstrate.filter(item => item.gst_tax_rate == option.i)
    console.log(p[0], "mmmm");
    this.ItemForm.value.Gst_tax_rate = p[0].id

    this.ItemForm.get('Gst_tax_rate').patchValue(p[0].id)
    this.ItemForm.get('hsn_code').patchValue(option.hsn)
    this.filteredOptions = []
  }
  
  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };

  fetchItemsetting() {
    let company = this.api.getCompanyId()
    this.api.post3('get_item_settings/', { "company": company, "type": 1 }).subscribe((res: any) => {
      console.log(res, 'response diss');
      this.itemcode_value = res.disable_item_code
      this.servicecode_value = res.disable_service_code
    })
  }

  refreshDashBoard() {
    window.location.reload()
    console.log("func calling refresh");
  }
  async setting() {
    const modal = await this.modalCtrl.create({
      component: ItemSettingPage,
      // componentProps: { "invoice": this.invoice_details },
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 1
    });
    return await modal.present();
  }
  fetchItemsetting1() {
    let company = this.api.getCompanyId()
    this.api.post3('get_item_settings/', { "company": company, "type": 1 }).subscribe((res: any) => {
      console.log(res);
      this.itemSettings.patchValue(res)
    })
    // this.modalCtrl.dismiss()

  }

  onChange() {
    console.log(this.itemSettings.value);
  }

  update() {
    this.api.post3('edit_item_settings/', this.itemSettings.value).subscribe(async (res: any) => {
      console.log(res, 'after submit');
      if (res.status == "success") {
        const toast = await this.toastController.create({
          message: 'Item Setting Updated successfully',
          duration: 2000,
          position: 'middle'
        });
        await toast.present();
        this.fetchItemsetting()
        this.navCtrl.pop();
      }
    }, async (error) => {
      const toast = await this.toastController.create({
        message: 'FAILED',
        duration: 2000,
        position: 'middle'
      });
      await toast.present();
    })
  }

  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options: any) => {
      console.log(options, "opppp");
      if (options.status == 200) {
        this.options = options.data;
        let a = options.data[0].id
        if (this.dataitem == undefined) {
          // this.ItemForm.get('group').setValue(1);
          this.itemSettings.controls['group'].setValue(a);
        }
      }
      else {
        this.options = []
      }
    });
  }

  async deleteCategoryGroup(item) {
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'items') {
        console.log("asd123", hh.actions.delete);
        if (hh.actions.delete == true) {
          console.log(item);
          const toast = await this.toastController.create({
            header: this.translate.instant('MESSAGE.ARE YOU SURE YOU WANT TO DELETE THE INVOICE?'),
            position: "bottom",
            buttons: [
              {
                text: this.translate.instant('HEADER.YES'),
                role: "done",
                handler: () => {
                  console.log("this.item", item);
                  let header = this.api.getHeader();
                  this.api.deletGroup(item,header).subscribe(async (response: any) => {
                    console.log(response, 'delete ');
                    let a = response.msg
                    const toast = await this.toastController.create({
                      message: a,
                      duration: 2000,
                      position: "middle"
                    });
                    toast.present();
                    this.loadOptions()
                  },
                    async (error) => {
                      console.log("pppp", error);

                      const toast = await this.toastController.create({
                        message: error,
                        duration: 2000,
                        position: "middle"
                      });
                      toast.present();
                      this.loadOptions()
                    })
                },
              },
              {
                text: this.translate.instant('HEADER.CANCEL'),
                role: "cancel",
              },
            ],
          });
          toast.present();
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.modalCtrl.dismiss();
        }
      }
    }
  }
}
