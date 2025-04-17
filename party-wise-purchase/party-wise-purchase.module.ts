import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PartyWisePurchasePageRoutingModule } from './party-wise-purchase-routing.module';
import { PartyWisePurchasePage } from './party-wise-purchase.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartyWisePurchasePageRoutingModule,
    TranslateModule
  ],
  declarations: [PartyWisePurchasePage]
})
export class PartyWisePurchasePageModule {}
