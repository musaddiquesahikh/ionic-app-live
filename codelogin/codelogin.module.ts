import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeloginPageRoutingModule } from './codelogin-routing.module';

import { CodeloginPage } from './codelogin.page';
import { TranslateModule } from '@ngx-translate/core';
// import { ZBar } from '@ionic-native/zbar/ngx';
//  import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeloginPageRoutingModule,TranslateModule
    
   // QRScanner
  ],
  //exports:[QRScanner],
  declarations: [CodeloginPage],
  // providers: [
  //   ZBar
  // ]
  // providers:[QRScanner]
})
export class CodeloginPageModule {}
