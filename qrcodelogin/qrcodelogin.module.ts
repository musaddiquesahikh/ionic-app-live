import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeloginPageRoutingModule } from './qrcodelogin-routing.module';

import { QrcodeloginPage } from './qrcodelogin.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeloginPageRoutingModule,TranslateModule
  ],
  declarations: [QrcodeloginPage]
})
export class QrcodeloginPageModule {}
