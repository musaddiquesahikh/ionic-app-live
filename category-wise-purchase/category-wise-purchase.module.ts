import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryWisePurchasePageRoutingModule } from './category-wise-purchase-routing.module';

import { CategoryWisePurchasePage } from './category-wise-purchase.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryWisePurchasePageRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryWisePurchasePage]
})
export class CategoryWisePurchasePageModule {}
