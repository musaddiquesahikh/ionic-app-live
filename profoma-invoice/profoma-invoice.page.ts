import { PermissionGuard } from './../guards/permission.guard';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profoma-invoice',
  templateUrl: './profoma-invoice.page.html',
  styleUrls: ['./profoma-invoice.page.scss'],
})
export class ProfomaInvoicePage implements OnInit {
  data=7;

  constructor() { }

  ngOnInit() {
  }
  invoiceFunction7(invoice:any)
  {
     console.log(invoice);
     
  }
}
