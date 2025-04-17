import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { ApiService } from "../api.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcodelogin',
  templateUrl: './qrcodelogin.page.html',
  styleUrls: ['./qrcodelogin.page.scss'],
})
export class QrcodeloginPage implements OnInit {

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  stext: string;
  private key = CryptoJS.enc.Utf8.parse('Xp2s5v8y/B?E(H+M');
  private iv = CryptoJS.enc.Utf8.parse('Xp2s5v8y/B?E(H+M');
  encry: any;

  constructor(
    // private barcodeScanner: BarcodeScanner
   // private qrScanner: QRScannerOriginal
   public api:ApiService,
   public router:Router
    ) { }
    
  // scanBarcode() {
  //   const options: BarcodeScannerOptions = {
  //     preferFrontCamera: false,
  //     showFlipCameraButton: true,
  //     showTorchButton: true,
  //     torchOn: false,
  //     prompt: 'Place a barcode inside the scan area',
  //     resultDisplayDuration: 500,
  //     formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
  //     orientation: 'portrait',
  //   };

  //   this.barcodeScanner.scan(options).then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.scannedData = barcodeData;

  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }

  // createBarcode() {
  //   this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
  //     console.log(encodedData);
  //     this.encodedData = encodedData;
  //   }, (err) => {
  //     console.log('Error occured : ' + err);
  //   });
  // }
  encryptUsingAES256(plaintext:any) {
    console.log("got this", plaintext);
    
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(plaintext)), this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC
    });
    
   console.log('Encrypted :' + encrypted);
   this.encry=encrypted;
    //this.decryptUsingAES256(encrypted);
    return encrypted;
}

  ngOnInit() {
  //this.encryptUsingAES256(sessionStorage.getItem("loginData"))
 // sessionStorage.getItem("loginData")
  //console.log("login data",sessionStorage.getItem("loginData"));
  QRScanner.prepare();
    
    
  }

  startScanning(){
    QRScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         // camera permission was granted
  
  
         // start scanning
         let scanSub = QRScanner.scan().subscribe((text: string) => {
           this.stext=text
           if(text){

            let enscrypted=this.encryptUsingAES256(JSON.stringify(sessionStorage.getItem("loginData")))
             
             let data={web_id:text,web_token:enscrypted.ciphertext.toString(CryptoJS.enc.Base64)};
             console.log("data sending for web token",data);
             
             this.api.postQrData(data).subscribe((response: any) => {
               if(response.status=='success'){
                  this.router.navigateByUrl('settings')
               }else{

               }
             })
           }
           console.log('Scanned something', text);
           QRScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {
         console.log("status denied");
         
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
        console.log("status permission ask ");
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  //QRScanner.scan(displayContents);

// displayContents(err, text){
//   if(err){
//     // an error occurred, or the scan was canceled (error code `6`)
//   } else {
//     // The scan completed, display the contents of the QR code:
//     alert(text);
//   }
// }

// openScanner(){
//   QRScanner.scan();
//   QRScanner.show();
// }

// Make the webview transparent so the video preview is visible behind it.
ngOnDestroy() {
  QRScanner.destroy();
}

}
