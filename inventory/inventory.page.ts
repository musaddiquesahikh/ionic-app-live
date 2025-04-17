import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { DatePipe, Location } from '@angular/common';
import { EditItemPage } from '../edit-item/edit-item.page';
import { PermissionGuard } from '../guards/permission.guard';
import { ItemDetailsPage } from '../item-details/item-details.page';
import { AdjustStockPage } from '../adjust-stock/adjust-stock.page';
import { log } from 'console';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  items: any=[];
  dataSource: any = []
  currentDate: Date;
  myPastDate: Date;
  modalRef: any;
  adjustObject: any = {
    added_qty: 0
  }

  adjust: any = {};

  selectedValue: any = "add_stock";
  finalstock: number;
  editItemModalRef: any;
  for_emit: any;
  Role: any;
  batchdetailss: any;
  batchArray: any = [];
  medical: boolean = false;
  data1: any;
  itemDetails: any = [];
  private selectSegment: string = 'itemTimeline';
  user: any = [];
  date: any;
  itemList: any
  id: any
  Unit: any;
  result: any;
  userData: any = [];
  multiple_rates: boolean;
  message: string;
  isModalOpen: boolean;
  stock1: string;
  data: any;
  a:number=0;
  b:number
  c:number
  superModal:any
  @ViewChild('open-modal')p:any
  pagination: any;
  page_number: number=0;
  itemData: any=[];
  salesData: any=[];
  constructor(public modalCtrl1: ModalController, public api: ApiService, public alertCtrl: AlertController, public permission:PermissionGuard
    , public translate: TranslateService, public location: Location, public datepipe: DatePipe, private toastController: ToastController,
  ) { }
  ngOnInit() {
    this.getItem('')
  }
  private async generateItems() {
    let s = ''
    let company_id=this.api.getCompanyId()
    this.adjust.company_id=company_id
    this.adjust.page_number = this.pagination.page_number + 1
    console.log(this.page_number,'loksabha');    
    this.page_number++
    console.log(this.itemData, "pppaaginatin 1");
    if (this.pagination.next_page) {
      this.api.selectedItemList(s, this.adjust).subscribe(async (response: any) => {
        console.log('lkf211', response,'ll', );
        this.pagination= response.pagination_data

        if (response.status == 200) {
          let t = this.itemData
          this.itemData = []
          let p = t.concat(response.data)
          this.itemData = [...new Set(p)]
          console.log('runnnn', this.itemData);
          
        }
      });
    } else if (this.pagination.next_page == false) {
      const toast = await this.toastController.create({
        message: this.translate.instant('HEADER.NO DATA AVAILABLE'),
        duration: 800,
        position: 'middle'

      });
      toast.present();
    }
  }
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }
  getItem(m) {
    this.salesData=[]
    let companyId = this.api.getCompanyId();
    let header = this.api.getHeader();
    
    this.api.selectedItemList(m, { "company_id": companyId }).subscribe((response: any) => {
      this.itemData = response.data
      this.salesData = response.data
      this.pagination=response.pagination_data
      console.log("items", this.itemData);
      this.adjust.page_number = this.page_number
      sessionStorage.setItem('itemList', JSON.stringify(this.items));
    });
  }

  searchItem(ev) {
    let companyId = this.api.getCompanyId();
    this.api.selectedItemList(companyId, ev).subscribe((response: any) => {
      console.log(response, 'reespo');
    })
  }

  searchItems(ev) {
    const val = ev.target.value;
    console.log(val);
    // this.initializeItems();
    this.getItem(val)
  }
  async presentModal(item) {

    for (let hh of this.permission.roles.data.permissions) {
      console.log("asd");
      if (hh.page_name == 'inventory') {
        console.log("asd123", hh.actions.edit);
        if (hh.actions.edit) {      
        const modal = await this.modalCtrl1.create({
          component: ItemDetailsPage,
          cssClass: 'my-custom-class',
          componentProps: {
            data: item
          }
    
        });
        modal.onDidDismiss()
          .then((data) => {
            const user = data.data; // Here's your selected user!
            console.log("from address ", user)
            this.getItem('');
          });
        // console.log("selected item", this.item)
        return await modal.present();
    
      
        }
        else {
          let alert = await this.alertCtrl.create({
            header: this.translate.instant('MESSAGE.UNAUTHORIZED'),
            message: this.translate.instant('MESSAGE.YOU ARE NOT AUTHORIZED TO VISIT THAT PAGE'),
            buttons: ['OK']
          });
          alert.present();
          this.location.back();
        }
      }
    }
  }
  handleChange() {
    console.log('Selected value:', this.selectedValue);

    if (this.selectedValue === "add_stock") {
      console.log(this.finalstock, "add");

      this.finalstock =Number(this.adjust.opening_stock_report + this.adjustObject.added_qty)
      console.log(this.finalstock, "add1");

    } else if (this.selectedValue === "reduce_stock") {
      console.log(this.finalstock, "reduce");

      this.finalstock = Number(this.adjust.opening_stock_report - this.adjustObject.added_qty)
      console.log(this.finalstock, "reduce1");

    }
    else{
      this.finalstock = Number(this.adjust.opening_stock_report - this.adjustObject.added_qty)

    }

  }
  async setOpen(isOpen: boolean, itemDetail: any) {
    // this.isModalOpen = isOpen;
    // this.adjust = itemDetail
    // console.log(this.adjust);
    // this.p.modalCtrl1.open()
       this.superModal = await this.modalCtrl1.create({
      component: AdjustStockPage,
      cssClass: 'my-custom-class',
      componentProps: {
        adjust: itemDetail,
        m_data:this.superModal

      }

    });
    this.superModal.onDidDismiss()
      .then((data) => {
        const user = data.data; // Here's your selected user!
        console.log("from address ", user)
        this.getItem('');
      });
    return await this.superModal.present();

  }
 }
