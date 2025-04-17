import { Component, OnInit } from '@angular/core';
// import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  scannedData:any

  // constructor(private barcodeScanner: BarcodeScanner) {}
ngOnInit() {
  }
  // scanBarcode() {
  //   this.barcodeScanner.scan().then((barcodeData: BarcodeScanResult) => {
  //     if (!barcodeData.cancelled) {
  //       this.scannedData = barcodeData.text;
  //       console.log('Barcode data', barcodeData);
  //     }
  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }
}
