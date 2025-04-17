import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.page.html',
  styleUrls: ['./sales-invoice.page.scss'],
})
export class SalesInvoicePage implements OnInit {
  data:number=1;
  constructor() { }

  ngOnInit() {
  }
 
   invoiceFunction1(invoice:any)
   {
      console.log(invoice);
      
   }
 }
