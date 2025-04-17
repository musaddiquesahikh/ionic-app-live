import { PartyListPageModule } from './party-list/party-list.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { MaterialModule } from './material.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera, CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

 import { QRScanner, QRScannerOriginal } from '@ionic-native/qr-scanner';
import { CashDepositPageModule } from './cash-deposit/cash-deposit.module';
import { ChequePageModule } from './cheque/cheque.module';
import { BankPageModule } from './bank/bank.module';
import { CashPageModule } from './cash/cash.module';

import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'intro.js/introjs.css';
import { CapitalizeInputDirective } from './capitalize-input.directive';
// import { Printer } from '@ionic-native/printer/ngx';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { Printer } from '@ionic-native/printer/ngx';
import { SMS } from '@ionic-native/sms/ngx';
// import { InAppBrowser } from 'cordova';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@NgModule({
  declarations: [AppComponent, CapitalizeInputDirective],
  entryComponents: [],
 
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    MatInputModule, MatFormFieldModule, MatSnackBarModule,
    MatFormFieldModule,HttpClientModule,
    MatButtonModule,
    TranslateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule, HttpClientModule,
    // CashPageModule,ChequePageModule,BankPageModule
    
    TranslateModule.forRoot({
      loader:{
        
        provide: TranslateLoader,
        useFactory:HttpLoaderFactory,  
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera,DatePipe,SmsRetriever,Printer,
    SMS ,InAppBrowser, ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
  }
export function createTranslateLoader(HttpClient: HttpClient):TranslateHttpLoader {
  return new TranslateHttpLoader(HttpClient, './assets/i18n/', '.json');
}
