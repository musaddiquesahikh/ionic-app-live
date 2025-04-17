// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'console';
import { interval, Subscription } from 'rxjs';
import { Printer } from '@ionic-native/printer/ngx';
// import { PrintOptions } from '@ionic-native/printer/ngx-printer';

@Component({
  selector: 'app-thermalprint',
  templateUrl: './thermalprint.page.html',
  styleUrls: ['./thermalprint.page.scss'],
})
export class ThermalprintPage implements OnInit {
  @Input() invoice:any;
  companyDetails: any;
  subscription:Subscription;
  public sanitizer: DomSanitizer;

  //html:any='<!DOCTYPE html><html id="demo"><head><meta charset="utf-8"><title>Invoice</title><style>@media print{@page{size:80cm;margin:0}body{font-family:monospace;font-size:12px}.invoice-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.invoice-logo{width:50px;height:50px;object-fit:contain}.invoice-info{font-size:14px;font-weight:700}.invoice-details{margin-bottom:20px}.invoice-table{width:100%;border-collapse:collapse}.invoice-table td,.invoice-table th{border:1px solid #ddd}.invoice-table th{text-align:left;background-color:#eee}.invoice-total{font-size:14px;font-weight:700;margin-top:20px;text-align:right}</style></head><body style="font-family:monospace"><div class="invoice-header"><div class="invoice-info" style="text-align:center"><b>[${this.companyDetails.business_name}]</b><br>${this.companyDetails.billing_address}<br>Mobile: ${this.companyDetails.company_phone_no}<br>Invoice #${this.invoice.invoice.invoice_no}<br>------------------<br>Date: ${this.invoice.invoice.invoice_date}</div></div><div class="invoice-details"><p><b>Bill To:</b>[${this.invoice.party.Party_name}]</p></div><table class="invoice-table" style="width:100%;max-width:80mm"><tr><th style="text-align:left" colspan="4">Product</th></tr><tr><th style="text-align:left">Rate</th><th style="text-align:right">QTY</th><th style="text-align:center">Tax</th><th colspan="2" style="text-align:right">Total</th></tr><ng-container *ngfor="let t of invoice.item;let i=index"><tr><td style="text-align:left" colspan="4">${this.t.item_name}</td></tr><tr><td>${this.t.rate}</td><td style="text-align:right">X ${this.t.quantity}</td><td style="text-align:center">@${this.t.Gst_tax_rate}%</td><td style="text-align:right">${this.t.sales_prices}</td></tr></ng-container><tr><td colspan="3">Total Taxable Amount</td><td style="text-align:right">${this.invoice.invoice.taxable_amount}</td></tr><tr><td colspan="3">IGST</td><td style="text-align:right">${this.invoice.invoice.Igst}</td></tr><tr><td colspan="3">CGST</td><td style="text-align:right">${this.invoice.invoice.cgst}</td></tr><tr><td colspan="3">SGST</td><td style="text-align:right">${this.invoice.invoice.sgst}</td></tr><tr><td colspan="3">Discount</td><td style="text-align:right">${this.invoice.invoice.discountTotal}</td></tr><tr><th colspan="3" style="text-align:left">Total Amount</th><td style="text-align:right;font-size:16px">${this.invoice.invoice.total_amount}</td></tr></table><div style="text-align:center">-----------<br>Thankyou..! Visit Again</div></body></html>';

   //parser = new DOMParser();
 //document = this.parser.parseFromString(this.html, "text/html");

  constructor( private printer:Printer) { }

  ngOnInit() {
    console.log(this.invoice,"data recieved");
    
    this.companyDetails=JSON.parse(sessionStorage.getItem("currentCompany"))
    this.companyDetails=this.companyDetails[0];
    console.log("recieving from parent", this.invoice);
    setTimeout(function() {
      document.getElementById("printThermal").click()
  }, 1000);
  // console.log(this.document);
  }
  print() {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
}

printDocument() {
 // this.printer.isAvailable().then((onSuccess) => {
      

      let content = "Hello World";
      let element = document.getElementById('demo');
      var searchThis = element.innerHTML;
      console.log(searchThis);
      
      this.printer.print(searchThis);
 // }, (err) => {
 //


}
 
}
