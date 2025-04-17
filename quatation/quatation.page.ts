import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quatation',
  templateUrl: './quatation.page.html',
  styleUrls: ['./quatation.page.scss'],
})
export class QuatationPage implements OnInit {
  data=5;
  constructor() { }

  ngOnInit() {
  }
 
   quatationFunction1(quatation:any)
   {
      console.log(quatation);
      
   }
 }
