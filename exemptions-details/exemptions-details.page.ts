import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { modalController } from '@ionic/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-exemptions-details',
  templateUrl: './exemptions-details.page.html',
  styleUrls: ['./exemptions-details.page.scss'],
})
export class ExemptionsDetailsPage implements OnInit {
data
user:any={}
  constructor(public location:Location, public route: ActivatedRoute, public api:ApiService) { }

  ngOnInit() {
    this.getData()
  }
  getData() {
  console.log("data received",this.data);
  this.user.company = this.api.getCompanyId()
  this.user.id = this.data.id
  this.user.year = this.data.year
  console.log("idsdfsdf", this.user);
  let header = this.api.getHeader();
  this.api.taxDeduction1(this.user, header).subscribe((response: any) => {
    console.log("sdfdsfsf",response.data);
    this.data = response.data
  })
  console.log("f",this.data.self_or_family_senior);
  
  }
  cancel(){
    //this.location.back()
    modalController.dismiss()
  }
}
