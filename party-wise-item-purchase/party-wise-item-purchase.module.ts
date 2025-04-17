import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyWiseItemPurchasePageRoutingModule } from './party-wise-item-purchase-routing.module';
import { PartyWiseItemPurchasePage } from './party-wise-item-purchase.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWiseItemPurchasePageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyWiseItemPurchasePage]
})
export class PartyWiseItemPurchasePageModule {}
