import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChequePageRoutingModule } from './cheque-routing.module';
import { ChequePage } from './cheque.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChequePageRoutingModule,TranslateModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ChequePage]
})
export class ChequePageModule {}
