import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesRegisterDetailsPageRoutingModule } from './sales-register-details-routing.module';

import { SalesRegisterDetailsPage } from './sales-register-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesRegisterDetailsPageRoutingModule,
    TranslateModule
  ],
  declarations: [SalesRegisterDetailsPage]
})
export class SalesRegisterDetailsPageModule {}
