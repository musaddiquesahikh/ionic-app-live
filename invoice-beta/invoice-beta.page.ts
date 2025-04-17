import { EWayPage } from './../e-way/e-way.page';
import { InvoiceSettingPage } from './../invoice-setting/invoice-setting.page';
import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSearchbar, ModalController, NavController, ToastController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import { Subscription } from 'rxjs';
// import { log } from 'console';
import * as html2pdf from 'html2pdf.js';
import { response } from 'express';
import { jsPDF } from 'jspdf';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { PartyDetailsPage } from '../party-details/party-details.page';
import { PartyListPage } from '../party-list/party-list.page';
import { ThermalprintPage } from '../thermalprint/thermalprint.page';
import { NetworkService } from '../network.service';
// import { Printer } from '@ionic-native/printer/ngx';
// import { SMSService } from '';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { url } from 'inspector';

@Component({
  selector: 'app-invoice-beta',
  templateUrl: './invoice-beta.page.html',
  styleUrls: ['./invoice-beta.page.scss'],
})

export class InvoiceBetaPage implements OnInit {

  @ViewChild('popover') popover;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild('segment') segment: any; company: any = {};
  @Input()

  invoice_type1: any
  exp1: any = []
  isOpen = false;
  toggleItem: boolean = true
  prefix: boolean
  invoiceID: any
  exp: any = []
  invoice_type = 1;
  poNo: boolean
  addF: boolean
  vehicleNo: boolean
  ewayNo: boolean
  subTotal: number
  total_amount: number
  received_amt: number
  discountTotal: number
  discount_type: "1"
  addCharge: boolean

  invoice_model: any = {
    // Igst: 0,
    // cgst: 0,
    // sgst: 0,
    invoice_no: "",
    invoice_date: "",
    payment_terms: 30,
    due_date: "",
    total_amount: 0,
    discount: 0,
    discountTotal: 0,
    discount_type: '1',
    received_amount: 0,
    receivable: 0,
    partial_paid: 0,
    party: 0,
    taxable_amount: 0,
    invoice_type: 1,
    payment_status: 1,
    company_name: 14,
    extra_fields: [],
    extra_charges_lst: [],
    inv_list: "",
    against_inv_no: null,
    against_inv: null,

    items: [{
      units: []
    }],
    place_of_supply: 1,

  }
  invData: any = []
  received_for: any
  payment: any = []
  payment_type: Number
  received_amount_by: "1"
  handover_to: any
  // invSett: any = []
  invSett: any = [{
    extra_fields: []
  }]
  dictionary: any = [{
    "type": "1",
    "header": this.translate.instant('HEADER.SALES INVOICE'),
    "label": this.translate.instant('HEADER.SALES INVOICE NO'),
    "sButton": this.translate.instant('HEADER.SAVE INVOICE'),
    "gButton": "Generate Bill"
  },
  {
    "type": "2",
    "header": this.translate.instant('HEADER.PURCHASE INVOICE'),
    "label": this.translate.instant('HEADER.PURCHASE INVOICE NO'),
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE INVOICE'),
    "gButton": "Generate Bill"

  },
  {
    "type": "3",
    "header": this.translate.instant('HEADER.RECORD SALES RETURN'),
    "label": "Credit Note No",
    "sButton": this.translate.instant('HEADER.SAVE SALES RETURN'),
    "gButton": "Save & New"
  },
  {
    "type": "4",
    "header": this.translate.instant('HEADER.RECORD PURCHASE RETURN'),
    "label": "Debit Note No",
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE RETURN'),
    "gButton": "Save & New"
  },
  {
    "type": "5",
    "header": this.translate.instant('HEADER.CREATE QUOTATION'),
    "label": this.translate.instant('HEADER.QUOTATION NO'),
    "sButton": this.translate.instant('HEADER.SAVE QUOTATION'),
    "gButton": "Save & New"
  },
  {
    "type": "6",
    "header": this.translate.instant('HEADER.CREATE DELIVERY CHALLAN'),
    "label": this.translate.instant('HEADER.CHALLAN NO'),
    "sButton": this.translate.instant('HEADER.SAVE CHALLAN'),
    "gButton": "Save & New"
  },
  {
    "type": "7",
    "header": this.translate.instant('HEADER.PROFORMA INVOICE'),
    "label": this.translate.instant('HEADER.INVOICE NO'),
    "sButton": this.translate.instant('HEADER.SAVE PROFORMA'),
    "gButton": "Save & New"
  },
  {
    "type": "10",
    "header": this.translate.instant('HEADER.PURCHASE ORDER'),
    "label": this.translate.instant('HEADER.PURCHASE ORDER NO'),
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE ORDER'),
    "gButton": "Save & New"
  },
  {
    "type": "11",
    "header": this.translate.instant('HEADER.SALE ORDER'),
    "label": this.translate.instant('HEADER.SALE ORDER NO'),
    "sButton": this.translate.instant('HEADER.SAVE SALE ORDER'),
    "gButton": "Save & New"
  }]
  showItemsPanel: Boolean = false
  providers: [DatePipe]
  items: any = []
  partyComponent: boolean = false;
  itemComponent: boolean = false;
  party_details: any = {};
  placeOf: any;
  total_taxable_amount: number;
  total_cess_rate: number;
  company_gst: any;
  totaltax: number;
  cgst: number = 0;
  sgst: number = 0;
  igst: number = 0;
  finalItem: any = [];
  submit: boolean;
  billId: any;
  downloadUrl: any;
  bank: any = [];
  finalAmount: number;
  noTax: Boolean = true;
  invoiceD: any;
  merchanTrans_id: any;
  payentStatusPOS: any = {};
  statusbutton: boolean = false;
  paymentDone: boolean = false;
  progressWheel: boolean = false;
  resendbutton: Boolean = false;
  itemEmitted: any;
  units: any;
  unit: any;
  u: any;
  toast: any;
  place: any;
  gst: boolean = false;
  place_of_supply: any;
  extraF: any = [];
  showInvoice: boolean;
  get: number;
  enableEInvoice: boolean;
  companyDetails: any;
  eInvoice: Boolean = false;
  warningParty: boolean;
  eWayBill: boolean = false;
  e = {};
  ewaybillDownload: boolean = false;
  vehicleDetails: boolean = false;
  vehicleSubmitted: any;
  sales_prices: number
  selectSegment = 'a';
  downloadEinvoiceButton: boolean = false;
  toggleitem: Boolean = true;
  partialPAid: number;
  receivable: number;
  charge: number;
  downloadEinvoicePDF1: string;
  downloadEwaybill: string;
  round_off: boolean = false;
  gstData: any = [];
  name: any = [];
  p: any;
  multiple: any = [{
    from_rate: 0,
    to_rate: 0,
    tax: ""
  }]
  container: Element
  private navigationEndSubscription: Subscription;
  on_tour: boolean = true
  einvoiceErrorInfo: any;
  einvoiceErrorInfoShow: boolean;
  enableEwayBill: boolean;
  ePost: any;
  inv_list: [];
  invoice_type1111: any;
  against_inv_no: any = []
  against_inv: any = []
  part: any = [];
  item: any;
  isItemAvailable: boolean;
  t: any;
  show1: boolean = false
  arry1: any = [];
  newData: any;
  showBankLedger: boolean = false;
  showCashLedger: boolean = true;
  bankData: any = [];
  cashLedgers: any = [];
  description_allow: Boolean = false;
  partyId: any;
  ledger_name: any;
  isModalOpen: Boolean = false;
  expandParty: boolean = false;
  expandInvoice: Boolean = false;
  partA: any = "custom-input1"
  partB: any = "custom-input2"
  contentToPrint: string = "Hello, Thermal Printer!";
  thermalPrintShow: boolean = false;
  invoice_details: { invoice: any; item: any; party: any; };
  @Input() dataitem

  user = {
    optionss: [],
    group: '',
    item_type: 1,
    item_name: "",
    category: "",
    item_code: "",
    item_description: null,
    unit: 45,
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
    square_calculation: false
  }
  reset: {
    Igst: number;
    cgst: number;
    sgst: number;
    discountTotal: number;
    received_amount: number;
    payment_terms: number;
    invoice_date: string;
    due_date: string;
    invoice_no: string;
    party: number;
    company_name: number;
    invoice_type: number;
    payment_status: number;
    taxable_amount: number;
    partial_paid: number;
    bank1: any; items: {
      items: number;
      quantity: number;
      discount: number;
      rate: number;
      total_amount: number;
      tax_percent: number;
      tax_amount: number;
      cess: number;
      tax_rate_id: any;
    }[];
    total_amount: number;
    discount: number;
  }

  otherUnit: boolean = false;
  Unit: any = []
  conversionRate: boolean = false
  x: any = {}
  companyId: any;
  isToastOpen = false;
  private pdf: PDFDocumentProxy;
  showUrl: boolean;
  currentCompany: any;
  create_charge: any = []
  cess: number;
  sTotal: number;
  mydate = new Date();
  currentBank: any;
  filteredItems: any=[];

