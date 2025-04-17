import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.page.html',
  styleUrls: ['./purchase-invoice.page.scss'],
})
export class PurchaseInvoicePage implements OnInit {
data=2;
   constructor() { }
 
   ngOnInit() {
   }
 
   invoiceFunction2(invoice:any)
   {
      console.log(invoice);
      
   }
   
 }