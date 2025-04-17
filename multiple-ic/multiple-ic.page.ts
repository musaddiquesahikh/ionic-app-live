import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-ic',
  templateUrl: './multiple-ic.page.html',
  styleUrls: ['./multiple-ic.page.scss'],
})
export class MultipleICPage implements OnInit {

 
  item: any = {
    multiple: []
  }
  multiModal: any;
  
  constructor() {}

  ngOnInit() {
  }
  
  // toggleRow() {
  //   let data = {
  //     SrNo: 0,
  //     Qyt: 0
  //   }
  //   this.multiple.push(data)
  // }

  // deleteRange(index) {
  //   this.multiple.splice(index,1);
  // }
  srNumber:any= [
    {
      srNumber:'',
      qty:null
    }
  ]
  // multiple(f){
  //   this.multiModal = this.modalService.open(f, { centered: true });
  // }
  removeField(i){
    console.log(i,'iiiiiiiii')
    this.srNumber.splice(i,1)
    if(this.srNumber.length==0){
      this.item.hasMultipleSr=false;
    }
  }
}
