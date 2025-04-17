import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryWiseSalesPageRoutingModule } from './category-wise-sales-routing.module';

import { CategoryWiseSalesPage } from './category-wise-sales.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryWiseSalesPageRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryWiseSalesPage]
})
export class CategoryWiseSalesPageModule {}
