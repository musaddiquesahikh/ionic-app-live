import { Location } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';

//import { IonicPage, Slides } from '@angular/';


@Component({
  selector: 'app-gstr1',
  templateUrl: './gstr1.page.html',
  styleUrls: ['./gstr1.page.scss'],
})
export class GSTR1Page implements OnInit {
  item: any = {
    company:'',
    quarter: '',
    start:'',
    year:null
  }
  company: any = []
  gstr1: any = []
  b2bData: any = []
  b2bLargeData: any
  header: any;
  data: any
  nillData: any
  b2cL: any = []
  expo:any=[]
  b2cS: any = []
  creditUNData: any = []
  creditNoteRegData: any = []
  docData: any = []
  hsnData: any = []
  year:null
  a: boolean
  b: boolean
  c: boolean
  d: boolean
  e: boolean
  f: boolean
  g: boolean
  h: boolean
  x:boolean
  private selectSegment: string = 'b2b';

  @ViewChild(Slides) slides: IonSlides;

  public showLeftButton: boolean;
  public showRightButton: boolean;
  selectedCategory: ({ a: string; b?: undefined; } | { b: string; a?: undefined; })[];
  companyId: any;
arr:any={}
  constructor(public api: ApiService, public injector: Injector, 
    private permission: PermissionGuard,public location:Location,public alertCtrl:AlertController,public toastController: ToastController, private translate: TranslateService) { }

  ngOnInit() {
    this.a = false
    this.b = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
    this.permission1();
  }
  submit() {
    let companyId = this.api.getCompanyId()
    console.log("gf", companyId);
    console.log(this.item);
    this.item.company = companyId
    console.log(this.item);
    this.header = this.api.getHeader();

    this.b2bFunction()
  }
  segmentChanged(event: any) {
    console.log(event.target.value);
    this.selectSegment = event.target.value;

  }
  b2bFunction() {

    this.api.gstr1B2B(this.item, this.header).subscribe(async (response: any) => {
      console.log(response);
      this.b2bData = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.a = true
    this.b = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
  }

  b2cLarge() {

    this.api.gstr1B2CLarge(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.b2cL = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.b = true
    this.a = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
  }
  b2cSmall() {

    this.api.gstr1B2CSmall(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.b2cS = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.c = true
    this.a = false
    this.b = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
  }
  creditNoteRegister() {

    this.api.gstr1CreaditNoteR(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.creditNoteRegData = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.d = true
    this.a = false
    this.b = false
    this.c = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
  }
  creditNoteUNRegister() {

    this.api.gstr1CreaditNoteU(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.creditUNData = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.e = true
    this.a = false
    this.b = false
    this.c = false
    this.d = false
    this.f = false
    this.g = false
    this.h = false
    this.x = false
  }
  nillRated() {

    this.api.gstr1NilRated(this.item, this.header).subscribe(async (response: any) => {
      console.log('1987', response);
      this.nillData = response.data
      console.log("nildata", this.nillData);
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.f = true
    this.a = false
    this.b = false
    this.c = false
    this.d = false
    this.e = false
    this.g = false
    this.h = false
    this.x = false
  }
  documentSummary() {

    this.api.gstr1DocSummary(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.docData = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.g = true
    this.a = false
    this.b = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.h = false
    this.x = false
  }
  hsnSummary() {

    this.api.gstr1HSNSummary(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.hsnData = response.data
      let a = response.status
      if (a == 500) {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.h = true
    this.a = false
    this.b = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.x = false
  }
  export(){
   
    this.companyId= this.api.getCompanyId()
    let company= this.item.companyId
    this.year=this.item.year
    this.arr.company=this.item.companyId
    this.arr.quarter=this.item.quarter
    this.arr.start=this.item.start
    console.log(company,'compId',this.arr);
    
    this.api.export(this.item, this.header).subscribe(async (response: any) => {
      console.log('190', response);
      this.expo = response.data
      let a = response.status
      if ( this.expo=='') {
        const toast = await this.toastController.create({
          message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    })
    this.x = true
    this.b = false
    this.a = false
    this.c = false
    this.d = false
    this.e = false
    this.f = false
    this.g = false
    this.h = false
  }
  private initializeCategories(): void {
    this.selectedCategory = [{ "a": "a" }, { "b": "b" }];
  }

  public filterData(categoryId: number): void {
  }
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
  }
  public slideNext(): void {
    this.slides.slideNext();
  }
  public slidePrev(): void {
    this.slides.slidePrev();
  }
  excel() {
    let companyId = this.api.getCompanyId()
    console.log("gf", companyId);
    console.log(this.item);
    this.item.company = companyId
    console.log(this.item);
    this.header = this.api.getHeader();
    this.api.exportGstr1(this.item, this.header).subscribe((response: any) => {
      console.log('190', response);
      window.location.href = response.url
    })
  }
  async permission1(){
    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
  
      if (hh.page_name == 'reports') {
        console.log("asd123", hh.actions.view);
        if (hh.actions.view == true) {
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
}
function Slides(Slides: any) {
  throw new Error('Function not implemented.');
}

