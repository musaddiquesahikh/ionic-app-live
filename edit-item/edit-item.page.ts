import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
// import { Tab3Page } from 'untitled folder/src/app/tab3/tab3.page';
import { ApiService } from '../api.service';
import { ItemDetailsPage } from '../item-details/item-details.page';
import { Tab3Page } from '../tab3/tab3.page';
import { MymodalPage } from '../mymodal/mymodal.page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  private selectSegment: string = 'product';
  isChecked: boolean = false;
  company: any = {}
  selectedItem: any = {}
  itemDetails: any = {}
  Unit: any = [];
  alternative_unit: any = []
  gstrate: any = []
  cessData: any = []
  item: any = {}
  dataitem: any = [];
  conversionRate: boolean = false;
  response: any = [];
  alternative: any = [];
  otherUnit: boolean = false;
  submit: boolean = false;
  currentParty: any;
  showGst: boolean = false;
  CategoryName: any;
  options: any[];
  user = {
    group: ''

  }
  toggleWid: boolean = false
  multiple: any = []
  multiple_rates: boolean = false;

  constructor(public modalCtrl: ModalController, public api: ApiService, public router: Router, public toastController: ToastController,
    private translate: TranslateService, private modalController: ModalController,
    private popoverController: PopoverController, private location: Location) {
    this.loadOptions();
  }

  ngOnInit() {
    console.log(this.dataitem, 'first call');
    // this.conversionRate = false
    this.multiple_rates = this.dataitem.multiple_rates

    this.getUnit()
    this.getGSTrate()
    this.submitConv();
    this.gstCalculation();
    // this.submitMultiple();
  }
  back() {
    this.modalController.dismiss()
    console.log('lkook');

  }
  gstCalculation() {
    this.currentParty = JSON.parse(sessionStorage.getItem('currentCompany'));
    if (this.currentParty.gst_number === null || this.currentParty.gst_number === "") {
      this.showGst = false
    } else if (this.currentParty.gst_number !== null || this.currentParty.gst_number !== "") {
      this.showGst = true
    }
  }
  getUnit() {
    let header = this.api.getHeader();
    this.api.receivedUnit(header).subscribe((response: any) => {
      console.log("unit", response.data);
      this.Unit = response.data

    });
  }
  async submitData() {
    if (this.Unit !== null) {
      if (this.Unit == 30) {
        if (this.Unit.other_unit != null && this.Unit.other_unit != '') {
          this.Unit.other_unit == this.Unit.other_unit
          this.submit = true
          this.modalController.dismiss()
        }
        else {
          console.log("submi", this.Unit);
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
      this.Unit.other_unit == null
    }
    this.dataitem.multiple_rates = this.multiple_rates

    if (this.submit = true) {
      let companyId = this.api.getCompanyId()
      // console.log("company id", companyId);
      this.dataitem.company_id = companyId;

      let header = this.api.getHeader();
      this.itemDetails = this.dataitem

      // console.log("itemdetails", this.itemDetails);
      this.itemDetails.item_id = this.dataitem.id
      console.log("item_id", this.dataitem.id);

      this.api.editItem(this.itemDetails, header).subscribe(async (response: any) => {
        console.log("lplplp", response);
        let a = response.status
        this.item = response.data
        if (a == 200) {
          // alert('Item updated successfully')
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ITEM UPDATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          let data = response.data
          this.modalCtrl.dismiss(data);
        } else {
          // alert("something went wrong")
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.SOMETHING WENT WRONG'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.modalCtrl.dismiss();
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
      // this.submit();

    }
  }
  modelDismiss() {
    this.modalCtrl.dismiss(this.response.data);
  }
  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectSegment = event.target.value;

  }
  getGSTrate() {
    let header = this.api.getHeader();
    const activeIds = [2, 10, 11, 12]
    this.api.receivedGST(header).subscribe((response: any) => {
      this.gstrate = response
      console.log(this.gstrate, "gst");

      this.cessData = response.filter(d => {
        return activeIds.includes(d.id);
      })
      console.log(this.cessData, "cess");

    });
  }

  submitConv() {
    if (this.dataitem.alternative_unit != null) {
      this.conversionRate = true;
      console.log(this.conversionRate);
    }
    else {
      this.conversionRate = false
    }
    if (this.dataitem.unit == 30) {
      this.otherUnit = true
    }
    else {
      this.otherUnit = false
    }

  }
  conversion() {
    this.conversionRate = !this.conversionRate
    console.log(this.conversionRate);
    if (!this.conversionRate) {
      this.dataitem.conversion_value = null
      this.dataitem.alternative_unit = null
    }
  }
  other(event: any) {
    const selectedOption = event.target.value;
    console.log(selectedOption);
    if (selectedOption == 30) {
      this.otherUnit = true
      console.log(selectedOption);

    }
    else {
      this.otherUnit = false
    }
  }
  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options: any) => {

      console.log(options, "opppp");
      if (options.status == 200) {
        this.options = options.data;
        // this.user.group=options.data[0].id
      }
      else {
        this.options = []
      }
    });
  }
  noWhitespaceValidator(control) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  async addOption() {
    if (this.CategoryName != undefined && this.CategoryName.trim() !== "") {
      let data = {
        group_name: this.CategoryName.trim(),
        company: this.api.getCompanyId()
      }
      this.api.post3('create_item_groups/', data).subscribe(async (res: any) => {
        console.log(res, "reponse");
        if (res.status == 200) {
          this.loadOptions()
          const toast = await this.toastController.create({
            message: res.msg,
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.popoverController.dismiss()
          this.CategoryName = null
        }
        else {
          const toast = await this.toastController.create({
            message: res.msg,
            duration: 2000,
            position: 'middle'
          });
          toast.present();

        }
      })
      console.log(this.CategoryName, "opppp");
    } else {
      const toast = await this.toastController.create({
        message: ("Enter Category Name"),
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }

  }

  toggleRow() {
    // this.showRow = !this.showRow;
    let data = {
      from_rate: '',
      to_rate: '',
      tax: ""

    }
    this.dataitem.multiple.push(data)
  }
  deleteRange(index) {
    this.dataitem.multiple.splice(index, 1);
  }
  checked() {
    this.multiple_rates = !this.multiple_rates
    console.log(this.multiple_rates);
    if (!this.multiple_rates) {
      this.dataitem.multiple = null
    } else {
      this.toggleRow()
    }
  }

}