  constructor(private cdr: ChangeDetectorRef, public api: ApiService, public datepipe: DatePipe, public toastController: ToastController, public router: Router,
    public modal: ModalController, private translate: TranslateService, private permission: PermissionGuard, private alertCtrl: AlertController,
    public location: Location, private navCtrl: NavController, public modalCtrl: ModalController, private NetworkService: NetworkService, private datePipe: DatePipe
  ) { }

  ngOnInit() {
    console.log(this.permission,'loog');
    this.showPartyData()
    this.getItemCode();
    this.getUnit()
    this.getCashLedgers();
    this.getNotes();
    let t = JSON.parse(localStorage.getItem('invoice'))
    setTimeout(() => {
      if (t) {
        // this.introMethod();
      }
    }, 900);
    this.getGSTrate()
    console.log(JSON.parse(sessionStorage.getItem("currentCompany")), "compp")
    this.invoice_head()
    this.totaltax = 0
    this.igst = 0
    this.cess = 0
    this.subTotal = 0
    this.receivable = 0
    this.sTotal = 0
    this.partialPAid = 0;
    this.addCharge = false
    this.poNo = false
    this.ewayNo = false
    this.vehicleNo = false
    this.addF = false
    this.prefix = false
    this.invoice_model.received_amt = 0;
    this.total_amount = 0
    this.subTotal = 0;
    this.receivable = 0;
    this.invoice_model.discountTotal = 0
    this.invoice_model.extraCharged = 0;
    this.charge = 0
    this.invoice_model.received_amount_by = "1"
    this.invoice_model.rchrg = false;
    this.user.sales_prices = 0
    this.supply()
    console.log(this.companyDetails, "p");
    this.invoice_model.round_off = false
    this.companyDetails = JSON.parse(sessionStorage.getItem('currentCompany'));
    let companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"))
    if (companyDetails[0].einvoice_service == true) {
      console.log(this.eInvoice, "ee", companyDetails[0].einvoice_service);
    }
    if (this.companyDetails[0].ewb_service == true) {
      this.enableEwayBill = true;
    }
    if (this.companyDetails[0].einvoice_service == true) {
      this.enableEInvoice = true;
    }
    else {
      this.enableEInvoice = false;
    }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  getNotes() {
    this.api.post3('get_invoice_settings/', { "company": this.api.getCompanyId(), "type": 1 }).subscribe((res: any) => {
      console.log(res.custom_text_for_barcode, "company data", res);
      if (res.has_fixed_terms_and_conditions) {
        this.invoice_model.notes = res.terms_and_conditions;
      }
      this.invoice_model.enable_value_addition = res.enable_value_addition
      this.invoice_model.show_discount_rs = res.show_discount_rs
      this.invoice_model.show_value_add_rs = res.show_value_add_rs
      this.invoice_model.has_free_qty = res.has_free_qty
    })
  }

  modalOpenEdit() {
    this.isModalOpen = true;
  }
  mocalClose() {
    this.isModalOpen = false;
  }
  expandPartyDetails() {
    this.expandParty = true;
  }
  shrinkPartyDetails() {
    this.expandParty = false;
  }
  expandInvoiceDetails() {
    this.expandInvoice = true;
  }
  shrinkInvoiceDetails() {
    this.expandInvoice = false;
  }

  thurmalprint() {
    console.log(this.downloadUrl, 'URL');
  }
  ngOnDestroy() {
    if (this.navigationEndSubscription) {
      this.navigationEndSubscription.unsubscribe();
    }
  }

  invoice_head() {
    console.log("call function");
    this.invoice_type = this.invoice_type1
    console.log(this.invoice_type, "prajakta");
    let companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"))
    if (companyDetails[0].einvoice_service == true) {
      this.enableEInvoice = true;
    }
    this.companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"));
    if (this.companyDetails[0].einvoice_service == true) {
      this.enableEInvoice = true;
    }
    this.company_gst = this.companyDetails[0].gst_number
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader()
    this.invoice_model.invoice_type = this.invoice_type
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 2 || this.invoice_type == 5 || this.invoice_type == 6) {
      this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
        console.log(response, "prefix");

        if (response.status != 500) {
          if (this.invoice_type == 1) {
            this.invoice_model.invoice_no = response.invoice_settings.prefix + response.sales_invoice_no + response.invoice_settings.suffix;
          }

          if (this.invoice_type == 3) {
            this.invoice_model.invoice_no = response.sales_return_no;
          }

          if (this.invoice_type == 5) {
            this.invoice_model.invoice_no = response.quotation_no;
          }

          if (this.invoice_type == 2) {
            this.invoice_model.invoice_no = response.purchase_inv_no;
          }

          if (this.invoice_type == 6) {
            this.invoice_model.invoice_no = response.challan_no;
          }

        }

      })
    }
    // if (this.invoice_type == 3) {
    //   console.log(this.invoice_type, 'first if');

    //   this.api.post3('invoice_prefix/', { company: this.currentCompany.id }).subscribe((response: any) => {
    //     this.invoice_model.invoice_no = response.invoice_settings.prefix + response.sales_return_no;
    //     this.setInvoiceNumber();
    //   })
    // }

    let company = this.api.getCompanyId()
    let a = this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 4 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11;
    if (this.invoice_type == 1) {
      this.api.post3('get_invoice_settings/', { "company": company, "type": Number(a) }).subscribe((response: any) => {
        this.invSett = response
        this.invSett.extra_fields = JSON.parse(response.extra_fields)

        console.log(response, 'setting');
        if (this.invoice_type == 1) {
          this.api.post3('invoice_prefix/', { company }).subscribe((response: any) => {
            console.log(response, 'invoice no.');
            this.invoice_model.invoice_no = response.invoice_settings.prefix + response.sales_invoice_no + response.invoice_settings.suffix;
            this.setInvoiceNumber();
          })
        }
      })
    }
    this.api.bankList(companyId, header).subscribe((response: any) => {
      if (response.status != 500) {
        this.bankData = response
        console.log(this.bankData, 'banklist');
      }
    });
    let term = this.invoice_type;
    this.dictionary = this.dictionary.filter((dictionary) => {
      return dictionary.type.indexOf(term) > -1;
    });
    let today_date = Date.now();
    this.invoice_model.invoice_date = today_date
    this.dateChange()
  }
 
  invoiceSFunction(sett: any) {
    console.log('musaddik');
    this.invSett = sett
    this.invoice_head()
  }

  getInvoiceSetting() {
    let company = this.api.getCompanyId()
    this.api.post3('get_invoice_settings/', { "company": company, "type": Number(this.invoice_type) }).subscribe((response: any) => {

    })
  }
  dateChange() {
    this.invoice_model.invoice_date = this.datepipe.transform(this.invoice_model.invoice_date, 'yyyy-MM-dd')
    var nextDay = new Date(this.datepipe.transform(this.invoice_model.invoice_date, 'yyyy-MM-dd'));
    nextDay.setDate(nextDay.getDate() + Number(this.invoice_model.payment_terms));
    this.invoice_model.due_date = this.datepipe.transform(nextDay, 'yyyy-MM-dd')
    this.setInvoiceNumber();
  }

  showPartyData() {
    this.partyComponent = true;
    if (this.partyComponent) {
      this.gst = true
    }
    else {
      this.gst = false
    }
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  function_partylist(partyData) {
    this.item = partyData;
    this.parentFunction.emit(this.item);
    this.modal.dismiss();
  }
  showItemData() {
    this.itemComponent = true;
  }

  dismiss(index) {
    this.items.splice(index, 1);
    this.calculation()
  }
  async partyFunction(party: any) {
    this.part = party
    this.getInvoiceList(this.part.id)
    console.log(this.part.id, "lklklk");
    console.log(party, "party");
    let p = JSON.parse(localStorage.getItem('inv_item'))
    if (p) {
      localStorage.setItem('invoice', 'false')
      setTimeout(() => {
        this.introMethod1();
      }, 900);
    }
    console.log(this.enableEInvoice,);

    if (party.c_party == false) {
      console.log("hide party");
      this.partyComponent = false;
    }
    this.party_details = party
    if (this.party_details.gstin == null) {
      this.placeOf = this.party_details.gst_compare
      this.placeOf = this.placeOf.slice(0, 2)
      console.log(this.enableEInvoice,);
      if (this.enableEInvoice == true) {
      }
    } else {
      this.placeOf = this.party_details.gstin.slice(0, 2)
    }
    this.partyComponent = false
    this.showItemsPanel = true

    this.submit = true
    this.placeOf = this.party_details.gst_compare
    this.invoice_model.place_of_supply = Number(this.placeOf)
    if (this.invoice_model.place_of_supply < 10) {
      this.placeOf = "0" + this.invoice_model.place_of_supply.toString()
      console.log(this.placeOf, "ppppppp");
    }
    else {
      this.placeOf = this.invoice_model.place_of_supply.toString()
    }
    console.log(this.invoice_model.place_of_supply, "ppppppp");
    if (this.party_details.gstin != null) {
      console.log(this.eInvoice, "eInvoice");
      let f = JSON.parse(sessionStorage.getItem("currentCompany"))
      console.log(f);
      if (f[0].einvoice_service == true) {
        if (this.eInvoice == false) {
          console.log(this.eInvoice, "eInvoice");
        }
      }
    }
    else {
      if (this.enableEInvoice == true) {
        if (this.invoice_type == 1) {
          const toast = await this.toastController.create({
            message: party.Party_name + " " + this.translate.instant("MESSAGE.DOES NOT HAVE GSTIN"),
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.eInvoice = false
        }
      }
    }
    this.calculation();
    this.calculateTax();
    this.calculateGst();
  }

  parentFunction1(data1: any) {
    console.log('parentfunction1', data1);
    
    for (let r of data1) {
      r.discount_in_rs = 0
      r.discount_value_add = 0
    }

    console.log(data1, typeof (data1), 'from parent');
    let data = Object.assign([], data1)
    for (let m of data) {
      m.length_c = 1
      m.breadth = 1
    }
    if (this.toggleItem) {
      let index = this.items.findIndex((item: any) => data.some((d: any) => d.id === item.id));
      const indices: number[] = this.items.reduce((acc: number[], item: any, index: number) => {
        if (data.some((d: any) => d.id === item.id)) {
          acc.push(index);
        }
        return acc;
      }, []);
      console.log('show quantity', indices);
      if (indices.length !== 0) {
        for (let pt of indices) {
          if (pt > -1) {
            if (this.items[pt].item_type === 1) {
              this.items[pt].quantity = this.items[pt].quantity + 1;
            }
          }
        }
      }
      const unmatchedData = data.filter((d: any) => !this.items.some((item: any) => item.id === d.id));
      this.items = this.items.concat(unmatchedData);
    } else {
      this.items = this.items.concat(data);
    }
    data.x_idfor = data.tax_rate_id
    if (data.c_party == undefined) {
      if (data.discount == null) {
        data.discount = 0;
      }

      if (data.c_party == false) {
        console.log("hide party");
        this.itemComponent = false;
      }
      console.log(this.items)
      this.itemComponent = false
    }
    this.itemEmitted = data
    console.log(this.itemEmitted, 'emitted items');

    for (let t of this.items) {
      if (this.invoice_model.enable_value_addition) {
        t.value_addition = 0
      } else {
        t.value_addition = null
        t.discount=0
      }
      if(this.invoice_model.has_free_qty){
        t.free_qty=0
      }else{
        t.free_qty=0
      }
      if (t.item_type == 1) {

        console.log(t.units, "units");
        if (t.units.length > 0) {
          console.log('inside if');
          let i = 0
          this.unit = this.items[i].units
          for (let s of t.units) {
            t.units[i].unit = t.units[i].unit.slice(0, 3)
            t.abc = t.units[0]
            if(this.invoice_model.has_free_qty){
              t.free_unit=t.units[0]
            }else{
              t.free_unit={ id: null, type: null, unit: null }
          }
            i++;
            console.log(s.type);
          }
        }
        else {
          t.abc = { id: null, type: null, unit: null }
          t.free_unit={ id: null, type: null, unit: null }
          console.log('inside else');
        }
      }
      else {
        t.abc = { id: null, type: null, unit: null }
        t.free_unit={ id: null, type: null, unit: null }
      }
    }
    this.subTotal = this.total();
    this.total_taxable_amount = this.total_taxable();
    this.calculateTax()
    this.calculation();
    let s = JSON.parse(localStorage.getItem('save'))
    if (s) {
      localStorage.setItem("inv_item", "false");
      this.introMethod2();
    }
    console.log(this.itemEmitted, 'after emit');
    let index = this.itemEmitted.findIndex((item) => item)
    console.log(index, this.items.length, 'index of emitted');
    if (this.itemEmitted[0].multiple_rates) {
      this.selectgstrate(this.itemEmitted[0], this.items.length - 1)
    }
  }

  unitChange(unit: any, i: any) {
    console.log(unit.type, "praj");
    if (unit.type == 1) {
      this.items[i].oldRate = this.items[i].rate;
      this.items[i].oldPurchaseRate = this.items[i].purchase_rate;
      this.items[i].rate = this.items[i].conversion_rate_sales;
      this.items[i].purchase_rate = this.items[i].conversion_rate_purchase;
    } else {
      this.items[i].rate = this.items[i].oldRate;
      this.items[i].purchase_rate = this.items[i].oldPurchaseRate;
    }
    this.calculation();
  }
  // calculation() {
  //   let index = 0;
  //   for (let i of this.items) {
  //     if (i.Gst_tax_rate == -1) {
  //       if (!this.items[index].enable_value_addition) {
  //         this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))
  //       } else {
  //         this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))
  //       }

  //       this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100

  //       if (!this.items[index].enable_value_addition) {
  //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))
  //       } else {
  //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))
  //       }

  //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100

  //     } else {

  //       if (!this.items[index].cess_on_mrp) {
  //         if (!this.invoice_model.enable_value_addition) {
  //           this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //         } else {
  //           this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //         }
  //         this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
  //         if (this.invoice_model.dual_currency) {
  //           this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
  //         }
  //         if (!this.invoice_model.enable_value_addition) {
  //           this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //         } else {
  //           this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //         }
  //         this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
  //        }

  //        if (!this.invoice_model.enable_value_addition) {
  //         this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

  //       }else{
  //         this.items[index].sales_prices = (i.quantity * i.rate)+(i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate)+(i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //       }

  //       this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
  //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
  //     }
  //       this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))

  //     if (i.Gst_tax_rate == -1) {
  //       this.items[index].sales_tax = 0
  //       this.items[index].purchase_tax = 0
  //     } else {

  //       if (!this.items[index].cess_on_mrp) {
  //         if (!this.invoice_model.enable_value_addition) {
  //           this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
  //           this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //           this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
  //           this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

  //         } else {
  //           this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate)))))
  //           this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)+ (i.value_addition / 100 * (i.quantity * i.purchase_rate)))))         
  //           this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate))))
  //           this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) +(i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //         }

  //       } else {
  //           this.items[index].cess = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
  //          this.items[index].cessp = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
  //         if (!this.invoice_model.enable_value_addition) {
  //           this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
  //           this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

  //         }else{
  //           this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))+(i.value_addition / 100 * (i.quantity * i.rate))))
  //           this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))+(i.value_addition / 100 * (i.quantity * i.rate))))

  //         }
  //       }

  //       // this.items[index].sales_tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
  //       // this.items[index].purchase_tax = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     }
  //       this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     index++
  //   }
  //   this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100
  //   if (this.invoice_model.discount_type === '1') {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   } else if (this.invoice_model.discount_type === '2') {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
  //   }
  //   // if (this.round_off) {
  //   //   this.subTotal = Math.round((this.subTotal))
  //   // }
  //   // else {
  //   // //this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   // }


  //   this.invoice_model.extraCharged = Number(this.charge)
  //   if (this.round_off) {
  //     this.subTotal = Math.round(((this.subTotal + Number(this.invoice_model.extraCharged))))

  //   } else {
  //     this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   }

  //   this.totaltax = Math.round((this.calculateTax() + Number.EPSILON) * 100) / 100
  //   this.calculateGst()
  //   this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
  //   console.log(this.items, "after calculationreceivable");
  //   this.total_cess()
  // }
  calculation() {
    let index = 0;
    for (let i of this.items) {

      if (i.Gst_tax_rate == -1 || this.invoice_model.select_Tax == '2') {
        if (!this.items[index].enable_value_addition) {
          this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))
          this.discountcala()
        } else {
          this.discountcala()
          this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))
        }
        this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
        if (this.invoice_model.dual_currency) {
          this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
        }
        if (!this.items[index].enable_value_addition) {
          this.discountcala()
          this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))
        } else {
          this.discountcala()
          this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))
        }
        this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
      }

      else {
        if (!this.items[index].cess_on_mrp) {
          if (!this.invoice_model.enable_value_addition) {
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
          } else {
            this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
            this.discountcala()
            console.log('working 1');
          }
          this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
          if (this.invoice_model.dual_currency) {
            this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
          }
          if (!this.invoice_model.enable_value_addition) {
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            this.discountcala()
          } else {
            this.discountcala()
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate)  + (i.value_addition / 100 * (i.quantity * i.purchase_rate))- (i.discount / 100 * (i.quantity * i.purchase_rate))))
            console.log('working 2');
          }
          this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
         }else {
          if (!this.invoice_model.enable_value_addition) {
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

          }else{
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate)+(i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate)  + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate)+(i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate)  + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            console.log('working 3');
          }
          this.items[index].sales_prices = this.items[index].sales_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))
          this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
          if (this.invoice_model.dual_currency) {
            this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
          }
          this.items[index].purchase_prices = this.items[index].purchase_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))
          this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
        }
      }

      if (i.Gst_tax_rate == -1 || this.invoice_model.select_Tax == '2') {
        this.items[index].tax = 0
        this.items[index].taxp = 0
        this.items[index].cess = 0
        this.items[index].cessp = 0
      } else {
        if (!this.items[index].cess_on_mrp) {
          if (!this.invoice_model.enable_value_addition) {
            this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
          this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
          this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

          } else {
            this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate)))))
            this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)+ (i.value_addition / 100 * (i.quantity * i.purchase_rate)))))         
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) +(i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            console.log('working 4');
          }

        } else {
          this.items[index].cess = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
          this.items[index].cessp = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
          if (!this.invoice_model.enable_value_addition) {
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

          }else{
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))+(i.value_addition / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))+(i.value_addition / 100 * (i.quantity * i.purchase_rate))))
            console.log('working 5');
          }
        }
      }
      index++
    }
    this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100

    if (this.invoice_model.discount_type === '1') {
      this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
    } else if (this.invoice_model.discount_type === '2') {
      this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
    }
    this.invoice_model.extraCharged = Number(this.charge)
    if (this.round_off) {
      this.subTotal = Math.round(((this.subTotal + Number(this.invoice_model.extraCharged))))
    } else {
      this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    }
    this.totaltax = Math.round((this.calculateTax() + Number.EPSILON) * 100) / 100
    this.calculateGst()
    this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
    this.total_cess()
    console.log(this.items,'after calc');

    // console.log(this.name, this.invoice_model.select_Tax, 'for cala');

    // let index = 0;
    // for (let i of this.items) {

    //   if (i.Gst_tax_rate == -1 || this.invoice_model.select_Tax == '2') {
    //     if (!this.items[index].enable_value_addition) {
    //       this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))
    //       // if (this.invoice_model.show_discount_rs) {
    //       //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].rate)
    //       // }
    //       this.discountcala()
    //     } else {
    //       // if (this.invoice_model.show_value_add_rs) {
    //       //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].rate)
    //       // }
    //       this.discountcala()
    //       this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))
    //     }
    //     // this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))
    //     this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
    //     if (this.invoice_model.dual_currency) {
    //       this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
    //     }
    //     if (!this.items[index].enable_value_addition) {
    //       // if (this.invoice_model.show_discount_rs) {
    //       //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].purchase_rate)
    //       // }
    //       this.discountcala()
    //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))
    //     } else {
    //       // if (this.invoice_model.show_value_add_rs) {
    //       //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].purchase_rate)
    //       // }
    //       this.discountcala()
    //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))
    //     }

    //     this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
    //   }
    //   else {
    //     if (!this.items[index].cess_on_mrp) {
    //       if (!this.invoice_model.enable_value_addition) {
    //         // if (this.invoice_model.show_discount_rs) {
    //         //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].rate)
    //         // }
    //         this.discountcala()
    //         this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
    //       } else {
    //         this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
    //         // if (this.invoice_model.show_value_add_rs) {
    //         //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].rate)
    //         // }
    //         this.discountcala()
    //       }
    //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
    //       if (this.invoice_model.dual_currency) {

    //         this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
    //       }
    //       if (!this.invoice_model.enable_value_addition) {
    //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
    //         // if (this.invoice_model.show_discount_rs) {
    //         //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].purchase_rate)
    //         // }
    //         this.discountcala()
    //       } else {
    //         // if (this.invoice_model.show_value_add_rs) {
    //         //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].purchase_rate)
    //         // }
    //         this.discountcala()
    //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       }
    //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
    //     } else {
    //       if (!this.invoice_model.enable_value_addition) {
    //         // if (this.invoice_model.show_discount_rs) {
    //         //   if (this.invoice_type1111 === "1" || this.invoice_type1111 === "3" || this.invoice_type1111 === "5" || this.invoice_type1111 === "6" || this.invoice_type1111 === '7') {
    //         //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].rate)
    //         //   }else{
    //         //   this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].purchase_rate)

    //         //   }
    //         // }
    //         this.discountcala()
    //         this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       } else {
    //         // if (this.invoice_model.show_value_add_rs) {
    //         //   if (this.invoice_type1111 === "1" || this.invoice_type1111 === "3" || this.invoice_type1111 === "5" || this.invoice_type1111 === "6" || this.invoice_type1111 === '7') {
    //         //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].rate)
    //         //   }else{
    //         //   this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].purchase_rate)

    //         //   }
    //         // }
    //         this.discountcala()
    //         this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       }


    //       this.items[index].sales_prices = this.items[index].sales_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))

    //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
    //       if (this.invoice_model.dual_currency) {
    //         this.items[index].dual_Price = Number(this.items[index].sales_prices / this.invoice_model.currency_conversion).toFixed(2)
    //       }
    //       this.items[index].purchase_prices = this.items[index].purchase_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))
    //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
    //     }
    //   }
    //   if (i.Gst_tax_rate == -1 || this.invoice_model.select_Tax == '2') {
    //     this.items[index].tax = 0
    //     this.items[index].taxp = 0
    //     this.items[index].cess = 0
    //     this.items[index].cessp = 0
    //   } else {
    //     if (!this.items[index].cess_on_mrp) {
    //       if (!this.invoice_model.enable_value_addition) {
    //         this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
    //         this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //         this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       } else {
    //         this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)))))
    //         this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
    //         this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       }

    //     } else {
    //       this.items[index].cess = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
    //       this.items[index].cessp = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
    //       if (!this.invoice_model.enable_value_addition) {
    //         this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       } else {
    //         this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate))))
    //         this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

    //       }
    //     }
    //   }
    //   index++
    // }
    // console.log(this.items, 'output');

    // this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100
    // if (this.invoice_model.discount_type === '1') {
    //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
    // } else if (this.invoice_model.discount_type === '2') {
    //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
    // }
    // this.invoice_model.extraCharged = Number(this.charge)
    // if (this.invoice_model.round_off) {
    //   this.subTotal = Math.round(((this.subTotal + Number(this.invoice_model.extraCharged))))
    // } else {
    //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    // }
    // console.log('extracharged', this.subTotal, this.invoice_model.extraCharged);
    // this.totaltax = Math.round((this.calculateTax() + Number.EPSILON) * 100) / 100
    // this.calculateGst()
    // console.log('sub', this.items);
    // this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
    // this.total_cess()
  }

  revCal() {
    let index = 0;
    for (let i of this.items) {
      if (i.Gst_tax_rate == -1) {
        i.rate = this.items[index].sales_prices / (i.quantity * (1 - (i.discount / 100) + ((0 + i.cess_tax_rate) / 100 - (i.discount / 100) * ((0 + i.cess_tax_rate) / 100))))
        i.rate = Math.round((i.rate + Number.EPSILON) * 100) / 100
        i.purchase_rate = this.items[index].purchase_prices / (i.quantity * (1 - (i.discount / 100) + ((0 + i.cess_tax_rate) / 100 - (i.discount / 100) * ((0 + i.cess_tax_rate) / 100))))
        i.purchase_rate = Math.round(i.purchase_rate)
      } else {
        i.rate = this.items[index].sales_prices / (i.quantity * (1 - (i.discount / 100) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 - (i.discount / 100) * ((i.Gst_tax_rate + i.cess_tax_rate) / 100))))
        i.rate = Math.round((i.rate + Number.EPSILON) * 100) / 100
        i.purchase_rate = this.items[index].purchase_prices / (i.quantity * (1 - (i.discount / 100) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 - (i.discount / 100) * ((i.Gst_tax_rate + i.cess_tax_rate) / 100))))
        i.purchase_rate = Math.round(i.purchase_rate)
      }
      this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
      if (i.Gst_tax_rate == -1) {
        this.items[index].tax = 0
        this.items[index].taxp = 0
      } else {
        this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
        this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
      }
      this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
      console.log(i.rate, 'reverse cal');

      index++
    }
    this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100
    // this.total_amount = Math.round(this.total() - ((this.invoice_model.discountTotal * this.total()) / 100) + Number.EPSILON)

    // if (this.round_off) {
    //   this.subTotal = Math.round((this.subTotal))
    // }
    // else {
    //   // this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
    //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    // }

    if (this.invoice_model.discount_type === '1') {
      this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
    } else if (this.invoice_model.discount_type === '2') {
      this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
    }
    this.invoice_model.extraCharged = Number(this.charge)
    if (this.round_off) {
      this.subTotal = Math.round(((this.subTotal + Number(this.invoice_model.extraCharged))))

    } else {
      this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    }

    this.totaltax = Math.round((this.calculateTax() + Number.EPSILON) * 100) / 100
    this.calculateGst()
    this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
    console.log(this.invoice_model.received_amount, "receivable");
    this.total_cess()

  }
  discountcala() {
    let index = 0;
    for (let i of this.items) {
      if (!this.invoice_model.enable_value_addition) {
        if (this.invoice_model.show_discount_rs) {
          if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
            this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].rate)
          } else {
            this.items[index].discount_in_rs = (this.items[index].discount / 100) * (this.items[index].quantity * this.items[index].purchase_rate)

          }
        }
      } else {
        if (this.invoice_model.show_value_add_rs) {
          if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
            this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].rate)
          } else {
            this.items[index].discount_value_add = (this.items[index].value_addition / 100) * (this.items[index].quantity * this.items[index].purchase_rate)

          }
        }
      }
      index++
    }
  }

  roundOff() {
    this.round_off = !this.round_off
    console.log(this.round_off, 'roundoff check');

    this.calculation()
  }

  total_taxable() {
    let ff = 0;
    let tt = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
      this.items.forEach(function (value) {
        ff = ((((value.rate * value.quantity) + (value.value_addition / 100 * (value.quantity * value.rate)) - (value.discount / 100 * (value.quantity * value.rate))) + ff));
      });
    }
    else {
      this.items.forEach(function (value) {
        ff = ((((Number(value.purchase_rate) * value.quantity) + (value.value_addition / 100 * (value.quantity * value.purchase_rate)) - (value.discount / 100 * (value.quantity * Number(value.purchase_rate)))) + ff));
      });
    }
    this.total_taxable_amount = ff;
    return ff;
  }
  total() {
    let ff = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
      this.items.forEach(function (value) {
        ff = (value.sales_prices) + ff;

      });
    }
    else {
      this.items.forEach(function (value) {
        ff = (value.purchase_prices) + ff;
      });
    }
    this.subTotal = ff;

    return ff;
  }

  total_cess() {
    let ff = 0;

    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
      this.items.forEach(function (value) {
        ff = (value.cess_tax + ff);
      });
    }
    else {
      this.items.forEach(function (value) {
        ff = (value.cessp + ff);
      });
    }
    this.total_cess_rate = ff
    return ff;
  }

  calculateGst() {
    console.log("company gst", this.company_gst);

    if (this.company_gst == null) {
      this.noTax = false
    } else if (this.company_gst == "") {
      this.noTax = false
    }
    if (this.company_gst) {
      this.company_gst = this.company_gst.slice(0, 2)
      this.noTax = true
    }
    console.log("party gst", this.placeOf);
    if (this.placeOf == this.company_gst) {
      if (this.company_gst !== null) {
        this.cgst = this.totaltax / 2
        this.sgst = this.totaltax / 2
        this.igst = 0
      } else {
        this.cgst = 0
        this.sgst = 0
        this.igst = 0
      }
    }
    if (this.placeOf !== this.company_gst) {
      console.log(this.placeOf, "not equal");
      if (this.company_gst !== null) {
        this.igst = this.totaltax
        this.cgst = 0
        this.sgst = 0
      }
      else {
        this.cgst = 0
        this.sgst = 0
        this.igst = 0
      }
    }
  }
  
  calculateTax() {
    let ff = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
      this.items.forEach(function (value) {
        ff = value.tax + ff;
      });
    }
    else {
      this.items.forEach(function (value) {
        ff = value.taxp + ff;
      });
    }
    this.totaltax = ff;
    return ff;

  }
  putinarray() {

    for (let i of this.items) {
      console.log("mmmmaaaaa", this.items);
      if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
        if (i.Gst_tax_rate == -1) {
          console.log("put if running", this.items);
          this.finalItem.push({
            unit: i.units.id,
            unit_type: i.abc.type,
            description: i.item_description,
            items: i.id,
            quantity: i.quantity,
            discount: Number(i.discount),
            rate: Number(i.rate),
            total_amount: i.sales_prices,
            tax_percent: i.Gst_tax_rate,
            tax_amount: Number((i.tax).toFixed(2)),
            cess: i.cess_tax_rate,
            cess_amount: i.cess,
            tax_rate_id: i.tax_rate_id,
            cess_rate_id: i.cess_tax_rate_id,
            value_addition: i.value_addition,
            item_name: i.item_name,
            discount_in_rs: i.discount_in_rs,
            discount_value_add: i.discount_value_add,
            hsn_code: i.hsn_code,
            free_unit: i.free_unit.type,
            free_qty: i.free_qty,
            lxb: { length_c: Number(i.length_c), breadth: Number(i.breadth) }
          });
        }
        else {
          console.log("put else running");

          this.finalItem.push({
            unit: i.abc.id,
            unit_type: i.abc.type,
            description: i.item_description,
            items: i.id,
            quantity: i.quantity,
            discount: Number(i.discount),
            rate: Number(i.rate),
            total_amount: i.sales_prices,
            tax_percent: i.Gst_tax_rate,
            tax_amount: Number((i.tax).toFixed(2)),
            cess: i.cess_tax_rate,
            cess_amount: i.cess,
            tax_rate_id: i.tax_rate_id,
            cess_rate_id: i.cess_tax_rate_id,
            value_addition: i.value_addition,
            item_name: i.item_name,
            discount_in_rs: i.discount_in_rs,
            discount_value_add: i.discount_value_add,
            hsn_code: i.hsn_code,
            free_unit: i.free_unit.type,
            free_qty: i.free_qty,
            lxb: { length_c: Number(i.length_c), breadth: Number(i.breadth) }
          });

        }
      }
      else {
        this.finalItem.push({
          unit: i.abc.id,
          unit_type: i.abc.type,
          description: i.item_description,
          items: i.id,
          quantity: i.quantity,
          discount: Number(i.discount),
          rate: Number(i.purchase_rate),
          total_amount: i.purchase_prices,
          tax_percent: i.Gst_tax_rate,
          tax_amount: Number((i.taxp).toFixed(2)),
          cess: i.cess_tax_rate,
          tax_rate_id: i.tax_rate_id,
          cess_amount: i.cessp,
          cess_tax_rate_id: i.cess_tax_rate_id,
          value_addition: i.value_addition,
          item_name: i.item_name,
          discount_in_rs: i.discount_in_rs,
          discount_value_add: i.discount_value_add,
          hsn_code: i.hsn_code,
          free_unit: i.free_unit.type,
          free_qty: i.free_qty,
          lxb: { length_c: Number(i.length_c), breadth: Number(i.breadth) }
        });
      }
    }
    return this.finalItem
  }
  dataReset() {
    this.invoice_model = {
      "Igst": 0,
      "cgst": 0,
      "sgst": 0,
      "discountTotal": 0,
      "discount_type": '1',
      "extraCharged": 0,
      "received_amount": 0,
      "payment_terms": 0,
      "invoice_date": "",
      "due_date": "",
      "invoice_no": "",
      "party": 0,
      "company_name": 0,
      "invoice_type": 0,
      "payment_status": 0,
      "taxable_amount": 0,
      "partial_paid": 0,
      "bank": null,
      "items": [
        {
          "items": 0,
          "quantity": 0,
          "discount": 0,
          "rate": 0,
          "total_amount": 0,
          "tax_percent": 0,
          "tax_amount": 0,
          "cess": 0,
          "tax_rate_id": null
        },
        {
          "items": 0,
          "quantity": 0,
          "discount": 0,
          "rate": 0,
          "total_amount": 0,
          "tax_percent": 0,
          "tax_amount": 0,
          "cess": 0,
          "tax_rate_id": null
        }
      ],
      "total_amount": 0,
      "discount": 0
    }
  }
  newInvoice() {
    modalController.dismiss()
    this.showUrl = true
    this.items = []
    this.igst = 0
    this.cgst = 0
    this.sgst = 0
    this.total_taxable_amount = 0
    this.total_cess_rate = 0
    this.subTotal = 0
    this.create_charge = []
    this.invoice_model.extraCharged = 0
    this.charge = 0
    this.receivable = 0
    this.invoice_model.received_amount_by=1
    this.eInvoice = false
    this.dataReset()
    this.invoice_head()
    this.finalItem = []
    this.part = []
    this.invoice_model.payment_terms = 30
    this.invoice_model.invoice_date = this.mydate
    this.dateChange();
    this.downloadUrl = false
    this.description_allow = false
    this.invoice_model.select_Tax = '1'
    this.invoice_model.round_off = false;

    console.log(this.invoice_model, this.subTotal, this.receivable, 'after new')
  }

  editInvoiceNo() {
    console.log("edit");
    this.dateChange()

  }
  sendSMS() {
    let header = this.api.getHeader();
    this.api.sendRemainder(this.invoiceID, header).subscribe((response: any) => {
      console.log(response, "pos data response");
    })
  }
  presentPopover(e: Event) {
    if (!this.invoice_model.items.length) {
      this.isOpen = false;
    } else {
      this.popover.event = e;
      this.isOpen = true;
    }


  }
  async saveInvoice(invoice) {

    console.log("qqqqqq", this.items);
    this.invoice_model.description_allow = this.description_allow
    this.invoice_model.invoice_type = Number(this.invoice_type)
    this.invoice_model.payment_status = 1;
    this.invoice_model.taxable_amount = this.total_taxable_amount
    this.invoice_model.Igst = Number((this.igst).toFixed(2))
    this.invoice_model.cgst = Number((this.cgst).toFixed(2))
    this.invoice_model.sgst = Number((this.sgst).toFixed(2))
    this.invoice_model.partial_paid = this.get

    if (this.invoice_model.bank) {
      this.invoice_model.bank = this.invoice_model.bank.toString()
    } else {
      this.invoice_model.bank = null
    }

    this.invoice_model.payment_type = this.invoice_model.received_amount_by;
    this.invoice_model.handover_to = this.invoice_model.handover_to;
    console.log(this.payment_type, "reciicnm");

    this.putinarray()
    for (let t of this.finalItem) {
      console.log(t, 'kk');
      if (t.description == "" || this.invoice_model.description_allow == false) {
        t.description = null
      }

    }
    console.log(this.finalItem, 'final item');

    this.invoice_model.Igst = this.igst
    this.invoice_model.cgst = this.cgst
    this.invoice_model.sgst = this.sgst
    this.invoice_model.taxable_amount = this.total_taxable_amount
    this.invoice_model.total_amount = this.subTotal
    this.invoice_model.party = this.party_details.id
    this.invoice_model.items = this.finalItem
    this.invoice_model.receivable = this.finalAmount;
    this.invoice_model.partial_paid = this.partialPAid
    this.invoice_model.discount = this.invoice_model.discountTotal
    this.invoice_model.extra_charges_lst = this.exp1
    this.invoice_model.round_off = this.round_off
    this.invoice_model.einvoice = this.einvoice

    console.log(this.invoice_model, "invoice");
    if (this.finalItem.tax) {
      this.invoice_model.items.tax_amount = Number((this.finalItem.tax).toFixed(2))
    }
    if (this.finalItem.taxp) {
      this.invoice_model.items.tax_amount = Number((this.finalItem.taxp).toFixed(2))
    }
    if (this.finalItem.cess) {
      this.invoice_model.items.cess = Number((this.finalItem.cess).toFixed(2))
    }
    if (this.items.Gst_tax_rate == -1) {
      console.log("expmted received in save",);
      this.invoice_model.items.tax_percent = -1
    }
    if (this.finalItem.cessp) {
      this.invoice_model.items.cess = Number((this.finalItem.cessp).toFixed(2))
    }

    if (this.invoice_model.invoice_no && this.invoice_model.items.length && this.invoice_model.party) {
      console.log("valid form");

      this.submit = true
    } else {
      this.submit = false
      console.log("qwe INvalid form");

      if (this.submit == false) {
        if (!this.invoice_model.items.length) {
          console.log(this.invoice_model, "invoice");
          alert(this.translate.instant('MESSAGE.PLEASE ADD ITEMS'))
        }
        else if (!this.invoice_model.invoice_no) {
          console.log(this.invoice_model, "invoice");
          alert(this.translate.instant('MESSAGE.PLEASE ENTER INVOICE NUMBER'))
        }
      }
    }

    if (this.exp1.length != 0) {
      const hasEmptyString = this.exp1.some(obj => {
        return Object.values(obj).some(val => val === '');
      });
      console.log(this.exp1, hasEmptyString, 'this.exp1');
      if (hasEmptyString) {
        this.submit = false
        const toast = await this.toastController.create({
          message: "Enter Extra Charge Head",
          duration: 3000,
          position: 'middle'
        });
        toast.present();

      } else {
        this.invoice_model.extra_charges_lst = this.exp1
        this.submit = true
      }
    }

    if (this.submit == true) {
      let companyId = this.api.getCompanyId()
      this.invoice_model.company_name = companyId;
      let header = this.api.getHeader();

      this.invoice_model.cess = this.total_cess_rate
      console.log("this.invoice_model", this.invoice_model);
      console.log(this.invSett.extra_fields, 'invSett.extrafields');
      if (this.invoice_model.invoice_type == 1) {
        if (this.invSett.extra_fields.length != 0) {

          const extraF = this.invSett.extra_fields.map(({ extra_fields, extra_fieldsValue }) => ({
            [extra_fields]: extra_fieldsValue !== undefined && extra_fieldsValue !== '' ? extra_fieldsValue : null
          }));
          this.invoice_model.extra_fields = extraF
          console.log(this.invoice_model, 'invoice model create');
        }
        else {
          this.invoice_model.extra_fields = []
        }
      }
      this.api.createInvoice(this.invoice_model, header).subscribe(async (response: any) => {

        if (response.status_code == 0) {
          this.finalItem = []
          const toast = await this.toastController.create({
            message: response["message"],
            duration: 3000,
            position: 'middle'
          });
          toast.present();
        }
        if (response.status_code == 3) {
          if (this.invoice_type == 1) {
            this.NetworkService.sendInvoiceNotification(this.party_details.mobile_number);

            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.SALES INVOICE CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 2) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE INVOICE CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 4) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE RETURN CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 3) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.SALES RETURN CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 5) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.QUOTATION CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 6) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.CHALLAN CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 7) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PROFORMA INVOICE CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 10) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE ORDER CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          if (this.invoice_type == 11) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.SALES ORDER CREATED SUCCESSFULLY"),
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          console.log(response.data, 'data');
          console.log(JSON.parse(sessionStorage.getItem("currentCompany")), "compp")
          this.invoiceD = response.data
          this.downloadUrl = 'https://api.esarwa.com/api/create_pdf/' + response["data"] + '/';

          this.invoiceID = response.data
          console.log("invoiceID", this.invoiceID);
          if (response.data != null) {
            if (this.invoice_type == 1) {
              if (this.eInvoice) {
                this.createEInvoice(response.data)
              }
              if (this.eWayBill == true) {
                if (this.vehicleDetails == true) {
                  console.log("eway true");
                  this.vehicleSubmitted.invoice = response.data
                  console.log(this.vehicleSubmitted, "vehicle");
                  this.api.submitTransportDetails(this.vehicleSubmitted).subscribe((response: any) => {
                    console.log("submit transport", response);
                    if (response.status == 200) {
                      this.createEwayBill(this.invoiceID);
                    }
                  })
                }
              }
            }
          }
        }
      });
    }

  }
  createEInvoice(data: any) {
    let company_id = this.api.getCompanyId()
    this.api.geteinvoice({ "invoice_id": this.invoiceID, "company_id": company_id }).subscribe(async (response: any) => {
      console.log(response, "e invoice result");
      if (response.status == 200) {
        this.downloadEinvoiceButton = true
        this.downloadEinvoicePDF(data);
        const toast = await this.toastController.create({
          message: "E-Invoice generated Successfully",
          duration: 3000,
          position: 'middle',
          color: 'success'
        });
        toast.present();
      } else if (response.status == 500) {
        this.einvoiceErrorInfo = response.msg;
        this.einvoiceErrorInfoShow = true;
        const toast = await this.toastController.create({
          message: this.einvoiceErrorInfo,
          duration: 3000,
          position: 'middle',
          color: 'danger'
        });
        toast.present();
      }
    })
  }

  openEwayBill(ewaybill: any) {
    this.downloadEwaybill = 'https://esarwa.com/ewaybill/index.php?inv=8928';
  }
  convertToPDF() {
    const doc = new jsPDF('p', 'mm', 'a4'); // Specify custom width and height
    const url = 'https://esarwa.com/ewaybill/index.php';
    let h = JSON.stringify(this.ePost);
    console.log(h, "posting data eway");


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: h,
    })
      .then((response) => response.text())
      .then((html) => {
        const opt = {
          margin: [10, 10, 10, 10], // Specify the margins
          filename: 'E-way bill.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf().from(html).set(opt).save();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  ewaySubmit(d: any) {
    this.vehicleDetails = true
    console.log("submit eway", d);
    this.vehicleSubmitted = d
    this.modal.dismiss()
  }
  createEwayBill(data: any) {
    this.api.createEwb({ invoice_id: data }).subscribe(async (response: any) => {
      console.log("create eway bill response", response);
      if (response.status == 200) {
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 3000,
          position: 'middle'
        });
        toast.present();
        console.log(response.data, "eway bill created");
        this.ewaybillDownload = true
        this.get_ewb(data);
      }
      else if (response.status == 500) {
        alert(response.msg)

      } else {
        const toast = await this.toastController.create({
          message: "Failed",
          duration: 2000,
          position: 'middle'
        });
        toast.present();
        console.log(response.msg);
        this.einvoiceErrorInfo = response.msg;
        this.einvoiceErrorInfoShow = true;
      }
    })
  }
  closeEinvoiceErrorDialog() {
    this.einvoiceErrorInfoShow = false;
  }
  get_ewb(data) {
    this.api.get_ewb({ invoice_id: data }).subscribe((response: any) => {
      console.log("ewaybill", response);
      if (response.status == 200) {
        this.e = response.data;
        this.ePost = response
      }
    })
  }
  eway: any = {
    vehicle_type: null,
    trans_mode: null,
    vehicle_no: null,
    distance: null,
    disp_gst: null,
    disp_name: null,
    ship_gst: null,
    ship_name: null,
    transporter_name: null,
    transporter_id: null
  }
  vehicle_type: any = [{ id: "0", name: "Regular" }, { id: "1", name: "Over-Dimensional Cargo" }]
  transport_type: any = [{ id: 1, name: "Road" }, { id: 2, name: "Rail" }, { id: 3, name: "Air" }, { id: 4, name: "Ship" }]

  collectPayment() {
    this.api.collectPaymentPos(this.invoiceD).subscribe((response: any) => {
      console.log(response, "pos data response");
      this.merchanTrans_id = response.body.merchantTransactionId

      this.statusbutton = true
      this.progressWheel = true
    })
  }
  getPayStatus() {
    this.api.getPaymentStatus(this.invoiceD, this.merchanTrans_id).subscribe((response: any) => {
      console.log(response, "Staus REsponse");
      this.payentStatusPOS = response
      if (response.result.resultStatus === 'FAIL') {
        alert(this.translate.instant('MESSAGE.PAYMENT FAILED'))
        this.resendbutton = true
      } else if (response.result.resultStatus === 'PENDING') {
        alert(this.translate.instant('MESSAGE.PLEASE CHECK EDC MACHINE'))
      }
      else {
        alert(this.translate.instant('MESSAGE.PAYMENT SUCCESSFUL'))
        this.paymentDone = true
        this.progressWheel = false
      }
    })
  }
  addAnotherCharges() {
    this.addCharge = true
    let data = {
      extra_charges: '',
      extra_amt: 0,
    }
    this.exp1.push(data);

  }

  total1() {
    let ff = 0;
    this.exp1.forEach(function (value) {
      ff = value.extra_amt + ff;
    });
    this.charge = ff;
    this.invoice_model.extraCharged = Number(this.charge)
    this.calculation()
  }

  deleteRow(i: number) {
    this.exp1.splice(i, 1);
    this.total1()
  }

  deleteRow1(i: number) {
    console.log("delete");
    this.extraF.splice(i, 1)
  }
  Change() {
    if (this.invoice_model.checked) {
      this.partialPAid = 1
    } else {
      this.partialPAid = 0
    }
    console.log(this.partialPAid);
  }

  einvoice(d: any) {
    console.log(d, "invoice");
    if (this.eInvoice == true) {
    }
  }
  downloadEinvoicePDF(id: any) {
    this.downloadEinvoicePDF1 = 'https://api.esarwa.com/einvoicing/create_pdf/' + id + '/';
  }
  async ewayBill1() {
    console.log("show", this.eWayBill);
    const modal = await this.modal.create({
      component: EWayPage,
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.8
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log("closedata", data);
        this.ewaySubmit(data.data);
      });
    return await modal.present();
  }
  supply() {
    this.api.receivedState().subscribe((response: any[]) => {
      this.place_of_supply = response["data"]
      console.log("state", this.place_of_supply);
      this.place = this.place_of_supply
      if (this.place) {
        this.placeOf = this.party_details.gst_compare
        this.place.place_of_supply = Number(this.placeOf)
        if (this.place.place_of_supply < 10) {
          this.placeOf = "0" + this.invoice_model.place_of_supply.toString()
          console.log(this.placeOf, "ppppppp");
        }
        else {
          this.placeOf = this.invoice_model.place_of_supply.toString()
          console.log(this.placeOf, "else");
        }
      }
      this.calculation();
      this.calculateTax();
      this.calculateGst();
    });
  }
  async setting() {
    console.log("click");
    const modal = await this.modal.create({
      component: InvoiceSettingPage,
    });
    modal.onDidDismiss()
      .then(async (data) => {
        console.log("closedata");
        this.invoice_head();
        const user = data.data; // Here's your selected user!
      });
    return await modal.present();
  }
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
  }
  onSegmentChange(event) {
    console.log(event.detail.value);
  }
  dismis() {
    this.modal.dismiss();
  }
  getGSTrate() {
    let header = this.api.getHeader();
    this.api.receivedGST(header).subscribe((response: any[]) => {
      console.log(response);
      this.gstData = response
    });
  }
  selectgstrate(data: any, index) {
    console.log(data, index, 'uuuiok');
    console.log(data.multiple, 'multiple rates');

    if (data.multiple_rates && data.multiple.length != 0) {

      let t = []
      if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7 || this.invoice_type == 11) {
        t = data.multiple.filter((item) => item.from_rate <= data.rate && item.to_rate >= data.rate)
      } else if (this.invoice_type == 2 || this.invoice_type == 4 || this.invoice_type == 10) {
        t = data.multiple.filter((item) => item.from_rate <= data.purchase_rate && item.to_rate >= data.purchase_rate)
      }
      console.log(t, 'jjj');
      if (t.length != 0) {
        this.p = this.gstData.filter((item) => item.id === t[0].tax)
        console.log(this.p[0], "tax rate gggg");
        if (data.id == this.items[index].id && this.p.length != 0) {
          this.items[index].Gst_tax_rate = (this.p[0].gst_tax_rate);
          this.items[index].gst_id = this.p[0].id
          this.items[index].tax_rate_id = (this.p[0].id)
        }
        console.log(data.id, this.items[index].id, "tax rate mmm");
      } else {
        console.log(data.Gst_tax_rate, 'lllopkjhhbjfdvjnb');
        this.items[index].tax_rate_id = (data.tax_rate_id)
        this.items[index].gst_id = (data.tax_rate_id)
      }
      console.log(this.items, 'llolp');
      this.calculation();
      //  this.calculateTax();
    }
  }
  ratechange(i: any, d: any) {
    console.log(i, "ratechange");
    let last_selected = i
    let c = this.gstData.filter((item) => item.id === Number(i.tax_rate_id))
    console.log(c, "c");

    if (c.length != 0) {
      this.items[d].Gst_tax_rate = (c[0].gst_tax_rate);
      this.items[d].tax_rate_id = (c[0].id)
    } else {
      this.items[d].Gst_tax_rate = (last_selected.Gst_tax_rate);
      this.items[d].tax_rate_id = (last_selected.tax_rate_id)
    }
    console.log(this.name.Gst_tax_rate, 'gsttaxratetttd');
    this.calculation();
    this.calculateTax();
  }
  WHFunction(t: any) {
    this.items[t].quantity = this.items[t].breadth * this.items[t].length_c
    this.calculation();
  }
  // introMethod() {
  
  //   let intro = introJs();
  //   intro.oncomplete(function () {
  //     console.log("On COmplete");
  //     document.getElementById('partyc').click()
  //     localStorage.setItem("invoice", "false");
  //     localStorage.setItem("inv_item", "true");
  //   });
  //   intro.onexit(function () {
  //     localStorage.setItem("invoice", "false");
  //     console.log("false invoice tour on exit");

  //   });
  //   intro.setOptions({
  //     steps: [
  //       // {
  //       //   element: '#step2',
  //       //   intro: 'Enter your invoice number.',
  //       // },
  //       {
  //         element: '#partyc',
  //         intro: 'Click here to add party for creating invoice against party.',
  //       },
  //     ],
  //     disableInteraction: false,// enable user interaction
  //     showStepNumbers: false,
  //     showBullets: false,
  //     exitOnOverlayClick: true,
  //     exitOnEsc: true,
  //     scrollToElement: true,
  //     scrollTo: "element",
  //     scrollPadding: 30,
  //     nextLabel: '<ion-button size="small">next</ion-button>',
  //     prevLabel: '<ion-button size="small">Back</ion-button>',
  //     doneLabel: '<ion-button size="small">Create</ion-button>',
  //   })
  //   intro.start();

  // }
  introMethod1() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('create-item').click()
      document.createTextNode("CLICK ME");
      localStorage.setItem("inv_item", "false");

    });
    intro.onexit(function () {
      localStorage.setItem("inv_item", "false");
      console.log("false item on exit");
    });
    intro.setOptions({
      steps: [
        {
          element: '#create-item',
          intro: 'Click here to add item or create item ',
        }
      ],
      disableInteraction: false,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement: true,
      scrollTo: "element",
      scrollPadding: 30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Add Item</ion-button>',
    }).start();
  }
  introMethod2() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      document.getElementById('save').click()
      localStorage.setItem("save", "false");
      localStorage.setItem("invoice", "false");
    });
    intro.onexit(function () {
      localStorage.setItem("save", "false");
    })
    intro.setOptions({
      steps: [
        {
          element: '#save',
          intro: 'After filling all mendetory fields click here to save invoice.',
        },
      ],
      disableInteraction: false,
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      scrollToElement: true,
      scrollTo: "element",
      scrollPadding: 30,
      nextLabel: '<ion-button size="small">next</ion-button>',
      prevLabel: '<ion-button size="small">Back</ion-button>',
      doneLabel: '<ion-button size="small">Save</ion-button>',
    }).start();
  }
  scrollToHalfPage() {
    // @ts-ignore
    const contentHeight = this.ionContent.el.offsetHeight;
    const scrollY = contentHeight / 2;
    this.ionContent.scrollToPoint(0, scrollY, 500);
  }
  getInvoiceList(t: any) {
    this.show1 = false
    console.log(this.invoice_type, typeof (this.invoice_type), 'this.invoice_type');
    let data = {
      id: t,
      company_name: this.api.getCompanyId()
    }
    if (this.invoice_type == 3) {
      this.api.post3('get_inv_list/', data).subscribe((response: any) => {
        console.log(response, 'invlist');
        if (response.Status == 200) {
          this.newData = response.data
          this.arry1 = response.data

        } else {
          this.show1 = true
        }
      })
    } else if (this.invoice_type == 4) {
      this.api.post3('get_purchase_inv_list/', data).subscribe((response: any) => {
        console.log(response, 'purchase list');
        if (response.Status == 200) {
          this.against_inv_no = response.data
        } else {
          this.show1 = true
        }
      })
    }
  }
  invSelect(t) {
    console.log(t, 'k k ,');
    this.invoice_model.against_inv_no = t.invoice_no
    this.against_inv = t.id
    this.against_inv_no = t.invoice_no
    this.invoice_model.against_inv = t.id
    this.invoice_model.against_inv_no = t.invoice_no
    console.log(this.invoice_model, "logggg");
    this.show1 = false
  }
  List(e: any) {
    this.show1 = true
    console.log(e, "logggeeee", typeof (e))
    const val = e
    if (val && val.trim() !== '') {
      this.arry1 = this.arry1.filter((item) => {
        return (item.invoice_no.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.show1 = false
      this.arry1 = this.newData
    }
  }
  clear(w) {
    console.log(w, "lognwe");

  }
  fullPayment(event) {

    if (event.target.checked) {
      this.invoice_model.received_amount = this.subTotal;
      console.log(this.invoice_model, "kkwwk");
      console.log(this.subTotal, "kkk");
      this.calculation();
    } else {

      console.log(this.invoice_model, "kkeek");
      console.log(this.subTotal, "kkk");
      this.invoice_model.received_amount = 0
      this.calculation();
    }
  }
  paymentaIn(i: any) {
    if (i == 1) {
      this.showCashLedger = true;
      this.showBankLedger = false;
      console.log("lliooo", this.cashLedgers);
      if (this.cashLedgers.length != 0) {
        this.invoice_model.handover_to = this.cashLedgers[0].id
        console.log(this.invoice_model.handover_to, "modelllll");
      }
    } else if (i == 2) {
      //cheque
      this.invoice_model.handover_to = this.bankData[0].id.toString()
      this.showBankLedger = true;
      this.showCashLedger = false;
    } else if (i == 3) {
      //bank
      this.invoice_model.handover_to = this.bankData[0].id.toString()
      this.showBankLedger = true;
      this.showCashLedger = false;
    }
  }
  getCashLedgers() {
    let companyId = this.api.getCompanyId()
    this.payment.company_id = companyId
    let header = this.api.getHeader();
    this.api.selectedCashLedger(this.payment, header).subscribe((response: any) => {
      if (response.status != 500) {
        console.log(response, "response cashredgeydg");
        this.cashLedgers = response
        this.invoice_model.handover_to = this.cashLedgers[0].id
      } else {
        this.cashLedgers = [];
      }
    });
  }
  async thermalprint(t: any) {
    console.log('click', this.items)
    this.thermalPrintShow = true
    this.invoice_model.taxable_amount = this.total_taxable_amount
    this.invoice_model.Igst = this.igst
    this.invoice_model.cgst = this.cgst
    this.invoice_model.sgst = this.sgst
    this.invoice_model.cess = this.total_cess_rate
    this.invoice_model.total_amount = this.subTotal
    let tdata = { invoice: this.invoice_model, item: this.items, party: this.part }
    this.invoice_details = tdata;
    console.log(tdata, 'modal');
    const modal = await this.modal.create({
      component: ThermalprintPage,
      componentProps: { "invoice": this.invoice_details },
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.8
    });
    return await modal.present();
  }

  whatsappSend() {
    let msg = 'Hello ';
    let pname = this.party_details.Party_name;
    msg += pname + ', Thank you for your Purchase with ';
    let companyName = this.api.getCompanyDetails().business_name
    msg += companyName + '. Click on the link https://esarwa.com/a/' + this.invoiceD + ' to download the invoice. - ESARWA'
    console.log(msg, this.party_details.mobile_number, "final msg");
    let regx = /^[6-9]\d{9}$/;
    console.log("valid ?", regx.test(this.party_details.mobile_number));
    if (regx.test(this.party_details.mobile_number)) {
      let attachment = encodeURI('https://api.esarwa.com/api/create_pdf/' + this.invoiceD + '/')
      window.open('https://wa.me/91' + this.party_details.mobile_number + '?text=' + encodeURI(msg) + '&attachment=' + attachment, "_blank");
    } else if (this.party_details.mobile_number == '') {
      alert("Party doesnt have Mobile Number");
    } else {
      alert("Mobile Number is not valid");
    }
  }

  getUnit() {
    let header = this.api.getHeader();
    this.api.receivedUnit(header).subscribe((response: any) => {
      console.log(response);
      this.Unit = response.data
    });
  }

  segmentChanged1(event: any) {
    this.user.item_type = Number(event.target.value)
    console.log(this.user.item_type);
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
  async submitData(user: any) {
    console.log("user details", user);
    if (user.item_type == 1) {
      if (user.item_type && user.item_name) {

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
      if (user.multiple_rates == true) {
        if (user.multiple[0].from_rate && user.multiple[0].to_rate) {
          this.submit = true
        }
        else {
          console.log("else", user.multiple, this.submit);
          this.submit = false
        }
      }
      else {
        this.submit = true
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
    if (user.unit !== null) {
      if (user.unit == 30) {
        if (user.other_unit != null && user.other_unit != '') {
          user.other_unit == user.other_unit
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
      let header = this.api.getHeader();
      user.multiple = this.multiple
      user.company_name = this.api.getCompanyId()

      this.api.createNewItem(user, header).subscribe(async (response: any) => {
        console.log(response, "createitemResponse");
        let a = response.status
        if (a == 200) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ITEM CREATED SUCCESSFULLY'),
            duration: 2000,
            position: 'middle'
          });
          toast.present();
          this.x = response.data
          this.modalCtrl.dismiss(this.x)

        }
        if (a == 303) {
          const toast = await this.toastController.create({
            message: this.translate.instant('MESSAGE.ITEM NAME ALREADY EXISTS'),
            duration: 2000,
            position: 'middle'
          }
          );
          toast.present();
        }

      })
    }
    else {
      if (user.unit == 30) {
        const toast = await this.toastController.create({
          message: 'Add other unit',
          duration: 2000,
          position: 'middle'
        });
        await toast.present();
      }
      else {
        const toast = await this.toastController.create({
          message: this.translate.instant('MESSAGE.PLEASE ENTER REQUIRED FEILD'),
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
  }
  getItemCode() {
    let c_id = this.api.getCompanyId();
    console.log('itemcode', c_id);
    let header = this.api.getHeader();
    this.api.getItemCode(c_id,header).subscribe((ic: any) => {
      console.log(ic, 'itemcode');
      this.user.item_code = ic.item_code
    })
  }
  setInvoiceNumber() {
    let header = this.api.getHeader();
    this.api.get_fy_by_date(this.invoice_model.invoice_date,header).subscribe((res: any) => {
      console.log(res.sales_invoice_no, "comp fy");
      console.log(this.invSett.financial_data);

      if (this.invSett.annual_reset) {
        if (this.invSett.financial_data != null) {
          let data = JSON.parse(this.invSett.financial_data);
          console.log(data, "got financial data");
          const date = new Date(this.invoice_model.invoice_date);
          const financialYear = this.getFinancialYear(date);
          console.log(financialYear);
          const found = data.find((obj) => {
            return obj.label === financialYear.toString();
          });
          console.log(found, "data found");
          let invoiceNumber = '';

          if (found) {
            invoiceNumber += found.prefix
          }
          invoiceNumber += res.sales_invoice_no + 1;
          if (found) {
            invoiceNumber += found.suffix
          }
          this.invoice_model.invoice_no = invoiceNumber
        }
      }

    })
  }

  getFinancialYear(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month >= 4) {
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  }

  
  // printPdf() {
  //   this.pdf.getData().then((u8) => {
  //     console.log('print log');

  //     let blob = new Blob([u8.buffer], {
  //       type: 'application/pdf'

  //     });
  //     const blobUrl = window.URL.createObjectURL((blob));
  //     const iframe = document.createElement('iframe');
  //     iframe.style.display = 'none';
  //     iframe.src = blobUrl;
  //     document.body.appendChild(iframe);
  //     iframe.contentWindow.print();
  //     console.log(blobUrl,'print after');

  //   });
  // }

  // filterItems(event){
  //   const searchTerm = event.target.value.toLowerCase();
  //   this.filteredItems = this.bankData.filter(item =>
  //     item.toLowerCase().includes(searchTerm)
  //   );
  // }

  
  filterItems(ev: any) {
    const val = ev.target.value;
    console.log("eve", val, this.bankData)
    this.filteredItems=this.bankData
    if (val && val.trim() !== '') {
      this.filteredItems = this.filteredItems.filter((item) => {
        return (item.bank_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.bankData
    }
  }
}
  

