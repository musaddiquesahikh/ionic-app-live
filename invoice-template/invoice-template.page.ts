import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-invoice-template',
  templateUrl: './invoice-template.page.html',
  styleUrls: ['./invoice-template.page.scss'],
})
export class InvoiceTemplatePage implements OnInit {
  already: boolean;
  paymentOption: boolean;
  //companyData: any;
  invoice_now:any
  templateImage:any;

  constructor(public api:ApiService) { }

  ngOnInit() {
    this.getCompany()
  }


  getCompany(){
    let cId=this.api.getCompanyId()
   // this.companyData=
    this.api.getCompanyData(cId).subscribe(async (response: any[]) => {
      console.log(response["company data"].theme);
      this.invoice_now=response["company data"].theme
      this.templateImage="assets/templates/temp"+this.invoice_now+".png"
      //""+this.invoice_now+".png"
     
    });
   // console.log(this.companyData);
    
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail);
    this.invoice_now=Number(ev.detail.value)
    this.templateImage="assets/templates/temp"+this.invoice_now+".png"
  }

  saveInvoice(){
    console.log(this.invoice_now);
    let t_id=this.invoice_now
    this.templateImage="assets/templates/temp"+this.invoice_now+".png"
    this.api.submitInvoicetemplate(t_id).subscribe((response:any)=>{
      console.log(response);
      if(response.status==200){
        alert(response.message);
      }
      
    })
  }

}
