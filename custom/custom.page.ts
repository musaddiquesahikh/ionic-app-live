import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit {
  default_dict: any = {}
  page_name:string

  constructor() {

  }

  ngOnInit() {
    this.default_dict = {
      role_name: "",
      data: [{
        page_name:"Sales",
        action:{edit:false,view:false,delete:false,create:false}
        
      },
      {
        page_name: "Purchase",
        action:{edit:false,view:false,delete:false,create:false}
      },
      ]
    }


  }


  submitForm() {
    console.log("data",this.default_dict)
  }
}
