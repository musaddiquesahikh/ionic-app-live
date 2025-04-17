import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.page.html',
  styleUrls: ['./sales-return.page.scss'],
})
export class SalesReturnPage implements OnInit {
  data=3;
  constructor() { }

  ngOnInit() {
  }
 
   quatationFunction1(salesReturn:any)
   {
      console.log(salesReturn);
      
   }
 }