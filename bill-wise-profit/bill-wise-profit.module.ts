import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BillWiseProfitPageRoutingModule } from './bill-wise-profit-routing.module';
import { BillWiseProfitPage } from './bill-wise-profit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillWiseProfitPageRoutingModule,
    TranslateModule
  ],
  declarations: [BillWiseProfitPage]
})
export class BillWiseProfitPageModule {}
