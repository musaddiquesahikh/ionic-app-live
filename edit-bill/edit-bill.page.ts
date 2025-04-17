import { InvoiceSettingPage } from './../invoice-setting/invoice-setting.page';
import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { PermissionGuard } from '../guards/permission.guard';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import * as introJs from 'intro.js/intro.js';
import 'intro.js/introjs.css';
import { type } from 'os';
import { ConvertPage } from '../convert/convert.page';
@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.page.html',
  styleUrls: ['./edit-bill.page.scss'],
})
export class EditBillPage implements OnInit {
  // @Input() invoice_type1 
  @Output() invoiceFunction: EventEmitter<any> = new EventEmitter();
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @Input() invoiceId
  @Input() stk_val

  // @Output() invoiceFunction: EventEmitter<any> = new EventEmitter();

  poNo: boolean
  prefix12: boolean
  model1: boolean
  addF: boolean
  vehicleNo: boolean
  ewayNo: boolean
  billData
  exp1: any = [{
    "extra_charges": "",
    "extra_amt": 0
  }]
  addCharge: boolean
  subTotal: number
  discountTotal: number
  item: any
  invoice_type: number;
  invoice_model: any = {
    invoice_no: "",
    invoice_date: "",
    payment_terms: 30,
    due_date: "",
    Igst: 0,
    cgst: 0,
    sgst: 0,
    total_amount: 0,
    discount: 0,
    discountTotal: 0,
    discount_type: 1,
    received_amt: 0,
    receivable: 0,
    party: 0,
    taxable_amount: 0,
    invoice_type: '',
    payment_status: 1,
   
    against_inv_no: '',
    against_inv: '',
    company_name: 14,
    items: [

    ]
  }
  dictionary: any = [{
    "type": "1",
    "header": this.translate.instant('HEADER.EDIT SALES INVOICE'),
    "label": 'Sales Invoice No.',
    "sButton": this.translate.instant('HEADER.SAVE INVOICE'),
    "gButton": "Generate Bill"
  },
  {
    "type": "2",
    "header": this.translate.instant('HEADER.EDIT PURCHASE INVOICE'),
    "label": this.translate.instant('HEADER.PURCHASE INVOICE NO'),
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE INVOICE'),
    "gButton": "Generate Bill"

  },
  {
    "type": "3",
    "header": this.translate.instant('HEADER.EDIT SALES RETURN'),
    "label": "Credit Note No",
    "sButton": this.translate.instant('HEADER.SAVE SALES RETURN'),
    "gButton": "Save & New"
  },
  {
    "type": "4",
    "header": this.translate.instant('HEADER.EDIT PURCHASE RETURN'),
    "label": "Debit Note No",
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE RETURN'),
    "gButton": "Save & New"
  },
  {
    "type": "5",
    "header": this.translate.instant('HEADER.EDIT QUOTATION'),
    "label": this.translate.instant('HEADER.QUOTATION NO'),
    "sButton": this.translate.instant('HEADER.SAVE QUOTATION'),
    "gButton": "Save & New"
  },
  {
    "type": "6",
    "header": this.translate.instant('HEADER.EDIT DELIVERY CHALLAN'),
    "label": this.translate.instant('HEADER.CHALLAN NO'),
    "sButton": this.translate.instant('HEADER.SAVE CHALLAN'),
    "gButton": "Save & New"
  },
  {
    "type": "7",
    "header": this.translate.instant('HEADER.EDIT PROFORMA INVOICE'),
    "label": this.translate.instant('HEADER.INVOICE NO'),
    "sButton": this.translate.instant('HEADER.SAVE PROFORMA'),
    "gButton": "Save & New"
  },
  {
    "type": "10",
    "header": this.translate.instant('HEADER.EDIT PURCHASE ORDER'),
    "label": this.translate.instant('HEADER.PURCHASE ORDER NO'),
    "sButton": this.translate.instant('HEADER.SAVE PURCHASE ORDER'),
    "gButton": "Save & New"
  }]

  showItemsPanel: Boolean = true

  providers: [DatePipe]

  items: any = []
  partyComponent: boolean = false;
  itemComponent: boolean = false;
  party_details: any = {};
  party_list: any = [];
  placeOf: any;
  total_taxable_amount: number;
  total_amount: number;
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
  itemEmitted: any;
  unit: any;
  place: any;
  place_of_supply: any;
  p: any;
  invSett: any = [];
  downloadInv: string;
  invoiceD: any;
  receivable: number;
  charge: number;
  received_amt: number;
  sales_prices: number;
  discount: number;
  round_off: boolean = true;
  // extraCharged: number;
  get: number;
  gstData: any = [];
  name: any = [];
  toggleItem: boolean = true
  toggleItem1: boolean = false
  multiple: any = [{
    from_rate: 0,
    to_rate: 0,
    tax: ""

  }]
  open
  einvoice: boolean;
  ewb: boolean;
  enableEInvoice: boolean;
  enableEwayBill: boolean;
  einvoiceErrorInfo: any;
  einvoiceErrorInfoShow: boolean;
  ePost: any; e: any;
  ewaybillDownload: boolean;
  downloadEinvoiceButton: boolean = false;
  downloadEinvoicePDF1: string;
  isModalOpen = false;
  salesReturnConvert: boolean = false;
  number_invoice: any;
  invoiceType: boolean;
  sales: any = []
  purchase: string[];
  purchaseR: string[];
  salesR: string[];
  proforma: string[];
  challan: string[];
  quotation: string[];
  invoice_type111: string;
  pR: string[];
  purchaseInvoiceReturn
  changeInvoiceReturn
  changepurchaseInvoice
  inovicereturnno: any;
  invoiceID: any;
  eInvoice: Boolean = false;
  eWayBill: boolean = false;
  vehicleDetails: boolean = false;
  vehicleSubmitted: any;
  s: boolean;
  expandInvoice: boolean;
  expandParty: boolean;
  companyDetails: any;
  Convert: boolean = false;
  invoicetypoo: any;
  purchaseReturnConvert: boolean = false;
  idReturn: any;
  changeType: any;
  purchaseOrder: any = []
  disSave: boolean = false;
  po_order: any = [];
  po_item_list: any = [];
  og_po_list: any = []
  dataSource: any;
  modal_po: any;
  hide_list: boolean = false;
  currentCompany: any;

  constructor(public api: ApiService, public datepipe: DatePipe,
    private permission: PermissionGuard, public alertCtrl: AlertController, public location: Location,
    public toastController: ToastController, private popoverController: PopoverController,
    public router: Router, public modalCtrl: ModalController, private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.billData, 'bill data on init');

    this.getNotes()
    this.companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"));
    let t = JSON.parse(localStorage.getItem('edit_invoice'))
    console.log(this.open, 'opm');
    if (t) {
      setTimeout(() => {
        this.introMethod();
      }, 1000);
    }
    console.log(this.open, 'opm');
    this.invoice_head()
    this.invoice_model.extraCharged = 0
    this.getGSTrate()
    if (this.billData != undefined) {
      if (this.billData.einvoice == true) {
        this.downloadEinvoicePDF(this.billData.invoice_id)
      }
      if (this.billData.ewb) {
        this.get_ewb(this.billData.invoice_id)
      }
    }
    this.poNo = false
    this.ewayNo = false
    this.vehicleNo = false
    this.addF = false
    this.prefix12 = false
    this.model1 = false
    this.supply()
    this.stateDataFunction()
    this.get = 0
    this.total_amount = 0
    this.subTotal = 0;
    this.receivable = 0;
    this.invoice_model.discountTotal = 0
    this.invoice_model
    this.currentCompany = JSON.parse(sessionStorage.getItem('currentCompany'));
    let company_gst = this.currentCompany[0].gst_number
    console.log(company_gst,'oninit');
    
