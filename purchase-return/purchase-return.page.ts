import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.page.html',
  styleUrls: ['./purchase-return.page.scss'],
})
export class PurchaseReturnPage implements OnInit {
purReturnFunction1($event: Event) {
throw new Error('Method not implemented.');
}
  data=4;
  constructor() { }

  ngOnInit() {
  }
 
   quatationFunction1(purReturn:any)
   {
      console.log(purReturn,"purchase return");
      
   }
 }
