import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemWiseSalesPageRoutingModule } from './item-wise-sales-routing.module';
import { ItemWiseSalesPage } from './item-wise-sales.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemWiseSalesPageRoutingModule,
    TranslateModule,
  ],
  declarations: [ItemWiseSalesPage]
})
export class ItemWiseSalesPageModule {}