     if (company_gst == null) {
      this.company_gst = null
    } else {
      this.company_gst = company_gst.slice(0, 2)
    }
  }
  getNotes() {
    this.api.post3('get_invoice_settings/', { "company": this.api.getCompanyId(), "type": 1 }).subscribe((res: any) => {
      console.log(res.custom_text_for_barcode, "company data");
      if (res.has_fixed_terms_and_conditions) {
        this.invoice_model.notes = res.terms_and_conditions;
      }
      this.invoice_model.enable_value_addition = res.enable_value_addition
      this.invoice_model.show_discount_rs = res.show_discount_rs
      this.invoice_model.show_value_add_rs = res.show_value_add_rs
      this.invoice_model.has_free_qty = res.has_free_qty
    })
  }
  scrollToHalfPage() {
    // @ts-ignore
    const contentHeight = this.ionContent.el.offsetHeight;
    const scrollY = contentHeight / 2;
    this.ionContent.scrollToPoint(0, scrollY, 500);
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
  introMethod() {
    let intro = introJs();
    intro.oncomplete(function () {
      console.log("On COmplete");
      localStorage.setItem("edit_invoice", "false");

    });
    intro.onexit(function () {
      localStorage.setItem("edit_invoice", "false");
      console.log("false edit invoice tour on exit");

    });
    intro.setOptions({
      steps: [
        {
          element: '#download',
          intro: 'you can download your invoice from here.',
        },
        {
          element: '#update',
          intro: 'After editing the invoice click here to save changes.',
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
      doneLabel: '<ion-button size="small">Done</ion-button>',
    }).start();
  }

  invoice_head() {
    console.log(this.billData, "billdata", this.billData.invoice_id);
    let companyId = this.api.getCompanyId()
    let header = this.api.getHeader()
    let data = { company_id: companyId, invoice_id: this.billData.invoice_id }
    this.api.getParticularInvoice(data, header).subscribe((response: any) => {
      console.log("get_particular_invoice1", response);
      if (response.invoice_type == 10 || response.invoice_type == 11) {
        this.api.post3('get_particular_order_item/', { "order_id": this.invoiceD, "company_id": companyId }).subscribe((res: any) => {
          console.log(res, 'poiyut');
          if (res.status == 200) {
            this.po_order = res.items
          }
        })
      }
      let array21 = []
      if (response.extra_fields != null) {
        array21 = response.extra_fields;
        console.log(array21, 'extra');
        
      }
      this.inovicereturnno = response.invoice_no
      this.invoice_type = response.invoice_type
      this.invoiceD = response.id
      this.downloadInv = "https://api.esarwa.com/api/create_pdf/" + this.invoiceD;

      let term = this.invoice_type;
      this.dictionary = this.dictionary.filter((dictionary) => {
        return dictionary.type.indexOf(term) > -1;
      });
      this.invoice_model = response
      this.invoice_model.round_off = response.round_off
      this.invoice_model.einvoice = this.billData.einvoice
      this.invoice_model.ewb = this.billData.ewb

      if (this.invoice_model.bank) {
        this.invoice_model.bank = response.bank.toString()
      } else {
        this.invoice_model.bank = null
      }
      console.log("roundoffff", this.invoice_model.round_off, this.invoice_model.bank_name);

      if (this.invoice_model.round_off) {
        this.round_off = true
      }
      else {
        this.round_off = false
      }
      this.party_list = JSON.parse(sessionStorage.getItem("listParty"))
      console.log(this.party_list,'loght');
      
      // this.placeOf = this.party_list.data.filter((obj: { id: any }) => {
      //   return obj.id == response.party;
      // })[0].gst_compare;
      
      this.invoice_model.place_of_supply = Number(response.place_of_supply)
      this.invoice_model.party = response.party
      this.items = response.items
      this.einvoice = response.einvoice
      this.ewb = response.ewb

      let i = 0
      this.item = this.items[i].item_info
      console.log("ite", this.item);
      this.total_taxable_amount = response.taxable_amount
      this.total_amount = response.total_amount
      this.invoice_model.place_of_supply = response.place_of_supply
      this.igst = response.Igst
      this.cgst = response.cgst
      this.sgst = response.sgst

      if (response.extra_charges_lst !== undefined) {
        this.exp1 = response.extra_charges_lst
      }
      this.p = response.place_of_supply
      this.get = response.partial_paid
      this.total_taxable_amount = response.taxable_amount
      this.invoice_model.id = response.id
      this.subTotal = response.total_amount
      this.invoice_model.received_amount = response.received_amt
      this.invoice_model.checked = response.partial_paid
      console.log(response, this.items, "psk");
      if (response.invoice_type == 1) {
        let company = this.api.getCompanyId()
        this.api.post3('get_invoice_settings/', { "company": company, "type": response.invoice_type }).subscribe((response: any) => {
          this.invSett = response
          this.invSett.extra_fields = JSON.parse(response.extra_fields)
        },
          async (error) => {
            console.log("pppp", error);

            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.FAILED"),
              duration: 5000,
              position: 'middle'
            });
            toast.present();
          })
      }
      this.invoice_model.po_no = response.po_no
      this.invoice_model.eway_bill_no = response.eway_bill_no
      this.invoice_model.vehicle_no = response.vehicle_no
      this.invoice_model.discountTotal = response.discount
      this.subTotal = response.total_amount
      this.invoice_model.discount_type = response.discount_type

      let n = 0
      for (let i of response.items) {
        this.items[n].item_type = i.item_info.item_type
        this.items[n].item_name = i.item_info.item_name
        if (i.item_info.item_type == 1) {
          this.items[n].units = i.item_info.units
          if (this.items[n].units.length > 0) {
            this.items[n].abc = this.items[n].units.filter((object: { id: any; }) => {
              return object.id === i.unit;
            });
            this.items[n].abc = this.items[n].abc[0]
            let t = 0
            for (let p of this.items[n].units) {
              if (i.item_info.other_unit != null) {
                this.items[n].units[t].unit = i.item_info.other_unit
              } else {
                this.items[n].units[t].unit = this.items[n].units[t].unit.slice(0, 3)
              }
              t++
            }
          } else {
            this.items[n].abc = { id: i.unit, type: i.unit_type, unit: null }
          }
        } else {
          this.items[n].abc = { id: null, type: null, unit: null }
        }
        this.items[n].Gst_tax_rate = i.tax_percent
        this.items[n].cess_tax_rate = i.cess
        this.items[n].square_calculation = i.item_info.square_calculation
        let l_data = JSON.parse(i.lxb)
        if (l_data != null) {
          this.items[n].length_c = l_data.length_c
          this.items[n].breadth = l_data.breadth
        }
        this.items[n].purchase_prices = i.total_amount
        this.items[n].purchase_rate = i.rate
        this.items[n].sales_prices = i.total_amount
        console.log(i.total_amount, "price");
        this.items[n].tax_rate_id = i.tax_rate_id

        this.items[n].sales_tax = i.item_info.sales_tax
        this.items[n].multiple_rates = i.item_info.multiple_rates
        this.items[n].multiple = i.multiple
        if (i.item_info.multiple_rates) {
          this.items[n].gst_id = i.tax_rate_id
          console.log(i.tax_rate_id, '996936');

        }
        n++
      }
      console.log(this.items, '99969');
      this.calculation();
      this.total1()
      console.log("total", this.subTotal);

      let company = this.api.getCompanyId()
      let data = { company_id: company, party_id: this.invoice_model.party }
      this.api.getParticularParty(data, header).subscribe((response: any) => {
        console.log("get_particular_party", response);
        this.party_details = response.data
        // if (this.party_details.gstin == null) {
          // this.placeOf = this.party_details.gst_compare
          this.placeOf = this.party_details.gst_compare.slice(0, 2)
        // } else {
          // this.placeOf = this.party_details.gstin.slice(0, 2)
        // }
        // this.calculateGst()
      })
    })

    async (error) => {
      console.log("pppp", error);
      const toast = await this.toastController.create({
        message: error,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
    let companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"));
    if (companyDetails[0].einvoice_service == true) {
      this.enableEInvoice = true;
    }
    if (companyDetails[0].ewb_service == true) {
      this.enableEwayBill = true;
    }
    this.company_gst = companyDetails[0].gst_number
    //let companyId = this.currentCompany[0].id;
    // // console.log("Company details", companyId);
    //let header = this.api.getHeader();
    //   let company = this.api.getCompanyId()
    //   let a = this.invoice_type==1 || this.invoice_type==3 || this.invoice_type==4 || this.invoice_type==5 || this.invoice_type==6 || this.invoice_type==7;
    //   this.api.post3('get_invoice_settings/', { "company": company, "type": Number(a) }).subscribe((response: any) => {
    //   this.invSett = response
    //   this.invSett.extra_fields = JSON.parse(response.extra_fields)

    //   console.log(response, 'setting');
    // })
    if (this.invoice_type == 1 || this.invoice_type == 3) {
      this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
        console.log(response, "prefix");

        if (response.status != 500) {
          this.invoice_model.invoice_no = response.sales_invoice_no;
        }
      })
    }
    this.api.bankList(companyId, header).subscribe((response: any) => {
      if (response.status != 500) {
        this.bank = response
      }
    });
  }
  dateChange() {
    this.invoice_model.invoice_date = this.datepipe.transform(this.invoice_model.invoice_date, 'yyyy-MM-dd')
    var nextDay = new Date(this.datepipe.transform(this.invoice_model.invoice_date, 'yyyy-MM-dd'));
    nextDay.setDate(nextDay.getDate() + Number(this.invoice_model.payment_terms));
    this.invoice_model.due_date = this.datepipe.transform(nextDay, 'yyyy-MM-dd')
  }
  showPartyData() {
    this.partyComponent = true;
  }
  showItemData() {
    this.itemComponent = true;
  }
  dismiss(index) {
    this.items.splice(index, 1);
    this.calculation()
  }
  partyFunction(party: any) {
    if (party.c_party == false) {
      console.log("hide party");
      this.partyComponent = false;
    }
    this.party_details = party
    if (this.party_details.gstin == null) {
      this.placeOf = this.party_details.gst_compare
      this.placeOf = this.placeOf.slice(0, 2)
    } else {
      this.placeOf = this.party_details.gstin.slice(0, 2)
    }
    this.partyComponent = false
    this.showItemsPanel = true

    this.placeOf = this.party_details.gst_compare
    this.invoice_model.place_of_supply = Number(this.placeOf)
    console.log(this.invoice_model.place_of_supply);
    if (this.invoice_model.place_of_supply < 10) {
      this.placeOf = "0" + this.invoice_model.place_of_supply.toString()
      console.log(this.invoice_model.placeOf, "ppppppp");
    }
    else {
      this.placeOf = this.invoice_model.place_of_supply.toString()
    }
    console.log(this.invoice_model.place_of_supply, "ppppppp");
    this.calculation();
    this.calculateTax();
    this.calculateGst();
  }

  parentFunction1(data1: any) {
    for (let r of data1) {
      r.discount_in_rs = 0
      r.discount_value_add = 0
    }
    this.open = false
    console.log(data1, 'from parent');
    let data = Object.assign([], data1)
    for (let m of data) {
      m.length_c = 1
      m.breadth = 1
    }
    if (this.toggleItem) {
      let index = this.items.findIndex((item: any) => data.some((d: any) => d.id === item.id));
      const indices: number[] = this.items.reduce((acc: number[], item: any, index: number) => {
        if (item.item_info && item.item_info.id !== undefined) {
          console.log('call first ----');

          if (data.some((d: any) => d.id === item.item_info.id)) {
            acc.push(index);
          }
          return acc;
        } else if (item.id !== undefined) {
          console.log('call 2nd +++');

          if (data.some((d: any) => d.id === item.id)) {
            acc.push(index);
          }
          return acc;
        }
      }, []);
      console.log('show quantity', indices);
      if (indices.length !== 0) {
        console.log('call indices');

        for (let pt of indices) {
          if (pt > -1) {
            console.log('call indices2');

            if (this.items[pt].item_type === 1 || this.items[pt].item_info.item_type === 1) {
              console.log(this.items, 'call indices3');
              console.log(JSON.stringify(this.items[pt]), 'kkkuio');
              this.items[pt].quantity = this.items[pt].quantity + 1;
              console.log(JSON.stringify(this.items[pt]), 'hhhhhh');
            }
          }
        }
      }
      const unmatchedData = data.filter((d: any) => !this.items.some((item: any) => {
        if (item.item_info && item.item_info.id !== undefined) {
          return item.item_info.id === d.id
        } else if (item.id !== undefined) {
          return item.id === d.id
        }
      }));
      console.log(unmatchedData, '8899');
      this.items = this.items.concat(unmatchedData);
      console.log(this.items, 'kk89');

    } else {
      this.items = this.items.concat(data);
    }
    if (data.c_party == undefined) {
      if (data.discount == null) {
        data.discount = 0;
      }
      if (data.c_party == false) {
        console.log("hide party");
        this.itemComponent = false;
      }
      console.log(this.items);
      this.subTotal = this.total()
      console.log(this.invoice_model.total_amount, "tt");
      this.total_taxable_amount = this.total_taxable();
      this.itemComponent = false
    }
    this.itemEmitted = data
    console.log(this.itemEmitted, 'emitted items');
    // for (let t of this.items) {

    //   if (this.invoice_model.enable_value_addition) {
    //     t.value_addition = 0
    //   } else {
    //     t.value_addition = null
    //   }
    //   if (t.item_type == 1) {
    //     console.log(t.units, "units");
    //     if (t.units.length > 0) {
    //       console.log('inside if');
    //       let i = 0
    //       this.unit = this.items[i].units

    //       for (let s of t.units) {
    //         t.units[i].unit = t.units[i].unit.slice(0, 3)
    //         if (t.other_unit != null) {
    //           t.units[i].unit = t.other_unit
    //           t.abc = t.units[0]

    //         } else {
    //           t.abc = t.units[0]
    //         }
    //         i++;
    //       }
    //     }
    //     else {

    //       t.abc = { id: null, type: null, unit: null }
    //       console.log('inside else');
    //     }
    //   }
    //   else {
    //     t.abc = { id: null, type: null, unit: null }
    //   }
    // }
    for (let t of this.items) {
      if (this.invoice_model.enable_value_addition) {
        t.value_addition = 0
      } else {
        t.value_addition = null
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
            // if(this.invoice_model.has_free_qty){
            //   this.items[i].free_unit = this.items[i].units.filter((object: { type: any; }) => {
            //     return object.type === s.free_unit;
            //   })
            //   this.items[i].free_unit=this.items[i].free_unit[0]
            // }else{
            //   this.items[i].free_unit = { id: null, type: null, unit: null }
            // }
            i++;
            console.log(s.type);
          }
        }
        else {
          t.abc = { id: null, type: null, unit: null }
          // t.free_unit = { id: null, type: null, unit: null }
          console.log('inside else');
        }
      }
      else {
        t.abc = { id: null, type: null, unit: null }
        // t.free_unit = { id: null, type: null, unit: null }
      }
    }
    this.subTotal = this.total();
    this.total_taxable_amount = this.total_taxable();
    this.calculateTax();
    this.calculation();
    console.log(this.itemEmitted, 'after emit');
    let index = this.itemEmitted.findIndex((item) => item)
    console.log(index, this.items.length, 'index of emitted');

    if (this.itemEmitted[0].multiple_rates) {
      this.selectgstrate(this.itemEmitted[0], this.items.length - 1)
    }
  }

  unitChange(unit: any, i: any) {
    if (unit.type == 1) {
      console.log(this.items[i], "this.items[i]");
      if (this.items[i].item_info != undefined) {
        this.items[i].rate = this.items[i].item_info.conversion_rate_sales;
        this.items[i].purchase_rate = this.items[i].item_info.conversion_rate_purchase;
      } else {
        this.items[i].oldRate = this.items[i].rate;
        this.items[i].oldPurchaseRate = this.items[i].purchase_rate;
        this.items[i].rate = this.items[i].conversion_rate_sales;
        this.items[i].purchase_rate = this.items[i].conversion_rate_purchase;
      }
    }
    else {
      if (this.items[i].item_info != undefined) {
        this.items[i].rate = this.items[i].item_info.rate
        this.items[i].purchase_rate = this.items[i].item_info.purchase_rate;
      } else {
        this.items[i].rate = this.items[i].oldRate;
        this.items[i].purchase_rate = this.items[i].oldPurchaseRate;
      }
      console.log(this.items[i], "this.items[i]");

    }
    this.calculation();
  }


  // calculation() {
  //   let index = 0;
  //   for (let i of this.items) {
  //     if (i.Gst_tax_rate == -1) {
  //       this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
  //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
  //     } else {
  //       this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
  //       this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //       this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
  //     }
  //     this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
  //     if (i.Gst_tax_rate == -1) {
  //       this.items[index].sales_tax = 0
  //       this.items[index].purchase_tax = 0
  //     } else {
  //       this.items[index].sales_tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].purchase_tax = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     }

  //     this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     index++
  //   }
  //   // this.total_taxable_amount = Math.round(this.total_taxable() + Number.EPSILON)

  //   // if (this.invoice_model.discount_type === '1') {
  //   //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   // } else if (this.invoice_model.discount_type === '2') {
  //   //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
  //   // }
  //   // this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100

  //   // if (this.round_off == true) {
  //   //   this.subTotal = Math.round((this.subTotal))

  //   // }
  //   // else {
  //   //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   //   this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   //   this.invoice_model.extraCharged = Number(this.charge)
  //   // }
  //   if (this.invoice_model.discount_type === '1') {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   } else if (this.invoice_model.discount_type === '2') {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
  //   }
  //   this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100
  //   // this.total_amount = Math.round(this.total() - ((this.invoice_model.discountTotal * this.total()) / 100) + Number.EPSILON)
  //   if (this.round_off) {
  //     this.subTotal = Math.round((this.subTotal))
  //   }
  //   else {
  //     // this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //     this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   }
  //   console.log(this.subTotal, this.invoice_model.extraCharged, this.invoice_model.discountTotal, "prajj");

  //   this.totaltax = Math.round(this.calculateTax() + Number.EPSILON)
  //   this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
  //   this.total_cess()
  //   this.calculateGst()

  // }

  calculation() {
    console.log(this.items, 'checking ced');

    let index = 0;
    for (let i of this.items) {
      if (i.Gst_tax_rate == -1 || this.invoice_model.select_Tax == '2') {
        if (!this.invoice_model.enable_value_addition) {
          this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))
          this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))
          this.discountcala()
        } else {
          this.discountcala()
          this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate))
          this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + (i.value_addition / 100 * (i.quantity * i.purchase_rate))

        }
        // this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
        this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100

        // this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((0 + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
        this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
      } else {
        if (!this.items[index].cess_on_mrp) {
          // console.log("checking1");
          if (!this.invoice_model.enable_value_addition) {
            this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            this.discountcala()
          } else {
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            console.log('working 1');
          }
          this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
          this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
          // console.log( this.items[index].sales_prices,"checking1");

        } else {
          if (!this.invoice_model.enable_value_addition) {
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

          } else {
            this.discountcala()
            this.items[index].sales_prices = (i.quantity * i.rate) + (i.value_addition / 100 * (i.quantity * i.rate)) - (i.discount / 100 * (i.quantity * i.rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].purchase_prices = (i.quantity * i.purchase_rate) + (i.value_addition / 100 * (i.quantity * i.purchase_rate)) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + ((i.Gst_tax_rate) / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
           
          }
          this.items[index].sales_prices = this.items[index].sales_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))
          this.items[index].sales_prices = Math.round((this.items[index].sales_prices + Number.EPSILON) * 100) / 100
          this.items[index].purchase_prices = this.items[index].purchase_prices + ((i.quantity * this.items[index].mrp) * ((i.cess_tax_rate) / 100))
          this.items[index].purchase_prices = Math.round((this.items[index].purchase_prices + Number.EPSILON) * 100) / 100
          // console.log( this.items[index],"checking2");

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
            this.discountcala()
            this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
            this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
          } else {
            this.discountcala()
            this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate)))))
            this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + (i.value_addition / 100 * (i.quantity * i.purchase_rate))))
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + (i.value_addition / 100 * (i.quantity * i.purchase_rate))))
          }

          console.log(this.items[index].sales_prices, "checking1");

        } else {
          this.items[index].cess = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
          this.items[index].cessp = (i.quantity * this.items[index].mrp) * (i.cess_tax_rate / 100)
          // this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
          // this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
          if (!this.invoice_model.enable_value_addition) {
            this.discountcala()
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))

          } else {
            this.discountcala()
            this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)) + (i.value_addition / 100 * (i.quantity * i.rate))))
            this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + (i.value_addition / 100 * (i.quantity * i.rate))))

          }
          console.log(this.items[index].cess, "checking2");

        }
      }

      index++
    }
    this.total_taxable_amount = Number((this.total_taxable()).toFixed(2))
    console.log(this.subTotal, 'this.subTotal');

    // this.total_taxable_amount = Math.round(this.total_taxable() + Number.EPSILON)
    // this.subTotal = Number((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100)).toFixed(2))
    if (this.invoice_model.discount_type === '1' || this.invoice_model.discount_type === 1) {
      this.subTotal = Number((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100)).toFixed(2))
    } else if (this.invoice_model.discount_type === '2' || this.invoice_model.discount_type === 2) {
      this.subTotal = Number((this.total() - (((this.invoice_model.discountTotal)))).toFixed(2))
    }
    this.invoice_model.extraCharged = Number(this.charge)
    if (this.invoice_model.round_off) {
      this.subTotal = Math.round(((this.subTotal + Number(this.invoice_model.extraCharged))))

    } else {
      this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    }
    // this.subTotal = Math.round(((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON)

    // this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
    this.totaltax = Number(this.calculateTax().toFixed(2))
    this.receivable = Number((this.subTotal - this.invoice_model.received_amount).toFixed(2))

    // this.receivable = Math.round(((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON)
    this.total_cess()
    this.calculateGst()
  }

  // revCal() {
  //   let index = 0;
  //   for (let i of this.items) {
  //     if (i.Gst_tax_rate == -1) {
  //       i.rate = this.items[index].sales_prices / (i.quantity * (1 - (i.discount / 100) + ((0 + i.cess_tax_rate) / 100 - (i.discount / 100) * ((0 + i.cess_tax_rate) / 100))))
  //       i.rate = Math.round((i.rate + Number.EPSILON) * 100) / 100
  //       i.purchase_rate = this.items[index].purchase_prices / (i.quantity * (1 - (i.discount / 100) + ((0 + i.cess_tax_rate) / 100 - (i.discount / 100) * ((0 + i.cess_tax_rate) / 100))))
  //       i.purchase_rate = Math.round(i.purchase_rate)
  //     } else {
  //       i.rate = this.items[index].sales_prices / (i.quantity * (1 - (i.discount / 100) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 - (i.discount / 100) * ((i.Gst_tax_rate + i.cess_tax_rate) / 100))))
  //       i.rate = Math.round((i.rate + Number.EPSILON) * 100) / 100
  //       i.purchase_rate = this.items[index].purchase_prices / (i.quantity * (1 - (i.discount / 100) + ((i.Gst_tax_rate + i.cess_tax_rate) / 100 - (i.discount / 100) * ((i.Gst_tax_rate + i.cess_tax_rate) / 100))))
  //       i.purchase_rate = Math.round(i.purchase_rate)
  //     }
  //     this.items[index].cess = ((i.cess_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate)))))
  //     if (i.Gst_tax_rate == -1) {
  //       this.items[index].tax = 0
  //       this.items[index].taxp = 0
  //     } else {
  //       this.items[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
  //       this.items[index].taxp = (i.Gst_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     }
  //     this.items[index].cessp = (i.cess_tax_rate / 100 * ((i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
  //     console.log(i.rate, 'reverse cal');
  //     index++
  //   }
  //   this.total_taxable_amount = Math.round((this.total_taxable() + Number.EPSILON) * 100) / 100
  //   if (this.round_off == true) {
  //     this.subTotal = Math.round((this.subTotal))
  //   }
  //   else {
  //     this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //     this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //     this.invoice_model.extraCharged = Number(this.charge)
  //   }    
  //   if (this.invoice_model.discount_type === 1) {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal) * this.total()) / 100))) + Number.EPSILON) * 100) / 100)
  //   } else if (this.invoice_model.discount_type === 2) {
  //     this.subTotal = (Math.round((((this.total() - (((this.invoice_model.discountTotal))))) + Number.EPSILON) * 100) / 100)
  //   }
  //   this.subTotal = Math.round((((this.subTotal + Number(this.invoice_model.extraCharged))) + Number.EPSILON) * 100) / 100
  //   console.log(this.subTotal, this.invoice_model.extraCharged, this.invoice_model.discountTotal, "prajj");
  //   this.totaltax = Math.round(this.calculateTax() + Number.EPSILON)
  //   this.receivable = Math.round((((this.subTotal - this.invoice_model.received_amount)) + Number.EPSILON) * 100) / 100
  //   this.total_cess()
  //   this.calculateGst()

  // }

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
    if (this.invoice_model.round_off) {
      this.round_off = true
    }
    else {
      this.round_off = false
    }
    this.round_off = !this.round_off
    this.calculation()
  }


  total_taxable() {
    let ff = 0;
    let tt = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
      this.items.forEach(function (value) {
        ff = ((((value.rate * value.quantity) + (value.value_addition / 100 * (value.quantity * value.rate)) - (value.discount / 100 * (value.quantity * value.rate))) + ff));
      });
    }
    else {
      this.items.forEach(function (value) {
        ff = (Number((value.purchase_rate * value.quantity) + (value.value_addition / 100 * (value.quantity * value.purchase_rate)) - (value.discount / 100 * (value.quantity * value.purchase_rate))) + ff);
      });
    }
    this.total_taxable_amount = ff;
    return ff;
  }
  total() {
    let ff = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
      this.items.forEach(function (value) {
        ff = value.sales_prices + ff

      });
    }
    else {
      this.items.forEach(function (value) {
        ff = value.purchase_prices + ff;
      });
    }
    // this.total_amount = ff;
    this.subTotal = ff;
    return ff;
  }

  total_cess() {
    let ff = 0;

    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
      this.items.forEach(function (value) {
        ff = (value.cess + ff);
      });
    }
    else {
      this.items.forEach(function (value) {
        ff = (value.cessp + ff);
      });
    }
    this.total_cess_rate = ff
    console.log(this.total_cess_rate, "cesss");
    return ff;
  }
  calculateGst() {
    console.log("company gst", this.company_gst);
    console.log("party gst", this.placeOf);
    // if (this.company_gst == null) {
    //   // this.noTax = false

    // } else if (this.company_gst == "") {
    //   // this.noTax = false
    // }
    // if (this.company_gst) {
    //   this.company_gst = this.company_gst.slice(0, 2)
    //   // this.noTax = true
    // }
    if (this.placeOf !== this.company_gst) {
      if (this.company_gst !== null) {

        this.cgst = 0
        this.sgst = 0
        this.igst = this.totaltax

      } else {
        this.cgst = 0
        this.sgst = 0
        this.igst = 0
      }
    }
    if (this.placeOf == this.company_gst) {
      console.log(this.placeOf, "not equal");

      if (this.company_gst !== null) {

        this.igst = 0
        this.cgst = this.totaltax / 2
        this.sgst = this.totaltax / 2
      }
      else {
        this.cgst = 0
        this.sgst = 0
        this.igst = 0
      }
    }
  }
  // calculateGst() {
  //   console.log(this.placeOf, this.company_gst, "gstgst");

  //   if (this.placeOf == this.company_gst) {
  //     if (this.company_gst !== null) {
  //       this.igst = 0
  //       this.cgst = this.totaltax / 2
  //       this.sgst = this.totaltax / 2
  //     }
  //     else {
  //       this.cgst = 0
  //       this.sgst = 0
  //       this.igst = 0
  //     }
  //   }
  //   if (this.placeOf !== this.company_gst) {
  //     if (this.company_gst !== null) {
  //       this.cgst = 0
  //       this.sgst = 0
  //       this.igst = this.totaltax
  //     }
  //     else {
  //       this.cgst = 0
  //       this.sgst = 0
  //       this.igst = 0
  //     }
  //   }

  // }
  calculateTax() {
    let ff = 0;
    if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
      this.items.forEach(function (value) {
        ff = value.tax + ff;
      });
    }
    else {
      // console.log('total cal for pur');
      this.items.forEach(function (value) {
        ff = value.taxp + ff;
      });
    }
    this.totaltax = ff;
    // console.log("dsfads", ff)
    return ff;

  }
  putinarray() {
    //let tt=0
    for (let i of this.items) {
      let item_id = i.items
      if (i.items === undefined) {
        item_id = i.id
      }
      if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
        console.log("put if running", this.items);
        this.finalItem.push({
          unit: i.abc.id,
          unit_type: i.abc.type,
          items: item_id,
          quantity: i.quantity,
          discount: Number(i.discount),
          rate: i.rate,
          total_amount: i.sales_prices,
          tax_percent: i.Gst_tax_rate,
          tax_amount: Number((i.tax).toFixed(2)),
          cess: i.cess_tax_rate,
          cess_amount: i.cess,
          tax_rate_id: i.tax_rate_id,
          cess_tax_rate_id: i.cess_tax_rate_id,
          value_addition: i.value_addition,
          item_name: i.item_name,
          discount_in_rs: i.discount_in_rs,
          discount_value_add: i.discount_value_add,
          hsn_code: i.hsn_code,
          // free_unit: i.free_unit.type,
          free_qty: i.free_qty,
          lxb: { length_c: Number(i.length_c), breadth: Number(i.breadth) }
        });
      }
      else {
        console.log("put else running");

        this.finalItem.push({
          unit: i.abc.id,
          unit_type: i.abc.type,
          items: item_id,
          quantity: i.quantity,
          discount: Number(i.discount),
          rate: i.purchase_rate,
          total_amount: i.purchase_prices,
          tax_percent: i.Gst_tax_rate,
          tax_amount: Number((i.taxp).toFixed(2)),
          cess: i.cess_tax_rate,
          tax_rate_id: i.tax_rate_id,
          cess_tax_rate_id: i.cess_tax_rate_id,
          cess_amount: i.cessp,
          value_addition: i.value_addition,
          item_name: i.item_name,
          discount_in_rs: i.discount_in_rs,
          discount_value_add: i.discount_value_add,
          hsn_code: i.hsn_code,
          // free_unit: i.free_unit.type,
          free_qty: i.free_qty,
          lxb: { length_c: Number(i.length_c), breadth: Number(i.breadth) }
        });
      }
    }
  }
  refreshInvoice() {
    //this.router.navigateByUrl("/sales-invoice")
    window.location.assign('/sales-invoice');
    console.log("func calling refresh");

  }
  editInvoiceNo() {
    console.log("edit");
    this.dateChange()
    // this.modal.dismiss();
    this.model1 = false
  }
  async saveInvoice() {
    console.log("itemssssss", this.items);
    this.putinarray()
    this.invoice_model.Igst = this.igst
    this.invoice_model.cgst = this.cgst
    this.invoice_model.sgst = this.sgst
    this.invoice_model.taxable_amount = this.total_taxable_amount
    this.invoice_model.total_amount = this.subTotal
    this.invoice_model.party = this.party_details.id
    this.invoice_model.items = this.finalItem
    this.invoice_model.discount = this.invoice_model.discountTotal
    this.invoice_model.discount_type = this.invoice_model.discount_type
    this.invoice_model.cess = this.total_cess_rate
    this.invoice_model.partial_paid = this.get
    this.invoice_model.receivable = this.finalAmount;
    this.invoice_model.extra_charges_lst = this.exp1

    console.log(this.finalItem, "pppppppppppppppppppp");
    console.log(this.invoice_model, "invoice");
    this.invoiceFunction.emit(this.invoice_model)

    if (this.finalItem.tax) {
      this.invoice_model.items.tax_amount = Number((this.finalItem.tax).toFixed(2))
    }
    if (this.finalItem.taxp) {
      this.invoice_model.items.tax_amount = Number((this.finalItem.taxp).toFixed(2))
    }
    if (this.finalItem.cess) {
      this.invoice_model.items.cess = this.finalItem.cess
    }
    if (this.items.tax_percent == -1) {
      console.log("expmted received in save",);
      this.invoice_model.items.tax_percent = -1
    }
    if (this.finalItem.cessp) {
      this.invoice_model.items.cess = this.finalItem.cessp
    }
    if (this.invoice_model.invoice_no && this.invoice_model.invoice_date && this.invoice_model.items.length && this.invoice_model.party) {
      this.submit = true
      console.log(this.submit);

    } else {
      this.submit = false
      console.log(this.submit);
    }
    if (this.submit == true) {
      let companyId = this.api.getCompanyId()
      this.invoice_model.company_name = companyId;
      this.invoice_model.invoice_id = this.billData.invoice_id
      this.invoice_model.einvoice = this.billData.einvoice
      this.invoice_model.invoice_id = this.billData.ewb
      let header = this.api.getHeader();
      console.log("this.invoice_model", this.invoice_model);
      console.log(this.invSett.extra_fields, 'invSett.extrafields');
      if (this.invoice_model.invoice_type == 1) {
        if (this.invSett.extra_fields.length != 0) {
          const extraF = this.invSett.extra_fields.map(({ extra_fields, extra_fieldsValue }) => ({ [extra_fields]: extra_fieldsValue }));
          console.log(extraF, 'extra fields');
          this.invoice_model.extra_fields = extraF
          console.log(this.invoice_model, 'invoice model create');
        } else {
          this.invoice_model.extra_fields = []
        }
      }
      console.log('final test submit', this.invoice_model);
      // if(this.s){
      this.api.editParticularInvoice(this.invoice_model, header).subscribe(async (response: any) => {
        console.log("status", response);
        if (response.status_code == 0) {
          this.finalItem = []
          const toast = await this.toastController.create({
            message: response["message"],
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          this.modalCtrl.dismiss(response.data)

        }
        if (response.status_code == 3) {
          console.log(this.invoice_type, "msndsajkn nxsan jsa");
          this.invoice_type == 3

          this.invoiceFunction.emit(this.invoice_model)
          if (this.invoice_model.invoice_type == 1) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.SALES INVOICE UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_model.invoice_type == 2) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE INVOICE UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_model.invoice_type == 4) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE RETURN INVOICE UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_model.invoice_type == 3) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.SALES RETURN INVOICE UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_model.invoice_type == 5) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.QUOTATION UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_type == 6) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.CHALLAN UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_type == 7) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PROFORMA INVOICE UPDATED SUCCESSFULLY"),
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          }
          if (this.invoice_type == 10) {
            const toast = await this.toastController.create({
              message: this.translate.instant("MESSAGE.PURCHASE ORDER UPDATED SUCCESSFULLY"),
              duration: 3000,
              color: "warning"
            });
            toast.present();
          }
          this.downloadUrl = 'https://api.esarwa.com/api/create_pdf/' + response["data"] + '/';
        }
      });

      async (error) => {
        console.log("pppp", error);

        const toast = await this.toastController.create({
          message: error,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    }
    else if (this.submit == false) {
      if (!this.invoice_model.items.length) {
        console.log(this.invoice_model, "invoice");
        alert(this.translate.instant('MESSAGE.PLEASE ADD ITEMS'))
      }
      else if (!this.invoice_model.invoice_no) {
        console.log(this.invoice_model, "invoice");
        alert(this.translate.instant('MESSAGE.PLEASE ENTER INVOICE NUMBER'))
      }
    }
    // this.invoice_head()
    this.setOpen()

  }
  async einvoi() {
    const toast = await this.toastController.create({
      message: 'IRN is already generated for this invoice',
      duration: 5000,
      color: "warning",
      position: 'middle'
    });
    toast.present();
  }
  setOpen() {
    console.log("dismisss");
    this.modalCtrl.dismiss()
  }
  // downloadEinvoicePDF(id: any) {
  //   this.downloadEinvoicePDF1 = 'https://api.esarwa.com/einvoicing/create_pdf/' + id + '/';
  //   @Output() invoiceFunction: EventEmitter<any> = new EventEmitter();
  // }
  downloadEinvoicePDF(id: any) {
    this.downloadEinvoicePDF1 = "https://api.esarwa.com/einvoicing/create_pdf/" + id + "/"
    this.downloadEinvoiceButton = true
    this.invoiceFunction.emit(id)
  }

  async createEInvoice(data: any) {
    console.log(data, "invoice");
    if (this.eInvoice == true) {
      let confirmMsg = 'Are you sure to create EInvoice'
      if (!confirm(confirmMsg)) {
        setTimeout(() => {
          this.eInvoice = false;
        });
      } else {
        let company_id = this.api.getCompanyId()
        this.api.geteinvoice({ "invoice_id": this.invoiceD, "company_id": company_id }).subscribe(async (response: any) => {
          console.log(response, "e invoice result");
          if (response.status == 200) {
            this.downloadEinvoiceButton = true
            this.downloadEinvoicePDF(data);
            const toast = await this.toastController.create({
              message: "E-Invoice generated Successfully",
              duration: 5000,
              position: 'top',
              color: 'success'
            });
            toast.present();
          } else if (response.status == 500) {
            this.einvoiceErrorInfo = response.msg;
            this.einvoiceErrorInfoShow = true;
            // this.einvoice=false
            const toast = await this.toastController.create({
              message: this.einvoiceErrorInfo,
              duration: 5000,
              position: 'top',
              color: 'danger'
            });
            toast.present();

          }
        })
      }
    }
  }

  // async createEInvoice(data: any) {
  //   console.log(this.invoiceD,'invoicedssaw');

  //     const alert = await this.alertCtrl.create({
  //       header: 'Are you sure to create EInvoice',
  //       buttons: [
  //         {
  //           text: 'OK',
  //           role: 'done',
  //           handler: () => {
  //             let company_id = this.api.getCompanyId()
  //             this.api.geteinvoice({ "invoice_id": this.invoiceD, "company_id": company_id }).subscribe(async (response: any) => {
  //               console.log(response, "e invoice result");
  //               if (response.status == 200) {
  //                 this.downloadEinvoiceButton = true
  //                 this.downloadEinvoicePDF(data);
  //                 const toast = await this.toastController.create({
  //                   message:"E-Invoice generated Successfully",
  //                   duration: 5000,
  //                   position: 'top',
  //                   color:'success'
  //                 });
  //                 toast.present();
  //               } else if (response.status == 500) {
  //                 this.einvoiceErrorInfo = response.msg;
  //                 this.einvoiceErrorInfoShow = true;
  //                 // this.einvoice=false
  //                 const toast = await this.toastController.create({
  //                   message: this.einvoiceErrorInfo,
  //                   duration: 5000,
  //                   position: 'top',
  //                   color:'danger'
  //                 });
  //                 toast.present();

  //               }
  //             })
  //           }

  //         },
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //         }
  //       ]});
  //     await alert.present();

  // }

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


  createEwayBill(data: any) {
    this.api.createEwb({ invoice_id: data }).subscribe(async (response: any) => {
      console.log("create eway bill response", response);
      if (response.status == 200) {
        console.log(response.data, "eway bill created");
        this.ewaybillDownload = true
        this.get_ewb(data);
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 4000,
          position: 'top',
          color: 'success'
        });
        toast.present();
      } else {
        const toast = await this.toastController.create({
          message: response.msg,
          duration: 4000,
          position: 'top',
          color: 'danger'
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
        // this.ebarcode = this.e.ewbNo + "/" + this.e.userGstin + "/" + this.e.ewayBillDate;
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

  addAnotherCharges() {
    this.addCharge = true
    let data = {
      extra_amt: 0,
      extra_charges: '',
    }
    this.exp1.push(data);
    console.log(this.exp1, "amount");

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
    this.calculation()
  }
  dismis() {
    this.modalCtrl.dismiss()
  }
  dismiss1() {
    this.model1 = false
  }
  addExtraFeild() {
    if (this.invoice_model.isChecked == true) {
      this.poNo = true;
    } else {
      this.poNo = false;
    }

    if (this.invoice_model.isChecked1 == true) {
      this.ewayNo = true;
    } else {
      this.ewayNo = false;
    }

    if (this.invoice_model.isChecked2 == true) {
      this.vehicleNo = true;
    } else {
      this.vehicleNo = false;
    }
    this.modalCtrl.dismiss()
  }

  ClickNewRow() {

    this.addF = !this.addF
    console.log("ok", this.addF);
  }
  invPrefix() {
    if (this.invoice_model.isChecked3 == true) {
      this.prefix12 = true;
    } else {
      this.prefix12 = false;
    }
    // this.prefix = true;
  }
  stateDataFunction() {
    this.api.post3("placeofsupply/", null).subscribe((response: any) => {
      this.place_of_supply = response.data
      console.log(this.place_of_supply, 'this.statesData');

    });
  }
  supply() {
    // this.api.receivedState().subscribe((response: any) => {
    //   this.place_of_supply = response.data
    //   console.log(this.place_of_supply,'placeofsup');
      
    //   console.log("state", this.place_of_supply);
    //   this.place = this.place_of_supply
    //   if (this.place) {
    //     console.log(this.place,'looo');
        
    //     this.placeOf = this.party_details.gst_compare
    //     this.place.place_of_supply = Number (this.placeOf)
    //     console.log(this.place.place_of_supply, "mooooo");

    //     if (this.invoice_model.place_of_supply < 10) {
    //       this.placeOf = "0" + this.invoice_model.place_of_supply.toString()
    //       console.log(this.placeOf, "ppppppp");
    //     }
    //     else {
    //       this.placeOf = this.invoice_model.place_of_supply.toString()
    //       console.log(this.placeOf, "else");
    //     }
    //   }
    //   this.calculation();
    //   this.calculateTax();
    //   this.calculateGst();
    // });

    if (this.invoice_model.place_of_supply) {
      if (this.invoice_model.place_of_supply < 10) {
        this.placeOf = "0" + this.invoice_model.place_of_supply.toString()
      }
      else {
        this.placeOf = this.invoice_model.place_of_supply.toString()
      }
    }

    this.calculateTax()
    this.calculateGst()
    this.calculation()
  }
  onChange() {
    if (this.invoice_model.checked) {
      this.get = 1
    } else {
      this.get = 0
    }
  }
  async setting() {
    console.log("click");
    const modal = await this.modalCtrl.create({
      component: InvoiceSettingPage,
      breakpoints: [0, 0.3, 0.5, 1],
      initialBreakpoint: 0.8
    });
    modal.onDidDismiss()
      .then((data1) => {
        console.log("closedata");
        let companyId = this.api.getCompanyId()
        let header = this.api.getHeader()
        // let data = { company_id: companyId, invoice_id: this.billData.invoice_id }

        this.api.getParticularInvoice({ company_id: companyId, invoice_id: this.billData.invoice_id }, header).subscribe((response: any) => {
          console.log("get_particular_invoice", response);
          let array21 = []
          if (response.extra_fields != null) {
            array21 = response.extra_fields;
          }

          this.invoice_type = response.invoice_type
          this.invoiceD = response.id
          this.downloadInv = "https://api.esarwa.com/api/create_pdf/" + this.invoiceD;
          let term = this.invoice_type;
          this.dictionary = this.dictionary.filter((dictionary) => {
            return dictionary.type.indexOf(term) > -1;
          });

          this.invoice_model = response
          this.invoice_model.place_of_supply = Number(response.place_of_supply)
          this.invoice_model.party = response.party
          this.items = response.items
          let i = 0
          this.item = this.items[i].item_info
          console.log("ite", this.item);
          console.log(response, "psk");

          this.total_taxable_amount = response.taxable_amount
          this.igst = response.Igst
          this.cgst = response.cgst
          this.sgst = response.sgst
          this.p = response.place_of_supply

          if (response.invoice_type == 1) {
            let company = this.api.getCompanyId()
            this.api.post3('get_invoice_settings/', { "company": company, "type": response.invoice_type }).subscribe((response: any) => {
              this.invSett = response
              this.invSett.extra_fields = JSON.parse(response.extra_fields)
            },
              async (error) => {
                console.log("pppp", error);

                const toast = await this.toastController.create({
                  message: this.translate.instant("MESSAGE.FAILED"),
                  duration: 5000,
                  position: 'middle'
                });
                toast.present();
              })
          }
          // this.description_allow = response.description_allow
          this.invoice_model.po_no = response.po_no
          this.invoice_model.eway_bill_no = response.eway_bill_no
          this.invoice_model.vehicle_no = response.vehicle_no


          let n = 0
          for (let i of response.items) {
            this.items[n].item_name = i.item_info.item_name
            if (i.item_info.item_type == 1) {
              this.items[n].units = i.item_info.units
              if (this.items[n].units.length > 0) {
                this.items[n].abc = this.items[n].units.filter((object: { id: any; }) => {
                  return object.id === i.unit;
                });
                this.items[n].abc = this.items[n].abc[0]
                let t = 0
                for (let p of this.items[n].units) {
                  if (i.item_info.other_unit != null) {
                    this.items[n].units[t].unit = i.item_info.other_unit
                  } else {
                    this.items[n].units[t].unit = this.items[n].units[t].unit.slice(0, 3)
                  }
                  t++
                }
              } else {
                this.items[n].abc = { id: i.unit, type: i.unit_type, unit: null }
              }
            } else {
              this.items[n].abc = { id: null, type: null, unit: null }
            }

            n++

          }
          let company = this.api.getCompanyId()
          let data = { company_id: company, party_id: this.invoice_model.party }

        })
        let companyDetails = JSON.parse(sessionStorage.getItem("currentCompany"));
        this.company_gst = companyDetails[0].gst_number

        if (this.invoice_type == 1 || this.invoice_type == 3) {
          this.api.getInvoiceNo(companyId, header).subscribe((response: any) => {
            console.log(response, "prefix");

            if (response.status != 500) {
              // this.invoice_model.invoice_no = response.sales_invoice_no;
              if (response.invoice_settings.prefix != null) {
                this.invoice_model.invoice_no = response.invoice_settings.prefix + this.invoice_model.invoice_no;
              }
            }
          })
        }
        const user = data1; // Here's your selected user!
      });
    return await modal.present();
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
    // // let  a=1000
    // (data.rate > item.to_rate || !item.to_rate)
    if (!this.open) {
      if (data.multiple_rates) {
        let t = []
        if (this.invoice_type == 1 || this.invoice_type == 3 || this.invoice_type == 5 || this.invoice_type == 6 || this.invoice_type == 7) {
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
        // this.calculateTax();
        this.calculation();

      }
    }
  }
  ratechange(i: any, d: any) {
    console.log('iam groot');

    console.log(d, i, "ratechange");
    let last_selected = i
    let c = this.gstData.filter((item) => item.id === Number(i.tax_rate_id))
    console.log(c, "c");

    if (c.length != 0) {
      console.log('g1');

      this.items[d].Gst_tax_rate = (c[0].gst_tax_rate);
      this.items[d].tax_rate_id = (c[0].id)
    } else {
      console.log('g2');

      this.items[d].Gst_tax_rate = (last_selected.Gst_tax_rate);
      this.items[d].tax_rate_id = (last_selected.tax_rate_id)
    }
    console.log(this.items[d].Gst_tax_rate, 'gsttaxratetttd');
    console.log(this.items[d], 'gsttaxratetttd');


    this.calculation();
    this.calculateTax();
  }

  changedopen() {
    this.open = false
  }

  WHFunction(t: any) {
    if (!this.open) {
      this.items[t].quantity = this.items[t].breadth * this.items[t].length_c
      this.calculation();
    }
  }
  retuntoggel(s: any) {
    this.dictionary = [{
      header: this.translate.instant('HEADER.EDIT SALES INVOICE'),
      type: "1",
      label: 'Sales Invoice No.',
      sButton: "Save Invoice",
      date: "Invoice Date",

    }, 
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE INVOICE'),
      type: "2",
      label: "Purchase Invoice No.",
      sButton: "Save Invoice",
      date: "Invoice Date"
    }, 
    {
      header: this.translate.instant('HEADER.EDIT SALES RETURN'),
      type: "3",
      label: "Credit Note No",
      date: "Invoice Date",
      sButton: "Save Invoice"

    },
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE RETURN'),
      type: "4",
      label: "Debit Note No.",
      sButton: "Save Invoice",
      date: "Invoice Date"

    },
    {
      header: this.translate.instant('HEADER.EDIT QUOTATION'),
      type: "5",
      label: "Quotation No.",
      date: "Quotation Date",
      sButton: "Save quotation"

    },
    {
      header: this.translate.instant('HEADER.EDIT DELIVERY CHALLAN'),
      type: "6",
      label: "Challan No.",
      sButton: "Save Challan",
      date: "Challan Date"
    },
    {
      header: this.translate.instant('HEADER.EDIT PROFORMA INVOICE'),
      type: "7",
      label: "Proforma No.",
      date: "Proforma Date",
      sButton: "Save Proforma"
    },
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE ORDER'),
      type: "10",
      label: "Purchase Order No.",
      date: "Purchase Order Date",
      sButton: "Save Purchase Order"
    }
    ]
    console.log(s, 'salesR');
    if (s) {
      this.Convert = true
      let companyId = this.api.getCompanyId()
      let header = this.api.getHeader();
      this.invoice_model.invoiceType == 3
      console.log(this.invoice_model.invoiceType, "lllaaabbel");
      this.invoice_type == 3
      this.invoice_typek(3)
      // this.invoice_model.against_inv_no=this.invoice_model.invoice_no
      this.invoice_model.against_inv = this.invoiceD
      this.api.getInvoiceNo(companyId, header,).subscribe((response: any) => {
        response.invoice_settings.type == 3
        this.invoice_model.invoice_no = response.invoice_settings.prefix + response.sales_return_no;
        this.invoice_model.invoice_type = 3;
        this.invoice_model.invoice_type == 3;
        console.log(this.invoice_model.invoice_type, "prefixxxinnn");
        console.log(this.salesR, 'salesR');

      })

    } else {
      this.Convert = false
      this.invoice_model.invoice_type = 1
      this.invoice_type111 = this.invoice_type111
      this.invoice_model.invoice_no = this.inovicereturnno
      this.invoice_typek(this.invoice_type)
      this.salesR = null
      this.salesReturnConvert = false
      this.invoice_model.against_inv_no = null
      this.invoice_model.against_inv = null
      console.log(this.inovicereturnno, "nnnnnnn");
      console.log(this.invoice_type111, this.invoice_model.invoice_type, "elseeee");

    }
  }

  purchasereturn(s: any) {
    this.dictionary = [{
      header: this.translate.instant('HEADER.EDIT SALES INVOICE'),
      type: "1",
      label: this.translate.instant("MESSAGE.SALES INVOICE NO."),
      sButton: "Save Invoice",
      date: "Invoice Date",

    }, 
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE INVOICE'),
      type: "2",
      label: "Purchase Invoice No.",
      sButton: "Save Invoice",
      date: "Invoice Date"
    }, 
    {
      header: this.translate.instant('HEADER.EDIT SALES RETURN'),
      type: "3",
      label: "Credit Note No",
      date: "Invoice Date",
      sButton: "Save Invoice"

    },
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE RETURN'),
      type: "4",
      label: "Debit Note No.",
      sButton: "Save Invoice",
      date: "Invoice Date"

    },
    {
      header: this.translate.instant('HEADER.EDIT QUOTATION'),
      type: "5",
      label: "Quotation No.",
      date: "Quotation Date",
      sButton: "Save quotation"

    },
    {
      header: this.translate.instant('HEADER.EDIT DELIVERY CHALLAN'),
      type: "6",
      label: "Challan No.",
      sButton: "Save Challan",
      date: "Challan Date"
    },
    {
      header: this.translate.instant('HEADER.EDIT PROFORMA INVOICE'),
      type: "7",
      label: "Proforma No.",
      date: "Proforma Date",
      sButton: "Save Proforma"
    },
    {
      header: this.translate.instant('HEADER.EDIT PURCHASE ORDER'),
      type: "10",
      label: "Purchase Order No.",
      date: "Purchase Order Date",
      sButton: "Save Purchase Order"
    }
    ]
    console.log(s, 'salesR');
    if (s) {
      this.Convert = true
      this.invoicetypoo = 4
      this.invoice_typek(4)
      this.purchaseReturnConvert = true
      this.invoice_model.against_inv_no = this.number_invoice
      this.invoice_model.against_inv = this.idReturn
      this.invoice_model.invoice_no = null
    } else {
      this.Convert = false
      this.invoicetypoo = this.changeType
      this.invoice_model.invoice_no = this.number_invoice
      this.invoice_typek(this.invoice_type)
      this.purchaseR = null
      this.salesReturnConvert = false
      this.invoice_model.against_inv_no = null
      this.invoice_model.against_inv = null
    }

  }
  // purchaseinvoice(b:any,a:any){
  //   this.dictionary = [{
  //     type: "1",
  //     label: this.translate.instant("MESSAGE.SALES INVOICE NO."),
  //     button: "Save Invoice",
  //     date: "Invoice Date",

  //   }, {
  //     type: "2",
  //     label: "Purchase Invoice No.",
  //     button: "Save Invoice",
  //     date: "Invoice Date"
  //   }
  //     , {
  //     type: "3",
  //     label: "Credit Note No",
  //     date: "Invoice Date",
  //     button: "Save Invoice"

  //   },
  //   {
  //     type: "4",
  //     label: "Debit Note No.",
  //     button: "Save Invoice",
  //     date: "Invoice Date"

  //   },
  //   {
  //     type: "5",
  //     label: "Quotation No.",
  //     date: "Quotation Date",
  //     button: "Save quotation"

  //   },
  //   {

  //     type: "6",
  //     label: "Challan No.",
  //     button: "Save Challan",
  //     date: "Challan Date"
  //   },
  //   {
  //     type: "7",
  //     label: "Proforma No.",
  //     date: "Proforma Date",
  //     button: "Save Proforma"
  //   }, 
  //   {
  //     type: "10",
  //     label: "Purchase Order No.",
  //     date: "Purchase Order Date",
  //     button: "Save Purchase Order"
  //   },
  //   {
  //     type: "11",
  //     label: "Sales Order No.",
  //     date: "Sales Order Date",
  //     button: "Save Sales Order"
  //   }
  //   ]

  //   if (a) {
  //     var p = JSON.parse(JSON.stringify(this.po_item_list))
  //     console.log(p,this.po_order,'popo');
  //     let e=[]
  //     for(let ut of p){
  //       for(let rr of this.po_order){
  //         if(ut.items==rr.item_id){
  //           e.push(ut)
  //         }
  //         }
  //     }
  //     this.hide_list=true
  //     // this.dataSource = new MatTableDataSource(e)
  //     let n=0
  //   for(let i of this.dataSource.data){
  //   if (i.unit !== null) {
  //     if (i.item_info.item_type == 1) {
  //       this.dataSource.data[n].units = i.item_info.units
  //       if (this.dataSource.data[n].units.length > 0) {

  //         this.dataSource.data[n].abc = this.dataSource.data[n].units.filter((object: { id: any; }) => {
  //           return object.id === i.unit;
  //         });
  //         this.dataSource.data[n].abc = this.dataSource.data[n].abc[0]
  //         console.log(this.name[n].abc, "now item info abc");

  //         let t = 0
  //         for (let p of this.dataSource.data[n].units) {
  //           // this.name[n].units[t].unit = this.name[n].units[t].unit.slice(0, 3)
  //           if (i.item_info.other_unit != null) {
  //             this.dataSource.data[n].units[t].unit = i.item_info.other_unit
  //           } else {
  //             this.dataSource.data[n].units[t].unit = this.dataSource.data[n].units[t].unit.slice(0, 3)
  //           }
  //           t++
  //         }
  //       } else {
  //         this.dataSource.data[n].abc = { id: i.unit, type: i.unit_type, unit: null }
  //       }
  //     } else {
  //       this.dataSource.data[n].abc = { id: null, type: null, unit: null }
  //     }
  //   } else {
  //     this.dataSource.data[n].abc = { id: null, type: null, unit: null }
  //   }
  //   n++
  // }
  //     this.modal_po=this.modalCtrl.create({
  //       component: ConvertPage,
  //       breakpoints: [0, 0.3, 0.5, 1],
  //       initialBreakpoint: 0.8
  //     });
  //     this.name=[]
  //     this.calculation()
  //     this.Convert = true
  //     this.api.post3('invoice_prefix/', { company: this.currentCompany.id }).subscribe((res: any) => {
  //       console.log('testir',res);


  //         this.invoice_model.invoice_no = res.purchase_inv_no
  //       })
  //     this.purchaseOrder=null
  //     this.invoicetypoo = 2
  //     this.invoice_typek(2)
  //     this.invoice_model.against_inv= this.idReturn
  //   }else if(!a){
  //     console.log(this.dataSource,p,'datasorce');
  //     this.hide_list=false
  //     this.name=this.og_po_list
  //     this.Convert = false
  //     this.invoice_model.invoice_no = this.number_invoice
  //     this.calculation() 
  //     this.invoicetypoo = this.changeType
  //     this.invoice_typek(this.invoice_type)
  //     this.purchase=null
  //     this.invoice_model.against_inv=null
  //   }
  // }
  invoice_typek(inType: number) {
    console.log('gdg', inType);

    if (inType == 1) {
      this.invoiceType = true
      this.sales = ["1"]
    }
    if (inType == 2) {
      this.purchase = ["2"]
      this.p = ['2']
    }
    if (inType == 3) {
      this.invoiceType = true
      this.salesR = ["3"]
    }
    if (inType == 4) {
      this.purchaseR = ["4"]
      this.pR = ['4']
    }
    if (inType == 5) {
      this.invoiceType = true
      this.quotation = ["5"]
    }
    if (inType == 6) {
      this.invoiceType = true
      this.challan = ["6"]
    }
    if (inType == 7) {
      this.invoiceType = true
      this.proforma = ["7"]
    }
    if (inType == 10) {
      this.invoiceType = true
      this.purchaseOrder = ["10"]
    }
    console.log([inType.toString()], this.sales, this.dictionary, 'bbbhs');

    let a = [inType.toString()]
    this.invoice_type111 = a[0]
    let term = a;
    this.dictionary = this.dictionary.filter((dictionary) => {
      return dictionary.type.indexOf(term) > -1;
    });
    console.log(this.dictionary, 'ddd');

  }
  whatsappSend() {
    let msg = 'Hello ';
    let pname = this.party_details.Party_name;
    msg += pname + ', Thank you for your Purchase with ';
    let companyName = this.api.getCompanyDetails().business_name
    msg += companyName + '. Click on the link https://esarwa.com/a/' + this.invoiceD + ' to download the invoice. - ESARWA'
    //this.invoiceNumber
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
  async click() {
    if (!this.Convert) {
      const modal = await this.modalCtrl.create({
        component: ConvertPage,
        breakpoints: [0, 0.3, 0.5, 1],
        initialBreakpoint: 0.8
      });
      modal.present()
    }
  }
}