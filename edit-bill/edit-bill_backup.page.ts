import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PartyListPage } from '../party-list/party-list.page';

@Component({
   selector: 'app-edit-bill',
   templateUrl: './edit-bill.page.html',
   styleUrls: ['./edit-bill.page.scss'],
})
export class EditBillPage implements OnInit {
   userEmail: any;
   discountTotal: number
   partyComponent: Boolean = false;
   itemComponent: Boolean = false;
   add_charge: number
   a: any = []
   partyname: any = []
   total_amount: any;
   itemsData: any = []
   partyDetails: any = []
   party_name: any
   partyId: any;
   taxAmount: number;
   company: any = []
   emails = [];
   test: any;
   qty: any = [];
   rate: any = [];
   disc: any = [];
   list: any = [];
   partyList: any;
   item: any;
   selected_bill: any = []
   item_name: string
   party: any;
   // total:any;
   payment_terms: any;
   total3: number;
   subTotal: number;
   data: any
   // user: any = [];
   lblinvoice: any;
   lblinvoicedate: any;
   date: any;
   due_date: any;
   finalAmount: any;
   // invoice_date:any;
   billId: any;
   billData
   invNo: any
   bank: any = []
   downloadUrl: any
   submit: boolean
   addC: boolean;
   placeOf: any
   addD: boolean
   total_taxable_amount: number
   currentCompany: any = []
   party_gst: any
   party_details: any = []
   company_gst: any
   dictionary: any = [{
      "type": "1",
      "header": "Sales-Invoice",
      "label": "Sales-Invoice-No",
      "sButton": "Save",
      "gButton": "Generate Bill",
      "rate": this.list.rate

   }, {
      "type": "2",
      "header": "Purchase-Invoice",
      "label": "Purchase-Invoice-No",
      "sButton": "Save",
      "gButton": "Generate Bill"

   }, {
      "type": "3",
      "header": "Quotation",
      "label": "Quotation-No",
      "sButton": "Save",
      "gButton": "Save & New"
   }, {
      "type": "4",
      "header": "Create Delivery-Challan",
      "label": "Delivery-Challan-No",
      "sButton": "Save",
      "gButton": "Save & New"
   }, {
      "type": "5",
      "header": "Create-Sales-Return",
      "label": "Credit-Note-No",
      "sButton": "Save",
      "gButton": "Save & New"
   }, {
      "type": "6",
      "header": "Create-Purchase-Return",
      "label": "Debit-Note-No",
      "sButton": "Save",
      "gButton": "Save & New"
   },
   {
      "type": "7",
      "header": "Proforma invoice",
      "label": "Invoice No",
      "sButton": "Save",
      "gButton": "Save & New"
    },]

   user = {
      no: '',
      date: '',
      "invoice_no": "",
      "payment_terms": 7,
      "invoice_date": "2022-05-29",
      "due_date": "2022-05-29",
      "Igst": 0,
      "cgst": 0,
      "sgst": 0,
      "total_amount": 0,
      "received_amount": 0,
      "party": 12,
      "taxable_amount": 0,
      "discountTotal": 0,
      "invoice_type": 0,
      "payment_status": 0,
      "company_name": 0,
      "bank_name": "",
   
      "items": [
         {
            "id":0,
            "item_name": "",
            "items": 0,
            "quantity": 0,
            "total_amount": 0,
            "discount": 0,
            "rate": 0,
            "item_info": {},
            "tax_percent": 0,
            "tax_amount": 0,
            "tax_rate_id": 0,
            "cess_rate_id": 0
         }
      ]

   }
   getInvoice: any = {}

   @Input() purchase;
   @Input() sales;
   @Input() quatation;
   @Input() purchaseReturn;
   @Input() salesReturn;
   @Input() deliveryChallan;

   in: any = ['Invoice'];
   selected: any;
   finalItem: any = [];

   modal1: boolean;
   modal2: boolean;
   invoice_type: any;
   totaltax: number;

   cgst: number;
   sgst: number;
   igst: number;


   constructor(public modalCtrl: ModalController, public api: ApiService, public toastController: ToastController,
      public model1: ModalController, public router: Router) { }

