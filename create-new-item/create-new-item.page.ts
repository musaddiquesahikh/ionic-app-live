import { Location, DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSearchbar, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PermissionGuard } from '../guards/permission.guard';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { CategoryPage } from '../category/category.page';

@Component({
  selector: 'app-create-new-item',
  templateUrl: './create-new-item.page.html',
  styleUrls: ['./create-new-item.page.scss'],
})

export class CreateNewItemPage implements OnInit {
  // options: string[] = JSON.parse(localStorage.getItem('options')) || [];
  // selectedOption: string;
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;
  
  ionViewDidEnter() {
   this.searchBar.setFocus();
 }
  filteredOptions: any=[];
  selectedOption: any;
  searchTerm: string = '';

  options: any = [];
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
    group:'',
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
    multiple:[],
    multiple_rates:false,
    square_calculation:false
  }

  multiple:any=[{
    from_rate:0,
    to_rate:0,
    tax:""

  }]
  toggleWid:boolean=false
  otherUnit: boolean = false;
  myDate: Date = new Date();
  // formattedDate: string;
  form: FormGroup;
  currentParty: any;
  showGst: boolean=false;
  CategoryName: any;
  rows: any[];
  isDropdownVisible: boolean=false;
  sdata: boolean=false;
  slectedGst: any;
 @Input() dataitem
  constructor(public toastController: ToastController, public api: ApiService, public router: Router,public datePipe:DatePipe,
    public navCtrl: NavController, public location: Location, public modalCtrl: ModalController, private translate: TranslateService,
     public alertCtrl: AlertController, public permission: PermissionGuard,private http: HttpClient, private popoverController: PopoverController) {
      // this.formattedDate = this.datePipe.transform(this.myDate, 'MM/yy');
      this.loadOptions();
    }
    updateDate() {
    // this.myDate = this.datePipe.transform(this.formattedDate, 'MM/yy');
    this.myDate = new Date(Date.parse(this.myDate.toString()));

  }
  
  ngOnInit() {
    this.user.multiple=this.multiple
    this.companyId = this.api.getCompanyId()
    this.getUnit()
    this.cessData = this.getGSTrate()
    this.getGSTrate()
    this.permission1()
    // this.loadOptions();
    this.gstCalculation();
    // this.filterOptions();
 
  }
  gstCalculation(){
    this.currentParty=JSON.parse(sessionStorage.getItem('currentCompany'));
      if(this.currentParty.gst_number===null || this.currentParty.gst_number===""){
        this.showGst=false
      }else if(this.currentParty.gst_number!==null || this.currentParty.gst_number!==""){
        this.showGst=true
      }
    }
  async submitData(user: any) {
    console.log("user details", user);
    if (user.item_type == 1) {
      if (user.item_type && user.item_name && user.item_code ) {

        if (!this.conversionRate) {
          user.conversion_value = null
          user.alternative_unit = null
          this.submit = true
        } else {
          this.submit = true
        }
      } else {
        console.log('indide else');

        this.submit = false
      }
      if(user.multiple_rates == true){
        if(user.multiple[0].from_rate && user.multiple[0].to_rate){
          this.submit=true
        }
        else{
         console.log("else", user.multiple , this.submit);
         this.submit=false
        }
       }
       else{
        this.submit=true

       }

    }
    if (user.item_type == 2) {
      if (user.item_type && user.item_name) {
        this.submit = true
        user.conversion_value = null
        user.conversionRate = null
      } else {
        this.submit = false
      }
    }
    if (user.unit !== null){
      if (user.unit == 30){
        if (user.other_unit != null && user.other_unit != '') {
          user.other_unit==user.other_unit
          this.submit = true
        }
        else {
          console.log("submi");
          const toast = await this.toastController.create({
            message: 'Add other unit',
            duration: 2000,
            color: "success"
          });
        await  toast.present();
          this.submit = false
        }
      }
    } else {
      user.other_unit == null
    }
  
    if (this.submit) {
      console.log("SUBMIT", this.submit, user);
      let header = this.api.getHeader();
      user.multiple=this.multiple
      user.company_name = this.companyId

      this.api.createNewItem(user, header).subscribe(async (response: any) => {
        console.log(response,"createitemResponse");
        let a = response.status
        if (a == 200) {
          // alert("Item Created Successfully'");
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ITEM CREATED SUCCESSFULLY'),
            duration: 2000,
            color: "success"
          });
          toast.present();
          this.x =response.data
          this.modalCtrl.dismiss(this.x)
          // this.location.back()//after form save back 
        }
        // this.modalCtrl.dismiss(this.x)
        if(a == 303){
          // alert( "Item Name already exists")
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ITEM NAME ALREADY EXISTS'),
            duration: 2000,
            color: "warning"
          }
      );
          toast.present();
        }
      
      })
    }
    else {
      // alert("Please Enter Required Feild'");
      if (user.unit == 30){
        const toast = await this.toastController.create({
          message: 'Add other unit',
          duration: 2000,
          color: "success"
        });
      await  toast.present();
      }
      else{
      const toast = await this.toastController.create({
        message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
        duration: 2000,
        color: "warning"
      });
      toast.present();
    }
    }
  }

  getUnit() {
    let header = this.api.getHeader();
    this.api.receivedUnit(header).subscribe((response: any) => {
      console.log(response);
      this.Unit = response.data
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
      this.cessData = response.filter(d => {
        return activeIds.includes(d.id);
      })
    });
  }
  back() {
    // this.modalCtrl.dismiss(this.x)
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
    this.conversionRate = !this.conversionRate
    console.log(this.conversionRate);
    if (!this.conversionRate) {
      this.user.conversion_value = null
      this.user.alternative_unit = null
    }
  }
  other(event: any) {
    const selectedOption = event.target.value;
    console.log(selectedOption);
    if (selectedOption == 30) {
      this.user.conversion_value = null
      this.user.alternative_unit = null
      this.otherUnit = true
      console.log(selectedOption);
    }
    else {
      this.otherUnit = false
    }
  }
 
  loadOptions() {
    let header = this.api.getHeader();
    this.api.getItemCategory(header).subscribe((options:any) => {
      
      console.log(options,"opppp");
      if(options.status==200){
      this.options = options.data;
      this.user.group=options.data[0].id
      }
      else{
        this.options=[]
      }
    });
  }
  async addOption(ev: any) {
    const popover = await this.popoverController.create({
      component: CategoryPage,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }
  // async addOption() {
  //   if(this.CategoryName!=undefined && this.CategoryName!=""){
  //   let data = {
  //     group_name: this.CategoryName,
  //     company: this.api.getCompanyId()
  //   }
  //   this.api.post3('create_item_groups/',data).subscribe(async (res:any)=>{
  //     console.log(res,"reponse");
  //     if(res.status==200){
  //       this.loadOptions()
  //       const toast = await this.toastController.create({
  //         message:res.msg,
  //         duration: 2000,
  //         color: "success"
  //       });
  //       toast.present();
  //       this.popoverController.dismiss()
  //       this.CategoryName=null
  //     }
  //     else{
  //       const toast = await this.toastController.create({
  //         message:res.msg,
  //         duration: 2000,
  //         color: "warning"
  //       });
  //       toast.present();
        
  //     }
  //   })
  //   console.log(this.CategoryName,"opppp");
  //    }else{
  //     const toast = await this.toastController.create({
  //       message:("Enter Category Name"),
  //       duration: 2000,
  //       color: "warning"
  //     });
  //     toast.present();
  //    }
     
  // }
 
toggleRow() {
  // this.showRow = !this.showRow;
  let data={
    from_rate:'',
    to_rate:'',
    tax:""

  }
  this.multiple.push(data)
}
deleteRange(index){
  this.multiple.splice(index ,1 );
}
deleteRow(id: number) {
  this.rows = this.rows.filter(row => row.id !== id);
}
checked(){
  console.log(this.isChecked,"loool");
  this.isChecked=!this.isChecked
  if(this.isChecked){
  this.user.multiple_rates=true
  }
  else{
    this.user.multiple_rates=false
  }  
}

filterOptions(a) {

    this.api.HsnData(a).subscribe((response:any) => {
    console.log(response, "hsnsearch");
    if(response.status==200){
      let data1 = response.msg.map(item => {
        let iValue = item.i;
        if (typeof iValue === 'string') {
          if (iValue.includes('%')) {
            iValue = Number(iValue.replace('%', ''));
          }}else{
          iValue = Number(iValue);
        }
        return {
          id: item.id,
          d: item.d,
          s: item.s,
          c: item.c,
          i: iValue,
          hsn: item.hsn.toString()
        }});
      
      this.filteredOptions = data1
      if(this.filteredOptions.length >0){
        this.sdata=true
      }else{
        this.sdata=false
      }
      
    }
    else{
      this.filteredOptions = [];
      this.sdata=false
    }
       }); 
    }

selectOption(option:any) {
  
  // this.selectedOption = option;
  this.sdata=false
  let p = this.gstrate.filter(item => item.gst_tax_rate == option.i)
  console.log(option,"opyiooon");
  console.log(p[0],"mmmm");
  
  this.user.Gst_tax_rate=p[0].id
  this.user.hsn_code=option.hsn
  this.filteredOptions=[]
  // this.slectedGst=p[0]
  // // this.searchTerm = '';
  // this.isDropdownVisible = false;
}


}

