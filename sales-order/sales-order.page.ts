import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.page.html',
  styleUrls: ['./sales-order.page.scss'],
})
export class SalesOrderPage implements OnInit {
  data=11;
  constructor() { }

  ngOnInit() {
  }

  SalesOrder(Sales:any)
  {
     console.log(Sales,'sales order');
     
  }
}
