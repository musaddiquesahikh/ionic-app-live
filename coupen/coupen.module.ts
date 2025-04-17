import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoupenPageRoutingModule } from './coupen-routing.module';

import { CoupenPage } from './coupen.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoupenPageRoutingModule,
    TranslateModule
  ],
  declarations: [CoupenPage]
})
export class CoupenPageModule {}
