import { Component, OnInit } from '@angular/core';
// import { ZBarOptions, ZBar } from '@ionic-native/zbar/ngx';
// import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner';
// import { Observable} from 'rxjs';
// import { Observable } from 'rxjs/Observable';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
@Component({
  selector: 'app-codelogin',
  templateUrl: './codelogin.page.html',
  styleUrls: ['./codelogin.page.scss'],
})
export class CodeloginPage implements OnInit {
  optionZbar:any;
  scannedOutput:any;
  constructor(
  // private qrScanner: QRScanner
  // private zbarPlugin: ZBar
    ) { }

  ngOnInit() {
  //   this.qrScanner.prepare()
  // .then((status: QRScannerStatus) => {
  //    if (status.authorized) {
  //      // camera permission was granted


  //      // start scanning
  //      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //        console.log('Scanned something', text);

  //        this.qrScanner.hide(); // hide camera preview
  //        scanSub.unsubscribe(); // stop scanning
  //      });

  //    } else if (status.denied) {
  //      // camera permission was permanently denied
  //      // you must use QRScanner.openSettings() method to guide the user to the settings page
  //      // then they can grant the permission from there
  //    } else {
  //      // permission was denied, but not permanently. You can ask for permission again at a later time.
  //    }
  // })
  // .catch((e: any) => console.log('Error is', e));
   }
  //  barcodeScanner(){
  //   this.zbarPlugin.scan(this.optionZbar)
  //  .then(respone => {
  //     console.log(respone);
  //     this.scannedOutput = respone;
  //  })
  //  .catch(error => {
  //     alert(error);
  //  });
  // }
}
