import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.page.html',
  styleUrls: ['./payment-gateway.page.scss'],
})
export class PaymentGatewayPage implements OnInit {
user:any={}
company:any=[]
paymentModeData:any=[]
item
@Input() data
@Output() parentFunction: EventEmitter<any> = new EventEmitter();
  constructor(public modalCtrl:ModalController, public api:ApiService, public router:Router, private activatedRoute:ActivatedRoute) { 
  //  this.activatedRoute.paramMap.subscribe(
  //    (data)=>{
  //      console.log("receive",data);
       
  //    } )

  }

  ngOnInit() {
    // this.api.paymentMode().subscribe((response: any[]) => {
    //   console.log(response);
    //   this.paymentModeData = response["data"]
    //   console.log("paymentModeData",this.paymentModeData);
      
    // })
    // this.activeRoute.paramMap.subscribe(res=>{
    //   console.log(res);
    //    })
    console.log("statedfdsgfd",history.state);

    
    console.log("data",this.data);
    
      this.paymentModeData =this.paymentMode()

    //this.paymentModeData = this.item
    console.log("received from edit company",this.paymentModeData);
    
  }
  paymentGateway(){
    console.log(this.user);
   // this.parentFunction.emit(this.user);
    //this.modalCtrl.dismiss()
    this.company= JSON.parse(sessionStorage.getItem("currentCompany"));
    let header = this.api.getHeader();
    let companyid = this.company[0].id
    this.user.company= companyid
    console.log(this.user.company);
    
    this.api.paymentGateway(this.user, header).subscribe((response: any[]) => {
      console.log(response);
    })
    this.router.navigate(['/edit-company'])
  }
  paymentMode(){
    this.api.paymentMode().subscribe((response: any[]) => {
      console.log(response);
      //return this.paymentModeData = response["data"]
      //console.log("paymentModeData",this.paymentModeData);
      //this.modalCtrl.dismiss()
    })
 }

}
