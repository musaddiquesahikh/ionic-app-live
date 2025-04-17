import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './../api.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-e-way',
  templateUrl: './e-way.page.html',
  styleUrls: ['./e-way.page.scss'],
})
export class EWayPage implements OnInit {
  vehicleDetails: boolean;
  vehicleSubmitted: any;
  @Output() invoiceSFunction: EventEmitter<any> = new EventEmitter();
  @ViewChild('segment') segment: any; company: any = {};
  private selectSegment: string = 'a';
  toast: any;
  ewaybillDownload: boolean;
  e: any;
  eWayBill: boolean;
  downloadEinvoiceButton: boolean;
  invoiceID: any;
  constructor(public api:ApiService,public modal:ModalController, public ToastController:ToastController, public translate:TranslateService) { }

  ngOnInit() {
  }
  createEInvoice(data: any) {
    let company_id = this.api.getCompanyId()
    this.api.geteinvoice({ "invoice_id": data, "company_id": company_id }).subscribe((response: any) => {
      console.log(response, "e invoice result");
      if (response.status == 200) {
        this.downloadEinvoiceButton = true
        // this.downloadEinvoicePDF(data);

        if (this.eWayBill == true) {
          if (this.vehicleDetails == true) {
            this.vehicleSubmitted.invoice = data
            this.api.submitTransportDetails(this.vehicleSubmitted).subscribe((response: any) => {
              //submited transport details
              if (response.status == 200) {
                this.createEwayBill(data);
              }
            })

          }
        }

      }
    })
  }
  createEwayBill(data: any) {
    this.api.createEwb({ invoice_id: data }).subscribe((response: any) => {
      console.log("create eway bill response", response);
      if (response.status == 200) {
        console.log(response.data, "eway bill created");
        this.ewaybillDownload = true
        this.get_ewb(data);
      } else {
        this.toast.warning({ detail: this.translate.instant("MESSAGE.FAILED"), summary: response.msg })
        console.log(response.msg);
      }
    })
  }
  get_ewb(data) {
    this.api.get_ewb({ invoice_id: data }).subscribe((response: any) => {
      console.log("ewaybill", response);
      if (response.status == 200) {
        this.e = response.data;
        // this.ebarcode = this.e.ewbNo + "/" + this.e.userGstin + "/" + this.e.ewayBillDate;
      }
    })
  }
  eway: any = {}
  vehicle_type: any = [{ id: "0", name: "Regular" }, { id: "1", name: "Over-Dimensional Cargo" }]
  transport_type: any = [{ id: 1, name: "Road" }, { id: 2, name: "Rail" }, { id: 3, name: "Air" }, { id: 4, name: "Ship" }]
 
  segmentChanged(event: any) {
    this.selectSegment = event.target.value;
    console.log(event.detail.value);
   
  }
  ngAfterViewInit() {
    this.selectSegment = 'a';
 
  }
  onSegmentChange(event) {
    console.log(event.detail.value);
  }
  ewaySubmit(d: any) {
    this.vehicleDetails = true
    this.vehicleSubmitted = d
    this.modal.dismiss(d)
}
}