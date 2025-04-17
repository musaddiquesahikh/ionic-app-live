import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.page.html',
  styleUrls: ['./purchase-order.page.scss'],
})
export class PurchaseOrderPage implements OnInit {
  data=10;
  constructor() { }

  ngOnInit() {
   
  }
  purchaseOrder(purchase:any)
  {
     console.log(purchase);
     
  }

}
