import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.page.html',
  styleUrls: ['./delivery-challan.page.scss'],
})
export class DeliveryChallanPage implements OnInit {
  data=6;
  constructor() { }

  ngOnInit() {
  }
  deliveryChallan(invoice:any)
   {
      console.log(invoice);
      
   }
 }