   ngOnInit() {
      this.getinvoiceData()

   }
   getinvoiceData() {
      console.log("list_rate", this.list.rate);

      this.selected_bill = this.billData
      console.log("selected invoice", this.selected_bill);

      this.company = JSON.parse(sessionStorage.getItem("currentCompany"));
      let a = this.company[0].id;
      this.getInvoice.company_id = a;
      console.log("getInvoiceid", this.getInvoice.company_id);

      this.getInvoice.invoice_id = this.selected_bill.invoice_id
      console.log("invoice_id", this.getInvoice.invoice_id);
      let header = this.api.getHeader();
      this.api.getParticularInvoice(this.getInvoice, header).subscribe((response: any[]) => {
         console.log("get_particular_invoice", response);
         this.selected_bill = response
         this.user = this.selected_bill
         //this.exp1 = this.selected_bill["items"]
         this.itemsData = this.selected_bill["items"]
         this.a = this.selected_bill.invoice_type
         this.total_taxable_amount = this.user.taxable_amount
         // this.list.item_name = this.itemsData["item_info"].item_name
         this.a = this.selected_bill.invoice_type
         console.log("sdaf", this.itemsData)
         this.list = this.itemsData
         for (let i of this.list) {
            i.item_name = i["item_info"]["item_name"];
            console.log('name2', i.item_name);
            
         }
         console.log("itemList",this.list);
         
         this.partyId = this.selected_bill.party
         console.log("partId", this.partyId);

         let party_id = this.partyId
         this.api.getParticularParty(party_id, header).subscribe((response: any[]) => {
            console.log("get_particular_party", response);
            this.party_name = response["data"].Party_name
            console.log("party_name", this.party_name);
            this.partyList = this.party_name
            this.a = this.selected_bill.invoice_type
            console.log("a", this.a);
            let term = this.a;
            this.api.bankList(this.getInvoice.company_id, header).subscribe((response: any) => {
               // console.log("api called", response);

               this.bank = response
               console.log("item dsfgdsg", this.bank);
               //this.selected_bill.bank = this.selected_bill.bank.toString()
               this.user.bank_name = this.selected_bill.bank
               console.log(" this.user.bank_name", this.user.bank_name);
               console.log("this.selected_bill.bank", this.selected_bill.bank);
               //this.list = this.itemsData
               // let n = 0
               for (let i of this.list) {
                  console.log('name1', i["item_info"]["item_name"]);
                  
               //    this.list[n].Gst_tax_rate = i.tax_percent
               //    this.list[n].discount = Number(i.item_info.discount)

               //    this.list[n].Gst_tax_rate = i.tax_percent
               //    this.list[n].total_amount = i.total_amount

               //    this.list[n].total_amount = i.total_amount
               //    this.list[n].tax = i.tax_amount
               //    this.list[n].rate = i.rate
               //    console.log('tax value', i.tax_percent);

               }
               this.a = this.selected_bill.invoice_type
               console.log("this.invoice_type", this.a);
               let term = this.a;
               this.dictionary = this.dictionary.filter((dictionary) => {
                  return dictionary.type.indexOf(term) > -1;
               });


               console.log("dict", this.dictionary);
            });

         });
      });
      this.total3 = this.total();
      this.qty = [];
      this.rate = [];
      this.disc = [];
      // this.lblinvoice = 1;
      this.lblinvoicedate = Date.now();
      this.payment_terms = 7;
      // this.dueDate = Date.now();
      this.due_date = new Date(Date.now() + this.payment_terms * 24 * 60 * 60 * 1000)
      this.modal1 = false;
      this.modal2 = false;


      //  this.a = this.sales || this.purchase || this.quatation || this.deliveryChallan || this.salesReturn || this.purchaseReturn;
      //  console.log("s", this.a);
      // this.invoice_type = this.a;
      // console.log("c", this.invoice_type);


      // this.total=this.item.quantity * this.item.rate
      // let companyId = this.currentCompany[0].id;
      // console.log("Company details", companyId);



   }

   doSomething(email) {
      if (this.doValidate(email)) {
         this.emails.push(email);
         this.userEmail = ''; // reset ngModel it will clear old value
      }
   }

   validateEmail(email) { //Validates the email address
      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return emailRegex.test(email);
   }

   validatePhone(phone) { //Validates the phone number
      var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
      return phoneRegex.test(phone);
   }

   doValidate(email) {
      if (!this.validateEmail(email) || !this.validatePhone(email)) {
         alert("Invalid Email");
         return false;
      }
   }
   partyFunction(item: any) {

      this.party_details = item

      console.log("partyDetails", this.party_details)
      this.partyList = item.Party_name;
      this.partyId = item.id;
      this.party = item.id;
      console.log("partyId", this.party);
      this.party_gst = this.party_details.gstin
      console.log("partyGst", this.party_gst);


      if (this.party_gst == null) {
         this.placeOf = this.party_details.gst_compare
         this.placeOf = this.placeOf.slice(0, 2)
         console.log("klm", this.placeOf);
         this.party_gst = this.placeOf

      } else {
         console.log('cgstpjhgjh', this.party_gst.slice(0, 2));
         this.party_gst = this.party_gst.slice(0, 2)


      }
      this.calculateTax()
      this.modalCtrl.dismiss();
      this.partyComponent = false
      console.log("this.partyComponent", this.partyComponent);
   }

