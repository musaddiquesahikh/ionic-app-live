import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryWiseSalePageRoutingModule } from './category-wise-sale-routing.module';

import { CategoryWiseSalePage } from './category-wise-sale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryWiseSalePageRoutingModule
  ],
  declarations: [CategoryWiseSalePage]
})
export class CategoryWiseSalePageModule {}
