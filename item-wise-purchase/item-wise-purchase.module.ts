import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemWisePurchasePageRoutingModule } from './item-wise-purchase-routing.module';
import { ItemWisePurchasePage } from './item-wise-purchase.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemWisePurchasePageRoutingModule,
    TranslateModule
  ],
  declarations: [ItemWisePurchasePage]
})
export class ItemWisePurchasePageModule {}