   parentFunction1(data: any) {
      console.log('1234', data)
      if (data.discount == null) {
         console.log("discount is null");
         data.discount = 0;

      } else {
         console.log("discount is not null");
      }
      this.list = this.list.concat(data);
      console.log("list", this.list);
      if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "4") {

      }
      this.modal1 = false;
      this.model1.dismiss();
      this.total_amount = this.total();
      this.total_taxable_amount = this.total_taxable();
      this.do()
      this.itemsData.push(this.list)
      this.itemComponent = false
      console.log("this.partyComponent", this.itemComponent);

   }

   showPartyData() {
      this.partyComponent = true;
      // this.modal2 = true;
      //this.partyFunction(this.item)
   }
   showItemData() {
      this.itemComponent = true;
   }

   setDate() { }

   editInvoice() {

      console.log(this.user);
      this.lblinvoice = this.user.invoice_no;
      this.payment_terms = this.user.payment_terms

      this.lblinvoicedate = this.user.invoice_date;
      console.log(this.lblinvoicedate);
      this.date = new Date(this.lblinvoice);
      this.due_date = new Date(Date.now() + this.payment_terms * 24 * 60 * 60 * 1000)
      this.modalCtrl.dismiss();


      if (this.payment_terms == 7) {
         let date1 = new Date(this.user.invoice_date)
         this.due_date = date1.setDate(date1.getDate() + 7);
         this.modalCtrl.dismiss();
      }
      if (this.payment_terms == 15) {
         let date1 = new Date(this.user.invoice_date)
         this.due_date = date1.setDate(date1.getDate() + 15);
         this.modalCtrl.dismiss();
      }
      if (this.payment_terms == 30) {
         let date1 = new Date(this.user.invoice_date)
         this.due_date = date1.setDate(date1.getDate() + 30);
         this.modalCtrl.dismiss();
      }
      if (this.payment_terms == 45) {
         let date1 = new Date(this.user.invoice_date)
         this.due_date = date1.setDate(date1.getDate() + 45);
         this.modalCtrl.dismiss();
      }

      if (this.payment_terms == 60) {
         let date1 = new Date(this.user.invoice_date)
         this.due_date = date1.setDate(date1.getDate() + 60);
         this.modalCtrl.dismiss();
      }

   }
   generateBill() {

      let header = this.api.getHeader();
      this.api.invoicePDF(this.billId, header).subscribe((response: any[]) => {
         console.log("pdf", response);
         let b = response["status"]
         console.log("status", b);

         if (response["status"] == 400) {
            alert(response["message"])
         }
         if (response["status"] === 200) {
            let a = response["url"]
            console.log("url", a);

            this.downloadUrl = a;
         }
      });

   }



   delete(index: number) {
      this.partyList.trash();
   }
   ModelDismiss() {
      this.modalCtrl.dismiss();
   }
   dismissmodel() {
      this.modal1 = false;
      this.modalCtrl.dismiss();

   }
   async editBill() {

      this.user.no = this.user.invoice_no,
         this.user.date = this.user.invoice_date,
         this.user.payment_terms = this.user.payment_terms,
         this.user.due_date = this.user.due_date,
         this.user.Igst = this.user.Igst
      this.user.cgst = this.user.cgst,
         this.user.sgst = this.user.sgst,
         this.user.total_amount = this.user.total_amount,
         this.user.received_amount = this.user.received_amount,
         this.user.party = this.user.party,
         this.user.taxable_amount = this.user.taxable_amount,
         this.user.discountTotal = this.user.discountTotal,
         this.user.invoice_type = this.user.invoice_type,
         this.user.payment_status = this.user.payment_status,
         this.user.company_name = this.user.company_name,
          this.user.items = this.itemsData

         this.putinarray()

      console.log("billdata", this.user);
      console.log("dsfgfsd", this.itemsData)
      let index = 0;
      for (let ff of this.user.items) {
         console.log("ff",ff);
          delete this.user.items[index].item_info
         delete ff.id
         delete ff.item_name
         index++
      }
      


      let companyId = this.company[0].id;
      this.user.company_name = companyId;
      let header = this.api.getHeader();
      this.api.editParticularInvoice(this.user, header).subscribe(async (response: any[]) => {
         console.log("yyyyyy", response);
         let status = response["status"]
         console.log("status", status);

         if (response["status_code"] == 0) {
            alert(response["message"])
         }
         if (response["status_code"] == 3) {

            this.downloadUrl = 'https://api.esarwa.com/api/create_pdf/' + response["data"] + '/';
         }
         // this.modalCtrl.dismiss();
         const toast = await this.toastController.create({
            message: 'Invoice Updated Successfully',
            duration: 3000,
            color: "warning"
         });
         toast.present();

      });

   }
   dismiss(index: any) {
      this.list.splice(index, 1);
   }
   async presentModal(item) {
      const modal = await this.modalCtrl.create({
         component: PartyListPage,
         cssClass: 'my-custom-class',
         componentProps: {
            selectpartylist: this.partyList
         }

      });

      // this.parentFunction.emit(this.item);
      console.log("selected party", this.item)
      return await modal.present();

   }


   total() {
      let ff = 0;
      console.log('getjinga', typeof (this.a));

      if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "6") {
         this.list.forEach(function (value) {
            ff = value.sales_prices + ff;
         });
      }
      else {
         this.list.forEach(function (value) {
            ff = value.purchase_prices + ff;
         });
      }
      this.subTotal = ff;
      return ff;
   }

   addCharge() {
      this.addC = true
   }
   addDisc() {
      this.addD = true
      console.log("button work");

   }

   do() {
      let index = 0;
      for (let i of this.list) {
         if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "4") {
            this.list[index].total_amount = (i.quantity * i.rate) - (i.discount / 100 * (i.quantity * i.rate)) + (i.Gst_tax_rate / 100 * (i.quantity * i.rate))
            this.list[index].total_amount = Math.round((this.list[index].total_amount + Number.EPSILON) * 100) / 100
            this.list[index].tax = (i.Gst_tax_rate / 100 * ((i.rate * i.quantity) - (i.discount / 100 * (i.quantity * i.rate))))
         } else {
            this.list[index].total_amount = (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate)) + (i.Gst_tax_rate / 100 * (i.quantity * i.purchase_rate))
            this.list[index].total_amount = Math.round((this.list[index].total_amount + Number.EPSILON) * 100) / 100
            this.list[index].tax = (i.Gst_tax_rate / 100 * ((i.purchase_rate * i.quantity) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
            //this.list[index].tax = (i.Gst_tax_rate / 100 * (i.quantity * (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
         }

         // this.list[index].taxp = (i.Gst_tax_rate / 100 * (i.quantity * (i.quantity * i.purchase_rate) - (i.discount / 100 * (i.quantity * i.purchase_rate))))
         index++
      }
      this.total_taxable_amount = Math.round(this.total_taxable() + Number.EPSILON)
      this.total_amount = Math.round(this.total() - ((this.user.discountTotal * this.total()) / 100) + Number.EPSILON)
      this.totaltax = Math.round(this.calculateTax() + Number.EPSILON)
      this.calculateGst()

      console.log('sub', this.total_amount);
      this.finalAmount = Math.round((this.total_amount - this.user.received_amount) + Number.EPSILON)
   }


   total_taxable() {
      let ff = 0;

      if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "4") {
         this.list.forEach(function (value) {
            ff = ((((value.rate * value.quantity) - (value.discount / 100 * (value.quantity * value.rate))) + ff));
            // console.log('salescall12', ff);
            // (i.quantity * i.rate)
         });
      }
      else {
         this.list.forEach(function (value) {
            ff = (Number((value.purchase_rate * value.quantity) - (value.discount / 100 * (value.quantity * value.purchase_rate))) + ff);
            // console.log('purchaseCall');

         });
      }
      this.total_taxable_amount = ff;
      // console.log('show amount', this.total_taxable_amount);

      return ff;
   }

   putinarray() {
      for (let i of this.list) {
         if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "4") {
            this.finalItem.push({
               items: i.id, quantity: i.quantity, discount: Number(i.discount),
               rate: i.rate, total_amount: i.total_amount, tax_percent: i.Gst_tax_rate,
               tax_amount: i.sales_tax
            });
         }
         else {
            this.finalItem.push({
               items: i.id, quantity: i.quantity, discount: Number(i.discount),
               rate: i.purchase_rate, total_amount: i.purchase_prices, tax_percent: i.Gst_tax_rate,
               tax_amount: i.purchase_tax
            });

         }
         console.log('final item', this.finalItem);
      }

   }

   calculateTax() {

      console.log("cal-tax calling");
      console.log("this name ->", this.list);

      let ff = 0;

      if (this.a == "1" || this.a == "3" || this.a == "5" || this.a == "4") {
         this.list.forEach(function (value) {
            ff = value.tax + ff;
         });
      }
      else {
         console.log('total cal for pur');
         this.list.forEach(function (value) {
            ff = value.tax + ff;
         });
      }
      this.totaltax = ff;
      console.log("dsfads", ff)
      return ff;

   }
   calculateGst() {
      if (this.company_gst != null) {
         if (this.company_gst) {
            this.company_gst = this.company_gst.slice(0, 2)
         }

         console.log('gstt of company', this.company_gst)
         console.log('gstt of company', this.party_gst)


         if (this.party_gst == this.company_gst) {
            console.log('cgst & sgst')
            console.log("tax", this.totaltax);

            this.cgst = this.totaltax / 2
            this.sgst = this.totaltax / 2
         } else {
            console.log('igst')
            this.igst = this.totaltax
         }

      }
   }
   addBank() {
      this.router.navigate(['/create-new-bank'])
   }

}